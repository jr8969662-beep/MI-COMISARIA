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
// "excluirSi": si el domicilio o la zona elegida contiene alguna de esas palabras,
// no se usa la regla (ej. Juan Pablo II Sur es otro barrio).
const BARRIOS_CONFIRMADOS = [
  {
    claves: ['juan pablo 2'],
    jurisdiccion: 'DUR1-S3-Cría 11° (Ex-cria 103)',
    excluirSi: ['sur'],
    nota: 'Juan Pablo II (zona norte) - confirmado por el usuario: Comisaría 17 de Octubre'
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
  JURIS.promesa = fetch('jurisdicciones.json')
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
      return regla;
    }
  }
  return null;
}

// ====== GEOCODIFICACIÓN ======
async function _nominatim(q) {
  const v = SALTA_VIEWBOX;
  const url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=ar&addressdetails=1'
    + `&viewbox=${v.oeste},${v.norte},${v.este},${v.sur}&bounded=1&q=${encodeURIComponent(q)}`;
  try {
    const r = await fetch(url, { headers: { 'Accept-Language': 'es' } });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) { console.warn('Nominatim falló', e); return []; }
}

function _localidadCoincide(res, localidad) {
  if (!localidad) return true;
  const loc = normalizarTextoDomicilio(localidad.replace(/\(.*?\)/g, '')).trim();
  const texto = normalizarTextoDomicilio(res.display_name || '');
  return texto.includes(' ' + loc + ' ') || (loc === 'salta' && texto.includes(' capital '));
}

/*
  Devuelve { lat, lon, precision: 'calle'|'barrio'|'localidad', direccion } o null.
  precision 'localidad' = solo se encontró el pueblo/ciudad -> NO sirve para asignar.
*/
async function geocodificarDomicilio(domicilio, localidad) {
  const loc = (localidad || '').replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const intentos = [];
  const base = domicilio.trim();
  intentos.push({ q: `${base}, ${loc}, Salta, Argentina`, precision: 'calle' });
  const romano = base.replace(/\b(\d{1,2})\b/g, n => ({1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X'})[n] || n);
  if (romano !== base) intentos.push({ q: `${romano}, ${loc}, Salta, Argentina`, precision: 'calle' });

  const mb = base.match(/\b(?:barrio|b[°º]|b\.|bo\.?)\s*([^,]+)/i);
  if (mb) {
    let nb = mb[1].replace(/\b(mza|manzana|mz|lote|lt|casa|block|dpto|depto)\b.*$/i, '').trim();
    if (nb) {
      intentos.push({ q: `Barrio ${nb}, ${loc}, Salta, Argentina`, precision: 'barrio' });
      intentos.push({ q: `${nb}, ${loc}, Salta, Argentina`, precision: 'barrio' });
      const nbR = nb.replace(/\b(\d{1,2})\b/g, n => ({1:'I',2:'II',3:'III',4:'IV',5:'V'})[n] || n);
      if (nbR !== nb) intentos.push({ q: `Barrio ${nbR}, ${loc}, Salta, Argentina`, precision: 'barrio' });
    }
  }
  for (const it of intentos) {
    const res = await _nominatim(it.q);
    // descartar resultados que son solo la ciudad / provincia
    const util = res.filter(r => !['city', 'town', 'administrative', 'state', 'county', 'village', 'municipality'].includes(r.addresstype || r.type));
    const enLoc = util.find(r => _localidadCoincide(r, localidad)) || null;
    if (enLoc) return { lat: +enLoc.lat, lon: +enLoc.lon, precision: it.precision, direccion: enLoc.display_name };
  }
  const soloLoc = await _nominatim(`${loc}, Salta, Argentina`);
  if (soloLoc.length) return { lat: +soloLoc[0].lat, lon: +soloLoc[0].lon, precision: 'localidad', direccion: soloLoc[0].display_name };
  return null;
}
