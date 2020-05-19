```c
  server {
    listen 3010;
    listen 443;

    ssl on;
    ssl_certificate D:/environments/ssl/file.crt;
    ssl_certificate_key D:/environments/ssl/private.pem;

    # ssl_certificate /usr/local/etc/nginx/ssl/file.crt;
    # ssl_certificate_key /usr/local/etc/nginx/ssl/private.pem;

    # force https
		if ($scheme = http) {
      rewrite ^/(.*) https://$host$uri$args permanent;
    }
    location / {
      proxy_pass http://localhost:3002;
    }
  }
```