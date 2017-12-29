```c
  server {
    listen 3010;
    listen 443;

    ssl on;
    ssl_certificate D:/environments/ssl/file.crt;
    ssl_certificate_key D:/environments/ssl/private.pem;

    location / {
      proxy_pass http://localhost:3002;
    }
  }
```