/*
  MOTOR DE JURISDICCIONES - Mi Comisaría
  ---------------------------------------
  Asigna la comisaría según el POLÍGONO OFICIAL de jurisdicción
  (mapa "DEPENDENCIAS POLICIA PROVINCIA DE SALTA", archivo jurisdicciones.json,
  generado a partir de los KMZ oficiales).

  Regla de oro: la comisaría es la del polígono dentro del cual cae el domicilio.
  Nada de "la más cercana" ni nombres inventados.

  Orden de decisión:
    1. Barrios CONFIRMADOS a mano (BARRIOS_CONFIRMADOS), con nombre oficial.
    2. Punto exacto (GPS o marcador del mapa) -> polígono.
    3. Domicilio geocodificado -> polígono.
       - Si el punto queda a menos de 60 m de un límite, se pide confirmar en el mapa.
       - Si solo se encontró la localidad (no la calle/barrio), NO se asigna:
         se pide marcar la casa en el mapa.
*/

// ====== BARRIOS CONFIRMADOS ======
// Solo agregar barrios verificados. La clave se compara como barrio completo
// (texto normalizado: sin tildes, números romanos -> arábigos).
// "requiereSi": solo se aplica si el domicilio o la zona elegida dice esa palabra.
// "excluirSi": si el domicilio o la zona elegida contiene alguna de esas palabras,
// no se usa la regla (ej. Juan Pablo II Sur es otro barrio).
const BARRIOS_CONFIRMADOS = [
  {
    claves: ['juan pablo 2'],
    jurisdiccion: 'DUR1-S3-Cría 11° (Ex-cria 103)',
    requiereSi: ['norte'],
    nota: 'Juan Pablo II de zona norte (hay otro Juan Pablo II en zona sur) - Comisaría 17 de Octubre'
  },
];

const JURIS = {
  lista: [],
  cargado: false,
  promesa: null,
};

// Límites aproximados de la provincia de Salta (para filtrar geocodificación)
const SALTA_VIEWBOX = { oeste: -68.6, norte: -21.9, este: -62.3, sur: -26.5 };

function _bbox(anillo) {
  let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
  for (const [x, y] of anillo) {
    if (x < a) a = x; if (y < b) b = y; if (x > c) c = x; if (y > d) d = y;
  }
  return [a, b, c, d];
}

function cargarJurisdicciones() {
  if (JURIS.cargado) return Promise.resolve(JURIS.lista);
  if (JURIS.promesa) return JURIS.promesa;
  JURIS.promesa = fetch('jurisdicciones.json?v=3')
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      JURIS.lista = (data.jurisdicciones || []).map(j => {
        const polys = j.poligonos.map(p => ({ ext: p.ext, huecos: p.huecos || [], bbox: _bbox(p.ext) }));
        const bb = polys.reduce((acc, p) => [
          Math.min(acc[0], p.bbox[0]), Math.min(acc[1], p.bbox[1]),
          Math.max(acc[2], p.bbox[2]), Math.max(acc[3], p.bbox[3])
        ], [Infinity, Infinity, -Infinity, -Infinity]);
        return { nombre: j.nombre, dur: j.dur, poligonos: polys, bbox: bb };
      });
      JURIS.cargado = true;
      return JURIS.lista;
    })
    .catch(err => { JURIS.promesa = null; console.error('No se pudo cargar jurisdicciones.json', err); throw err; });
  return JURIS.promesa;
}

function _puntoEnAnillo(lon, lat, anillo) {
  let dentro = false;
  for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
    const [xi, yi] = anillo[i];
    const [xj, yj] = anillo[j];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) dentro = !dentro;
  }
  return dentro;
}

function _dentroDePoligono(lon, lat, p) {
  const [a, b, c, d] = p.bbox;
  if (lon < a || lon > c || lat < b || lat > d) return false;
  if (!_puntoEnAnillo(lon, lat, p.ext)) return false;
  for (const h of p.huecos) if (_puntoEnAnillo(lon, lat, h)) return false; // huecos = otra jurisdicción
  return true;
}

// Distancia en metros de un punto a un segmento (proyección local equirectangular)
function _distSegmentoM(lon, lat, a, b) {
  const kx = 111320 * Math.cos(lat * Math.PI / 180), ky = 110540;
  const px = (lon - a[0]) * kx, py = (lat - a[1]) * ky;
  const bx = (b[0] - a[0]) * kx, by = (b[1] - a[1]) * ky;
  const l2 = bx * bx + by * by;
  let t = l2 ? (px * bx + py * by) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  const dx = px - t * bx, dy = py - t * by;
  return Math.sqrt(dx * dx + dy * dy);
}

function _distanciaABordeM(lon, lat, j) {
  let min = Infinity;
  for (const p of j.poligonos) {
    for (const anillo of [p.ext, ...p.huecos]) {
      for (let i = 0; i + 1 < anillo.length; i++) {
        const d = _distSegmentoM(lon, lat, anillo[i], anillo[i + 1]);
        if (d < min) min = d;
      }
    }
  }
  return min;
}

/*
  Devuelve:
    { nombre, distanciaBorde, cercaDelLimite, vecina }        si cae dentro
    { nombre, fueraPorMetros, aproximada: true }               si cae en un hueco entre zonas (<500 m)
    null                                                       si no hay ninguna cerca
*/
function jurisdiccionDePunto(lat, lon) {
  if (!JURIS.cargado) return null;
  const margen = 0.01; // ~1 km para preselección
  for (const j of JURIS.lista) {
    const [a, b, c, d] = j.bbox;
    if (lon < a || lon > c || lat < b || lat > d) continue;
    if (j.poligonos.some(p => _dentroDePoligono(lon, lat, p))) {
      const distanciaBorde = _distanciaABordeM(lon, lat, j);
      let vecina = null;
      if (distanciaBorde < 60) {
        let mejor = Infinity;
        for (const k of JURIS.lista) {
          if (k === j) continue;
          const [ka, kb, kc, kd] = k.bbox;
          if (lon < ka - margen || lon > kc + margen || lat < kb - margen || lat > kd + margen) continue;
          const dk = _distanciaABordeM(lon, lat, k);
          if (dk < mejor) { mejor = dk; vecina = k.nombre; }
        }
        if (mejor > 150) vecina = null;
      }
      return { nombre: j.nombre, distanciaBorde, cercaDelLimite: distanciaBorde < 60 && !!vecina, vecina };
    }
  }
  // No cayó en ninguna: buscar la más cercana a menos de 500 m (huecos del dibujo oficial)
  let mejor = null, dMin = Infinity;
  for (const j of JURIS.lista) {
    const [a, b, c, d] = j.bbox;
    if (lon < a - 0.006 || lon > c + 0.006 || lat < b - 0.006 || lat > d + 0.006) continue;
    const dj = _distanciaABordeM(lon, lat, j);
    if (dj < dMin) { dMin = dj; mejor = j; }
  }
  if (mejor && dMin <= 500) return { nombre: mejor.nombre, fueraPorMetros: Math.round(dMin), aproximada: true };
  return null;
}

function poligonosDeJurisdiccion(nombre) {
  const j = JURIS.lista.find(x => x.nombre === nombre);
  if (!j) return [];
  // formato Leaflet: [[lat,lon],...] con huecos
  return j.poligonos.map(p => [p.ext.map(([x, y]) => [y, x]), ...p.huecos.map(h => h.map(([x, y]) => [y, x]))]);
}

// Nombre legible para mostrar: "Comisaría 11° (Ex-cria 103) — DUR 1"
function nombreLegibleJurisdiccion(nombre) {
  if (!nombre) return '';
  const m = String(nombre).match(/^DUR\s*(\d+)\s*-\s*S\s*\d+\s*-\s*(.*)$/i);
  let resto = m ? m[2] : String(nombre);
  resto = resto
    .replace(/^\s*Cr[íi]a\.?\s*/i, 'Comisaría ')
    .replace(/^\s*Comisar[íi]a\.?\s*/i, 'Comisaría ')
    .replace(/^\s*Sub[-\s]?cr[íi]a\.?\s*/i, 'Subcomisaría ')
    .replace(/^\s*Dsto\.?\s*/i, 'Destacamento ')
    .replace(/^\s*Dest\.?\s*/i, 'Destacamento ')
    .replace(/^\s*Pto\.?\s*Pol\.?\s*/i, 'Puesto Policial ')
    .replace(/\s+/g, ' ').trim();
  return m ? `${resto} — DUR ${m[1]}` : resto;
}

// ====== NORMALIZACIÓN DE TEXTO ======
function normalizarTextoDomicilio(t) {
  return ' ' + String(t || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[°ºª.,;:()\-\/"]/g, ' ')
    .replace(/\bviii\b/g, '8').replace(/\bvii\b/g, '7').replace(/\bvi\b/g, '6')
    .replace(/\biv\b/g, '4').replace(/\bix\b/g, '9').replace(/\biii\b/g, '3')
    .replace(/\bii\b/g, '2').replace(/\bv\b/g, '5').replace(/\bx\b/g, '10')
    .replace(/\s+/g, ' ')
    .trim() + ' ';
}

function buscarBarrioConfirmado(domicilio, zona) {
  const t = normalizarTextoDomicilio(domicilio);
  const z = normalizarTextoDomicilio(zona || '');
  for (const regla of BARRIOS_CONFIRMADOS) {
    for (const clave of regla.claves) {
      if (!t.includes(' ' + clave + ' ')) continue;
      const excluir = (regla.excluirSi || []).some(p => t.includes(' ' + p + ' ') || z.includes(' ' + p + ' '));
      if (excluir) continue;
      if (regla.requiereSi && !regla.requiereSi.some(p => t.includes(' ' + p + ' ') || z.includes(' ' + p + ' '))) continue;
      return regla;
    }
  }
  return null;
}

// ====== GEOCODIFICACIÓN ======
// Fuente principal: Photon (OpenStreetMap, búsqueda tolerante, encuentra barrios y manzanas).
// Respaldo: Nominatim. Se cachea cada consulta.
const _cacheGeo = new Map();
const CENTRO_CAPITAL = { lat: -24.7883, lon: -65.4106 };

async function _getJSON(url) {
  if (_cacheGeo.has(url)) return _cacheGeo.get(url);
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { 'Accept-Language': 'es' } });
    if (!r.ok) return null;
    const j = await r.json();
    _cacheGeo.set(url, j);
    return j;
  } catch (e) { console.warn('Geocodificador no respondió:', url, e); return null; }
  finally { clearTimeout(to); }
}

async function _photon(q) {
  const v = SALTA_VIEWBOX;
  const j = await _getJSON(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&bbox=${v.oeste},${v.sur},${v.este},${v.norte}&limit=15&lang=default`);
  if (!j || !j.features) return [];
  return j.features.map(f => ({
    nombre: f.properties.name || '', calle: f.properties.street || '', numero: f.properties.housenumber || '',
    tipo: `${f.properties.osm_key}=${f.properties.osm_value}`, tipoPhoton: f.properties.type || '',
    ciudad: [f.properties.city, f.properties.county, f.properties.district, f.properties.locality].filter(Boolean).join(' '),
    lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0], fuente: 'photon'
  }));
}

async function _nominatim(q) {
  const v = SALTA_VIEWBOX;
  const j = await _getJSON('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=10&countrycodes=ar&addressdetails=1'
    + `&viewbox=${v.oeste},${v.norte},${v.este},${v.sur}&bounded=1&q=${encodeURIComponent(q)}`);
  if (!Array.isArray(j)) return [];
  return j.map(r => {
    const a = r.address || {};
    return {
      nombre: r.name || '', calle: a.road || '', numero: a.house_number || '',
      tipo: `${r.category}=${r.type}`, tipoPhoton: r.addresstype || '',
      ciudad: [a.city, a.town, a.village, a.county, a.state_district].filter(Boolean).join(' '),
      lat: +r.lat, lon: +r.lon, fuente: 'nominatim'
    };
  });
}

const _TIPOS_BARRIO = /^(place=(suburb|neighbourhood|quarter|city_block|hamlet|village|isolated_dwelling|locality)|boundary=administrative|landuse=residential)$/;

function _norm(t) { return normalizarTextoDomicilio(t).replace(/\b(barrio|b|bo|bº|b°|villa|vº)\b/g, ' ').replace(/\s+/g, ' ').trim(); }

function _enLocalidad(c, localidad) {
  if (!localidad) return true;
  const loc = _norm(localidad.replace(/\(.*?\)/g, ''));
  const ciu = _norm(c.ciudad);
  if (!ciu) return true;
  if (ciu.includes(loc)) return true;
  if ((loc === 'salta' || loc === 'salta capital' || loc === 'capital') && /\b(salta|capital)\b/.test(ciu)) return true;
  return false;
}

// Separa el domicilio en partes útiles
function analizarDomicilio(domicilio) {
  const d = String(domicilio || '');
  const out = { barrio: null, manzana: null, lote: null, calle: null, numero: null };
  const mb = d.match(/\b(?:barrio|b[°ºo]\.?|bo\.|b\.|villa)\s*([^,]+)/i);
  if (mb) out.barrio = mb[1].replace(/\b(mza|manzana|mz|lote|lt|casa|block|monoblock|dpto|depto|calle|pasaje|psje)\b.*$/i, '').replace(/[-–]\s*$/, '').trim() || null;
  const mm = d.match(/\b(?:mza|manzana|mz)\.?\s*([0-9]+\s*["']?\s*[a-z]?)\b/i);
  if (mm) out.manzana = mm[1].replace(/["'\s]/g, '').toUpperCase();
  const ml = d.match(/\b(?:lote|lt)\.?\s*(\d+)/i);
  if (ml) out.lote = ml[1];
  // calle y número: primera parte antes de coma que tenga un número al final
  const partes = d.split(',').map(x => x.trim());
  for (const p of partes) {
    if (/\b(barrio|b[°º]|mza|manzana|lote)\b/i.test(p)) continue;
    const mc = p.match(/^(.*?[a-záéíóúñ].*?)\s+(?:n[°º]?\s*)?(\d{1,5})\s*$/i);
    if (mc) { out.calle = mc[1].replace(/^(calle|av\.?|avenida|pje\.?|pasaje)\s+/i, m => m.toLowerCase().startsWith('av') ? 'Avenida ' : ''); out.numero = mc[2]; break; }
  }
  if (!out.barrio && !out.calle) {
    // texto sin "barrio": tomar la primera parte como posible barrio
    out.barrio = partes[0].replace(/\b(mza|manzana|mz|lote|lt|casa)\b.*$/i, '').trim() || null;
  }
  return out;
}

function _zonaRelativa(lat, lon) {
  const dy = lat - CENTRO_CAPITAL.lat, dx = (lon - CENTRO_CAPITAL.lon) * Math.cos(lat * Math.PI / 180);
  const dist = Math.sqrt(dx * dx + dy * dy) * 111;
  if (dist > 25) return null;
  if (dist < 1.5) return 'zona centro';
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  if (ang >= 45 && ang < 135) return 'zona norte';
  if (ang >= -45 && ang < 45) return 'zona este';
  if (ang >= -135 && ang < -45) return 'zona sur';
  return 'zona oeste';
}

// Agrupa candidatos por jurisdicción (solo uno por jurisdicción)
function _agruparPorJurisdiccion(cands) {
  const grupos = new Map();
  for (const c of cands) {
    const r = jurisdiccionDePunto(c.lat, c.lon);
    if (!r) continue;
    if (!grupos.has(r.nombre)) grupos.set(r.nombre, { ...c, jurisdiccion: r.nombre, detalle: r, zona: _zonaRelativa(c.lat, c.lon) });
  }
  return [...grupos.values()];
}

/*
  Devuelve:
   { lat, lon, precision: 'numero'|'manzana'|'barrio'|'calle', descripcion }       ubicación única
   { opciones: [ {lat, lon, nombre, jurisdiccion, zona, precision} ... ] }          varios lugares con mismo nombre en distintas comisarías
   { lat, lon, precision: 'localidad' }                                             solo se encontró la localidad
   null
*/
async function geocodificarDomicilio(domicilio, localidad, zonaElegida) {
  if (!JURIS.cargado) { try { await cargarJurisdicciones(); } catch (e) {} }
  const loc = (localidad || '').replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const a = analizarDomicilio(domicilio);

  // 1) Calle + número (lo más preciso)
  if (a.calle && a.numero) {
    let res = await _photon(`${a.calle} ${a.numero}, ${loc}`);
    let ok = res.filter(c => c.numero === a.numero && _norm(c.calle || c.nombre).includes(_norm(a.calle).split(' ').pop()) && _enLocalidad(c, loc));
    if (!ok.length) {
      res = await _nominatim(`${a.calle} ${a.numero}, ${loc}, Salta, Argentina`);
      ok = res.filter(c => c.numero === a.numero && _enLocalidad(c, loc));
    }
    if (ok.length) {
      const grupos = _agruparPorJurisdiccion(ok);
      if (grupos.length === 1) return { lat: grupos[0].lat, lon: grupos[0].lon, precision: 'numero', descripcion: `${a.calle} ${a.numero}` };
    }
  }

  // 2) Barrio (+ manzana si la hay)
  if (a.barrio) {
    const nb = _norm(a.barrio);
    const nbClave = nb.split(' ').filter(w => w.length > 1 || /\d/.test(w));
    const coincide = c => {
      const n = _norm(c.nombre);
      return nbClave.every(w => (' ' + n + ' ').includes(' ' + w + ' ') || n.includes(w));
    };
    let res = [...await _photon(`barrio ${a.barrio} ${loc}`), ...await _photon(`${a.barrio} ${loc}`)];
    let barrios = res.filter(c => _TIPOS_BARRIO.test(c.tipo) && !/city_block/.test(c.tipo) && coincide(c) && _enLocalidad(c, loc));
    if (!barrios.length) {
      res = await _nominatim(`Barrio ${a.barrio}, ${loc}, Salta, Argentina`);
      barrios = res.filter(c => coincide(c) && _enLocalidad(c, loc) && !/^(boundary|place)=(city|town|state|county)$/.test(c.tipo));
    }
    let grupos = _agruparPorJurisdiccion(barrios);

    // Varias comisarías: si el barrio es grande puede tocar dos; si son barrios homónimos, separar por zona
    if (grupos.length > 1 && zonaElegida) {
      const z = 'zona ' + _norm(zonaElegida);
      const filtrados = grupos.filter(g => g.zona && g.zona === z);
      if (filtrados.length === 1) grupos = filtrados;
    }
    if (grupos.length > 1) {
      // si la persona puso "sur"/"norte" en el domicilio
      const t = normalizarTextoDomicilio(domicilio);
      const filtrados = grupos.filter(g => g.zona && t.includes(' ' + g.zona.split(' ')[1] + ' '));
      if (filtrados.length === 1) grupos = filtrados;
    }

    // Manzana: precisión de cuadra
    if (a.manzana && grupos.length >= 1) {
      const resM = await _photon(`${a.barrio} manzana ${a.manzana}`);
      const mz = resM.filter(c => /city_block/.test(c.tipo) && coincide({ nombre: c.nombre + ' ' + c.ciudad })
        && new RegExp('\\b(mza|manzana|mz)\\.?\\s*' + a.manzana.replace(/([A-Z])$/, '\\s*["\']?\\s*$1') + '\\b', 'i').test(c.nombre));
      const gm = _agruparPorJurisdiccion(mz);
      const gmFilt = gm.filter(g => grupos.some(x => x.jurisdiccion === g.jurisdiccion));
      if (gmFilt.length === 1) return { lat: gmFilt[0].lat, lon: gmFilt[0].lon, precision: 'manzana', descripcion: gmFilt[0].nombre };
    }

    if (grupos.length === 1) return { lat: grupos[0].lat, lon: grupos[0].lon, precision: 'barrio', descripcion: grupos[0].nombre };
    if (grupos.length > 1) return { opciones: grupos.map(g => ({ lat: g.lat, lon: g.lon, nombre: g.nombre, jurisdiccion: g.jurisdiccion, zona: g.zona })) };
  }

  // 3) Calle sola (sin número): poco preciso, se pide confirmar en el mapa
  if (a.calle) {
    const res = (await _photon(`${a.calle}, ${loc}`)).filter(c => /^highway=/.test(c.tipo) && _enLocalidad(c, loc));
    if (res.length) return { lat: res[0].lat, lon: res[0].lon, precision: 'calle', descripcion: res[0].nombre };
  }

  // 4) Solo la localidad
  const resL = (await _photon(`${loc}, Salta`)).filter(c => /^place=(city|town|village|hamlet)$/.test(c.tipo));
  if (resL.length) return { lat: resL[0].lat, lon: resL[0].lon, precision: 'localidad' };
  const resN = await _nominatim(`${loc}, Salta, Argentina`);
  if (resN.length) return { lat: resN[0].lat, lon: resN[0].lon, precision: 'localidad' };
  return null;
}
