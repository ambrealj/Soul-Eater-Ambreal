#!/usr/bin/env python3
import http.server
import socketserver
import os
import time

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

# Enable socket reuse to avoid "Address already in use" errors
class ReuseAddrTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    PORT = 5000
    HOST = "0.0.0.0"
    
    print(f"Starting server at http://{HOST}:{PORT}/")
    
    try:
        with ReuseAddrTCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
            print(f"Server running at http://{HOST}:{PORT}/")
            httpd.serve_forever()
    except Exception as e:
        print(f"Error starting server: {e}")
        raise