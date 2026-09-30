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
  // BARRIOS CON ASIGNACIÓN ÚNICA (automático) — Todos DDP 1
  // ============================================================

  // COMISARÍA N° 1 - Micro y Macrocentro
  "microcentro": "Comisaría N°1 - Centro (DDP 1)",
  "macrocentro": "Comisaría N°1 - Centro (DDP 1)",
  "cuadrante comercial": "Comisaría N°1 - Centro (DDP 1)",

  // COMISARÍA N° 2 - Zona Sur-Este
  "santa cecilia": "Comisaría N°2 - Santa Cecilia (DDP 1)",
  "villa san antonio": "Comisaría N°2 - Santa Cecilia (DDP 1)",
  "hernando de lerma": "Comisaría N°2 - Santa Cecilia (DDP 1)",

  // COMISARÍA N° 3 - Zona Norte
  "tres cerritos": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "jose vicente sola": "Comisaría N°3 - Tres Cerritos (DDP 1)",

  // COMISARÍA N° 4 - Zona Oeste Baja
  "pompilio guzman": "Comisaría N°4 - Villa Mitre (DDP 1)",
  "plaza las industrias": "Comisaría N°4 - Villa Mitre (DDP 1)",

  // COMISARÍA N° 5 - Zona Sur-Este Alta
  "solidaridad": "Comisaría N°5 - Solidaridad (DDP 1)",
  "juan calchaqui": "Comisaría N°5 - Solidaridad (DDP 1)",
  "provipo": "Comisaría N°5 - Solidaridad (DDP 1)",
  "campo caseros": "Comisaría N°5 - Solidaridad (DDP 1)",
  "el carmen": "Comisaría N°5 - Solidaridad (DDP 1)",

  // COMISARÍA N° 6 - Zona Norte Alta
  "ciudad del milagro": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
  "1 de mayo": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
  "primero de mayo": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",

  // COMISARÍA N° 7 - Zona Centro-Oeste / Alta
  "20 de febrero": "Comisaría N°7 - El Tribuno (DDP 1)",
  "veinte de febrero": "Comisaría N°7 - El Tribuno (DDP 1)",
  "villa belgrano": "Comisaría N°7 - El Tribuno (DDP 1)",
  "barrio pilar": "Comisaría N°7 - El Tribuno (DDP 1)",
  "villa lujan": "Comisaría N°7 - El Tribuno (DDP 1)",

  // COMISARÍA N° 8 - Zona Sur-Oeste
  "santa ana": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana i": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana ii": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana iii": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana iv": "Destacamento Santa Ana IV (DDP 1)",
  "santa ana 4": "Destacamento Santa Ana IV (DDP 1)",
  "aerolineas": "Comisaría N°8 - Santa Ana (DDP 1)",

  // COMISARÍA N° 9 - Zona Sudeste Baja
  "san jose": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "villa san lorenzo": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "portezuelo sur": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "la trinidad": "Comisaría N°9 - Portezuelo Sur (DDP 1)",

  // COMISARÍA N° 10 - Zona Norte / San Lorenzo
  "villa veraniega": "Comisaría N°10 - Santa Cecilia (DDP 1)",

  // COMISARÍA N° 11 - Zona Norte Periférica
  "juan pablo ii": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "juan pablo 2": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "17 de octubre": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "juan manuel de rosas": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "balneario": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "la tradicion": "Comisaría N°11 - 17 de Octubre (DDP 1)",

  // COMISARÍA N° 13 - Zona Sur (Ruta 26)
  "san remo": "Comisaría N°13 - Cerrillos (DDP 1)",
  "scalabrini ortiz": "Comisaría N°13 - Cerrillos (DDP 1)",
  "villa palacios": "Comisaría N°13 - Cerrillos (DDP 1)",

  // COMISARÍA N° 14 - Zona Norte
  "castanares": "Comisaría N°14 - Campo Santo (DDP 1)",
  "parque belgrano": "Comisaría N°14 - Campo Santo (DDP 1)",

  // COMISARÍA N° 15 - Zona Suroeste
  "valle hermoso": "Comisaría N°15 - San Remo (DDP 1)",

  // COMISARÍA N° 17 - Zona Sudeste (Bajo)
  "boulogne sur mer": "Comisaría N°17 - Solidaridad (DDP 1)",

  // COMISARÍA N° 18 - Zona Sudeste Periférica
  "san justo": "Comisaría N°18 - Chicoana (DDP 1)",
  "loteo esmeralda": "Comisaría N°18 - Chicoana (DDP 1)",
  "vertedero san javier": "Comisaría N°18 - Chicoana (DDP 1)",

  // COMISARÍA N° 19 - Zona Norte / Frontera
  "15 de febrero": "Comisaría N°19 - El Carril (DDP 1)",
  "quince de febrero": "Comisaría N°19 - El Carril (DDP 1)",

  // COMISARÍA N° 20 - Zona Oeste / Enlace
  "la ribera": "Comisaría N°20 - La Ribera (DDP 1)",
  "costas del rio arenas": "Comisaría N°20 - La Ribera (DDP 1)",
  "rio arenas": "Comisaría N°20 - La Ribera (DDP 1)",

  // COMISARÍA N° 24 - Zona Centro-Norte
  "lujan este": "Comisaría N°24 - Centro Norte (DDP 1)",
  "vias del ferrocarril": "Comisaría N°24 - Centro Norte (DDP 1)",

  // COMISARÍA N° 25 - Zona Oeste / San Lorenzo
  "circunvalacion oeste": "Comisaría N°25 - San Lorenzo Chico (DDP 1)",

  // COMISARÍA N° 101 - Zona Sur / Cerrillos
  "ruta 21": "Comisaría N°101 - Santa Rita (DDP 1)",

  // COMISARÍA N° 102 - Zona Sur-Este Extrema
  "la paz": "Comisaría N°102 - Atocha II (DDP 1)",
  "ampliacion solidaridad": "Comisaría N°102 - Atocha II (DDP 1)",

  // COMISARÍA N° 103 - Zona Oeste / San Lorenzo
  "nueva esperanza": "Comisaría N°103 - 17 de Octubre (DDP 1)",
  "pie del cerro": "Comisaría N°103 - 17 de Octubre (DDP 1)",

  // COMISARÍA N° 104 - Zona Oeste Alta
  "palermo i": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo ii": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo iii": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 1": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 2": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 3": "Comisaría N°104 - Palermo (DDP 1)",
  "roberto romero": "Comisaría N°104 - Palermo (DDP 1)",
  "divino nino": "Comisaría N°104 - Palermo (DDP 1)",
  "el progreso": "Comisaría N°104 - Palermo (DDP 1)",

  // COMISARÍA N° 105 - Zona Sudeste
  "siglo xxi": "Comisaría N°105 - La Merced (DDP 1)",
  "siglo 21": "Comisaría N°105 - La Merced (DDP 1)",
  "santa anita": "Comisaría N°105 - La Merced (DDP 1)",

  // COMISARÍA N° 106 - Zona Sur Plena
  "san francisco": "Comisaría N°106 - Limache (DDP 1)",
  "ciudad valdivia": "Comisaría N°106 - Limache (DDP 1)",
  "limache": "Comisaría N°106 - Limache (DDP 1)",

  // COMISARÍA N° 107 - Zona Sur / San Carlos
  "loteo san benito": "Comisaría N°107 - San Carlos (DDP 1)",
  "ex combatientes de malvinas": "Comisaría N°107 - San Carlos (DDP 1)",

  // COMISARÍA N° 108 - Zona Suroeste Extrema
  "santa clara de asis": "Comisaría N°108 - Campo Quijano (DDP 1)",
  "av kennedy": "Comisaría N°108 - Campo Quijano (DDP 1)",
  "avenida kennedy": "Comisaría N°108 - Campo Quijano (DDP 1)",

  // COMISARÍA N° 110 - Zona Norte / Huaico II
  "el huaico iv": "Comisaría N°110 - Huaico II (DDP 1)",
  "el huaico v": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico iv": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico v": "Comisaría N°110 - Huaico II (DDP 1)",
  "valle de lerma": "Comisaría N°110 - Huaico II (DDP 1)",

  // COMISARÍA N° 111 - Zona Sur / Limache Nuevo
  "loteo san gabriel": "Comisaría N°111 - Limache Nuevo (DDP 1)",
  "centro de convenciones": "Comisaría N°111 - Limache Nuevo (DDP 1)",
  "valdivia": "Comisaría N°111 - Limache Nuevo (DDP 1)",

  // COMISARÍA N° 112 - Zona Oeste de Enlace
  "la silleta norte": "Comisaría N°112 - La Silleta (DDP 1)",
  "la silleta": "Comisaría N°112 - La Silleta (DDP 1)",
  "las lenas": "Comisaría N°112 - La Silleta (DDP 1)",

  // COMISARÍA N° 115 - Zona Sudeste Extrema
  "el circulo": "Comisaría N°115 - El Círculo (DDP 1)",
  "solares de san jose": "Comisaría N°115 - El Círculo (DDP 1)",

  // COMISARÍA N° 118 - Zona Sudeste Nueva
  "cerveceros": "Comisaría N°118 - Cerveceros (DDP 1)",
  "las tunas norte": "Comisaría N°118 - Cerveceros (DDP 1)",
  "cooperativas ruta 26": "Comisaría N°118 - Cerveceros (DDP 1)",

  // SUBCOMISARÍA VILLA LAVALLE
  "villa lavalle": "Subcomisaría Villa Lavalle (DDP 1)",
  "papa francisco": "Subcomisaría Villa Lavalle (DDP 1)",
  "convivencia": "Subcomisaría Villa Lavalle (DDP 1)",

  // SUBCOMISARÍA BARRIO DOCENTE
  "barrio docente": "Subcomisaría Barrio Docente (DDP 1)",
  "docente": "Subcomisaría Barrio Docente (DDP 1)",
  "intersindical": "Subcomisaría Barrio Docente (DDP 1)",
  "periodista": "Subcomisaría Barrio Docente (DDP 1)",

  // SUBCOMISARÍA VILLA ASUNCIÓN
  "villa asuncion": "Subcomisaría Villa Asunción (DDP 1)",
  "villa costanera": "Subcomisaría Villa Asunción (DDP 1)",
  "solis pizarro": "Subcomisaría Villa Asunción (DDP 1)",

  // SUBCOMISARÍA GRAND BOURG
  "los perales": "Subcomisaría Grand Bourg Este (DDP 1)",
  "altos de grand bourg": "Subcomisaría Grand Bourg Este (DDP 1)",
  "centro administrativo": "Subcomisaría Grand Bourg (DDP 1)",

  // SUBCOMISARÍA BARRIO POLICIAL
  "barrio policial": "Subcomisaría Barrio Policial (DDP 1)",
  "villa cristina": "Subcomisaría Barrio Policial (DDP 1)",
  "velez sarsfield": "Subcomisaría Barrio Policial (DDP 1)",

  // SUBCOMISARÍA EL AYBAL
  "el aybal": "Subcomisaría El Aybal (DDP 1)",
  "ampliacion el aybal": "Subcomisaría El Aybal (DDP 1)",
  "sociedad rural": "Subcomisaría El Aybal (DDP 1)",
  "predio rural": "Subcomisaría El Aybal (DDP 1)",
  "acceso aeropuerto": "Subcomisaría El Aybal (DDP 1)",

  // SUBCOMISARÍA DE EL HUAICO
  "escuela de cadetes": "Subcomisaría de El Huaico (DDP 1)",

  // SUBCOMISARÍA DE ATOCHA
  "atocha i": "Subcomisaría de Atocha (DDP 1)",
  "atocha ii": "Subcomisaría de Atocha (DDP 1)",
  "atocha iii": "Subcomisaría de Atocha (DDP 1)",
  "la cienaga": "Subcomisaría de Atocha (DDP 1)",

  // DESTACAMENTO EL TRIÁNGULO
  "el triangulo": "Destacamento El Triángulo (DDP 1)",

  // DESTACAMENTO LAS COSTAS
  "finca las costas": "Destacamento Las Costas (DDP 1)",
  "la quebrada": "Destacamento Las Costas (DDP 1)",
  "cordon occidental": "Destacamento Las Costas (DDP 1)",

  // DESTACAMENTO PARQUE INDUSTRIAL
  "parque industrial": "Destacamento Parque Industrial (DDP 1)",
  "barrio constitucion": "Destacamento Parque Industrial (DDP 1)",
  "constitucion": "Destacamento Parque Industrial (DDP 1)",

  // DESTACAMENTO LIMACHE
  "ipv limache": "Destacamento Limache (DDP 1)",
  "limache industrial": "Destacamento Limache (DDP 1)",
  "rotonda sur": "Destacamento Limache (DDP 1)",

  // DESTACAMENTO SAN RAFAEL
  "san rafael": "Destacamento San Rafael (DDP 1)",

  // DESTACAMENTO MERCADO COFRUTHOS
  "mercado cofruthos": "Destacamento Mercado Cofruthos (DDP 1)",
  "av paraguay": "Destacamento Mercado Cofruthos (DDP 1)",
  "avenida paraguay": "Destacamento Mercado Cofruthos (DDP 1)",

  // DESTACAMENTO VILLA LAS ROSAS
  "villa las rosas": "Destacamento Villa Las Rosas (DDP 1)",
  "ampliacion las rosas": "Destacamento Villa Las Rosas (DDP 1)",
  "complejo penitenciario": "Destacamento Villa Las Rosas (DDP 1)",
  "penal de salta": "Destacamento Villa Las Rosas (DDP 1)",

  // DESTACAMENTO SAN IGNACIO
  "san ignacio": "Destacamento San Ignacio (DDP 1)",
  "fraternidad": "Destacamento San Ignacio (DDP 1)",
  "girasoles": "Destacamento San Ignacio (DDP 1)",

  // BASE OPERATIVA SAN AGUSTÍN
  "san agustin": "Base Operativa San Agustín (DDP 1)",
  "loteos industriales": "Base Operativa San Agustín (DDP 1)",

  // PUESTO POLICIAL SAN LUIS CENTRO
  "villa san luis": "Puesto Policial San Luis Centro (DDP 1)",
  "finca valdivia": "Puesto Policial San Luis Centro (DDP 1)",
  "caballerizas": "Puesto Policial San Luis Centro (DDP 1)",

  // DESTACAMENTO SAN CAYETANO
  "san cayetano": "Destacamento San Cayetano (DDP 1)",
  "faldeos cerro 20 de febrero": "Destacamento San Cayetano (DDP 1)",
  "cuarteles": "Destacamento San Cayetano (DDP 1)",

  // SIN CONFLICTO
  "san benito": "Comisaría N°105 - La Merced (DDP 1)",

  // ============================================================
  // BARRIOS CON MÚLTIPLES OPCIONES (el ciudadano elige) — DDP 1
  // ============================================================

  "grand bourg": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)",
    "Subcomisaría Grand Bourg Este (DDP 1)",
  ],

  "la almudena": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Comisaría N°19 - El Carril (DDP 1)",
  ],
  "almudena": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Comisaría N°19 - El Carril (DDP 1)",
  ],

  "general mosconi": [
    "Comisaría N°14 - Campo Santo (DDP 1)",
    "Comisaría N°24 - Centro Norte (DDP 1)",
  ],

  "villa mitre": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Subcomisaría Villa Mitre (DDP 1)",
  ],

  "el sol": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)",
  ],
  "barrio el sol": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)",
  ],

  "juanita": [
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)",
  ],
  "villa juanita": [
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)",
  ],

  "santa lucia": [
    "Comisaría N°20 - La Ribera (DDP 1)",
    "Subcomisaría Villa Asunción (DDP 1)",
  ],

  "san carlos": [
    "Comisaría N°107 - San Carlos (DDP 1)",
    "Subcomisaría Barrio Docente (DDP 1)",
  ],

  "palermo": [
    "Comisaría N°104 - Palermo (DDP 1)",
    "Subcomisaría Grand Bourg Este (DDP 1)",
  ],

  "universitario": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Comisaría N°14 - Campo Santo (DDP 1)",
  ],
  "barrio universitario": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Comisaría N°14 - Campo Santo (DDP 1)",
  ],

  "las tunas": [
    "Comisaría N°101 - Santa Rita (DDP 1)",
    "Comisaría N°118 - Cerveceros (DDP 1)",
  ],

  "atocha": [
    "Comisaría N°102 - Atocha II (DDP 1)",
    "Subcomisaría de Atocha (DDP 1)",
  ],

  "villa esmeralda": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Comisaría N°15 - San Remo (DDP 1)",
    "Destacamento Villa Rebeca (DDP 1)",
  ],

  "villa rebeca": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Destacamento Villa Rebeca (DDP 1)",
  ],

  "el huaico": [
    "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
    "Comisaría N°110 - Huaico II (DDP 1)",
    "Subcomisaría de El Huaico (DDP 1)",
  ],

  "mirasoles": [
    "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
    "Comisaría N°110 - Huaico II (DDP 1)",
    "Subcomisaría de El Huaico (DDP 1)",
  ],

  "san luis": [
    "Comisaría N°15 - San Remo (DDP 1)",
    "Subcomisaría San Luis (DDP 1)",
    "Puesto Policial San Luis Centro (DDP 1)",
  ],

  "casa del sol": [
    "Comisaría N°15 - San Remo (DDP 1)",
    "Subcomisaría San Luis (DDP 1)",
  ],

  "portezuelo": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Destacamento Autódromo (DDP 1)",
  ],

  "el tribuno": [
    "Comisaría N°7 - El Tribuno (DDP 1)",
    "Comisaría N°13 - Cerrillos (DDP 1)",
    "Subcomisaría Barrio Docente (DDP 1)",
  ],

  "las costas": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Destacamento Las Costas (DDP 1)",
  ],

  "la loma": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)",
  ],

  "el tipal": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)",
  ],

  "san lorenzo chico": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Comisaría N°25 - San Lorenzo Chico (DDP 1)",
  ],

  "autodromo": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Destacamento Autódromo (DDP 1)",
  ],

  "ceferino": [
    "Comisaría N°2 - Santa Cecilia (DDP 1)",
    "Destacamento Ceferino (DDP 1)",
  ],

  "chachapoyas": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Destacamento Chachapoyas (DDP 1)",
  ],

  "casino": [
    "Destacamento Mercado Cofruthos (DDP 1)",
    "Destacamento Barrio Casino (DDP 1)",
  ],

  "villa chartas": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Subcomisaría Barrio Policial (DDP 1)",
  ],

  "costanera": [
    "Subcomisaría Barrio Policial (DDP 1)",
    "Subcomisaría Villa Asunción (DDP 1)",
  ],

  "san martin": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Comisaría N°5 - Solidaridad (DDP 1)",
  ],
};


// ============================================================
// DEPENDENCIAS POLICIALES (con coordenadas)
// Fallback si no hay corrección de barrio
// ============================================================
const DEPENDENCIAS_POLICIALES = [
  // ==================== DDP 1 - SALTA CAPITAL ====================
  { nombre: "Comisaría N°1 - Centro (DDP 1)", lat: -24.786744, lon: -65.408122 },
  { nombre: "Comisaría N°2 - Santa Cecilia (DDP 1)", lat: -24.799021, lon: -65.416157 },
  { nombre: "Comisaría N°3 - Tres Cerritos (DDP 1)", lat: -24.764263, lon: -65.399474 },
  { nombre: "Comisaría N°4 - Villa Mitre (DDP 1)", lat: -24.816072, lon: -65.378484 },
  { nombre: "Comisaría N°5 - Solidaridad (DDP 1)", lat: -24.7807724, lon: -65.4274511 },
  { nombre: "Comisaría N°6 - Ciudad del Milagro (DDP 1)", lat: -24.723614, lon: -65.408431 },
  { nombre: "Comisaría N°7 - El Tribuno (DDP 1)", lat: -24.846625, lon: -65.441169 },
  { nombre: "Comisaría N°8 - Santa Ana (DDP 1)", lat: -24.807981, lon: -65.439922 },
  { nombre: "Comisaría N°9 - Portezuelo Sur (DDP 1)", lat: -24.796094, lon: -65.394222 },
  { nombre: "Comisaría N°10 - Santa Cecilia (DDP 1)", lat: -24.829139, lon: -65.397831 },
  { nombre: "Comisaría N°11 - 17 de Octubre (DDP 1)", lat: -24.71865, lon: -65.398062 },
  { nombre: "Comisaría N°12 - Santa Ana I (DDP 1)", lat: -24.857336, lon: -65.470575 },
  { nombre: "Comisaría N°13 - Cerrillos (DDP 1)", lat: -24.903533, lon: -65.487753 },
  { nombre: "Comisaría N°14 - Campo Santo (DDP 1)", lat: -24.681389, lon: -65.1032 },
  { nombre: "Comisaría N°15 - San Remo (DDP 1)", lat: -24.829231, lon: -65.423578 },
  { nombre: "Comisaría N°16 - El Centro (DDP 1)" },
  { nombre: "Comisaría N°17 - Solidaridad (DDP 1)", lat: -24.843314, lon: -65.396283 },
  { nombre: "Comisaría N°18 - Chicoana (DDP 1)" },
  { nombre: "Comisaría N°19 - El Carril (DDP 1)" },
  { nombre: "Comisaría N°20 - La Ribera (DDP 1)" },
  { nombre: "Comisaría N°24 - Centro Norte (DDP 1)" },
  { nombre: "Comisaría N°25 - San Lorenzo Chico (DDP 1)" },
  { nombre: "Comisaría N°100 - San Lorenzo (DDP 1)", lat: -24.73125, lon: -65.490778 },
  { nombre: "Comisaría N°101 - Santa Rita (DDP 1)", lat: -24.663811, lon: -65.038328 },
  { nombre: "Comisaría N°102 - Atocha II (DDP 1)", lat: -24.811761, lon: -65.459939 },
  { nombre: "Comisaría N°103 - 17 de Octubre (DDP 1)" },
  { nombre: "Comisaría N°104 - Palermo (DDP 1)", lat: -24.787304, lon: -65.459397 },
  { nombre: "Comisaría N°105 - La Merced (DDP 1)", lat: -24.970175, lon: -65.489828 },
  { nombre: "Comisaría N°106 - Limache (DDP 1)", lat: -24.852619, lon: -65.431589 },
  { nombre: "Comisaría N°107 - San Carlos (DDP 1)" },
  { nombre: "Comisaría N°108 - Campo Quijano (DDP 1)", lat: -24.9079653, lon: -65.6423614 },
  { nombre: "Comisaría N°110 - Huaico II (DDP 1)" },
  { nombre: "Comisaría N°111 - Limache Nuevo (DDP 1)" },
  { nombre: "Comisaría N°112 - La Silleta (DDP 1)" },
  { nombre: "Comisaría N°115 - El Círculo (DDP 1)" },
  { nombre: "Comisaría N°118 - Cerveceros (DDP 1)" },
  { nombre: "Subcomisaría Villa Lavalle (DDP 1)" },
  { nombre: "Subcomisaría Barrio Docente (DDP 1)" },
  { nombre: "Subcomisaría Villa Asunción (DDP 1)" },
  { nombre: "Subcomisaría Grand Bourg (DDP 1)" },
  { nombre: "Subcomisaría Grand Bourg Este (DDP 1)" },
  { nombre: "Subcomisaría Barrio Policial (DDP 1)" },
  { nombre: "Subcomisaría El Aybal (DDP 1)" },
  { nombre: "Subcomisaría de El Huaico (DDP 1)" },
  { nombre: "Subcomisaría de Atocha (DDP 1)" },
  { nombre: "Destacamento El Triángulo (DDP 1)" },
  { nombre: "Destacamento Las Costas (DDP 1)" },
  { nombre: "Destacamento Parque Industrial (DDP 1)" },
  { nombre: "Destacamento Limache (DDP 1)" },
  { nombre: "Destacamento San Rafael (DDP 1)" },
  { nombre: "Destacamento Mercado Cofruthos (DDP 1)" },
  { nombre: "Destacamento Villa Las Rosas (DDP 1)" },
  { nombre: "Destacamento San Ignacio (DDP 1)" },
  { nombre: "Destacamento San Cayetano (DDP 1)" },
  { nombre: "Base Operativa San Agustín (DDP 1)" },
  { nombre: "Puesto Policial San Luis Centro (DDP 1)" },

  // ==================== DDP 2 - ORÁN ====================
  { nombre: "Comisaría 1 - Orán (DDP 2)" },
  { nombre: "Puerto Policial Estación (DDP 2)" },
  { nombre: "Comisaría 2 - Hipólito Yrigoyen (DDP 2)" },
  { nombre: "Destacamento Tabacal (DDP 2)" },
  { nombre: "Comisaría 3 - Docente (DDP 2)" },
  { nombre: "Destacamento Balut (DDP 2)" },
  { nombre: "Comisaría 4 - Aeroparque (DDP 2)" },
  { nombre: "Subcomisaría 9 de Julio (DDP 2)" },
  { nombre: "Comisaría 5 - Aguas Blancas (DDP 2)" },
  { nombre: "Subcomisaría Los Toldos (DDP 2)" },
  { nombre: "Destacamento Isla de Cañas (DDP 2)" },
  { nombre: "Destacamento Los Naranjos (DDP 2)" },

  // ==================== DDP 3 - METÁN ====================
  { nombre: "Comisaría 1 - Metán (DDP 3)" },
  { nombre: "Comisaría 2 - El Galpón (DDP 3)" },
  { nombre: "Destacamento Lumbreras (DDP 3)" },
  { nombre: "Destacamento Río Piedras (DDP 3)" },
  { nombre: "Puerto Policial El Tunal (DDP 3)" },
  { nombre: "Destacamento El Naranjo (DDP 3)" },
  { nombre: "Destacamento San Felipe (DDP 3)" },

  // ==================== DDP 4 - TARTAGAL ====================
  { nombre: "Comisaría 1 - Salvador Mazza (DDP 4)" },
  { nombre: "Comisaría 5 - Aguaray (DDP 4)" },
  { nombre: "Destacamento Acambuco (DDP 4)" },
  { nombre: "Destacamento Alto Verde (DDP 4)" },
  { nombre: "Comisaría 2 - Mosconi (DDP 4)" },
  { nombre: "Destacamento Coronel Cornejo (DDP 4)" },
  { nombre: "Puerto Policial Aeroparque Mosconi (DDP 4)" },
  { nombre: "Subcomisaría Vespucio (DDP 4)" },
  { nombre: "Comisaría 3 - Tartagal Centro (DDP 4)" },
  { nombre: "Comisaría 4 - El Portico (DDP 4)" },
  { nombre: "Destacamento Villa Güemes (DDP 4)" },
  { nombre: "Destacamento Alto La Sierra (DDP 4)" },
  { nombre: "Subcomisaría Santa Victoria Este (DDP 4)" },

  // ==================== DDP 5 - J. V. GONZÁLEZ ====================
  { nombre: "Comisaría 1 - Joaquín V. González (DDP 5)" },
  { nombre: "Destacamento 25 de Junio (DDP 5)" },
  { nombre: "Destacamento Gaona (DDP 5)" },
  { nombre: "Destacamento Los Rosales (DDP 5)" },
  { nombre: "Destacamento San José de Orquera (DDP 5)" },
  { nombre: "Destacamento Talavera (DDP 5)" },
  { nombre: "Subcomisaría El Quebrachal (DDP 5)" },
  { nombre: "Destacamento Tolloiche (DDP 5)" },

  // ==================== DDP 6 - CAFAYATE ====================
  { nombre: "Comisaría 60 - Cafayate (DDP 6)" },
  { nombre: "Destacamento Angastaco (DDP 6)" },
  { nombre: "Destacamento Animana (DDP 6)" },
  { nombre: "Subcomisaría San Carlos (DDP 6)" },

  // ==================== DDP 7 - GÜEMES ====================
  { nombre: "Comisaría 1 - Gral. Güemes (DDP 7)" },
  { nombre: "Comisaría 3 - La Banda (DDP 7)" },
  { nombre: "Puerto Policial Parque Industrial (DDP 7)" },
  { nombre: "Comisaría 2 - Campo Santo (DDP 7)" },
  { nombre: "Destacamento Betania (DDP 7)" },
  { nombre: "Destacamento Cobos (DDP 7)" },
  { nombre: "Subcomisaría El Bordo (DDP 7)" },

  // ==================== DDP 8 - PICHANAL ====================
  { nombre: "Comisaría 1 - Pichanal (DDP 8)" },
  { nombre: "Comisaría 2 - Colonia Santa Rosa (DDP 8)" },
  { nombre: "Destacamento Urundel (DDP 8)" },
  { nombre: "Subcomisaría Las Palmeras (DDP 8)" },
  { nombre: "Destacamento La Unión (DDP 8)" },
  { nombre: "Destacamento Rivadavia Banda Sur (DDP 8)" },

  // ==================== DDP 9 - LAS LAJITAS ====================
  { nombre: "Comisaría 1 - Las Lajitas (DDP 9)" },
  { nombre: "Destacamento Piquete Cabado (DDP 9)" },
  { nombre: "Destacamento Río del Valle (DDP 9)" },
  { nombre: "Destacamento Gral. Pizarro (DDP 9)" },
  { nombre: "Destacamento Luis Burela (DDP 9)" },
  { nombre: "Destacamento Mollinedo (DDP 9)" },
  { nombre: "Subcomisaría El Dorado (DDP 9)" },

  // ==================== DDP 10 - ROSARIO DE LERMA ====================
  { nombre: "Comisaría 4 (DDP 10)" },
  { nombre: "Comisaría 6 (DDP 10)" },
  { nombre: "Destacamento Palacios (DDP 10)" },
  { nombre: "Comisaría 1 (DDP 10)" },
  { nombre: "Comisaría 3 (DDP 10)" },
  { nombre: "Destacamento Docente (DDP 10)" },
  { nombre: "Destacamento San Carlos (DDP 10)" },
  { nombre: "Comisaría 2 (DDP 10)" },
  { nombre: "Destacamento San Ignacio (DDP 10)" },
  { nombre: "Subcomisaría Lavalle (DDP 10)" },
  { nombre: "Comisaría 5 (DDP 10)" },
  { nombre: "Comisaría 7 (DDP 10)" },
  { nombre: "Comisaría 9 (DDP 10)" },
  { nombre: "Destacamento La Silleta (DDP 10)" },
  { nombre: "Subcomisaría San Antonio (DDP 10)" },

  // ==================== DDP 11 - ROSARIO DE LA FRONTERA ====================
  { nombre: "Comisaría 1 - Cerillos (DDP 11)" },
  { nombre: "Comisaría 5 - La Merced (DDP 11)" },
  { nombre: "Comisaría 7 - Pinares (DDP 11)" },
  { nombre: "Destacamento La Isla (DDP 11)" },
  { nombre: "Destacamento San Agustín (DDP 11)" },
  { nombre: "Subcomisaría Los Alamos (DDP 11)" },
  { nombre: "Comisaría 2 - Rosario de la Frontera (DDP 11)" },
  { nombre: "Comisaría 3 - Chicoana (DDP 11)" },
  { nombre: "Comisaría 4 - El Carril (DDP 11)" },
  { nombre: "Comisaría 6 - Moldes (DDP 11)" },
  { nombre: "Subcomisaría Guachipas (DDP 11)" },
  { nombre: "Subcomisaría La Viña (DDP 11)" },
  { nombre: "Subcomisaría San Jorge (DDP 11)" },

  // ==================== DDP 12 - CACHI ====================
  { nombre: "Comisaría 1 - Cachi (DDP 12)" },
  { nombre: "Destacamento La Poma (DDP 12)" },
  { nombre: "Destacamento Palermo Oeste (DDP 12)" },
  { nombre: "Destacamento Payogasta (DDP 12)" },
  { nombre: "Comisaría 2 - Molinos (DDP 12)" },
  { nombre: "Destacamento Luracatao (DDP 12)" },
  { nombre: "Destacamento Seclantas (DDP 12)" },

  // ==================== DDP 13 - ROSARIO DE LA FRONTERA ====================
  { nombre: "Comisaría 1 - Rosario de la Frontera (DDP 13)" },
  { nombre: "Destacamento Antillas (DDP 13)" },
  { nombre: "Destacamento Potreros (DDP 13)" },
  { nombre: "Subcomisaría El Mirador (DDP 13)" },
  { nombre: "Destacamento El Jardín (DDP 13)" },
  { nombre: "Destacamento La Candelaria (DDP 13)" },
  { nombre: "Subcomisaría El Tala (DDP 13)" },

  // ==================== DDP 14 - EMBARCACIÓN ====================
  { nombre: "Comisaría 1 - Embarcación (DDP 14)" },
  { nombre: "Destacamento Padre Lozano (DDP 14)" },
  { nombre: "Destacamento Gral. Ballivian (DDP 14)" },
  { nombre: "Comisaría 2 - Coronel Juan Solá (DDP 14)" },
  { nombre: "Destacamento Dragones (DDP 14)" },
  { nombre: "Destacamento Hickman (DDP 14)" },
  { nombre: "Destacamento Los Blancos (DDP 14)" },
  { nombre: "Puesto La Pluma de Pato (DDP 14)" },
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
