import http.server
import socketserver
import json
import os

PORT = 8000
CHOICES_FILE = os.path.join("sample", "learning-methods-v3", "design-choices.json")
REF_FILE = os.path.join("reference", "design_variants.json")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/save-choices' or self.path == '/sync-reference':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                target_file = REF_FILE if self.path == '/sync-reference' else CHOICES_FILE
                
                os.makedirs(os.path.dirname(target_file), exist_ok=True)
                
                with open(target_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "file": target_file}).encode('utf-8'))
                print(f"✅ {target_file}이(가) 성공적으로 업데이트되었습니다.")
                
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                print(f"❌ 저장 중 오류 발생: {e}")
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    Handler = CustomHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 서빙을 시작합니다: http://localhost:{PORT}")
        print(f"디자인 시안 변경 시 {CHOICES_FILE}에 자동 저장됩니다.")
        print("서버를 종료하려면 Ctrl+C를 누르세요.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버가 종료되었습니다.")
