// ============================================================
// Panel de Oficial de Guardia — Lógica de Administración
// Policía de Salta — Mi Comisaría
// ============================================================

let tramitesCache = [];
let tramiteSeleccionado = null;

const tablaBody = document.getElementById("tabla-tramites-body");
const inputBusqueda = document.getElementById("input-busqueda");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroEstado = document.getElementById("filtro-estado");
const btnRefrescar = document.getElementById("btn-refrescar");

// KPIs
const kpiTotal = document.getElementById("kpi-total");
const kpiPendientes = document.getElementById("kpi-pendientes");
const kpiAprobados = document.getElementById("kpi-aprobados");
const kpiRechazados = document.getElementById("kpi-rechazados");

// Modal
const modalDetalle = document.getElementById("modal-detalle");
const modalBtnCerrar = document.getElementById("modal-btn-cerrar");
const modalBtnCancelar = document.getElementById("modal-btn-cancelar");
const modalBtnGuardar = document.getElementById("modal-btn-guardar");
const modalTitulo = document.getElementById("modal-titulo");
const modalSubtitulo = document.getElementById("modal-subtitulo");
const modalBadgeTipo = document.getElementById("modal-badge-tipo");
const modalCuerpo = document.getElementById("modal-cuerpo-detalle");
const modalSelectEstado = document.getElementById("modal-select-estado");
const modalInputObservaciones = document.getElementById("modal-input-observaciones");
const statusBanner = document.getElementById("admin-status-banner");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  // Event Listeners
  btnRefrescar.addEventListener("click", cargarDatos);
  inputBusqueda.addEventListener("input", filtrarYRenderizar);
  filtroTipo.addEventListener("change", filtrarYRenderizar);
  filtroEstado.addEventListener("change", filtrarYRenderizar);

  modalBtnCerrar.addEventListener("click", cerrarModal);
  modalBtnCancelar.addEventListener("click", cerrarModal);
  modalDetalle.addEventListener("click", (e) => {
    if (e.target === modalDetalle) cerrarModal();
  });
  modalBtnGuardar.addEventListener("click", guardarResolucion);
});

// Cargar trámites y estadísticas desde la API
async function cargarDatos() {
  mostrarBanner("", false);
  tablaBody.innerHTML = `<tr><td colspan="7" class="td-empty">Consultando servidor de la Policía...</td></tr>`;

  try {
    const [resTramites, resStats] = await Promise.all([
      fetch("/api/tramites"),
      fetch("/api/estadisticas"),
    ]);

    if (!resTramites.ok) throw new Error("Error al obtener trámites de la API");

    const dataTramites = await resTramites.json();
    tramitesCache = dataTramites.tramites || [];

    if (resStats.ok) {
      const dataStats = await resStats.json();
      actualizarKPIs(dataStats.stats);
    } else {
      calcularKPIsLocales(tramitesCache);
    }

    filtrarYRenderizar();
  } catch (error) {
    console.error("Error al cargar datos:", error);
    mostrarBanner(
      "⚠️ No se pudo conectar con el servidor backend. Asegurate de que el comando 'node server.js' esté en ejecución.",
      true
    );

    // Si hay datos en localStorage del navegador, mostrarlos como respaldo
    const local = JSON.parse(localStorage.getItem("tramites_enviados") || "[]");
    if (local.length > 0) {
      tramitesCache = local.map((item, index) => ({
        id: item.nroTramite || `LOC-${index}`,
        nroTramite: item.nroTramite || `LOC-${index}`,
        tramite: item.tramite,
        titulo: item.titulo || item.tramite,
        fecha: item.fecha,
        estado: "PENDIENTE",
        solicitante: {
          nombre: item.datos?.nombre || item.datos?.nombreSolicitante || "Solicitante",
          dni: item.datos?.dni || item.datos?.dniSolicitante || "-",
        },
        datos: item.datos,
        observaciones: "Guardado en caché local (offline)",
      }));
      calcularKPIsLocales(tramitesCache);
      filtrarYRenderizar();
    } else {
      tablaBody.innerHTML = `<tr><td colspan="7" class="td-empty">No se pudo contactar al servidor y no hay trámites locales.</td></tr>`;
    }
  }
}

function actualizarKPIs(stats) {
  kpiTotal.textContent = stats.total || 0;
  kpiPendientes.textContent = stats.pendientes || 0;
  kpiAprobados.textContent = stats.aprobados || 0;
  kpiRechazados.textContent = stats.rechazados || 0;
}

function calcularKPIsLocales(lista) {
  const total = lista.length;
  const pendientes = lista.filter((t) => t.estado === "PENDIENTE").length;
  const aprobados = lista.filter((t) => t.estado === "APROBADO").length;
  const rechazados = lista.filter((t) => t.estado === "RECHAZADO" || t.estado === "OBSERVADO").length;
  actualizarKPIs({ total, pendientes, aprobados, rechazados });
}

// Filtrar en memoria y renderizar tabla
function filtrarYRenderizar() {
  const query = inputBusqueda.value.toLowerCase().trim();
  const tipo = filtroTipo.value;
  const estado = filtroEstado.value;

  const filtrados = tramitesCache.filter((t) => {
    // Filtro tipo
    if (tipo !== "TODOS" && t.tramite !== tipo) return false;

    // Filtro estado
    if (estado !== "TODOS" && (t.estado || "PENDIENTE").toUpperCase() !== estado.toUpperCase()) return false;

    // Búsqueda libre
    if (query) {
      const matchNro = t.nroTramite && t.nroTramite.toLowerCase().includes(query);
      const matchNombre = t.solicitante?.nombre && t.solicitante.nombre.toLowerCase().includes(query);
      const matchDni = t.solicitante?.dni && t.solicitante.dni.includes(query);
      const matchTitulo = t.titulo && t.titulo.toLowerCase().includes(query);
      if (!matchNro && !matchNombre && !matchDni && !matchTitulo) return false;
    }

    return true;
  });

  renderizarTabla(filtrados);
}

function renderizarTabla(lista) {
  if (lista.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="7" class="td-empty">No se encontraron trámites con los criterios seleccionados.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = lista
    .map((t) => {
      const estadoClass = {
        PENDIENTE: "badge-pendiente",
        APROBADO: "badge-aprobado",
        OBSERVADO: "badge-observado",
        RECHAZADO: "badge-rechazado",
      }[t.estado] || "badge-pendiente";

      const fechaStr = formatFechaHora(t.fecha);

      return `
        <tr>
          <td><strong class="tramite-badge">${t.nroTramite || t.id}</strong></td>
          <td>${fechaStr}</td>
          <td>${t.titulo || t.tramite}</td>
          <td><strong>${t.solicitante?.nombre || "No especificado"}</strong></td>
          <td>${t.solicitante?.dni || "-"}</td>
          <td><span class="badge ${estadoClass}">${t.estado || "PENDIENTE"}</span></td>
          <td>
            <button class="btn-action" onclick="abrirModalDetalle('${t.id || t.nroTramite}')">
              Ver detalle
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// Abrir modal con detalle completo
window.abrirModalDetalle = function (id) {
  const tramite = tramitesCache.find((t) => t.id === id || t.nroTramite === id);
  if (!tramite) return;

  tramiteSeleccionado = tramite;
  modalBadgeTipo.textContent = tramite.nroTramite || tramite.id;
  modalTitulo.textContent = tramite.titulo || "Certificado Policial";
  modalSubtitulo.textContent = `Registrado el ${formatFechaHora(tramite.fecha)}`;

  modalSelectEstado.value = tramite.estado || "PENDIENTE";
  modalInputObservaciones.value = tramite.observaciones || "";

  // Renderizar campos del trámite
  let html = `
    <div class="detail-section">
      <h4>Datos del Solicitante</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Nombre y Apellido</span>
          <span class="detail-value">${tramite.solicitante?.nombre || "-"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">DNI</span>
          <span class="detail-value">${tramite.solicitante?.dni || "-"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Domicilio</span>
          <span class="detail-value">${tramite.solicitante?.domicilio || tramite.datos?.domicilio || "-"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Localidad / Barrio</span>
          <span class="detail-value">${tramite.solicitante?.barrio || tramite.datos?.barrio || "Salta Capital"}</span>
        </div>
      </div>
    </div>
  `;

  // Secciones específicas según el tipo de trámite
  if (tramite.tramite === "residencia") {
    html += `
      <div class="detail-section">
        <h4>Testigos Declarados</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Testigo 1</span>
            <span class="detail-value">${tramite.datos?.testigo1Nombre || "-"} (DNI ${tramite.datos?.testigo1Dni || "-"})</span>
            <small style="color: var(--muted);">${tramite.datos?.testigo1Domicilio || ""}</small>
          </div>
          <div class="detail-item">
            <span class="detail-label">Testigo 2</span>
            <span class="detail-value">${tramite.datos?.testigo2Nombre || "-"} (DNI ${tramite.datos?.testigo2Dni || "-"})</span>
            <small style="color: var(--muted);">${tramite.datos?.testigo2Domicilio || ""}</small>
          </div>
        </div>
      </div>
    `;
  } else if (tramite.tramite === "convivencia" && Array.isArray(tramite.datos?.familiares)) {
    html += `
      <div class="detail-section">
        <h4>Grupo Familiar Conviviente (${tramite.datos.familiares.length} personas)</h4>
        <div class="detail-grid">
          ${tramite.datos.familiares
            .map(
              (fam, i) => `
            <div class="detail-item">
              <span class="detail-label">Conviviente ${i + 1} (${fam.vinculo})</span>
              <span class="detail-value">${fam.nombre} — DNI ${fam.dni}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  } else if (tramite.tramite === "autorizacion") {
    html += `
      <div class="detail-section">
        <h4>Persona Autorizada y Destino</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Autorizado/a</span>
            <span class="detail-value">${tramite.datos?.autorizadoNombre || "-"} (DNI ${tramite.datos?.autorizadoDni || "-"})</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Parentesco / Edad</span>
            <span class="detail-value">${tramite.datos?.parentesco || "-"} (${tramite.datos?.autorizadoEdad || "-"} años)</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Destino</span>
            <span class="detail-value">${tramite.datos?.destino || "-"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Empresa Transporte</span>
            <span class="detail-value">${tramite.datos?.empresa || "-"}</span>
          </div>
        </div>
      </div>
    `;
  }

  modalCuerpo.innerHTML = html;
  modalDetalle.classList.remove("hidden");
};

function cerrarModal() {
  modalDetalle.classList.add("hidden");
  tramiteSeleccionado = null;
}

// Guardar cambio de estado en la API
async function guardarResolucion() {
  if (!tramiteSeleccionado) return;

  const nuevoEstado = modalSelectEstado.value;
  const nuevasObs = modalInputObservaciones.value.trim();
  const id = tramiteSeleccionado.id || tramiteSeleccionado.nroTramite;

  modalBtnGuardar.disabled = true;
  modalBtnGuardar.textContent = "Guardando...";

  try {
    const res = await fetch(`/api/tramites/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estado: nuevoEstado,
        observaciones: nuevasObs,
      }),
    });

    if (!res.ok) throw new Error("Error en el servidor");

    const data = await res.json();
    console.log("Resolución guardada:", data);

    // Actualizar cache local
    tramiteSeleccionado.estado = nuevoEstado;
    tramiteSeleccionado.observaciones = nuevasObs;

    cerrarModal();
    cargarDatos(); // Recargar KPIs y vista
  } catch (error) {
    console.error("Error al guardar resolución:", error);
    alert("No se pudo guardar la resolución en el servidor: " + error.message);
  } finally {
    modalBtnGuardar.disabled = false;
    modalBtnGuardar.textContent = "Guardar resolución";
  }
}

function formatFechaHora(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mostrarBanner(mensaje, visible) {
  if (!visible) {
    statusBanner.classList.add("hidden");
    statusBanner.textContent = "";
    return;
  }
  statusBanner.textContent = mensaje;
  statusBanner.className = "status-banner error";
  statusBanner.classList.remove("hidden");
}
