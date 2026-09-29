/*
  Configuración de comisarías de Salta
  - CORRECCIONES_BARRIO: barrio → comisaría(s)
    - STRING: una sola comisaría → asignación automática
    - ARRAY: múltiples comisarías → el ciudadano elige
  - DEPENDENCIAS_POLICIALES: fallback por coordenadas
  - LOCALIDADES_SALTA: municipios para el desplegable
*/

const CORRECCIONES_BARRIO = {
  // ============================================================
  // BARRIOS CON ASIGNACIÓN ÚNICA (automático)
  // ============================================================

  // COMISARÍA N° 1 - Micro y Macrocentro
  "microcentro": "Comisaría N°1 - Centro",
  "macrocentro": "Comisaría N°1 - Centro",
  "cuadrante comercial": "Comisaría N°1 - Centro",

  // COMISARÍA N° 2 - Zona Sur-Este
  "santa cecilia": "Comisaría N°2 - Santa Cecilia",
  "villa san antonio": "Comisaría N°2 - Santa Cecilia",
  "hernando de lerma": "Comisaría N°2 - Santa Cecilia",

  // COMISARÍA N° 3 - Zona Norte
  "tres cerritos": "Comisaría N°3 - Tres Cerritos",
  "jose vicente sola": "Comisaría N°3 - Tres Cerritos",

  // COMISARÍA N° 4 - Zona Oeste Baja
  "pompilio guzman": "Comisaría N°4 - Villa Mitre",
  "plaza las industrias": "Comisaría N°4 - Villa Mitre",

  // COMISARÍA N° 5 - Zona Sur-Este Alta
  "solidaridad": "Comisaría N°5 - Solidaridad",
  "juan calchaqui": "Comisaría N°5 - Solidaridad",
  "provipo": "Comisaría N°5 - Solidaridad",
  "campo caseros": "Comisaría N°5 - Solidaridad",
  "el carmen": "Comisaría N°5 - Solidaridad",

  // COMISARÍA N° 6 - Zona Norte Alta
  "ciudad del milagro": "Comisaría N°6 - Ciudad del Milagro",
  "1 de mayo": "Comisaría N°6 - Ciudad del Milagro",
  "primero de mayo": "Comisaría N°6 - Ciudad del Milagro",

  // COMISARÍA N° 7 - Zona Centro-Oeste / Alta
  "20 de febrero": "Comisaría N°7 - El Tribuno",
  "veinte de febrero": "Comisaría N°7 - El Tribuno",
  "villa belgrano": "Comisaría N°7 - El Tribuno",
  "barrio pilar": "Comisaría N°7 - El Tribuno",
  "villa lujan": "Comisaría N°7 - El Tribuno",

  // COMISARÍA N° 8 - Zona Sur-Oeste
  "santa ana": "Comisaría N°8 - Santa Ana",
  "santa ana i": "Comisaría N°8 - Santa Ana",
  "santa ana ii": "Comisaría N°8 - Santa Ana",
  "santa ana iii": "Comisaría N°8 - Santa Ana",
  "santa ana iv": "Destacamento Santa Ana IV",
  "santa ana 4": "Destacamento Santa Ana IV",
  "aerolineas": "Comisaría N°8 - Santa Ana",

  // COMISARÍA N° 9 - Zona Sudeste Baja
  "san jose": "Comisaría N°9 - Portezuelo Sur",
  "villa san lorenzo": "Comisaría N°9 - Portezuelo Sur",
  "portezuelo sur": "Comisaría N°9 - Portezuelo Sur",
  "la trinidad": "Comisaría N°9 - Portezuelo Sur",

  // COMISARÍA N° 10 - Zona Norte / San Lorenzo
  "villa veraniega": "Comisaría N°10 - Santa Cecilia",

  // COMISARÍA N° 11 - Zona Norte Periférica
  "juan pablo ii": "Comisaría N°11 - 17 de Octubre",
  "juan pablo 2": "Comisaría N°11 - 17 de Octubre",
  "17 de octubre": "Comisaría N°11 - 17 de Octubre",
  "juan manuel de rosas": "Comisaría N°11 - 17 de Octubre",
  "balneario": "Comisaría N°11 - 17 de Octubre",
  "la tradicion": "Comisaría N°11 - 17 de Octubre",

  // COMISARÍA N° 13 - Zona Sur (Ruta 26)
  "san remo": "Comisaría N°13 - Cerrillos",
  "scalabrini ortiz": "Comisaría N°13 - Cerrillos",
  "villa palacios": "Comisaría N°13 - Cerrillos",

  // COMISARÍA N° 14 - Zona Norte
  "castanares": "Comisaría N°14 - Campo Santo",
  "parque belgrano": "Comisaría N°14 - Campo Santo",

  // COMISARÍA N° 15 - Zona Suroeste
  "valle hermoso": "Comisaría N°15 - San Remo",

  // COMISARÍA N° 17 - Zona Sudeste (Bajo)
  "boulogne sur mer": "Comisaría N°17 - Solidaridad",

  // COMISARÍA N° 18 - Zona Sudeste Periférica
  "san justo": "Comisaría N°18 - Chicoana",
  "loteo esmeralda": "Comisaría N°18 - Chicoana",
  "vertedero san javier": "Comisaría N°18 - Chicoana",

  // COMISARÍA N° 19 - Zona Norte / Frontera
  "15 de febrero": "Comisaría N°19 - El Carril",
  "quince de febrero": "Comisaría N°19 - El Carril",

  // COMISARÍA N° 20 - Zona Oeste / Enlace
  "la ribera": "Comisaría N°20 - La Ribera",
  "costas del rio arenas": "Comisaría N°20 - La Ribera",
  "rio arenas": "Comisaría N°20 - La Ribera",

  // COMISARÍA N° 24 - Zona Centro-Norte
  "lujan este": "Comisaría N°24 - Centro Norte",
  "vias del ferrocarril": "Comisaría N°24 - Centro Norte",

  // COMISARÍA N° 25 - Zona Oeste / San Lorenzo
  "circunvalacion oeste": "Comisaría N°25 - San Lorenzo Chico",

  // COMISARÍA N° 101 - Zona Sur / Cerrillos
  "ruta 21": "Comisaría N°101 - Santa Rita",

  // COMISARÍA N° 102 - Zona Sur-Este Extrema
  "la paz": "Comisaría N°102 - Atocha II",
  "ampliacion solidaridad": "Comisaría N°102 - Atocha II",

  // COMISARÍA N° 103 - Zona Oeste / San Lorenzo
  "nueva esperanza": "Comisaría N°103 - 17 de Octubre",
  "pie del cerro": "Comisaría N°103 - 17 de Octubre",

  // COMISARÍA N° 104 - Zona Oeste Alta
  "palermo i": "Comisaría N°104 - Palermo",
  "palermo ii": "Comisaría N°104 - Palermo",
  "palermo iii": "Comisaría N°104 - Palermo",
  "palermo 1": "Comisaría N°104 - Palermo",
  "palermo 2": "Comisaría N°104 - Palermo",
  "palermo 3": "Comisaría N°104 - Palermo",
  "roberto romero": "Comisaría N°104 - Palermo",
  "divino nino": "Comisaría N°104 - Palermo",
  "el progreso": "Comisaría N°104 - Palermo",

  // COMISARÍA N° 105 - Zona Sudeste
  "siglo xxi": "Comisaría N°105 - La Merced",
  "siglo 21": "Comisaría N°105 - La Merced",
  "santa anita": "Comisaría N°105 - La Merced",

  // COMISARÍA N° 106 - Zona Sur Plena
  "san francisco": "Comisaría N°106 - Limache",
  "ciudad valdivia": "Comisaría N°106 - Limache",
  "limache": "Comisaría N°106 - Limache",

  // COMISARÍA N° 107 - Zona Sur / San Carlos
  "loteo san benito": "Comisaría N°107 - San Carlos",
  "ex combatientes de malvinas": "Comisaría N°107 - San Carlos",

  // COMISARÍA N° 108 - Zona Suroeste Extrema
  "santa clara de asis": "Comisaría N°108 - Campo Quijano",
  "av kennedy": "Comisaría N°108 - Campo Quijano",
  "avenida kennedy": "Comisaría N°108 - Campo Quijano",

  // COMISARÍA N° 110 - Zona Norte / Huaico II
  "el huaico iv": "Comisaría N°110 - Huaico II",
  "el huaico v": "Comisaría N°110 - Huaico II",
  "huaico iv": "Comisaría N°110 - Huaico II",
  "huaico v": "Comisaría N°110 - Huaico II",
  "valle de lerma": "Comisaría N°110 - Huaico II",

  // COMISARÍA N° 111 - Zona Sur / Limache Nuevo
  "loteo san gabriel": "Comisaría N°111 - Limache Nuevo",
  "centro de convenciones": "Comisaría N°111 - Limache Nuevo",
  "valdivia": "Comisaría N°111 - Limache Nuevo",

  // COMISARÍA N° 112 - Zona Oeste de Enlace
  "la silleta norte": "Comisaría N°112 - La Silleta",
  "la silleta": "Comisaría N°112 - La Silleta",
  "las lenas": "Comisaría N°112 - La Silleta",

  // COMISARÍA N° 115 - Zona Sudeste Extrema
  "el circulo": "Comisaría N°115 - El Círculo",
  "solares de san jose": "Comisaría N°115 - El Círculo",

  // COMISARÍA N° 118 - Zona Sudeste Nueva
  "cerveceros": "Comisaría N°118 - Cerveceros",
  "las tunas norte": "Comisaría N°118 - Cerveceros",
  "cooperativas ruta 26": "Comisaría N°118 - Cerveceros",

  // SUBCOMISARÍA VILLA LAVALLE
  "villa lavalle": "Subcomisaría Villa Lavalle",
  "papa francisco": "Subcomisaría Villa Lavalle",
  "convivencia": "Subcomisaría Villa Lavalle",

  // SUBCOMISARÍA BARRIO DOCENTE
  "barrio docente": "Subcomisaría Barrio Docente",
  "docente": "Subcomisaría Barrio Docente",
  "intersindical": "Subcomisaría Barrio Docente",
  "periodista": "Subcomisaría Barrio Docente",

  // SUBCOMISARÍA VILLA ASUNCIÓN
  "villa asuncion": "Subcomisaría Villa Asunción",
  "villa costanera": "Subcomisaría Villa Asunción",
  "solis pizarro": "Subcomisaría Villa Asunción",

  // SUBCOMISARÍA GRAND BOURG
  "los perales": "Subcomisaría Grand Bourg Este",
  "altos de grand bourg": "Subcomisaría Grand Bourg Este",
  "centro administrativo": "Subcomisaría Grand Bourg",

  // SUBCOMISARÍA BARRIO POLICIAL
  "barrio policial": "Subcomisaría Barrio Policial",
  "villa cristina": "Subcomisaría Barrio Policial",
  "velez sarsfield": "Subcomisaría Barrio Policial",

  // SUBCOMISARÍA EL AYBAL
  "el aybal": "Subcomisaría El Aybal",
  "ampliacion el aybal": "Subcomisaría El Aybal",
  "sociedad rural": "Subcomisaría El Aybal",
  "predio rural": "Subcomisaría El Aybal",
  "acceso aeropuerto": "Subcomisaría El Aybal",

  // SUBCOMISARÍA DE EL HUAICO
  "escuela de cadetes": "Subcomisaría de El Huaico",

  // SUBCOMISARÍA DE ATOCHA
  "atocha i": "Subcomisaría de Atocha",
  "atocha ii": "Subcomisaría de Atocha",
  "atocha iii": "Subcomisaría de Atocha",
  "la cienaga": "Subcomisaría de Atocha",

  // DESTACAMENTO EL TRIÁNGULO
  "el triangulo": "Destacamento El Triángulo",

  // DESTACAMENTO LAS COSTAS
  "finca las costas": "Destacamento Las Costas",
  "la quebrada": "Destacamento Las Costas",
  "cordon occidental": "Destacamento Las Costas",

  // DESTACAMENTO PARQUE INDUSTRIAL
  "parque industrial": "Destacamento Parque Industrial",
  "barrio constitucion": "Destacamento Parque Industrial",
  "constitucion": "Destacamento Parque Industrial",

  // DESTACAMENTO LIMACHE
  "ipv limache": "Destacamento Limache",
  "limache industrial": "Destacamento Limache",
  "rotonda sur": "Destacamento Limache",

  // DESTACAMENTO SAN RAFAEL
  "san rafael": "Destacamento San Rafael",

  // DESTACAMENTO MERCADO COFRUTHOS
  "mercado cofruthos": "Destacamento Mercado Cofruthos",
  "av paraguay": "Destacamento Mercado Cofruthos",
  "avenida paraguay": "Destacamento Mercado Cofruthos",

  // DESTACAMENTO VILLA LAS ROSAS
  "villa las rosas": "Destacamento Villa Las Rosas",
  "ampliacion las rosas": "Destacamento Villa Las Rosas",
  "complejo penitenciario": "Destacamento Villa Las Rosas",
  "penal de salta": "Destacamento Villa Las Rosas",

  // DESTACAMENTO SAN IGNACIO
  "san ignacio": "Destacamento San Ignacio",
  "fraternidad": "Destacamento San Ignacio",
  "girasoles": "Destacamento San Ignacio",

  // BASE OPERATIVA SAN AGUSTÍN
  "san agustin": "Base Operativa San Agustín",
  "loteos industriales": "Base Operativa San Agustín",

  // PUESTO POLICIAL SAN LUIS CENTRO
  "villa san luis": "Puesto Policial San Luis Centro",
  "finca valdivia": "Puesto Policial San Luis Centro",
  "caballerizas": "Puesto Policial San Luis Centro",

  // DESTACAMENTO SAN CAYETANO
  "san cayetano": "Destacamento San Cayetano",
  "faldeos cerro 20 de febrero": "Destacamento San Cayetano",
  "cuarteles": "Destacamento San Cayetano",

  // SIN CONFLICTO
  "san benito": "Comisaría N°105 - La Merced",

  // ============================================================
  // BARRIOS CON MÚLTIPLES OPCIONES (el ciudadano elige)
  // ============================================================

  "grand bourg": [
    "Comisaría N°10 - Santa Cecilia",
    "Comisaría N°16 - El Centro",
    "Subcomisaría Grand Bourg",
    "Subcomisaría Grand Bourg Este",
  ],

  "la almudena": [
    "Comisaría N°10 - Santa Cecilia",
    "Comisaría N°16 - El Centro",
    "Comisaría N°19 - El Carril",
  ],
  "almudena": [
    "Comisaría N°10 - Santa Cecilia",
    "Comisaría N°16 - El Centro",
    "Comisaría N°19 - El Carril",
  ],

  "general mosconi": [
    "Comisaría N°14 - Campo Santo",
    "Comisaría N°24 - Centro Norte",
  ],

  "villa mitre": [
    "Comisaría N°4 - Villa Mitre",
    "Comisaría N°12 - Santa Ana I",
    "Subcomisaría Villa Mitre",
  ],

  "el sol": [
    "Comisaría N°12 - Santa Ana I",
    "Comisaría N°17 - Solidaridad",
    "Subcomisaría El Sol",
  ],
  "barrio el sol": [
    "Comisaría N°12 - Santa Ana I",
    "Comisaría N°17 - Solidaridad",
    "Subcomisaría El Sol",
  ],

  "juanita": [
    "Comisaría N°17 - Solidaridad",
    "Subcomisaría El Sol",
  ],
  "villa juanita": [
    "Comisaría N°17 - Solidaridad",
    "Subcomisaría El Sol",
  ],

  "santa lucia": [
    "Comisaría N°20 - La Ribera",
    "Subcomisaría Villa Asunción",
  ],

  "san carlos": [
    "Comisaría N°107 - San Carlos",
    "Subcomisaría Barrio Docente",
  ],

  "palermo": [
    "Comisaría N°104 - Palermo",
    "Subcomisaría Grand Bourg Este",
  ],

  "universitario": [
    "Comisaría N°3 - Tres Cerritos",
    "Comisaría N°14 - Campo Santo",
  ],
  "barrio universitario": [
    "Comisaría N°3 - Tres Cerritos",
    "Comisaría N°14 - Campo Santo",
  ],

  "las tunas": [
    "Comisaría N°101 - Santa Rita",
    "Comisaría N°118 - Cerveceros",
  ],

  "atocha": [
    "Comisaría N°102 - Atocha II",
    "Subcomisaría de Atocha",
  ],

  "villa esmeralda": [
    "Comisaría N°9 - Portezuelo Sur",
    "Comisaría N°15 - San Remo",
    "Destacamento Villa Rebeca",
  ],

  "villa rebeca": [
    "Comisaría N°9 - Portezuelo Sur",
    "Destacamento Villa Rebeca",
  ],

  "el huaico": [
    "Comisaría N°6 - Ciudad del Milagro",
    "Comisaría N°110 - Huaico II",
    "Subcomisaría de El Huaico",
  ],

  "mirasoles": [
    "Comisaría N°6 - Ciudad del Milagro",
    "Comisaría N°110 - Huaico II",
    "Subcomisaría de El Huaico",
  ],

  "san luis": [
    "Comisaría N°15 - San Remo",
    "Subcomisaría San Luis",
    "Puesto Policial San Luis Centro",
  ],

  "casa del sol": [
    "Comisaría N°15 - San Remo",
    "Subcomisaría San Luis",
  ],

  "portezuelo": [
    "Comisaría N°12 - Santa Ana I",
    "Destacamento Autódromo",
  ],

  "el tribuno": [
    "Comisaría N°7 - El Tribuno",
    "Comisaría N°13 - Cerrillos",
    "Subcomisaría Barrio Docente",
  ],

  "las costas": [
    "Comisaría N°16 - El Centro",
    "Destacamento Las Costas",
  ],

  "la loma": [
    "Comisaría N°16 - El Centro",
    "Subcomisaría Grand Bourg",
  ],

  "el tipal": [
    "Comisaría N°16 - El Centro",
    "Subcomisaría Grand Bourg",
  ],

  "san lorenzo chico": [
    "Comisaría N°9 - Portezuelo Sur",
    "Comisaría N°25 - San Lorenzo Chico",
  ],

  "autodromo": [
    "Comisaría N°12 - Santa Ana I",
    "Destacamento Autódromo",
  ],

  "ceferino": [
    "Comisaría N°2 - Santa Cecilia",
    "Destacamento Ceferino",
  ],

  "chachapoyas": [
    "Comisaría N°3 - Tres Cerritos",
    "Destacamento Chachapoyas",
  ],

  "casino": [
    "Destacamento Mercado Cofruthos",
    "Destacamento Barrio Casino",
  ],

  "villa chartas": [
    "Comisaría N°4 - Villa Mitre",
    "Subcomisaría Barrio Policial",
  ],

  "costanera": [
    "Subcomisaría Barrio Policial",
    "Subcomisaría Villa Asunción",
  ],

  "san martin": [
    "Comisaría N°4 - Villa Mitre",
    "Comisaría N°5 - Solidaridad",
  ],
};


// ============================================================
// DEPENDENCIAS POLICIALES (con coordenadas)
// Fallback si no hay corrección de barrio
// ============================================================
const DEPENDENCIAS_POLICIALES = [
  { nombre: "Comisaria N°105 - La Merced", lat: -24.970175, lon: -65.489828 },
  { nombre: "Comisaria N°106 - Limache", lat: -24.852619, lon: -65.431589 },
  { nombre: "Comisaria N°108 - Campo Quijano", lat: -24.9079653, lon: -65.6423614 },
  { nombre: "Comisaria N°100 - San Lorenzo", lat: -24.73125, lon: -65.490778 },
  { nombre: "Comisaria N°12 - Santa Ana I", lat: -24.857336, lon: -65.470575 },
  { nombre: "Comisaria N°13 - Cerrillos", lat: -24.903533, lon: -65.487753 },
  { nombre: "Comisaria N°14 - Campo Santo", lat: -24.681389, lon: -65.1032 },
  { nombre: "Comisaria N°15 - San Remo", lat: -24.829231, lon: -65.423578 },
  { nombre: "Comisaria N°8 - Santa Ana", lat: -24.807981, lon: -65.439922 },
  { nombre: "Comisaria N°7 - El Tribuno", lat: -24.846625, lon: -65.441169 },
  { nombre: "Comisaria N°6 - Ciudad del Milagro", lat: -24.723614, lon: -65.408431 },
  { nombre: "Comisaria N°3 - Tres Cerritos", lat: -24.764263, lon: -65.399474 },
  { nombre: "Comisaria N°4 - Villa Mitre", lat: -24.816072, lon: -65.378484 },
  { nombre: "Comisaria N°10 - Santa Cecilia", lat: -24.829139, lon: -65.397831 },
  { nombre: "Comisaria N°9 - Portezuelo Sur", lat: -24.796094, lon: -65.394222 },
  { nombre: "Comisaria N°101 - Santa Rita", lat: -24.663811, lon: -65.038328 },
  { nombre: "Comisaria N°102 - Atocha II", lat: -24.811761, lon: -65.459939 },
  { nombre: "Comisaria N°104 - Palermo", lat: -24.787304, lon: -65.459397 },
  { nombre: "Comisaria N°17 - Solidaridad", lat: -24.843314, lon: -65.396283 },
  { nombre: "Comisaria N°1 - Centro", lat: -24.786744, lon: -65.408122 },
  { nombre: "Comisaria N°5 - Solidaridad", lat: -24.7807724, lon: -65.4274511 },
  { nombre: "Comisaria N°2 - Santa Cecilia", lat: -24.799021, lon: -65.416157 },
  { nombre: "Comisaria N°11 - 17 de Octubre", lat: -24.71865, lon: -65.398062 },
];


// ============================================================
// LOCALIDADES DE SALTA (para el desplegable)
// ============================================================
const LOCALIDADES_SALTA = [
  "Salta (Capital)",
  "Aguaray", "Aguas Blancas", "Angastaco", "Animaná", "Apolinario Saravia",
  "Cachi", "Cafayate", "Campo Quijano", "Campo Santo", "Cerrillos",
  "Chicoana", "Colonia Santa Rosa", "Coronel Moldes", "El Bordo", "El Carril",
  "El Galpón", "El Jardín", "El Potrero", "El Quebrachal", "El Tala",
  "Embarcación", "General Ballivián", "General Güemes", "General Mosconi",
  "General Pizarro", "Guachipas", "Hipólito Yrigoyen", "Iruya", "Isla de Cañas",
  "Joaquín V. González", "La Caldera", "La Candelaria", "La Merced", "La Poma",
  "La Viña", "Las Lajitas", "Los Toldos", "Molinos", "Nazareno", "Payogasta",
  "Pichanal", "Profesor Salvador Mazza", "Río Piedras", "Rivadavia Banda Norte",
  "Rivadavia Banda Sur", "Rosario de la Frontera", "Rosario de Lerma",
  "San Antonio de los Cobres", "San Carlos", "San José de Metán", "San Lorenzo",
  "San Ramón de la Nueva Orán", "Santa Victoria Este", "Santa Victoria Oeste",
  "Seclantás", "Tartagal", "Tolar Grande", "Urundel", "Vaqueros",
];
