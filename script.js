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

const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");
const formFields = document.getElementById("form-fields");
const tramiteForm = document.getElementById("tramite-form");
const documentCameraModal = document.getElementById("document-camera-modal");
const documentCameraVideo = document.getElementById("document-camera-video");
const documentCameraStatus = document.getElementById("document-camera-status");
const documentCameraStep = document.getElementById("document-camera-step");
const documentCameraFlash = document.getElementById("document-camera-flash");
const documentCameraCapture = document.getElementById("document-camera-capture");
const documentCameraPreview = document.getElementById("document-camera-preview");
const documentCameraImage = document.getElementById("document-camera-image");
const documentCameraRetake = document.getElementById("document-camera-retake");
const documentCameraContinue = document.getElementById("document-camera-continue");
const documentCameraClose = document.getElementById("document-camera-close");

let tramiteActual = null;
let documentCameraStream = null;
let documentCameraTrack = null;
let documentCameraTarget = null;
let documentCameraSide = "frente";
let pendingDocumentPhoto = null;
let flashEnabled = false;
const fotosDni = new Map();

// ------------------------------------------------------------
// Navegación entre vistas
// ------------------------------------------------------------
function mostrarVista(vista) {
  [viewHome, viewForm, viewDone].forEach((v) => v.classList.add("hidden"));
  vista.classList.remove("hidden");
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
      scanButton.textContent = "Fotografiar DNI";
      scanButton.addEventListener("click", () => abrirCamaraDocumento(campo.id));
      inputRow.appendChild(scanButton);

      const photoStatus = document.createElement("p");
      photoStatus.id = `dni-photo-status-${campo.id}`;
      photoStatus.className = "dni-photo-status";
      photoStatus.textContent = "Faltan las fotos del frente y dorso del DNI.";
      inputRow.appendChild(photoStatus);
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

async function abrirCamaraDocumento(targetId) {
  cerrarCamaraDocumento();
  documentCameraTarget = targetId;
  documentCameraSide = "frente";
  pendingDocumentPhoto = null;
  flashEnabled = false;
  documentCameraModal.classList.remove("hidden");
  actualizarPasoCamara();

  if (!window.isSecureContext) {
    documentCameraStatus.textContent = "La cámara requiere una conexión segura (HTTPS). Abrí esta página con HTTPS o probá desde localhost.";
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    documentCameraStatus.textContent = "Este navegador no permite usar la cámara. Podés completar el DNI manualmente.";
    return;
  }
  try {
    try {
      documentCameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
    } catch {
      documentCameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    documentCameraTrack = documentCameraStream.getVideoTracks()[0] || null;
    documentCameraVideo.srcObject = documentCameraStream;
    await documentCameraVideo.play();
    configurarFlash();
    documentCameraCapture.disabled = false;
    documentCameraStatus.textContent = "Asegurate de que el DNI se vea completo, nítido y sin reflejos.";
  } catch {
    documentCameraStatus.textContent = "No se pudo mostrar la cámara. Revisá el permiso del navegador y que otra aplicación no la esté usando.";
  }
}

function actualizarPasoCamara() {
  const esFrente = documentCameraSide === "frente";
  documentCameraStep.textContent = `Paso ${esFrente ? "1" : "2"} de 2: ${documentCameraSide} del DNI`;
  documentCameraCapture.textContent = `Tomar foto del ${documentCameraSide}`;
  documentCameraContinue.textContent = esFrente ? "Continuar con el dorso" : "Guardar fotos";
  documentCameraPreview.classList.add("hidden");
  documentCameraImage.removeAttribute("src");
}

function configurarFlash() {
  const soportaFlash = Boolean(documentCameraTrack?.getCapabilities?.().torch);
  documentCameraFlash.disabled = !soportaFlash;
  documentCameraFlash.textContent = soportaFlash ? "Flash: apagado" : "Flash: no disponible";
}

async function alternarFlash() {
  if (!documentCameraTrack?.getCapabilities?.().torch) return;
  try {
    flashEnabled = !flashEnabled;
    await documentCameraTrack.applyConstraints({ advanced: [{ torch: flashEnabled }] });
    documentCameraFlash.textContent = `Flash: ${flashEnabled ? "encendido" : "apagado"}`;
  } catch {
    flashEnabled = false;
    documentCameraFlash.textContent = "Flash: no disponible";
    documentCameraFlash.disabled = true;
  }
}

function tomarFotoDocumento() {
  if (documentCameraVideo.readyState < 2) return;
  const maxWidth = 1600;
  const escala = Math.min(1, maxWidth / documentCameraVideo.videoWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(documentCameraVideo.videoWidth * escala);
  canvas.height = Math.round(documentCameraVideo.videoHeight * escala);
  canvas.getContext("2d").drawImage(documentCameraVideo, 0, 0, canvas.width, canvas.height);
  pendingDocumentPhoto = canvas.toDataURL("image/jpeg", 0.88);
  documentCameraImage.src = pendingDocumentPhoto;
  documentCameraPreview.classList.remove("hidden");
  documentCameraStatus.textContent = "Revisá que los datos se lean bien. Si no, repetí la foto.";
}

function continuarFotoDocumento() {
  if (!pendingDocumentPhoto || !documentCameraTarget) return;
  const fotos = fotosDni.get(documentCameraTarget) || {};
  fotos[documentCameraSide] = pendingDocumentPhoto;
  fotosDni.set(documentCameraTarget, fotos);

  if (documentCameraSide === "frente") {
    documentCameraSide = "dorso";
    pendingDocumentPhoto = null;
    actualizarPasoCamara();
    documentCameraStatus.textContent = "Dá vuelta el DNI y fotografiá el dorso completo.";
    return;
  }
  actualizarEstadoFotosDni(documentCameraTarget);
  cerrarCamaraDocumento();
}

function actualizarEstadoFotosDni(targetId) {
  const status = document.getElementById(`dni-photo-status-${targetId}`);
  if (!status) return;
  const fotos = fotosDni.get(targetId);
  const listo = fotos?.frente && fotos?.dorso;
  status.textContent = listo ? "✓ Frente y dorso del DNI fotografiados." : "Faltan las fotos del frente y dorso del DNI.";
  status.classList.toggle("is-complete", Boolean(listo));
}

function cerrarCamaraDocumento() {
  if (documentCameraTrack && flashEnabled) {
    documentCameraTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
  }
  if (documentCameraStream) documentCameraStream.getTracks().forEach((track) => track.stop());
  documentCameraStream = null;
  documentCameraTrack = null;
  documentCameraVideo.srcObject = null;
  documentCameraCapture.disabled = true;
  documentCameraFlash.disabled = true;
  documentCameraModal.classList.add("hidden");
  documentCameraTarget = null;
  pendingDocumentPhoto = null;
  flashEnabled = false;
}

documentCameraCapture.addEventListener("click", tomarFotoDocumento);
documentCameraRetake.addEventListener("click", () => {
  pendingDocumentPhoto = null;
  documentCameraPreview.classList.add("hidden");
  documentCameraStatus.textContent = "Volvé a encuadrar el DNI y tomá otra foto.";
});
documentCameraContinue.addEventListener("click", continuarFotoDocumento);
documentCameraFlash.addEventListener("click", alternarFlash);
documentCameraClose.addEventListener("click", cerrarCamaraDocumento);
documentCameraModal.addEventListener("click", (event) => {
  if (event.target === documentCameraModal) cerrarCamaraDocumento();
});

// ------------------------------------------------------------
// Envío del formulario: genera el PDF y "envía" los datos
// ------------------------------------------------------------
tramiteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!tramiteForm.checkValidity()) {
    tramiteForm.reportValidity();
    return;
  }

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

  generarPDF(tramite, datos, tramiteActual);
  enviarDatosAComisaria(tramiteActual, datos);

  mostrarVista(viewDone);
});

// ------------------------------------------------------------
// Generación del PDF con formato tipo policial
// ------------------------------------------------------------
function generarPDF(tramite, datos, tramiteKey) {
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
  const nroTramite = generarNumeroTramite(tramiteKey);
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
// Envío de datos a la comisaría
// ------------------------------------------------------------
// NOTA PARA VS CODE: acá reemplazar por una llamada real a tu backend,
// por ejemplo:
//   fetch("https://TU-API.com/tramites", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ tramite: tramiteKey, datos }),
//   });
// Por ahora, para poder probar la página sin backend, los datos
// se guardan localmente en el navegador (localStorage).
function enviarDatosAComisaria(tramiteKey, datos) {
  const registro = {
    tramite: tramiteKey,
    datos,
    fecha: new Date().toISOString(),
  };

  const historial = JSON.parse(localStorage.getItem("tramites_enviados") || "[]");
  historial.push(registro);
  localStorage.setItem("tramites_enviados", JSON.stringify(historial));

  console.log("Trámite enviado (simulado):", registro);
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
