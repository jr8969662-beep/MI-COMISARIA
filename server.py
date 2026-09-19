# ============================================================
# Mi Comisaria — Servidor Backend en Python
# Policia de Salta — Sistema de Tramites en Linea
# ============================================================
import os
import sys
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import datetime

PORT = int(os.environ.get("PORT", 3000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DB_FILE = os.path.join(DATA_DIR, "tramites.json")

def inicializar_base_de_datos():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(DB_FILE):
        tramites_iniciales = [
            {
                "id": "RES-742910",
                "nroTramite": "RES-742910",
                "tramite": "residencia",
                "titulo": "Certificado de Residencia",
                "fecha": datetime.utcnow().isoformat() + "Z",
                "estado": "PENDIENTE",
                "solicitante": {
                    "nombre": "Mariana Soledad Flores",
                    "dni": "38942105",
                    "sexo": "Femenino",
                    "domicilio": "Balcarce 842",
                    "barrio": "Capital"
                },
                "datos": {
                    "nombre": "Mariana Soledad Flores",
                    "dni": "38942105",
                    "sexo": "Femenino",
                    "domicilio": "Balcarce 842",
                    "barrio": "Capital",
                    "testigo1Nombre": "Carlos Esteban Romero",
                    "testigo1Dni": "34120984",
                    "testigo1Domicilio": "Balcarce 850",
                    "testigo2Nombre": "Silvia Beatriz Gomez",
                    "testigo2Dni": "36781200",
                    "testigo2Domicilio": "Alvarado 1205"
                },
                "observaciones": ""
            }
        ]
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(tramites_iniciales, f, ensure_ascii=False, indent=2)
        print("-> Base de datos inicializada en data/tramites.json")

def leer_tramites():
    if not os.path.exists(DB_FILE):
        return []
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error al leer tramites: {e}")
        return []

def guardar_tramites(lista):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(lista, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error al guardar tramites: {e}")
        return False

class ComisariaHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def responder_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        pathname = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # 1. GET /api/estadisticas
        if pathname == "/api/estadisticas":
            tramites = leer_tramites()
            pendientes = sum(1 for t in tramites if t.get("estado") == "PENDIENTE")
            aprobados = sum(1 for t in tramites if t.get("estado") == "APROBADO")
            rechazados = sum(1 for t in tramites if t.get("estado") in ["RECHAZADO", "OBSERVADO"])
            stats = {
                "total": len(tramites),
                "pendientes": pendientes,
                "aprobados": aprobados,
                "rechazados": rechazados
            }
            return self.responder_json(200, {"ok": True, "stats": stats})

        # 2. GET /api/tramites
        if pathname == "/api/tramites":
            lista = leer_tramites()
            q_term = query.get("q", [""])[0].strip().lower()
            dni_term = query.get("dni", [""])[0].strip()
            estado_term = query.get("estado", [""])[0].strip().upper()
            tipo_term = query.get("tipo", [""])[0].strip()

            if dni_term:
                lista = [t for t in lista if dni_term in str(t.get("solicitante", {}).get("dni", ""))]
            if estado_term and estado_term != "TODOS":
                lista = [t for t in lista if t.get("estado", "").upper() == estado_term]
            if tipo_term and tipo_term != "TODOS":
                lista = [t for t in lista if t.get("tramite") == tipo_term]
            if q_term:
                lista = [
                    t for t in lista if
                    q_term in str(t.get("nroTramite", "")).lower() or
                    q_term in str(t.get("solicitante", {}).get("nombre", "")).lower() or
                    q_term in str(t.get("solicitante", {}).get("dni", "")) or
                    q_term in str(t.get("titulo", "")).lower()
                ]

            return self.responder_json(200, {"ok": True, "total": len(lista), "tramites": lista})

        # 3. GET /api/tramites/<id>
        if pathname.startswith("/api/tramites/"):
            param_id = urllib.parse.unquote(pathname.replace("/api/tramites/", "")).strip()
            lista = leer_tramites()
            encontrado = None
            for t in lista:
                if (t.get("id") == param_id or
                    str(t.get("nroTramite", "")).lower() == param_id.lower() or
                    str(t.get("solicitante", {}).get("dni", "")) == param_id):
                    encontrado = t
                    break

            if not encontrado:
                return self.responder_json(404, {"ok": False, "mensaje": "Tramite no encontrado"})
            return self.responder_json(200, {"ok": True, "tramite": encontrado})

        # Si no es una ruta de la API, servir archivos estáticos
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/tramites":
            content_length = int(self.headers.get("Content-Length", 0))
            raw_data = self.rfile.read(content_length).decode("utf-8")
            try:
                payload = json.loads(raw_data)
            except Exception:
                return self.responder_json(400, {"ok": False, "mensaje": "JSON no valido"})

            tramite_tipo = payload.get("tramite")
            datos = payload.get("datos", {})
            nro_tramite = payload.get("nroTramite")

            if not tramite_tipo or not datos:
                return self.responder_json(400, {"ok": False, "mensaje": "Faltan datos obligatorios"})

            solicitante = {
                "nombre": datos.get("nombre") or datos.get("nombreSolicitante") or datos.get("autorizanteNombre") or "No especificado",
                "dni": datos.get("dni") or datos.get("dniSolicitante") or datos.get("autorizanteDni") or "",
                "sexo": datos.get("sexo") or datos.get("sexoSolicitante") or "",
                "domicilio": datos.get("domicilio") or datos.get("autorizanteDomicilio") or "",
                "barrio": datos.get("barrio") or ""
            }

            codigo = nro_tramite or f"TRM-{str(int(datetime.utcnow().timestamp()))[-6:]}"

            nuevo = {
                "id": codigo,
                "nroTramite": codigo,
                "tramite": tramite_tipo,
                "titulo": payload.get("titulo") or f"Certificado de {tramite_tipo.capitalize()}",
                "fecha": datetime.utcnow().isoformat() + "Z",
                "estado": "PENDIENTE",
                "solicitante": solicitante,
                "datos": datos,
                "observaciones": ""
            }

            lista = leer_tramites()
            lista.insert(0, nuevo)
            guardar_tramites(lista)

            print(f"[+] Nuevo tramite guardado en Python: {codigo} para DNI {solicitante['dni']}")
            return self.responder_json(201, {
                "ok": True,
                "mensaje": "Tramite registrado con exito en la Comisaria",
                "nroTramite": codigo,
                "tramite": nuevo
            })

        return self.responder_json(404, {"ok": False, "mensaje": "Ruta no encontrada"})

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith("/api/tramites/"):
            param_id = urllib.parse.unquote(parsed.path.replace("/api/tramites/", "")).strip()
            content_length = int(self.headers.get("Content-Length", 0))
            raw_data = self.rfile.read(content_length).decode("utf-8")
            try:
                payload = json.loads(raw_data)
            except Exception:
                return self.responder_json(400, {"ok": False, "mensaje": "JSON no valido"})

            lista = leer_tramites()
            encontrado = None
            for t in lista:
                if t.get("id") == param_id or str(t.get("nroTramite", "")).lower() == param_id.lower():
                    encontrado = t
                    break

            if not encontrado:
                return self.responder_json(404, {"ok": False, "mensaje": "Tramite no encontrado"})

            if "estado" in payload:
                encontrado["estado"] = str(payload["estado"]).upper()
            if "observaciones" in payload:
                encontrado["observaciones"] = payload["observaciones"]
            encontrado["fechaActualizacion"] = datetime.utcnow().isoformat() + "Z"

            guardar_tramites(lista)
            print(f"[*] Tramite {param_id} actualizado a: {encontrado['estado']}")
            return self.responder_json(200, {"ok": True, "mensaje": "Tramite actualizado", "tramite": encontrado})

        return self.responder_json(404, {"ok": False, "mensaje": "Ruta no encontrada"})

def main():
    inicializar_base_de_datos()
    os.chdir(BASE_DIR)

    puerto = PORT
    servidor = None
    for p in [puerto, 3001, 8000, 8080]:
        try:
            servidor = HTTPServer(("", p), ComisariaHandler)
            puerto = p
            break
        except OSError:
            continue

    if not servidor:
        print("[ERROR] No se pudo abrir un puerto disponible.")
        sys.exit(1)

    print("=================================================")
    print("  POLICIA DE SALTA — SISTEMA MI COMISARIA")
    print(f"  Servidor backend iniciado en Python")
    print(f"  URL Principal:   http://localhost:{puerto}")
    print(f"  Panel Comisaria: http://localhost:{puerto}/admin.html")
    print(f"  API REST:        http://localhost:{puerto}/api/tramites")
    print("=================================================")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")

if __name__ == "__main__":
    main()
