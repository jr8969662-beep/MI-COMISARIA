# Mi Comisaría — sitio público (ciudadanos)

Página para que la persona haga su trámite policial en Salta y se le asigne **automáticamente** la comisaría
que le corresponde según el mapa oficial de jurisdicciones.

> **Este repositorio es solo la parte pública.** El panel del personal policial está en otro repositorio
> (`panel-privado-del-personal`) y **no debe copiarse acá**.

## Qué hay acá
| Archivo | Para qué sirve |
|---|---|
| `index.html`, `styles.css`, `script.js` | Portada |
| `index.html` | Formularios de trámites (página principal) (escaneo de DNI, mapa, envío) |
| `dependencias.json` | Datos oficiales de cada dependencia (SIGETec 26/10/2026): nombre, distrito, sector y punto en el mapa. La clave es el nombre interno que guarda cada trámite (no se cambia). Sin teléfonos: esos están solo en Supabase. |
| `consultar-tramite.html` | La persona consulta el estado de su trámite con el código |
| `jurisdicciones.js` + `jurisdicciones.json` | Motor que asigna la comisaría por polígono oficial |
| `comisarias-config.js` | Datos auxiliares de comisarías |
| `supabase-config.js` | Conexión pública a Supabase (la clave "anon" es pública por diseño) |
| `herramientas/generar-jurisdicciones.py` | Regenera `jurisdicciones.json` desde los KMZ |
| `datos-originales/` | Mapas KMZ/KML oficiales y archivos viejos; **no los usa la web** |

## Cómo se asigna la comisaría
1. Barrios confirmados a mano (`BARRIOS_CONFIRMADOS` en `jurisdicciones.js`).
2. Si no, se busca la dirección/barrio en OpenStreetMap y se ve en qué polígono oficial cae.
3. Si hay dudas (borde, barrios con el mismo nombre, calle sin número) la persona marca su casa en el mapa o usa el GPS.

## Seguridad
Quién puede ver los datos lo define **Supabase**, no la web. Las reglas están en el repositorio del panel
(`supabase/seguridad-por-comisaria.sql`). El público solo puede **crear** trámites.
