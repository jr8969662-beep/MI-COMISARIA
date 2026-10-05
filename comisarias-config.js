/*
  Configuración de comisarías de Salta
*/

const CORRECCIONES_BARRIO = {
  // ==================== DDP 1 - SALTA CAPITAL ====================

  // === Comisaría N°1 - Centro ===
  "microcentro": "Comisaría N°1 - Centro (DDP 1)",
  "macrocentro": "Comisaría N°1 - Centro (DDP 1)",
  "cuadrante comercial": "Comisaría N°1 - Centro (DDP 1)",
  "centro": "Comisaría N°1 - Centro (DDP 1)",
  "lerma": "Comisaría N°1 - Centro (DDP 1)",
  "san antonio": "Comisaría N°1 - Centro (DDP 1)",
  "villa arenales": "Comisaría N°1 - Centro (DDP 1)",

  // === Comisaría N°2 - Santa Cecilia ===
  "santa cecilia": "Comisaría N°2 - Santa Cecilia (DDP 1)",
  "hernando de lerma": "Comisaría N°2 - Santa Cecilia (DDP 1)",
  "villa san antonio": [
    "Comisaría N°1 - Centro (DDP 1)",
    "Comisaría N°2 - Santa Cecilia (DDP 1)"
  ],
  "villa cristina": [
    "Comisaría N°2 - Santa Cecilia (DDP 1)",
    "Subcomisaría Barrio Policial (DDP 1)"
  ],
  "ceferino": [
    "Comisaría N°2 - Santa Cecilia (DDP 1)",
    "Destacamento Ceferino (DDP 1)"
  ],

  // === Comisaría N°3 - Tres Cerritos ===
  "tres cerritos": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "jose vicente sola": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "vicente sola": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "lamadrid": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "dr miguel ortiz": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "el pilar": "Comisaría N°3 - Tres Cerritos (DDP 1)",
  "chachapoyas": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Destacamento Chachapoyas (DDP 1)"
  ],

  // === Comisaría N°4 - Villa Mitre ===
  "pompilio guzman": "Comisaría N°4 - Villa Mitre (DDP 1)",
  "plaza las industrias": "Comisaría N°4 - Villa Mitre (DDP 1)",
  "villa mitre": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Subcomisaría Villa Mitre (DDP 1)"
  ],

  // === Comisaría N°5 - San Martín (DDP 1) ===
  "san martin": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Comisaría N°5 - San Martín (DDP 1)"
  ],
  "campo caseros": "Comisaría N°5 - San Martín (DDP 1)",
  "el carmen": "Comisaría N°5 - San Martín (DDP 1)",
  "20 de febrero": "Comisaría N°5 - San Martín (DDP 1)",
  "veinte de febrero": "Comisaría N°5 - San Martín (DDP 1)",
  "villa lujan": "Comisaría N°5 - San Martín (DDP 1)",
  "juan calchaqui": "Comisaría N°5 - San Martín (DDP 1)",
  "provipo": "Comisaría N°5 - San Martín (DDP 1)",

  // === Comisaría N°5 - Solidaridad (DDP 10) ===
  "solidaridad": "Comisaría 5 (DDP 10)",
  "la paz": "Comisaría 5 (DDP 10)",
  "norte grande": "Comisaría 5 (DDP 10)",

  // === Comisaría N°6 - Ciudad del Milagro ===
  "ciudad del milagro": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
  "1 de mayo": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
  "primero de mayo": "Comisaría N°6 - Ciudad del Milagro (DDP 1)",

  // === Comisaría N°7 - El Tribuno ===
  "villa belgrano": "Comisaría N°7 - El Tribuno (DDP 1)",
  "barrio pilar": "Comisaría N°7 - El Tribuno (DDP 1)",
  "el tribuno": [
    "Comisaría N°7 - El Tribuno (DDP 1)",
    "Comisaría N°13 - Cerrillos (DDP 1)",
    "Subcomisaría Barrio Docente (DDP 1)"
  ],

  // === Comisaría N°8 - Santa Ana ===
  "santa ana": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana i": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana ii": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana iii": "Comisaría N°8 - Santa Ana (DDP 1)",
  "santa ana iv": "Destacamento Santa Ana IV (DDP 1)",
  "santa ana 4": "Destacamento Santa Ana IV (DDP 1)",
  "aerolineas": "Comisaría N°8 - Santa Ana (DDP 1)",

  // === Comisaría N°9 - Portezuelo Sur ===
  "san jose": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "villa san lorenzo": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "portezuelo sur": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "la trinidad": "Comisaría N°9 - Portezuelo Sur (DDP 1)",
  "portezuelo": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Destacamento Autódromo (DDP 1)"
  ],
  "san lorenzo chico": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Comisaría N°25 - San Lorenzo Chico (DDP 1)"
  ],

  // === Comisaría N°10 - Santa Cecilia ===
  "villa veraniega": "Comisaría N°10 - Santa Cecilia (DDP 1)",

  // === Comisaría N°11 - 17 de Octubre ===
  "juan pablo ii": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "juan pablo 2": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "juan pablo ii sur": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "17 de octubre": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "diecisiete de octubre": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "juan manuel de rosas": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "balneario": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "la tradicion": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "union": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "leopoldo lugones": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "patricia heitman": "Comisaría N°11 - 17 de Octubre (DDP 1)",
  "17 de mayo": "Comisaría N°11 - 17 de Octubre (DDP 1)",

  // === Comisaría N°12 - Santa Ana I ===
  "el sol": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)"
  ],
  "barrio el sol": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)"
  ],

  // === Comisaría N°13 - Cerrillos ===
  "san remo": "Comisaría N°13 - Cerrillos (DDP 1)",
  "scalabrini ortiz": "Comisaría N°13 - Cerrillos (DDP 1)",
  "villa palacios": "Comisaría N°13 - Cerrillos (DDP 1)",

  // === Comisaría N°14 - Campo Santo (Castañares) ===
  "castanares": "Comisaría N°14 - Campo Santo (DDP 1)",
  "castañares": "Comisaría N°14 - Campo Santo (DDP 1)",
  "parque belgrano": "Comisaría N°14 - Campo Santo (DDP 1)",
  "parque general belgrano": "Comisaría N°14 - Campo Santo (DDP 1)",

  // === Comisaría N°15 - San Remo ===
  "valle hermoso": "Comisaría N°15 - San Remo (DDP 1)",
  "san luis": [
    "Comisaría N°15 - San Remo (DDP 1)",
    "Subcomisaría San Luis (DDP 1)",
    "Puesto Policial San Luis Centro (DDP 1)"
  ],
  "casa del sol": [
    "Comisaría N°15 - San Remo (DDP 1)",
    "Subcomisaría San Luis (DDP 1)"
  ],

  // === Comisaría N°16 - Grand Bourg / El Centro ===
  "grand bourg": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)",
    "Subcomisaría Grand Bourg Este (DDP 1)"
  ],
  "las leñas": "Comisaría N°16 - El Centro (DDP 1)",
  "las leñas i": "Comisaría N°16 - El Centro (DDP 1)",
  "las leñas ii": "Comisaría N°16 - El Centro (DDP 1)",
  "las leñas iii": "Comisaría N°16 - El Centro (DDP 1)",
  "las lenas": "Comisaría N°16 - El Centro (DDP 1)",
  "las magdalenas": "Comisaría N°16 - El Centro (DDP 1)",
  "la alborada": "Comisaría N°16 - El Centro (DDP 1)",
  "procrear": "Comisaría N°16 - El Centro (DDP 1)",
  "puerto argentino": "Comisaría N°16 - El Centro (DDP 1)",
  "lomas de medeiros": "Comisaría N°16 - El Centro (DDP 1)",
  "lomas de medeiro": "Comisaría N°16 - El Centro (DDP 1)",
  "los pinos i": "Comisaría N°16 - El Centro (DDP 1)",
  "los pinos ii": "Comisaría N°16 - El Centro (DDP 1)",
  "los pinos iii": "Comisaría N°16 - El Centro (DDP 1)",
  "los profesionales": "Comisaría N°16 - El Centro (DDP 1)",
  "nuestra señora del carmen": "Comisaría N°16 - El Centro (DDP 1)",
  "las costas": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Destacamento Las Costas (DDP 1)"
  ],
  "la loma": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)"
  ],
  "el tipal": [
    "Comisaría N°16 - El Centro (DDP 1)",
    "Subcomisaría Grand Bourg (DDP 1)"
  ],
  "los perales": "Subcomisaría Grand Bourg Este (DDP 1)",
  "altos de grand bourg": "Subcomisaría Grand Bourg Este (DDP 1)",
  "centro administrativo": "Subcomisaría Grand Bourg (DDP 1)",

  // === Comisaría N°17 - Solidaridad ===
  "boulogne sur mer": "Comisaría N°17 - Solidaridad (DDP 1)",
  "juanita": [
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)"
  ],
  "villa juanita": [
    "Comisaría N°17 - Solidaridad (DDP 1)",
    "Subcomisaría El Sol (DDP 1)"
  ],

  // === Comisaría N°18 - Chicoana ===
  "san justo": "Comisaría N°18 - Chicoana (DDP 1)",
  "loteo esmeralda": "Comisaría N°18 - Chicoana (DDP 1)",
  "vertedero san javier": "Comisaría N°18 - Chicoana (DDP 1)",

  // === Comisaría N°19 - El Carril ===
  "15 de febrero": "Comisaría N°19 - El Carril (DDP 1)",
  "quince de febrero": "Comisaría N°19 - El Carril (DDP 1)",

  // === Comisaría N°20 - La Ribera ===
  "la ribera": "Comisaría N°20 - La Ribera (DDP 1)",
  "costas del rio arenas": "Comisaría N°20 - La Ribera (DDP 1)",
  "rio arenas": "Comisaría N°20 - La Ribera (DDP 1)",

  // === Comisaría N°24 - Centro Norte ===
  "lujan este": "Comisaría N°24 - Centro Norte (DDP 1)",
  "vias del ferrocarril": "Comisaría N°24 - Centro Norte (DDP 1)",

  // === Comisaría N°25 - San Lorenzo Chico ===
  "circunvalacion oeste": "Comisaría N°25 - San Lorenzo Chico (DDP 1)",

  // === Comisaría N°101 - Santa Rita ===
  "ruta 21": "Comisaría N°101 - Santa Rita (DDP 1)",
  "las tunas": [
    "Comisaría N°101 - Santa Rita (DDP 1)",
    "Comisaría N°118 - Cerveceros (DDP 1)"
  ],

  // === Comisaría N°102 - Atocha II ===
  "ampliacion solidaridad": "Comisaría N°102 - Atocha II (DDP 1)",
  "atocha": [
    "Comisaría N°102 - Atocha II (DDP 1)",
    "Subcomisaría de Atocha (DDP 1)"
  ],
  "atocha i": "Subcomisaría de Atocha (DDP 1)",
  "atocha ii": "Subcomisaría de Atocha (DDP 1)",
  "atocha iii": "Subcomisaría de Atocha (DDP 1)",
  "la cienaga": "Subcomisaría de Atocha (DDP 1)",

  // === Comisaría N°103 - 17 de Octubre ===
  "nueva esperanza": "Comisaría N°103 - 17 de Octubre (DDP 1)",
  "nueva esperanza i": "Comisaría N°103 - 17 de Octubre (DDP 1)",
  "nueva esperanza ii": "Comisaría N°103 - 17 de Octubre (DDP 1)",
  "pie del cerro": "Comisaría N°103 - 17 de Octubre (DDP 1)",

  // === Comisaría N°104 - Palermo ===
  "palermo": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo i": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo ii": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo iii": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 1": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 2": "Comisaría N°104 - Palermo (DDP 1)",
  "palermo 3": "Comisaría N°104 - Palermo (DDP 1)",
  "roberto romero": "Comisaría N°104 - Palermo (DDP 1)",
  "divino nino": "Comisaría N°104 - Palermo (DDP 1)",
  "divino niño": "Comisaría N°104 - Palermo (DDP 1)",
  "divino nino de jesus i": "Comisaría N°104 - Palermo (DDP 1)",
  "divino nino de jesus ii": "Comisaría N°104 - Palermo (DDP 1)",
  "jesus maria": "Comisaría N°104 - Palermo (DDP 1)",
  "gustavo leguizamon": "Comisaría N°104 - Palermo (DDP 1)",
  "las palmeritas": "Comisaría N°104 - Palermo (DDP 1)",
  "las palmeras": "Comisaría N°104 - Palermo (DDP 1)",
  "san ramon": "Comisaría N°104 - Palermo (DDP 1)",
  "el progreso": "Comisaría N°104 - Palermo (DDP 1)",
  "alto la viña": [
    "Comisaría N°104 - Palermo (DDP 1)",
    "Subcomisaría San Lorenzo (DDP 1)"
  ],

  // === Comisaría N°105 - La Merced ===
  "siglo xxi": "Comisaría N°105 - La Merced (DDP 1)",
  "siglo 21": "Comisaría N°105 - La Merced (DDP 1)",
  "santa anita": "Comisaría N°105 - La Merced (DDP 1)",
  "san benito": "Comisaría N°105 - La Merced (DDP 1)",

  // === Comisaría N°106 - Limache ===
  "san francisco": "Comisaría N°106 - Limache (DDP 1)",
  "ciudad valdivia": "Comisaría N°106 - Limache (DDP 1)",
  "limache": "Comisaría N°106 - Limache (DDP 1)",

  // === Comisaría N°107 - San Carlos ===
  "loteo san benito": "Comisaría N°107 - San Carlos (DDP 1)",
  "ex combatientes de malvinas": "Comisaría N°107 - San Carlos (DDP 1)",
  "san carlos": [
    "Comisaría N°107 - San Carlos (DDP 1)",
    "Subcomisaría Barrio Docente (DDP 1)"
  ],

  // === Comisaría N°108 - Campo Quijano ===
  "santa clara de asis": "Comisaría N°108 - Campo Quijano (DDP 1)",
  "av kennedy": "Comisaría N°108 - Campo Quijano (DDP 1)",
  "avenida kennedy": "Comisaría N°108 - Campo Quijano (DDP 1)",

  // === Comisaría N°110 - Huaico II ===
  "el huaico iv": "Comisaría N°110 - Huaico II (DDP 1)",
  "el huaico v": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico iv": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico v": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico i": "Comisaría N°110 - Huaico II (DDP 1)",
  "huaico ii": "Comisaría N°110 - Huaico II (DDP 1)",
  "valle de lerma": "Comisaría N°110 - Huaico II (DDP 1)",
  "el huaico": [
    "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
    "Comisaría N°110 - Huaico II (DDP 1)",
    "Subcomisaría de El Huaico (DDP 1)"
  ],
  "mirasoles": [
    "Comisaría N°6 - Ciudad del Milagro (DDP 1)",
    "Comisaría N°110 - Huaico II (DDP 1)",
    "Subcomisaría de El Huaico (DDP 1)"
  ],
  "escuela de cadetes": "Subcomisaría de El Huaico (DDP 1)",

  // === Comisaría N°111 - Limache Nuevo ===
  "loteo san gabriel": "Comisaría N°111 - Limache Nuevo (DDP 1)",
  "centro de convenciones": "Comisaría N°111 - Limache Nuevo (DDP 1)",
  "valdivia": "Comisaría N°111 - Limache Nuevo (DDP 1)",

  // === Comisaría N°112 - La Silleta ===
  "la silleta norte": "Comisaría N°112 - La Silleta (DDP 1)",
  "la silleta": "Comisaría N°112 - La Silleta (DDP 1)",
  "las lenas": "Comisaría N°112 - La Silleta (DDP 1)",

  // === Comisaría N°115 - El Círculo ===
  "el circulo": "Comisaría N°115 - El Círculo (DDP 1)",
  "solares de san jose": "Comisaría N°115 - El Círculo (DDP 1)",

  // === Comisaría N°118 - Cerveceros ===
  "cerveceros": "Comisaría N°118 - Cerveceros (DDP 1)",
  "las tunas norte": "Comisaría N°118 - Cerveceros (DDP 1)",
  "cooperativas ruta 26": "Comisaría N°118 - Cerveceros (DDP 1)",

  // === Subcomisaría Villa Lavalle ===
  "villa lavalle": "Subcomisaría Villa Lavalle (DDP 1)",
  "papa francisco": "Subcomisaría Villa Lavalle (DDP 1)",
  "convivencia": "Subcomisaría Villa Lavalle (DDP 1)",

  // === Subcomisaría Barrio Docente ===
  "barrio docente": "Subcomisaría Barrio Docente (DDP 1)",
  "docente": "Subcomisaría Barrio Docente (DDP 1)",
  "intersindical": "Subcomisaría Barrio Docente (DDP 1)",
  "periodista": "Subcomisaría Barrio Docente (DDP 1)",

  // === Subcomisaría Villa Asunción ===
  "villa asuncion": "Subcomisaría Villa Asunción (DDP 1)",
  "villa costanera": "Subcomisaría Villa Asunción (DDP 1)",
  "solis pizarro": "Subcomisaría Villa Asunción (DDP 1)",
  "garcia basalo": "Subcomisaría Villa Asunción (DDP 1)",
  "bicentenario": "Subcomisaría Villa Asunción (DDP 1)",

  // === Subcomisaría Barrio Policial ===
  "barrio policial": "Subcomisaría Barrio Policial (DDP 1)",
  "velez sarsfield": "Subcomisaría Barrio Policial (DDP 1)",
  "villa chartas": [
    "Comisaría N°4 - Villa Mitre (DDP 1)",
    "Subcomisaría Barrio Policial (DDP 1)"
  ],
  "costanera": [
    "Subcomisaría Barrio Policial (DDP 1)",
    "Subcomisaría Villa Asunción (DDP 1)"
  ],

  // === Subcomisaría El Aybal ===
  "el aybal": "Subcomisaría El Aybal (DDP 1)",
  "ampliacion el aybal": "Subcomisaría El Aybal (DDP 1)",
  "sociedad rural": "Subcomisaría El Aybal (DDP 1)",
  "predio rural": "Subcomisaría El Aybal (DDP 1)",
  "acceso aeropuerto": "Subcomisaría El Aybal (DDP 1)",

  // === Destacamentos ===
  "el triangulo": "Destacamento El Triángulo (DDP 1)",
  "finca las costas": "Destacamento Las Costas (DDP 1)",
  "la quebrada": "Destacamento Las Costas (DDP 1)",
  "cordon occidental": "Destacamento Las Costas (DDP 1)",
  "parque industrial": "Destacamento Parque Industrial (DDP 1)",
  "barrio constitucion": "Destacamento Parque Industrial (DDP 1)",
  "constitucion": "Destacamento Parque Industrial (DDP 1)",
  "villa constitucion": "Destacamento Parque Industrial (DDP 1)",
  "ipv limache": "Destacamento Limache (DDP 1)",
  "limache industrial": "Destacamento Limache (DDP 1)",
  "rotonda sur": "Destacamento Limache (DDP 1)",
  "san rafael": "Destacamento San Rafael (DDP 1)",
  "mercado cofruthos": "Destacamento Mercado Cofruthos (DDP 1)",
  "av paraguay": "Destacamento Mercado Cofruthos (DDP 1)",
  "avenida paraguay": "Destacamento Mercado Cofruthos (DDP 1)",
  "villa las rosas": "Destacamento Villa Las Rosas (DDP 1)",
  "ampliacion las rosas": "Destacamento Villa Las Rosas (DDP 1)",
  "complejo penitenciario": "Destacamento Villa Las Rosas (DDP 1)",
  "penal de salta": "Destacamento Villa Las Rosas (DDP 1)",
  "san ignacio": "Destacamento San Ignacio (DDP 1)",
  "fraternidad": "Destacamento San Ignacio (DDP 1)",
  "girasoles": "Destacamento San Ignacio (DDP 1)",
  "san agustin": "Base Operativa San Agustín (DDP 1)",
  "loteos industriales": "Base Operativa San Agustín (DDP 1)",
  "villa san luis": "Puesto Policial San Luis Centro (DDP 1)",
  "finca valdivia": "Puesto Policial San Luis Centro (DDP 1)",
  "caballerizas": "Puesto Policial San Luis Centro (DDP 1)",
  "san cayetano": [
    "Comisaría N°5 - San Martín (DDP 1)",
    "Destacamento San Cayetano (DDP 1)"
  ],
  "faldeos cerro 20 de febrero": "Destacamento San Cayetano (DDP 1)",
  "cuarteles": "Destacamento San Cayetano (DDP 1)",

  // === Villa Esmeralda / Rebeca ===
  "villa esmeralda": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Comisaría N°15 - San Remo (DDP 1)",
    "Destacamento Villa Rebeca (DDP 1)"
  ],
  "villa rebeca": [
    "Comisaría N°9 - Portezuelo Sur (DDP 1)",
    "Destacamento Villa Rebeca (DDP 1)"
  ],

  // === Universitario / Autódromo ===
  "universitario": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Comisaría N°14 - Campo Santo (DDP 1)"
  ],
  "barrio universitario": [
    "Comisaría N°3 - Tres Cerritos (DDP 1)",
    "Comisaría N°14 - Campo Santo (DDP 1)"
  ],
  "autodromo": [
    "Comisaría N°12 - Santa Ana I (DDP 1)",
    "Destacamento Autódromo (DDP 1)"
  ],

  // === Casino ===
  "casino": [
    "Destacamento Mercado Cofruthos (DDP 1)",
    "Destacamento Barrio Casino (DDP 1)"
  ],

  // === La Almudena ===
  "la almudena": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Comisaría N°19 - El Carril (DDP 1)"
  ],
  "almudena": [
    "Comisaría N°10 - Santa Cecilia (DDP 1)",
    "Comisaría N°16 - El Centro (DDP 1)",
    "Comisaría N°19 - El Carril (DDP 1)"
  ],

  // === General Mosconi ===
  "general mosconi": [
    "Comisaría N°14 - Campo Santo (DDP 1)",
    "Comisaría N°24 - Centro Norte (DDP 1)"
  ]
};

const DEPENDENCIAS_POLICIALES = [
  // DDP 1 - SALTA CAPITAL
  { nombre: "Comisaría N°1 - Centro (DDP 1)", lat: -24.786744, lon: -65.408122, zona: "Centro" },
  { nombre: "Comisaría N°2 - Santa Cecilia (DDP 1)", lat: -24.799021, lon: -65.416157, zona: "Centro" },
  { nombre: "Comisaría N°3 - Tres Cerritos (DDP 1)", lat: -24.764263, lon: -65.399474, zona: "Centro" },
  { nombre: "Comisaría N°4 - Villa Mitre (DDP 1)", lat: -24.816072, lon: -65.378484, zona: "Sur" },
  { nombre: "Comisaría N°5 - San Martín (DDP 1)", lat: -24.7807724, lon: -65.4274511, zona: "Centro" },
  { nombre: "Comisaría N°6 - Ciudad del Milagro (DDP 1)", lat: -24.723614, lon: -65.408431, zona: "Norte" },
  { nombre: "Comisaría N°7 - El Tribuno (DDP 1)", lat: -24.846625, lon: -65.441169, zona: "Suroeste" },
  { nombre: "Comisaría N°8 - Santa Ana (DDP 1)", lat: -24.807981, lon: -65.439922, zona: "Sudeste" },
  { nombre: "Comisaría N°9 - Portezuelo Sur (DDP 1)", lat: -24.796094, lon: -65.394222, zona: "Suroeste" },
  { nombre: "Comisaría N°10 - Santa Cecilia (DDP 1)", lat: -24.829139, lon: -65.397831, zona: "Sur" },
  { nombre: "Comisaría N°11 - 17 de Octubre (DDP 1)", lat: -24.71865, lon: -65.398062, zona: "Norte" },
  { nombre: "Comisaría N°12 - Santa Ana I (DDP 1)", lat: -24.857336, lon: -65.470575, zona: "Sur" },
  { nombre: "Comisaría N°13 - Cerrillos (DDP 1)", lat: -24.903533, lon: -65.487753, zona: "Oeste" },
  { nombre: "Comisaría N°14 - Campo Santo (DDP 1)", lat: -24.681389, lon: -65.1032, zona: "Este" },
  { nombre: "Comisaría N°15 - San Remo (DDP 1)", lat: -24.829231, lon: -65.423578, zona: "Suroeste" },
  { nombre: "Comisaría N°16 - El Centro (DDP 1)", zona: "Este" },
  { nombre: "Comisaría N°17 - Solidaridad (DDP 1)", lat: -24.843314, lon: -65.396283, zona: "Sur" },
  { nombre: "Comisaría N°19 - El Carril (DDP 1)", zona: "Oeste" },
  { nombre: "Comisaría N°20 - La Ribera (DDP 1)", zona: "Suroeste" },
  { nombre: "Comisaría N°24 - Centro Norte (DDP 1)", zona: "Centro" },
  { nombre: "Comisaría N°25 - San Lorenzo Chico (DDP 1)", zona: "Noroeste" },
  { nombre: "Comisaría N°100 - San Lorenzo (DDP 1)", lat: -24.73125, lon: -65.490778, zona: "Noroeste" },
  { nombre: "Comisaría N°101 - Santa Rita (DDP 1)", lat: -24.663811, lon: -65.038328, zona: "Noreste" },
  { nombre: "Comisaría N°102 - Atocha II (DDP 1)", lat: -24.811761, lon: -65.459939, zona: "Sur" },
  { nombre: "Comisaría N°103 - 17 de Octubre (DDP 1)", zona: "Norte" },
  { nombre: "Comisaría N°104 - Palermo (DDP 1)", lat: -24.787304, lon: -65.459397, zona: "Sudeste" },
  { nombre: "Comisaría N°105 - La Merced (DDP 1)", lat: -24.970175, lon: -65.489828, zona: "Sur" },
  { nombre: "Comisaría N°106 - Limache (DDP 1)", lat: -24.852619, lon: -65.431589, zona: "Sur" },
  { nombre: "Comisaría N°107 - San Carlos (DDP 1)", zona: "Este" },
  { nombre: "Comisaría N°108 - Campo Quijano (DDP 1)", lat: -24.9079653, lon: -65.6423614, zona: "Noroeste" },
  { nombre: "Comisaría N°110 - Huaico II (DDP 1)", zona: "Norte" },
  { nombre: "Comisaría N°111 - Limache Nuevo (DDP 1)", zona: "Sur" },
  { nombre: "Comisaría N°112 - La Silleta (DDP 1)", zona: "Noreste" },
  { nombre: "Comisaría N°115 - El Círculo (DDP 1)", zona: "Sur" },
  { nombre: "Comisaría N°118 - Cerveceros (DDP 1)", zona: "Noreste" },
  { nombre: "Subcomisaría Villa Lavalle (DDP 1)", zona: "Oeste" },
  { nombre: "Subcomisaría Barrio Docente (DDP 1)", zona: "Oeste" },
  { nombre: "Subcomisaría Villa Asunción (DDP 1)", zona: "Centro" },
  { nombre: "Subcomisaría Grand Bourg (DDP 1)", zona: "Este" },
  { nombre: "Subcomisaría Grand Bourg Este (DDP 1)", zona: "Este" },
  { nombre: "Subcomisaría Barrio Policial (DDP 1)", zona: "Centro" },
  { nombre: "Subcomisaría El Aybal (DDP 1)", zona: "Oeste" },
  { nombre: "Subcomisaría de El Huaico (DDP 1)", zona: "Norte" },
  { nombre: "Subcomisaría de Atocha (DDP 1)", zona: "Sur" },
  { nombre: "Subcomisaría San Luis (DDP 1)", zona: "Suroeste" },
  { nombre: "Subcomisaría El Sol (DDP 1)", zona: "Sudeste" },
  { nombre: "Destacamento El Triángulo (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Las Costas (DDP 1)", zona: "Suroeste" },
  { nombre: "Destacamento Parque Industrial (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Limache (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento San Rafael (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Mercado Cofruthos (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Barrio Casino (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Villa Las Rosas (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento San Ignacio (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento San Cayetano (DDP 1)", zona: "Centro" },
  { nombre: "Destacamento Ceferino (DDP 1)", zona: "Centro" },
  { nombre: "Destacamento Chachapoyas (DDP 1)", zona: "Centro" },
  { nombre: "Destacamento Autódromo (DDP 1)", zona: "Sur" },
  { nombre: "Destacamento Villa Rebeca (DDP 1)", zona: "Suroeste" },
  { nombre: "Base Operativa San Agustín (DDP 1)", zona: "Suroeste" },
  { nombre: "Puesto Policial San Luis Centro (DDP 1)", zona: "Suroeste" },

  // DDP 2 - NORTE
  { nombre: "Comisaría 1 - Orán (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Puerto Policial Estación (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 2 - Hipólito Yrigoyen (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Tabacal (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 3 - Docente (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Balut (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 4 - Aeroparque (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Subcomisaría 9 de Julio (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 5 - Aguas Blancas (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Subcomisaría Los Toldos (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Isla de Cañas (DDP 2)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Los Naranjos (DDP 2)", zona: "Norte de la provincia" },

  // DDP 3 - SUR
  { nombre: "Comisaría 1 - Metán (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Comisaría 2 - El Galpón (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Destacamento Lumbreras (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Destacamento Río Piedras (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Puerto Policial El Tunal (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Destacamento El Naranjo (DDP 3)", zona: "Sur de la provincia" },
  { nombre: "Destacamento San Felipe (DDP 3)", zona: "Sur de la provincia" },

  // DDP 4 - NORTE
  { nombre: "Comisaría 1 - Salvador Mazza (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 5 - Aguaray (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Acambuco (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Alto Verde (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 2 - Mosconi (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Coronel Cornejo (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Puerto Policial Aeroparque Mosconi (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Subcomisaría Vespucio (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 3 - Tartagal Centro (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 4 - El Portico (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Villa Güemes (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Alto La Sierra (DDP 4)", zona: "Norte de la provincia" },
  { nombre: "Subcomisaría Santa Victoria Este (DDP 4)", zona: "Norte de la provincia" },

  // DDP 5 - ESTE
  { nombre: "Comisaría 1 - Joaquín V. González (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento 25 de Junio (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento Gaona (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento Los Rosales (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento San José de Orquera (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento Talavera (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Subcomisaría El Quebrachal (DDP 5)", zona: "Este de la provincia" },
  { nombre: "Destacamento Tolloiche (DDP 5)", zona: "Este de la provincia" },

  // DDP 6 - OESTE / VALLES
  { nombre: "Comisaría 60 - Cafayate (DDP 6)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Angastaco (DDP 6)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Animana (DDP 6)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Subcomisaría San Carlos (DDP 6)", zona: "Oeste / Valles Calchaquíes" },

  // DDP 7 - CENTRO-OESTE
  { nombre: "Comisaría 1 - Gral. Güemes (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 3 - La Banda (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Puerto Policial Parque Industrial (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 2 - Campo Santo (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Destacamento Betania (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Destacamento Cobos (DDP 7)", zona: "Centro-Oeste" },
  { nombre: "Subcomisaría El Bordo (DDP 7)", zona: "Centro-Oeste" },

  // DDP 8 - ESTE
  { nombre: "Comisaría 1 - Pichanal (DDP 8)", zona: "Este de la provincia" },
  { nombre: "Comisaría 2 - Colonia Santa Rosa (DDP 8)", zona: "Este de la provincia" },
  { nombre: "Destacamento Urundel (DDP 8)", zona: "Este de la provincia" },
  { nombre: "Subcomisaría Las Palmeras (DDP 8)", zona: "Este de la provincia" },
  { nombre: "Destacamento La Unión (DDP 8)", zona: "Este de la provincia" },
  { nombre: "Destacamento Rivadavia Banda Sur (DDP 8)", zona: "Este de la provincia" },

  // DDP 9 - ESTE
  { nombre: "Comisaría 1 - Las Lajitas (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Destacamento Piquete Cabado (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Destacamento Río del Valle (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Destacamento Gral. Pizarro (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Destacamento Luis Burela (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Destacamento Mollinedo (DDP 9)", zona: "Este de la provincia" },
  { nombre: "Subcomisaría El Dorado (DDP 9)", zona: "Este de la provincia" },

  // DDP 10
  { nombre: "Comisaría 4 (DDP 10)", zona: "Norte" },
  { nombre: "Comisaría 6 (DDP 10)", zona: "Norte" },
  { nombre: "Destacamento Palacios (DDP 10)", zona: "Sur" },
  { nombre: "Comisaría 1 (DDP 10)", zona: "Centro" },
  { nombre: "Comisaría 3 (DDP 10)", zona: "Centro" },
  { nombre: "Destacamento Docente (DDP 10)", zona: "Este" },
  { nombre: "Destacamento San Carlos (DDP 10)", zona: "Sur" },
  { nombre: "Comisaría 2 (DDP 10)", zona: "Centro" },
  { nombre: "Destacamento San Ignacio (DDP 10)", zona: "Sur" },
  { nombre: "Subcomisaría Lavalle (DDP 10)", zona: "Sur" },
  { nombre: "Comisaría 5 (DDP 10)", zona: "Norte" },
  { nombre: "Comisaría 7 (DDP 10)", zona: "Sur" },
  { nombre: "Comisaría 9 (DDP 10)", zona: "Sur" },
  { nombre: "Destacamento La Silleta (DDP 10)", zona: "Norte" },
  { nombre: "Subcomisaría San Antonio (DDP 10)", zona: "Sur" },

  // DDP 11 - CENTRO-OESTE
  { nombre: "Comisaría 1 - Cerillos (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 5 - La Merced (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 7 - Pinares (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Destacamento La Isla (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Destacamento San Agustín (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Subcomisaría Los Alamos (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 2 - Rosario de la Frontera (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 3 - Chicoana (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 4 - El Carril (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Comisaría 6 - Moldes (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Subcomisaría Guachipas (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Subcomisaría La Viña (DDP 11)", zona: "Centro-Oeste" },
  { nombre: "Subcomisaría San Jorge (DDP 11)", zona: "Centro-Oeste" },

  // DDP 12 - OESTE / VALLES
  { nombre: "Comisaría 1 - Cachi (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento La Poma (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Palermo Oeste (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Payogasta (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Comisaría 2 - Molinos (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Luracatao (DDP 12)", zona: "Oeste / Valles Calchaquíes" },
  { nombre: "Destacamento Seclantas (DDP 12)", zona: "Oeste / Valles Calchaquíes" },

  // DDP 13 - SUR
  { nombre: "Comisaría 1 - Rosario de la Frontera (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Destacamento Antillas (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Destacamento Potreros (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Subcomisaría El Mirador (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Destacamento El Jardín (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Destacamento La Candelaria (DDP 13)", zona: "Sur de la provincia" },
  { nombre: "Subcomisaría El Tala (DDP 13)", zona: "Sur de la provincia" },

  // DDP 14 - NORTE
  { nombre: "Comisaría 1 - Embarcación (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Padre Lozano (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Gral. Ballivian (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Comisaría 2 - Coronel Juan Solá (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Dragones (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Hickman (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Destacamento Los Blancos (DDP 14)", zona: "Norte de la provincia" },
  { nombre: "Puesto La Pluma de Pato (DDP 14)", zona: "Norte de la provincia" }
];
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
  "Seclantás", "Tartagal", "Tolar Grande", "Urundel", "Vaqueros"
];
