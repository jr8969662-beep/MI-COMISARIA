// ============================================================
// Mi Comisaría — lógica de la aplicación
// ============================================================

// Configuración de cada trámite: título, subtítulo, campos del
// formulario y texto que se usará en el cuerpo del certificado PDF.
const TRAMITES = {
  residencia: {
    titulo: "Certificado de Residencia",
    subtitulo: "Completá tus datos para solicitar el certificado que acredita tu domicilio actual.",
    campos: [
      { id: "nombre", label: "Nombre y apellido", type: "text", required: true },
      { id: "dni", label: "DNI", type: "text", required: true },
      { id: "sexo", label: "Sexo", type: "select", options: ["Femenino", "Masculino", "Otro / Prefiero no especificar"], required: true },
      { id: "domicilio", label: "Domicilio actual", type: "text", required: true },
      {
        id: "barrio",
        label: "Localidad",
        type: "select",
        options: [
          "Anta",
          "Cachi",
          "Cafayate",
          "Capital",
          "Cerrillos",
          "Chicoana",
          "General Güemes",
          "General José de San Martín",
          "Guachipas",
          "Iruya",
          "La Caldera",
          "La Candelaria",
          "La Viña",
          "Los Andes",
          "Metán",
          "Molinos",
          "Orán",
          "Rivadavia",
          "Rosario de la Frontera",
          "Rosario de Lerma",
          "San Carlos",
          "Santa Victoria",
        ],
        required: true,
      },
      { id: "testigo1Nombre", label: "Nombre y apellido del testigo 1", type: "text", required: true },
      { id: "testigo1Dni", label: "DNI del testigo 1", type: "text", required: true },
      { id: "testigo1Domicilio", label: "Domicilio del testigo 1", type: "text", required: true },
      { id: "testigo2Nombre", label: "Nombre y apellido del testigo 2", type: "text", required: true },
      { id: "testigo2Dni", label: "DNI del testigo 2", type: "text", required: true },
      { id: "testigo2Domicilio", label: "Domicilio del testigo 2", type: "text", required: true },
    ],
    cuerpo: (d) => [
      `El Funcionario Policial que suscribe CERTIFICA de acuerdo a los testimonios de los Sres. Testigos: `,
      `${d.testigo1Nombre} DNI Nº ${d.testigo1Dni} con dlio. ${d.testigo1Domicilio} y de `,
      `${d.testigo2Nombre} DNI Nº ${d.testigo2Dni} con dlio. en ${d.testigo2Domicilio}, `,
      `ambos del Barrio ${d.barrio} de la Ciudad de Salta Capital, a quienes les consta que la persona de `,
      `${d.nombre} DNI Nº ${d.dni}, argentina mayor de edad, RESIDE: En el domicilio sito en `,
      `${d.domicilio} barrio ${d.barrio} Salta Capital. Se extiende el presente a solicitud de la parte interesada `,
      `con el solo objeto de ser presentado por ante las Autoridades del COLEGIO SAN CAYETANO Nº 8093 VAQUEROS. `,
      `Dado en Comisaria Nº 1 – Barrio Centro (DDP-1), a los ${formatFechaLargaHoy()}.`,
    ].join(""),
  },

  convivencia: {
    titulo: "Certificado de Convivencia",
    subtitulo: "Completá primero los datos del solicitante y luego la cantidad de integrantes de su grupo familiar.",
    campos: [
      { id: "nombreSolicitante", label: "Nombre y apellido completo del solicitante", type: "text", required: true },
      { id: "dniSolicitante", label: "DNI del solicitante", type: "text", required: true },
      { id: "fechaNacimientoSolicitante", label: "Fecha de nacimiento", type: "date", required: true },
      { id: "sexoSolicitante", label: "Sexo", type: "select", options: ["Femenino", "Masculino", "Otro / Prefiero no especificar"], required: true },
      { id: "domicilio", label: "Domicilio en común", type: "text", required: true },
      { id: "grupoFamiliar", label: "Cantidad de personas que conviven con el solicitante", type: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], required: true },
    ],
    cuerpo: (d) => [
      `Se deja constancia que ${d.nombreSolicitante}, DNI N° ${d.dniSolicitante}, nacido/a el ${formatFecha(d.fechaNacimientoSolicitante)}, `,
      `sexo ${d.sexoSolicitante.toLowerCase()}, y su grupo familiar integrado por ${d.familiaresTexto || "el/la solicitante"}, `,
      `conviven en el domicilio sito en ${d.domicilio}.`,
    ].join(""),
  },

  autorizacion: {
    titulo: "Certificado de Autorización",
    subtitulo: "Completá los datos de la persona que autoriza y de la persona autorizada.",
    campos: [
      { id: "autorizanteNombre", label: "Nombre y apellido del autorizante", type: "text", required: true },
      { id: "autorizanteDni", label: "DNI del autorizante", type: "text", required: true },
      {
        id: "parentesco",
        label: "Parentesco con el autorizante",
        type: "select",
        options: ["Cónyuge", "Pareja", "Hijo/a", "Madre/Padre", "Hermano/a", "Abuelo/a", "Nieto/a", "Otro", "Sin parentesco"],
        required: true,
      },
      { id: "autorizanteDomicilio", label: "Domicilio del autorizante", type: "text", required: true },
      { id: "autorizadoNombre", label: "Nombre y apellido de la persona autorizada", type: "text", required: true },
      { id: "autorizadoDni", label: "DNI del hijo/a autorizado/a", type: "text", required: true },
      { id: "autorizadoEdad", label: "Edad", type: "number", required: true },
      {
        id: "destino",
        label: "Localidad de destino",
        type: "select",
        options: [
          "Anta",
          "Cachi",
          "Cafayate",
          "Capital",
          "Cerrillos",
          "Chicoana",
          "General Güemes",
          "General José de San Martín",
          "Guachipas",
          "Iruya",
          "La Caldera",
          "La Candelaria",
          "La Viña",
          "Los Andes",
          "Metán",
          "Molinos",
          "Orán",
          "Rivadavia",
          "Rosario de la Frontera",
          "Rosario de Lerma",
          "San Carlos",
          "Santa Victoria",
        ],
        required: true,
      },
      { id: "fechaIda", label: "Fecha de ida", type: "date", required: true },
      {
        id: "empresa",
        label: "Empresa de transporte",
        type: "select",
        options: [
          "La Veloz del Norte",
          "Flecha Bus",
          "Balut",
          "Andesmar",
          "Almirante Brown",
          "Pullman Bus",
          "Otra empresa",
        ],
        required: true,
      },
      { id: "viajaSolo", label: "Modalidad del viaje", type: "select", options: ["Viaja solo/a", "Viaja acompañado/a"], required: true },
      { id: "fechaRegreso", label: "Fecha de regreso", type: "date", required: true },
    ],
    cuerpo: (d) => [
      `La que suscribe ${d.autorizanteNombre} DNI N° ${d.autorizanteDni} con domicilio en ${d.autorizanteDomicilio}, `,
      `AUTORIZO a mi ${d.parentesco.toLowerCase()} ${d.autorizadoNombre} DNI N° ${d.autorizadoDni} de ${d.autorizadoEdad} años `,
      `a viajar a la localidad de ${d.destino}, en fecha ${formatFecha(d.fechaIda)} en colectivo perteneciente a la empresa ${d.empresa}, `,
      `el mismo se trasladaría ${d.viajaSolo.toLowerCase()} y retornaría de la misma manera en fecha ${formatFecha(d.fechaRegreso)} a esta ciudad.`,
    ].join(""),
  },

  carencia: {
    titulo: "Certificado de Carencia de Recursos",
    subtitulo: "Completá tus datos para solicitar el certificado de carencia de recursos.",
    campos: [
      { id: "nombre", label: "Nombre y apellido", type: "text", required: true },
      { id: "dni", label: "DNI", type: "text", required: true },
      { id: "edad", label: "Edad", type: "number", required: true },
      { id: "domicilio", label: "Domicilio", type: "text", required: true },
      {
        id: "barrio",
        label: "Localidad",
        type: "select",
        options: [
          "Anta",
          "Cachi",
          "Cafayate",
          "Capital",
          "Cerrillos",
          "Chicoana",
          "General Güemes",
          "General José de San Martín",
          "Guachipas",
          "Iruya",
          "La Caldera",
          "La Candelaria",
          "La Viña",
          "Los Andes",
          "Metán",
          "Molinos",
          "Orán",
          "Rivadavia",
          "Rosario de la Frontera",
          "Rosario de Lerma",
          "San Carlos",
          "Santa Victoria",
        ],
        required: true,
      },
      { id: "testigo1Nombre", label: "Nombre y apellido del testigo 1", type: "text", required: true },
      { id: "testigo1Edad", label: "Edad del testigo 1", type: "number", required: true },
      { id: "testigo1Dni", label: "DNI del testigo 1", type: "text", required: true },
      { id: "testigo1Domicilio", label: "Domicilio del testigo 1", type: "text", required: true },
      { id: "testigo2Nombre", label: "Nombre y apellido del testigo 2", type: "text", required: true },
      { id: "testigo2Edad", label: "Edad del testigo 2", type: "number", required: true },
      { id: "testigo2Dni", label: "DNI del testigo 2", type: "text", required: true },
      { id: "testigo2Domicilio", label: "Domicilio del testigo 2", type: "text", required: true },
      {
        id: "situacion",
        label: "Situación laboral",
        type: "select",
        options: [
          "Desempleado/a",
          "Changas / trabajo informal",
          "Trabajo informal parcial",
          "Trabajo registrado en relación de dependencia",
          "Monotributista / trabajador independiente",
          "Jubilado/a",
          "Pensionado/a",
          "Estudiante",
          "Tareas del hogar",
          "Licencia laboral",
          "Sin actividad laboral actualmente",
          "Otra situación",
        ],
        required: true,
      },
      { id: "motivo", label: "Motivo de la solicitud", type: "textarea", required: true },
      { id: "telefono", label: "Teléfono de contacto", type: "tel", required: true },
      { id: "email", label: "Correo electrónico", type: "email", required: true },
    ],
    cuerpo: (d) => [
      `El Funcionario Policial que suscribe Certifica que de acuerdo a los testimonios brindados por los testigos Sres. `,
      `${d.testigo1Nombre} (${d.testigo1Edad}) DNI Nº ${d.testigo1Dni}, Dlio. ${d.testigo1Domicilio} y `,
      `${d.testigo2Nombre} (${d.testigo2Edad}), DNI Nº ${d.testigo2Dni}, Dlio. ${d.testigo2Domicilio}. `,
      `Declaran Bajo Juramento de Ley que saben y les consta que la Sra. ${d.nombre} (${d.edad}), DNI Nº ${d.dni}, `,
      `Dlio. ${d.domicilio} de ${d.barrio}, esta Ciudad, ES CARENTE DE RECURSOS ECONOMICOS. `,
      `Se extiende el presente certificado a solicitud de la parte interesada y al solo efecto de ser presentado `,
      `por ante las Autoridades del REGISTRO CIVIL.`,
    ].join(""),
  },
};

// ------------------------------------------------------------
// Referencias a elementos
// ------------------------------------------------------------
const viewHome = document.getElementById("view-home");
const viewForm = document.getElementById("view-form");
const viewDone = document.getElementById("view-done");
const viewAdmin = document.getElementById("view-admin");

const btnToggleAdmin = document.getElementById("btn-toggle-admin");
const btnVolverCiudadano = document.getElementById("btn-volver-ciudadano");

const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");
const formFields = document.getElementById("form-fields");
const tramiteForm = document.getElementById("tramite-form");
const scannerModal = document.getElementById("scanner-modal");
const scannerVideo = document.getElementById("scanner-video");
const scannerStatus = document.getElementById("scanner-status");
const scannerStart = document.getElementById("scanner-start");
const scannerClose = document.getElementById("scanner-close");

let tramiteActual = null;
let scannerStream = null;
let scannerTimer = null;
let scannerReading = false;
let scannerTarget = null;

// ------------------------------------------------------------
// Navegación entre vistas
// ------------------------------------------------------------
function mostrarVista(vista) {
  [viewHome, viewForm, viewDone, viewAdmin].forEach((v) => v && v.classList.add("hidden"));
  if (vista) vista.classList.remove("hidden");
  if (btnToggleAdmin) {
    btnToggleAdmin.textContent = vista === viewAdmin ? "🏠 Inicio Ciudadano" : "👮 Panel Comisaría";
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    tramiteActual = card.dataset.tramite;
    renderFormulario(tramiteActual);
    mostrarVista(viewForm);
  });
});

document.getElementById("btn-back").addEventListener("click", () => {
  mostrarVista(viewHome);
});

document.getElementById("btn-new").addEventListener("click", () => {
  mostrarVista(viewHome);
});

if (btnToggleAdmin) {
  btnToggleAdmin.addEventListener("click", () => {
    if (viewAdmin && !viewAdmin.classList.contains("hidden")) {
      mostrarVista(viewHome);
    } else {
      mostrarVista(viewAdmin);
      cargarDatosAdmin();
    }
  });
}

if (btnVolverCiudadano) {
  btnVolverCiudadano.addEventListener("click", () => {
    mostrarVista(viewHome);
  });
}

// ------------------------------------------------------------
// Render dinámico del formulario según el trámite elegido
// ------------------------------------------------------------
function renderFormulario(tramiteKey) {
  const tramite = TRAMITES[tramiteKey];
  formTitle.textContent = tramite.titulo;
  formSubtitle.textContent = tramite.subtitulo;
  formFields.innerHTML = "";

  tramite.campos.forEach((campo) => {
    if (campo.id === "testigo1Nombre" || campo.id === "testigo2Nombre") {
      const witnessTitle = document.createElement("h3");
      witnessTitle.className = "witness-title";
      witnessTitle.textContent = campo.id === "testigo1Nombre" ? "Testigo 1" : "Testigo 2";
      formFields.appendChild(witnessTitle);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "field";
    if (campo.id === "testigo1Nombre") wrapper.classList.add("witness-start");

    const label = document.createElement("label");
    label.setAttribute("for", campo.id);
    label.textContent = campo.label;
    wrapper.appendChild(label);

    let input;
    if (campo.type === "select") {
      input = document.createElement("select");
      const emptyOpt = document.createElement("option");
      emptyOpt.value = "";
      emptyOpt.textContent = "Seleccionar...";
      input.appendChild(emptyOpt);
      campo.options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else if (campo.type === "textarea") {
      input = document.createElement("textarea");
    } else {
      input = document.createElement("input");
      input.type = campo.type;
    }

    input.id = campo.id;
    input.name = campo.id;
    if (campo.type === "email") {
      input.autocomplete = "email";
      input.inputMode = "email";
      input.spellcheck = false;
    }
    if (campo.required) input.required = true;

    if (campo.id.endsWith("Dni") || campo.id === "dni") {
      const inputRow = document.createElement("div");
      inputRow.className = "input-scan-row";
      inputRow.appendChild(input);

      const scanButton = document.createElement("button");
      scanButton.type = "button";
      scanButton.className = "btn-scan";
      scanButton.textContent = "Escanear DNI";
      scanButton.addEventListener("click", () => abrirScanner(campo.id));
      inputRow.appendChild(scanButton);
      wrapper.appendChild(inputRow);
    } else {
      wrapper.appendChild(input);
    }
    formFields.appendChild(wrapper);

    if (campo.id === "grupoFamiliar") {
      input.addEventListener("change", () => renderFamiliares(Number(input.value)));
    }
    if (campo.id === "empresa") {
      input.addEventListener("change", () => renderOtraEmpresa(input.value));
    }
  });

  document.getElementById("declaracion-jurada").checked = false;
  if (tramiteKey === "convivencia") {
    const grupoFamiliar = document.getElementById("grupoFamiliar");
    grupoFamiliar.value = "1";
    renderFamiliares(1);
  }
  if (tramiteKey === "autorizacion") {
    const parentesco = document.getElementById("parentesco");
    parentesco.addEventListener("change", () => actualizarEtiquetaAutorizado(parentesco.value));
  }
}

function renderOtraEmpresa(valor) {
  const empresaField = document.getElementById("empresa").closest(".field");
  const existente = document.getElementById("empresaOtraField");
  if (existente) existente.remove();
  if (valor !== "Otra empresa") return;

  const wrapper = document.createElement("div");
  wrapper.id = "empresaOtraField";
  wrapper.className = "field";
  const label = document.createElement("label");
  label.setAttribute("for", "empresaOtra");
  label.textContent = "Nombre de la empresa de transporte";
  const input = document.createElement("input");
  input.id = "empresaOtra";
  input.name = "empresaOtra";
  input.type = "text";
  input.required = true;
  wrapper.append(label, input);
  empresaField.insertAdjacentElement("afterend", wrapper);
}

function actualizarEtiquetaAutorizado(parentesco) {
  const etiqueta = document.querySelector('label[for="autorizadoNombre"]');
  if (!etiqueta) return;

  const nombres = {
    "Cónyuge": "del cónyuge",
    "Pareja": "de la pareja",
    "Hijo/a": "de la persona autorizada",
    "Madre/Padre": "de la madre o padre",
    "Hermano/a": "del hermano/a",
    "Abuelo/a": "del abuelo/a",
    "Nieto/a": "del nieto/a",
    "Otro": "de la persona autorizada",
    "Sin parentesco": "de la persona autorizada",
  };
  etiqueta.textContent = `Nombre y apellido ${nombres[parentesco] || "de la persona autorizada"}`;
}

function renderFamiliares(cantidad) {
  const grupoField = document.getElementById("grupoFamiliar").closest(".field");
  let familyContainer = document.getElementById("family-container");
  if (!familyContainer) {
    familyContainer = document.createElement("div");
    familyContainer.id = "family-container";
    grupoField.insertAdjacentElement("afterend", familyContainer);
  }
  familyContainer.innerHTML = "";
  if (!cantidad || cantidad < 1) return;

  for (let index = 1; index <= cantidad; index += 1) {
    const title = document.createElement("h3");
    title.className = "family-title witness-title";
    title.textContent = `Persona conviviente ${index}`;
    familyContainer.appendChild(title);

    [
      { id: `familiar${index}Nombre`, label: "Nombre y apellido completo", type: "text" },
      { id: `familiar${index}Dni`, label: "DNI", type: "text" },
      { id: `familiar${index}Vinculo`, label: "Vínculo con el solicitante", type: "select", options: ["Pareja", "Hijo/a", "Madre/Padre", "Hermano/a", "Otro"] },
    ].forEach((campo) => {
      const wrapper = document.createElement("div");
      wrapper.className = "field family-member-fields";
      const label = document.createElement("label");
      label.setAttribute("for", campo.id);
      label.textContent = campo.label;
      wrapper.appendChild(label);

      const input = campo.type === "select" ? document.createElement("select") : document.createElement("input");
      if (campo.type === "select") {
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Seleccionar...";
        input.appendChild(emptyOption);
        campo.options.forEach((option) => {
          const item = document.createElement("option");
          item.value = option;
          item.textContent = option;
          input.appendChild(item);
        });
      } else {
        input.type = campo.type;
      }
      input.id = campo.id;
      input.name = campo.id;
      input.required = true;
      wrapper.appendChild(input);
      familyContainer.appendChild(wrapper);
    });
  }
}

function obtenerFamiliares() {
  const cantidad = Number(document.getElementById("grupoFamiliar")?.value || 1);
  return Array.from({ length: cantidad }, (_, index) => {
    const numero = index + 1;
    return {
      nombre: document.getElementById(`familiar${numero}Nombre`)?.value || "",
      dni: document.getElementById(`familiar${numero}Dni`)?.value || "",
      vinculo: document.getElementById(`familiar${numero}Vinculo`)?.value || "",
    };
  });
}

function abrirScanner(targetId) {
  scannerTarget = targetId;
  scannerModal.classList.remove("hidden");
  scannerStatus.textContent = "Presioná Activar cámara y enfocá el código del documento.";
  scannerStart.focus();
}

function cerrarScanner() {
  if (scannerTimer) {
    clearInterval(scannerTimer);
    scannerTimer = null;
  }
  if (scannerStream) {
    scannerStream.getTracks().forEach((track) => track.stop());
    scannerStream = null;
  }
  scannerVideo.srcObject = null;
  scannerReading = false;
  scannerModal.classList.add("hidden");
  scannerTarget = null;
}

async function iniciarScanner() {
  if (!window.isSecureContext) {
    scannerStatus.textContent = "La cámara requiere una conexión segura (HTTPS). Abrí esta página con HTTPS o probá desde localhost.";
    return;
  }

  if (!window.BarcodeDetector || !navigator.mediaDevices) {
    scannerStatus.textContent = "Este navegador no admite lectura de códigos por cámara. Podés completar los datos manualmente.";
    return;
  }

  try {
    const detector = new BarcodeDetector({ formats: ["qr_code", "pdf417", "code_128", "code_39"] });
    try {
      scannerStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
    } catch {
      scannerStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    scannerVideo.srcObject = scannerStream;
    await scannerVideo.play();
    scannerStatus.textContent = "Buscando el código del documento...";
    scannerTimer = setInterval(async () => {
      if (scannerReading || scannerVideo.readyState < 2) return;
      scannerReading = true;
      try {
        const codigos = await detector.detect(scannerVideo);
        if (codigos.length > 0) {
          procesarCodigoEscaneado(codigos[0].rawValue);
          cerrarScanner();
        }
      } catch {
        scannerStatus.textContent = "No se pudo leer el código. Alineá el documento dentro del marco.";
      } finally {
        scannerReading = false;
      }
    }, 300);
  } catch {
    scannerStatus.textContent = "No se pudo mostrar la cámara. Revisá el permiso del navegador y que otra aplicación no la esté usando.";
  }
}

function procesarCodigoEscaneado(texto) {
  const datos = extraerDatosDocumento(texto);
  const dniInput = document.getElementById(scannerTarget);
  if (dniInput && datos.dni) dniInput.value = datos.dni;

  const nombreTarget = {
    dni: "nombre",
    testigo1Dni: "testigo1Nombre",
    testigo2Dni: "testigo2Nombre",
  }[scannerTarget];
  const nombreInput = nombreTarget && document.getElementById(nombreTarget);
  if (nombreInput && datos.nombre) nombreInput.value = datos.nombre;

  if (scannerTarget === "dni" && datos.sexo) {
    const sexoInput = document.getElementById("sexo");
    if (sexoInput) sexoInput.value = datos.sexo;
  }
}

function extraerDatosDocumento(texto) {
  try {
    const datos = JSON.parse(texto);
    return {
      dni: String(datos.dni || datos.documento || "").replace(/\D/g, ""),
      nombre: datos.nombre || datos.nombreCompleto || "",
      sexo: normalizarSexo(datos.sexo),
    };
  } catch {
    const partes = texto
      .replace(/[\r\n]+/g, "@").split("@").map((parte) => parte.trim()).filter(Boolean);
    const dni = texto.match(/\b\d{7,8}\b/);
    const sexo = partes.map(normalizarSexo).find(Boolean) || "";
    const nombres = partes.filter((parte) => /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,}$/.test(parte))
      .filter((parte) => !/^(ARG|IDARG|DNI|EJEMPLAR|NACIONALIDAD|APELLIDO|NOMBRE)$/i.test(parte));
    return {
      dni: dni ? dni[0] : "",
      nombre: nombres.slice(0, 2).join(" "),
      sexo,
    };
  }
}

function normalizarSexo(valor) {
  const sexo = String(valor || "").trim().toUpperCase();
  if (sexo === "M" || sexo === "MASCULINO") return "Masculino";
  if (sexo === "F" || sexo === "FEMENINO") return "Femenino";
  if (sexo === "X" || sexo === "OTRO") return "Otro / Prefiero no especificar";
  return "";
}

scannerStart.addEventListener("click", iniciarScanner);
scannerClose.addEventListener("click", cerrarScanner);
scannerModal.addEventListener("click", (event) => {
  if (event.target === scannerModal) cerrarScanner();
});

// ------------------------------------------------------------
// Envío del formulario: genera el PDF y "envía" los datos
// ------------------------------------------------------------
// ------------------------------------------------------------
// Envío del formulario: genera el PDF y envía los datos a la API
// ------------------------------------------------------------
tramiteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!tramiteForm.checkValidity()) {
    tramiteForm.reportValidity();
    return;
  }

  const submitBtn = tramiteForm.querySelector('button[type="submit"]');
  const btnOriginalText = submitBtn ? submitBtn.textContent : "Generar certificado (PDF)";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Generando certificado y enviando a comisaría...";
  }

  try {
    const tramite = TRAMITES[tramiteActual];
    const datos = {};
    tramite.campos.forEach((campo) => {
      datos[campo.id] = document.getElementById(campo.id).value;
    });

    if (tramiteActual === "convivencia") {
      datos.familiares = obtenerFamiliares();
      datos.familiaresTexto = datos.familiares
        .map((familiar) => `${familiar.nombre}, DNI N° ${familiar.dni}, en calidad de ${familiar.vinculo.toLowerCase()}`)
        .join("; ");
    }
    if (tramiteActual === "autorizacion" && datos.empresa === "Otra empresa") {
      datos.empresa = document.getElementById("empresaOtra")?.value || datos.empresa;
    }

    // Generar identificador único y oficial para el trámite
    const nroTramite = generarNumeroTramite(tramiteActual);

    // 1. Generar y descargar el PDF con el número de trámite oficial
    generarPDF(tramite, datos, tramiteActual, nroTramite);

    // 2. Transmitir los datos al backend de la comisaría
    const resultadoEnvio = await enviarDatosAComisaria(tramiteActual, datos, nroTramite, tramite.titulo);

    // 3. Configurar y mostrar pantalla de confirmación
    configurarVistaConfirmacion(nroTramite, resultadoEnvio);
    mostrarVista(viewDone);
  } catch (error) {
    console.error("Error al procesar trámite:", error);
    alert("Ocurrió un inconveniente al procesar el trámite: " + error.message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = btnOriginalText;
    }
  }
});

// ------------------------------------------------------------
// Generación del PDF con formato tipo policial
// ------------------------------------------------------------
function generarPDF(tramite, datos, tramiteKey, nroTramiteParam) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;

  // --- Encabezado institucional ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("POLICÍA DE SALTA", marginX, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Ministerio de Seguridad de la Provincia de Salta", marginX, 26);
  doc.text("Sistema de trámites en línea — Mi Comisaría", marginX, 31);

  doc.setDrawColor(180);
  doc.line(marginX, 35, pageWidth - marginX, 35);

  // --- Título del certificado ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(tramite.titulo.toUpperCase(), pageWidth / 2, 48, { align: "center" });

  // --- Número de trámite y fecha ---
  const nroTramite = nroTramiteParam || generarNumeroTramite(tramiteKey);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`N° de trámite: ${nroTramite}`, marginX, 58);
  doc.text(`Salta, ${formatFechaHoy()}`, pageWidth - marginX, 58, { align: "right" });

  // --- Cuerpo del certificado ---
  doc.setFontSize(11);
  const texto = tramite.cuerpo(datos);
  const lineas = doc.splitTextToSize(texto, pageWidth - marginX * 2);
  doc.text(lineas, marginX, 74, { lineHeightFactor: 1.6 });

  const yDespuesTexto = 74 + lineas.length * 6.5;

  doc.setFontSize(9);
  doc.text(
    "El presente certificado se emite a solicitud de la parte interesada, sujeto a validación",
    marginX,
    yDespuesTexto + 12
  );
  doc.text(
    "y sellado por la dependencia policial correspondiente para tener validez oficial.",
    marginX,
    yDespuesTexto + 17
  );

  // --- Firma ---
  const ySello = yDespuesTexto + 45;
  doc.line(marginX, ySello, marginX + 70, ySello);
  doc.text("Firma y sello del oficial interviniente", marginX, ySello + 5);

  doc.line(pageWidth - marginX - 70, ySello, pageWidth - marginX, ySello);
  doc.text("Sello de la dependencia", pageWidth - marginX - 70, ySello + 5);

  // --- Pie de página ---
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Documento generado electrónicamente por Mi Comisaría. Contacto de verificación: micomisaria@salta.gob.ar",
    pageWidth / 2,
    287,
    { align: "center" }
  );

  doc.save(`${nroTramite}_${tramiteKey}.pdf`);
}

// ------------------------------------------------------------
// Envío de datos a la API de la comisaría con fallback offline
// ------------------------------------------------------------
async function enviarDatosAComisaria(tramiteKey, datos, nroTramite, titulo) {
  const registro = {
    nroTramite,
    tramite: tramiteKey,
    titulo: titulo || TRAMITES[tramiteKey]?.titulo,
    datos,
    fecha: new Date().toISOString(),
  };

  // Guardado local de respaldo inmediato (localStorage)
  try {
    const historial = JSON.parse(localStorage.getItem("tramites_enviados") || "[]");
    historial.unshift(registro);
    localStorage.setItem("tramites_enviados", JSON.stringify(historial));
  } catch (err) {
    console.warn("No se pudo escribir en localStorage:", err);
  }

  // Intento de envío HTTP POST al backend
  try {
    const response = await fetch("/api/tramites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    });

    if (!response.ok) {
      throw new Error(`El servidor respondió con código ${response.status}`);
    }

    const data = await response.json();
    console.log("Trámite registrado con éxito en el servidor:", data);
    return { ok: true, data };
  } catch (error) {
    console.warn("Servidor backend no disponible temporalmente. Trámite respaldado localmente:", error);
    return { ok: false, offline: true, error: error.message };
  }
}

// ------------------------------------------------------------
// Configuración de pantalla de confirmación
// ------------------------------------------------------------
function configurarVistaConfirmacion(nroTramite, resultadoEnvio) {
  const nroElem = document.getElementById("done-nro-tramite");
  const statusElem = document.getElementById("done-sync-status");
  const btnCopiar = document.getElementById("btn-copiar-nro");
  const btnVerDirecto = document.getElementById("btn-ver-estado-directo");

  if (nroElem) nroElem.textContent = nroTramite;

  if (statusElem) {
    if (resultadoEnvio && resultadoEnvio.ok) {
      statusElem.className = "sync-status-badge sync-ok";
      statusElem.textContent = "🟢 Registrado en el sistema de la Policía de Salta";
    } else {
      statusElem.className = "sync-status-badge sync-warn";
      statusElem.textContent = "🟡 Guardado localmente (Servidor en espera de sincronización)";
    }
  }

  if (btnCopiar) {
    btnCopiar.onclick = () => {
      navigator.clipboard.writeText(nroTramite).then(() => {
        btnCopiar.textContent = "✅ ¡Copiado!";
        setTimeout(() => (btnCopiar.textContent = "📋 Copiar"), 2000);
      });
    };
  }

  if (btnVerDirecto) {
    btnVerDirecto.onclick = () => {
      abrirModalConsulta(nroTramite);
    };
  }
}

// ------------------------------------------------------------
// Modal: Consulta de estado de trámite ciudadano
// ------------------------------------------------------------
const consultaModal = document.getElementById("consulta-modal");
const btnAbrirConsulta = document.getElementById("btn-abrir-consulta");
const consultaClose = document.getElementById("consulta-close");
const consultaForm = document.getElementById("consulta-form");
const consultaInput = document.getElementById("consulta-input");
const consultaResultado = document.getElementById("consulta-resultado");

function abrirModalConsulta(codigoInicial = "") {
  if (!consultaModal) return;
  consultaModal.classList.remove("hidden");
  if (codigoInicial && consultaInput) {
    consultaInput.value = codigoInicial;
    consultarEstadoTramite(codigoInicial);
  } else if (consultaInput) {
    consultaInput.value = "";
    consultaResultado.innerHTML = "";
    consultaInput.focus();
  }
}

function cerrarModalConsulta() {
  if (!consultaModal) return;
  consultaModal.classList.add("hidden");
}

if (btnAbrirConsulta) btnAbrirConsulta.addEventListener("click", () => abrirModalConsulta());
if (consultaClose) consultaClose.addEventListener("click", cerrarModalConsulta);
if (consultaModal) {
  consultaModal.addEventListener("click", (e) => {
    if (e.target === consultaModal) cerrarModalConsulta();
  });
}

if (consultaForm) {
  consultaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = consultaInput.value.trim();
    if (query) consultarEstadoTramite(query);
  });
}

async function consultarEstadoTramite(termino) {
  if (!consultaResultado) return;
  consultaResultado.innerHTML = `<p class="muted" style="text-align:center; padding: 12px;">Consultando registros de la Comisaría...</p>`;

  try {
    const res = await fetch(`/api/tramites/${encodeURIComponent(termino)}`);
    if (res.ok) {
      const data = await res.json();
      renderizarResultadoConsulta(data.tramite);
      return;
    }

    // Si no se encuentra por endpoint exacto, buscar en la lista general
    const resList = await fetch(`/api/tramites?q=${encodeURIComponent(termino)}`);
    if (resList.ok) {
      const dataList = await resList.json();
      if (dataList.tramites && dataList.tramites.length > 0) {
        renderizarResultadoConsulta(dataList.tramites[0]);
        return;
      }
    }

    // Respaldo en localStorage si no hay conexión o no existe en servidor
    const local = JSON.parse(localStorage.getItem("tramites_enviados") || "[]");
    const localItem = local.find(
      (t) =>
        t.nroTramite?.toLowerCase() === termino.toLowerCase() ||
        t.datos?.dni === termino ||
        t.datos?.dniSolicitante === termino
    );
    if (localItem) {
      renderizarResultadoConsulta({
        nroTramite: localItem.nroTramite,
        titulo: localItem.titulo || "Trámite Policial",
        fecha: localItem.fecha,
        estado: "PENDIENTE",
        solicitante: {
          nombre: localItem.datos?.nombre || localItem.datos?.nombreSolicitante || "Solicitante",
          dni: localItem.datos?.dni || localItem.datos?.dniSolicitante || termino,
        },
        observaciones: "Trámite registrado localmente en este dispositivo.",
      });
      return;
    }

    consultaResultado.innerHTML = `
      <div class="consulta-card" style="text-align:center; border-color: #fca5a5; background: #fef2f2;">
        <p style="color: #991b1b; margin: 0; font-weight: 500;">
          No se encontró ningún trámite con el identificador o DNI "<strong>${escapeHTML(termino)}</strong>".
        </p>
        <small class="muted">Verificá los datos ingresados o acercate a la dependencia policial.</small>
      </div>
    `;
  } catch (err) {
    consultaResultado.innerHTML = `
      <div class="consulta-card" style="text-align:center; background: #fffbeb; border-color: #fcd34d;">
        <p style="color: #92400e; margin: 0;">
          No se pudo consultar el servidor en este momento. Verificá que el backend esté en ejecución.
        </p>
      </div>
    `;
  }
}

function renderizarResultadoConsulta(t) {
  const badgeClass = {
    PENDIENTE: "badge-pendiente",
    APROBADO: "badge-aprobado",
    OBSERVADO: "badge-observado",
    RECHAZADO: "badge-rechazado",
  }[t.estado] || "badge-pendiente";

  const estadoDesc = {
    PENDIENTE: "En proceso de revisión por el personal policial.",
    APROBADO: "Certificado validado y sellado. Listo para retirar o presentar.",
    OBSERVADO: "El oficial registró observaciones sobre la documentación.",
    RECHAZADO: "La solicitud fue rechazada por la dependencia policial.",
  }[t.estado] || "";

  consultaResultado.innerHTML = `
    <div class="consulta-card">
      <div class="consulta-header">
        <div>
          <strong style="font-size: 15px; color: var(--navy);">${escapeHTML(t.titulo || "Certificado")}</strong>
          <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">
            N° Trámite: <strong>${escapeHTML(t.nroTramite || t.id)}</strong>
          </div>
        </div>
        <span class="badge ${badgeClass}">${t.estado || "PENDIENTE"}</span>
      </div>

      <div style="font-size: 13px; line-height: 1.6; color: var(--text);">
        <p style="margin: 4px 0;"><strong>Solicitante:</strong> ${escapeHTML(t.solicitante?.nombre || "-")} (DNI ${escapeHTML(t.solicitante?.dni || "-")})</p>
        <p style="margin: 4px 0;"><strong>Fecha de solicitud:</strong> ${formatFecha(t.fecha?.slice(0, 10))}</p>
        <p style="margin: 6px 0 2px; color: var(--muted); font-size: 12px;">${estadoDesc}</p>
        ${
          t.observaciones
            ? `<div style="background: #e2e8f0; padding: 8px 12px; border-radius: 6px; margin-top: 8px; font-size: 12px;">
                <strong>Observaciones de guardia:</strong> ${escapeHTML(t.observaciones)}
               </div>`
            : ""
        }
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str).replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[tag] || tag));
}

// ------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------
function formatFecha(fechaISO) {
  if (!fechaISO) return "-";
  const [y, m, d] = fechaISO.split("-");
  return `${d}/${m}/${y}`;
}

function formatFechaHoy() {
  const hoy = new Date();
  return hoy.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatFechaLargaHoy() {
  const hoy = new Date();
  const dia = hoy.toLocaleDateString("es-AR", { day: "2-digit" });
  const mes = hoy.toLocaleDateString("es-AR", { month: "long" });
  const año = hoy.getFullYear();
  return `${dia} días del mes de ${mes} del año ${año}`;
}

function generarNumeroTramite(tramiteKey) {
  const prefijos = { residencia: "RES", convivencia: "CON", carencia: "CAR", autorizacion: "AUT" };
  const prefijo = prefijos[tramiteKey] || "TRM";
  const ahora = Date.now().toString().slice(-6);
  return `${prefijo}-${ahora}`;
}

// ============================================================
// Lógica del Panel Policial de Oficial de Guardia (Unificado)
// ============================================================
let tramitesAdminCache = [];
let tramiteAdminSeleccionado = null;

const tablaAdminBody = document.getElementById("tabla-tramites-body");
const inputBusquedaAdmin = document.getElementById("input-busqueda");
const filtroTipoAdmin = document.getElementById("filtro-tipo");
const filtroEstadoAdmin = document.getElementById("filtro-estado");
const btnRefrescarAdmin = document.getElementById("btn-refrescar");

// KPIs
const kpiTotal = document.getElementById("kpi-total");
const kpiPendientes = document.getElementById("kpi-pendientes");
const kpiAprobados = document.getElementById("kpi-aprobados");
const kpiRechazados = document.getElementById("kpi-rechazados");

// Modal Admin
const modalDetalleAdmin = document.getElementById("modal-detalle-admin");
const modalAdminClose = document.getElementById("modal-admin-close");
const modalAdminCancelar = document.getElementById("modal-admin-cancelar");
const modalAdminGuardar = document.getElementById("modal-admin-guardar");
const modalAdminTitle = document.getElementById("modal-admin-title");
const modalSubtituloAdmin = document.getElementById("modal-subtitulo");
const modalBadgeTipoAdmin = document.getElementById("modal-badge-tipo");
const modalCuerpoAdmin = document.getElementById("modal-cuerpo-detalle");
const modalSelectEstadoAdmin = document.getElementById("modal-select-estado");
const modalInputObsAdmin = document.getElementById("modal-input-observaciones");
const adminStatusBanner = document.getElementById("admin-status-banner");

if (btnRefrescarAdmin) btnRefrescarAdmin.addEventListener("click", cargarDatosAdmin);
if (inputBusquedaAdmin) inputBusquedaAdmin.addEventListener("input", filtrarYRenderizarAdmin);
if (filtroTipoAdmin) filtroTipoAdmin.addEventListener("change", filtrarYRenderizarAdmin);
if (filtroEstadoAdmin) filtroEstadoAdmin.addEventListener("change", filtrarYRenderizarAdmin);

if (modalAdminClose) modalAdminClose.addEventListener("click", cerrarModalDetalleAdmin);
if (modalAdminCancelar) modalAdminCancelar.addEventListener("click", cerrarModalDetalleAdmin);
if (modalDetalleAdmin) {
  modalDetalleAdmin.addEventListener("click", (e) => {
    if (e.target === modalDetalleAdmin) cerrarModalDetalleAdmin();
  });
}
if (modalAdminGuardar) modalAdminGuardar.addEventListener("click", guardarResolucionAdmin);

async function cargarDatosAdmin() {
  if (!tablaAdminBody) return;
  mostrarBannerAdmin("", false);
  tablaAdminBody.innerHTML = `<tr><td colspan="7" class="td-empty">Consultando trámites recibidos en el servidor...</td></tr>`;

  try {
    const [resTramites, resStats] = await Promise.all([
      fetch("/api/tramites"),
      fetch("/api/estadisticas"),
    ]);

    if (!resTramites.ok) throw new Error("No se pudo conectar a /api/tramites");

    const dataTramites = await resTramites.json();
    tramitesAdminCache = dataTramites.tramites || [];

    if (resStats.ok) {
      const dataStats = await resStats.json();
      actualizarKPIsAdmin(dataStats.stats);
    } else {
      calcularKPIsLocalesAdmin(tramitesAdminCache);
    }

    filtrarYRenderizarAdmin();
  } catch (error) {
    console.warn("Backend no disponible para admin. Usando caché local:", error);
    mostrarBannerAdmin(
      "⚠️ No se pudo conectar al servidor backend. Se muestran los trámites guardados localmente.",
      true
    );

    const local = JSON.parse(localStorage.getItem("tramites_enviados") || "[]");
    tramitesAdminCache = local.map((item, index) => ({
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
      observaciones: "Almacenado localmente en este dispositivo",
    }));

    calcularKPIsLocalesAdmin(tramitesAdminCache);
    filtrarYRenderizarAdmin();
  }
}

function actualizarKPIsAdmin(stats) {
  if (kpiTotal) kpiTotal.textContent = stats?.total || 0;
  if (kpiPendientes) kpiPendientes.textContent = stats?.pendientes || 0;
  if (kpiAprobados) kpiAprobados.textContent = stats?.aprobados || 0;
  if (kpiRechazados) kpiRechazados.textContent = stats?.rechazados || 0;
}

function calcularKPIsLocalesAdmin(lista) {
  const total = lista.length;
  const pendientes = lista.filter((t) => (t.estado || "PENDIENTE") === "PENDIENTE").length;
  const aprobados = lista.filter((t) => t.estado === "APROBADO").length;
  const rechazados = lista.filter((t) => t.estado === "RECHAZADO" || t.estado === "OBSERVADO").length;
  actualizarKPIsAdmin({ total, pendientes, aprobados, rechazados });
}

function filtrarYRenderizarAdmin() {
  if (!tablaAdminBody) return;
  const query = inputBusquedaAdmin ? inputBusquedaAdmin.value.toLowerCase().trim() : "";
  const tipo = filtroTipoAdmin ? filtroTipoAdmin.value : "TODOS";
  const estado = filtroEstadoAdmin ? filtroEstadoAdmin.value : "TODOS";

  const filtrados = tramitesAdminCache.filter((t) => {
    if (tipo !== "TODOS" && t.tramite !== tipo) return false;
    if (estado !== "TODOS" && (t.estado || "PENDIENTE").toUpperCase() !== estado.toUpperCase()) return false;

    if (query) {
      const matchNro = t.nroTramite && t.nroTramite.toLowerCase().includes(query);
      const matchNombre = t.solicitante?.nombre && t.solicitante.nombre.toLowerCase().includes(query);
      const matchDni = t.solicitante?.dni && String(t.solicitante.dni).includes(query);
      const matchTitulo = t.titulo && t.titulo.toLowerCase().includes(query);
      if (!matchNro && !matchNombre && !matchDni && !matchTitulo) return false;
    }

    return true;
  });

  renderizarTablaAdmin(filtrados);
}

function renderizarTablaAdmin(lista) {
  if (lista.length === 0) {
    tablaAdminBody.innerHTML = `<tr><td colspan="7" class="td-empty">No se encontraron trámites con los filtros aplicados.</td></tr>`;
    return;
  }

  tablaAdminBody.innerHTML = lista
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
          <td><strong class="tramite-badge">${escapeHTML(t.nroTramite || t.id)}</strong></td>
          <td>${fechaStr}</td>
          <td>${escapeHTML(t.titulo || t.tramite)}</td>
          <td><strong>${escapeHTML(t.solicitante?.nombre || "No especificado")}</strong></td>
          <td>${escapeHTML(t.solicitante?.dni || "-")}</td>
          <td><span class="badge ${estadoClass}">${escapeHTML(t.estado || "PENDIENTE")}</span></td>
          <td>
            <button class="btn-action" type="button" onclick="abrirModalDetalleAdmin('${escapeHTML(t.id || t.nroTramite)}')">
              Ver detalle
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

window.abrirModalDetalleAdmin = function (id) {
  const tramite = tramitesAdminCache.find((t) => t.id === id || t.nroTramite === id);
  if (!tramite || !modalDetalleAdmin) return;

  tramiteAdminSeleccionado = tramite;
  if (modalBadgeTipoAdmin) modalBadgeTipoAdmin.textContent = tramite.nroTramite || tramite.id;
  if (modalAdminTitle) modalAdminTitle.textContent = tramite.titulo || "Certificado Policial";
  if (modalSubtituloAdmin) modalSubtituloAdmin.textContent = `Registrado el ${formatFechaHora(tramite.fecha)}`;

  if (modalSelectEstadoAdmin) modalSelectEstadoAdmin.value = tramite.estado || "PENDIENTE";
  if (modalInputObsAdmin) modalInputObsAdmin.value = tramite.observaciones || "";

  let html = `
    <div class="detail-section">
      <h4>Datos del Solicitante</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Nombre y Apellido</span>
          <span class="detail-value">${escapeHTML(tramite.solicitante?.nombre || "-")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">DNI</span>
          <span class="detail-value">${escapeHTML(tramite.solicitante?.dni || "-")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Domicilio</span>
          <span class="detail-value">${escapeHTML(tramite.solicitante?.domicilio || tramite.datos?.domicilio || "-")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Localidad / Barrio</span>
          <span class="detail-value">${escapeHTML(tramite.solicitante?.barrio || tramite.datos?.barrio || "Salta Capital")}</span>
        </div>
      </div>
    </div>
  `;

  if (tramite.tramite === "residencia") {
    html += `
      <div class="detail-section">
        <h4>Testigos Declarados</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Testigo 1</span>
            <span class="detail-value">${escapeHTML(tramite.datos?.testigo1Nombre || "-")} (DNI ${escapeHTML(tramite.datos?.testigo1Dni || "-")})</span>
            <small style="color: var(--muted);">${escapeHTML(tramite.datos?.testigo1Domicilio || "")}</small>
          </div>
          <div class="detail-item">
            <span class="detail-label">Testigo 2</span>
            <span class="detail-value">${escapeHTML(tramite.datos?.testigo2Nombre || "-")} (DNI ${escapeHTML(tramite.datos?.testigo2Dni || "-")})</span>
            <small style="color: var(--muted);">${escapeHTML(tramite.datos?.testigo2Domicilio || "")}</small>
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
              <span class="detail-label">Conviviente ${i + 1} (${escapeHTML(fam.vinculo)})</span>
              <span class="detail-value">${escapeHTML(fam.nombre)} — DNI ${escapeHTML(fam.dni)}</span>
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
            <span class="detail-value">${escapeHTML(tramite.datos?.autorizadoNombre || "-")} (DNI ${escapeHTML(tramite.datos?.autorizadoDni || "-")})</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Parentesco / Edad</span>
            <span class="detail-value">${escapeHTML(tramite.datos?.parentesco || "-")} (${escapeHTML(tramite.datos?.autorizadoEdad || "-")} años)</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Destino</span>
            <span class="detail-value">${escapeHTML(tramite.datos?.destino || "-")}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Empresa Transporte</span>
            <span class="detail-value">${escapeHTML(tramite.datos?.empresa || "-")}</span>
          </div>
        </div>
      </div>
    `;
  }

  if (modalCuerpoAdmin) modalCuerpoAdmin.innerHTML = html;
  modalDetalleAdmin.classList.remove("hidden");
};

function cerrarModalDetalleAdmin() {
  if (modalDetalleAdmin) modalDetalleAdmin.classList.add("hidden");
  tramiteAdminSeleccionado = null;
}

async function guardarResolucionAdmin() {
  if (!tramiteAdminSeleccionado) return;

  const nuevoEstado = modalSelectEstadoAdmin.value;
  const nuevasObs = modalInputObsAdmin.value.trim();
  const id = tramiteAdminSeleccionado.id || tramiteAdminSeleccionado.nroTramite;

  modalAdminGuardar.disabled = true;
  modalAdminGuardar.textContent = "Guardando...";

  try {
    const res = await fetch(`/api/tramites/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estado: nuevoEstado,
        observaciones: nuevasObs,
      }),
    });

    if (!res.ok) throw new Error("El servidor no pudo actualizar el trámite");

    // Actualizar datos en memoria
    tramiteAdminSeleccionado.estado = nuevoEstado;
    tramiteAdminSeleccionado.observaciones = nuevasObs;

    cerrarModalDetalleAdmin();
    cargarDatosAdmin();
  } catch (error) {
    console.error("Error al guardar resolución:", error);
    alert("No se pudo conectar al servidor para guardar la resolución: " + error.message);
  } finally {
    modalAdminGuardar.disabled = false;
    modalAdminGuardar.textContent = "Guardar resolución";
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

function mostrarBannerAdmin(mensaje, visible) {
  if (!adminStatusBanner) return;
  if (!visible) {
    adminStatusBanner.classList.add("hidden");
    adminStatusBanner.textContent = "";
    return;
  }
  adminStatusBanner.textContent = mensaje;
  adminStatusBanner.className = "status-banner error";
  adminStatusBanner.classList.remove("hidden");
}


