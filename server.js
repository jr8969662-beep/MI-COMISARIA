// ============================================================
// Mi Comisaría — Servidor Backend (Node.js)
// Policía de Salta — Sistema de Trámites en Línea
// ============================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "tramites.json");

// Tipos MIME soportados para archivos estáticos
const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

// Asegurar que la carpeta de datos y el archivo JSON existan
function inicializarBaseDeDatos() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    // Datos de ejemplo iniciales para pruebas
    const tramitesIniciales = [
      {
        id: "RES-742910",
        nroTramite: "RES-742910",
        tramite: "residencia",
        titulo: "Certificado de Residencia",
        fecha: new Date(Date.now() - 3600000 * 5).toISOString(),
        estado: "PENDIENTE",
        solicitante: {
          nombre: "Mariana Soledad Flores",
          dni: "38942105",
          sexo: "Femenino",
          domicilio: "Balcarce 842",
          barrio: "Capital",
        },
        datos: {
          nombre: "Mariana Soledad Flores",
          dni: "38942105",
          sexo: "Femenino",
          domicilio: "Balcarce 842",
          barrio: "Capital",
          testigo1Nombre: "Carlos Esteban Romero",
          testigo1Dni: "34120984",
          testigo1Domicilio: "Balcarce 850",
          testigo2Nombre: "Silvia Beatriz Gomez",
          testigo2Dni: "36781200",
          testigo2Domicilio: "Alvarado 1205",
        },
        observaciones: "",
      },
      {
        id: "CON-381029",
        nroTramite: "CON-381029",
        tramite: "convivencia",
        titulo: "Certificado de Convivencia",
        fecha: new Date(Date.now() - 3600000 * 24).toISOString(),
        estado: "APROBADO",
        solicitante: {
          nombre: "Lucas Gabriel Benitez",
          dni: "35409112",
          sexo: "Masculino",
          domicilio: "Av. San Martín 2100",
          barrio: "Capital",
        },
        datos: {
          nombreSolicitante: "Lucas Gabriel Benitez",
          dniSolicitante: "35409112",
          fechaNacimientoSolicitante: "1990-06-14",
          sexoSolicitante: "Masculino",
          domicilio: "Av. San Martín 2100",
          grupoFamiliar: "2",
          familiares: [
            { nombre: "Romina Paez", dni: "37890123", vinculo: "Pareja" },
            { nombre: "Thiago Benitez", dni: "55120349", vinculo: "Hijo/a" },
          ],
        },
        observaciones: "Validado con libro de guardia policial N° 124.",
      },
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(tramitesIniciales, null, 2), "utf8");
    console.log("-> Base de datos local inicializada en data/tramites.json");
  }
}

// Lectura segura de la BD
function leerTramites() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Error al leer la base de datos:", err);
    return [];
  }
}

// Escritura segura en la BD
function guardarTramites(lista) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(lista, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error al escribir en la base de datos:", err);
    return false;
  }
}

// Helper para responder en formato JSON
function responderJSON(res, statusCode, data) {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

// Helper para extraer cuerpo JSON de peticiones POST/PATCH
function parsearBodyJSON(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) {
        // Limite de 2MB por seguridad
        req.destroy();
        reject(new Error("Cuerpo de la petición demasiado grande"));
      }
    });
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        reject(new Error("JSON no válido"));
      }
    });
    req.on("error", (err) => reject(err));
  });
}

// Manejador del servidor HTTP
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Manejo de pre-flight CORS para navegadores
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  // ============================================================
  // API REST: /api/tramites
  // ============================================================

  // 1. GET /api/estadisticas
  if (pathname === "/api/estadisticas" && method === "GET") {
    const tramites = leerTramites();
    const stats = {
      total: tramites.length,
      pendientes: tramites.filter((t) => t.estado === "PENDIENTE").length,
      aprobados: tramites.filter((t) => t.estado === "APROBADO").length,
      rechazados: tramites.filter((t) => t.estado === "RECHAZADO" || t.estado === "OBSERVADO").length,
      porTipo: {},
    };
    tramites.forEach((t) => {
      stats.porTipo[t.tramite] = (stats.porTipo[t.tramite] || 0) + 1;
    });
    return responderJSON(res, 200, { ok: true, stats });
  }

  // 2. GET /api/tramites (con filtros opcionales: ?q=...&dni=...&estado=...&tipo=...)
  if (pathname === "/api/tramites" && method === "GET") {
    let lista = leerTramites();
    const { q, dni, estado, tipo } = parsedUrl.query;

    if (dni) {
      const dniLimpio = String(dni).trim();
      lista = lista.filter((t) => String(t.solicitante?.dni || "").includes(dniLimpio));
    }
    if (estado && estado !== "TODOS") {
      lista = lista.filter((t) => String(t.estado).toUpperCase() === estado.toUpperCase());
    }
    if (tipo && tipo !== "TODOS") {
      lista = lista.filter((t) => t.tramite === tipo);
    }
    if (q) {
      const term = String(q).toLowerCase().trim();
      lista = lista.filter(
        (t) =>
          (t.nroTramite && t.nroTramite.toLowerCase().includes(term)) ||
          (t.solicitante?.nombre && t.solicitante.nombre.toLowerCase().includes(term)) ||
          (t.solicitante?.dni && t.solicitante.dni.includes(term)) ||
          (t.titulo && t.titulo.toLowerCase().includes(term))
      );
    }

    // Ordenar de más reciente a más antiguo
    lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return responderJSON(res, 200, { ok: true, total: lista.length, tramites: lista });
  }

  // 3. GET /api/tramites/:id (Consulta por número de trámite o ID)
  if (pathname.startsWith("/api/tramites/") && method === "GET") {
    const id = decodeURIComponent(pathname.replace("/api/tramites/", "")).trim();
    const lista = leerTramites();
    const encontrado = lista.find(
      (t) => t.id === id || t.nroTramite?.toLowerCase() === id.toLowerCase() || t.solicitante?.dni === id
    );

    if (!encontrado) {
      return responderJSON(res, 404, { ok: false, mensaje: "Trámite no encontrado" });
    }
    return responderJSON(res, 200, { ok: true, tramite: encontrado });
  }

  // 4. POST /api/tramites (Registrar nuevo trámite)
  if (pathname === "/api/tramites" && method === "POST") {
    try {
      const payload = await parsearBodyJSON(req);
      const { tramite, datos, nroTramite, titulo } = payload;

      if (!tramite || !datos) {
        return responderJSON(res, 400, {
          ok: false,
          mensaje: "Faltan datos obligatorios (tramite, datos)",
        });
      }

      const lista = leerTramites();

      // Determinar datos principales del solicitante para búsquedas rápidas
      const solicitante = {
        nombre: datos.nombre || datos.nombreSolicitante || datos.autorizanteNombre || datos.carenteNombre || "No especificado",
        dni: datos.dni || datos.dniSolicitante || datos.autorizanteDni || datos.carenteDni || "",
        sexo: datos.sexo || datos.sexoSolicitante || "",
        domicilio: datos.domicilio || datos.autorizanteDomicilio || "",
        barrio: datos.barrio || "",
      };

      const codigoTramite = nroTramite || `TRM-${Date.now().toString().slice(-6)}`;

      const nuevoRegistro = {
        id: codigoTramite,
        nroTramite: codigoTramite,
        tramite,
        titulo: titulo || obtenerTituloTramite(tramite),
        fecha: new Date().toISOString(),
        estado: "PENDIENTE",
        solicitante,
        datos,
        observaciones: "",
      };

      lista.unshift(nuevoRegistro);
      guardarTramites(lista);

      console.log(`[+] Nuevo trámite guardado: ${nuevoRegistro.nroTramite} (${nuevoRegistro.titulo}) para DNI ${solicitante.dni}`);

      return responderJSON(res, 201, {
        ok: true,
        mensaje: "Trámite registrado con éxito en la Comisaría",
        nroTramite: nuevoRegistro.nroTramite,
        tramite: nuevoRegistro,
      });
    } catch (err) {
      console.error("Error al procesar POST /api/tramites:", err);
      return responderJSON(res, 500, { ok: false, mensaje: err.message || "Error interno del servidor" });
    }
  }

  // 5. PATCH /api/tramites/:id (Actualizar estado u observaciones)
  if (pathname.startsWith("/api/tramites/") && (method === "PATCH" || method === "PUT")) {
    try {
      const id = decodeURIComponent(pathname.replace("/api/tramites/", "")).trim();
      const payload = await parsearBodyJSON(req);
      const { estado, observaciones } = payload;

      const lista = leerTramites();
      const indice = lista.findIndex((t) => t.id === id || t.nroTramite?.toLowerCase() === id.toLowerCase());

      if (indice === -1) {
        return responderJSON(res, 404, { ok: false, mensaje: "Trámite no encontrado" });
      }

      if (estado) {
        lista[indice].estado = String(estado).toUpperCase();
      }
      if (typeof observaciones === "string") {
        lista[indice].observaciones = observaciones;
      }
      lista[indice].fechaActualizacion = new Date().toISOString();

      guardarTramites(lista);
      console.log(`[*] Trámite ${id} actualizado a estado: ${lista[indice].estado}`);

      return responderJSON(res, 200, {
        ok: true,
        mensaje: "Trámite actualizado correctamente",
        tramite: lista[indice],
      });
    } catch (err) {
      return responderJSON(res, 500, { ok: false, mensaje: err.message || "Error al actualizar trámite" });
    }
  }

  // ============================================================
  // Servidor de archivos estáticos
  // ============================================================
  let rutaRelativa = decodeURIComponent(parsedUrl.pathname || "");
  if (rutaRelativa === "/" || rutaRelativa === "") {
    rutaRelativa = "/index.html";
  }

  const rutaArchivo = path.normalize(path.join(__dirname, rutaRelativa));

  // Seguridad: evitar directory traversal fuera del directorio del proyecto (case-insensitive en Windows)
  if (!rutaArchivo.toLowerCase().startsWith(__dirname.toLowerCase())) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=UTF-8" });
    return res.end("403 Acceso denegado");
  }

  fs.stat(rutaArchivo, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
      return res.end("<h1>404 Recurso no encontrado</h1><p>Mi Comisaría — Policía de Salta</p>");
    }

    const ext = path.extname(rutaArchivo).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });

    const stream = fs.createReadStream(rutaArchivo);
    stream.pipe(res);
  });
});

function obtenerTituloTramite(tipo) {
  const nombres = {
    residencia: "Certificado de Residencia",
    convivencia: "Certificado de Convivencia",
    carencia: "Certificado de Carencia de Recursos",
    autorizacion: "Certificado de Autorización",
  };
  return nombres[tipo] || "Trámite Policial";
}

// Inicializar DB e iniciar servidor
inicializarBaseDeDatos();

function iniciarEscucha(puerto) {
  server.listen(puerto, () => {
    console.log("=================================================");
    console.log("  POLICIA DE SALTA — SISTEMA MI COMISARIA");
    console.log(`  Servidor backend iniciado con exito`);
    console.log(`  URL Principal:   http://localhost:${puerto}`);
    console.log(`  Panel Comisaria: http://localhost:${puerto}/admin.html`);
    console.log(`  API REST:        http://localhost:${puerto}/api/tramites`);
    console.log("=================================================");
  });
}

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`[!] El puerto ${PORT} esta ocupado. Intentando en puerto ${Number(PORT) + 1}...`);
    iniciarEscucha(Number(PORT) + 1);
  } else {
    console.error("Error en el servidor:", err);
  }
});

iniciarEscucha(PORT);
