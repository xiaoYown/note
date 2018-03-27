### 1.工具下载

OpenSSL官网没有提供windows版本的安装包，可以选择其他开源平台提供的工具。例如 
[工具连接](http://slproweb.com/products/Win32OpenSSL.html)

### 2.生成私钥key文件
- openssl genrsa -out private.pem 1024

### 3.通过私钥文件生成CSR证书签名
- openssl req -new -key private.pem -out csr.pem

### 4.通过私钥文件和CSR证书签名生成证书文件
- openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out file.crt