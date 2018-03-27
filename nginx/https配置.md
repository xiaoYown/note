```
server {
	listen 80;
	listen 443;
	server_name xiaoyown.club www.xiaoyown.club;

	# force https
	if ($scheme = http) {
			rewrite https://$host$uri$args permanent;
	}

	ssl on;
	ssl_certificate   /etc/nginx/ssl/214563117810843.pem;
	ssl_certificate_key  /etc/nginx/ssl/214563117810843.key;
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;

	location / {
		proxy_pass http://localhost:3002;
	}
}
```