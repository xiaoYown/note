1. 基本原理
参考：http://www.cnblogs.com/phpinfo/archive/2013/08/09/3246376.html

== Begin http://www.cnblogs.com/phpinfo/archive/2013/08/09/3246376.html ==

公司一个项目要进行交易数据传输,因为这个项目银行那边也是刚刚开始启动,所有的支持只有一个传输字段的说明文档,好吧,总的有人做事不是嘛,于是接口开发正式展开,第一步的难点就是加密解密,我选择使用OpenSSL.

OpenSSL初接触的人恐怕最难的在于先理解各种概念

　　公钥/私钥/签名/验证签名/加密/解密/非对称加密

　　我们一般的加密是用一个密码加密文件,然后解密也用同样的密码.这很好理解,这个是对称加密.而有些加密时,加密用的一个密码,而解密用另外一组密码,这个叫非对称加密,意思就是加密解密的密码不一样.初次接触的人恐怕无论如何都理解不了.其实这是数学上的一个素数积求因子的原理的应用,如果你一定要搞懂,百度有大把大把的资料可以看,其结果就是用这一组密钥中的一个来加密数据,可以用另一个解开.是的没错,公钥和私钥都可以用来加密数据,相反用另一个解开,公钥加密数据,然后私钥解密的情况被称为加密解密,私钥加密数据,公钥解密一般被称为签名和验证签名.

　　因为公钥加密的数据只有它相对应的私钥可以解开,所以你可以把公钥给人和人,让他加密他想要传送给你的数据,这个数据只有到了有私钥的你这里,才可以解开成有用的数据,其他人就是得到了,也看懂内容.同理,如果你用你的私钥对数据进行签名,那这个数据就只有配对的公钥可以解开,有这个私钥的只有你,所以如果配对的公钥解开了数据,就说明这数据是你发的,相反,则不是.这个被称为签名.

　　实际应用中,一般都是和对方交换公钥,然后你要发给对方的数据,用他的公钥加密,他得到后用他的私钥解密,他要发给你的数据,用你的公钥加密,你得到后用你的私钥解密,这样最大程度保证了安全性.

　　RSA/DSA/SHA/MD5

　　非对称加密的算法有很多,比较著名的有RSA/DSA ,不同的是RSA可以用于加/解密,也可以用于签名验签,DSA则只能用于签名.至于SHA则是一种和md5相同的算法,它不是用于加密解密或者签名的,它被称为摘要算法.就是通过一种算法,依据数据内容生成一种固定长度的摘要,这串摘要值与原数据存在对应关系,就是原数据会生成这个摘要,但是,这个摘要是不能还原成原数据的,嗯....,正常情况下是这样的,这个算法起的作用就是,如果你把原数据修改一点点,那么生成的摘要都会不同,传输过程中把原数据给你再给你一个摘要,你把得到的原数据同样做一次摘要算法,与给你的摘要相比较就可以知道这个数据有没有在传输过程中被修改了.

　　实际应用过程中,因为需要加密的数据可能会很大,进行加密费时费力,所以一般都会把原数据先进行摘要,然后对这个摘要值进行加密,将原数据的明文和加密后的摘要值一起传给你.这样你解开加密后的摘要值,再和你得到的数据进行的摘要值对应一下就可以知道数据有没有被修改了,而且,因为私钥只有你有,只有你能解密摘要值,所以别人就算把原数据做了修改,然后生成一个假的摘要给你也是不行的,你这边用密钥也根本解不开.

　　　CA/PEM/DER/X509/PKCS

　　一般的公钥不会用明文传输给别人的,正常情况下都会生成一个文件,这个文件就是公钥文件,然后这个文件可以交给其他人用于加密,但是传输过程中如果有人恶意破坏,将你的公钥换成了他的公钥,然后得到公钥的一方加密数据,不是他就可以用他自己的密钥解密看到数据了吗,为了解决这个问题,需要一个公证方来做这个事,任何人都可以找它来确认公钥是谁发的.这就是CA,CA确认公钥的原理也很简单,它将它自己的公钥发布给所有人,然后一个想要发布自己公钥的人可以将自己的公钥和一些身份信息发给CA,CA用自己的密钥进行加密,这里也可以称为签名.然后这个包含了你的公钥和你的信息的文件就可以称为证书文件了.这样一来所有得到一些公钥文件的人,通过CA的公钥解密了文件,如果正常解密那么机密后里面的信息一定是真的,因为加密方只可能是CA,其他人没它的密钥啊.这样你解开公钥文件,看看里面的信息就知道这个是不是那个你需要用来加密的公钥了.

　　实际应用中,一般人都不会找CA去签名,因为那是收钱的,所以可以自己做一个自签名的证书文件,就是自己生成一对密钥,然后再用自己生成的另外一对密钥对这对密钥进行签名,这个只用于真正需要签名证书的人,普通的加密解密数据,直接用公钥和私钥来做就可以了.

　　密钥文件的格式用OpenSSL生成的就只有PEM和DER两种格式,PEM的是将密钥用base64编码表示出来的,直接打开你能看到一串的英文字母,DER格式是二进制的密钥文件,直接打开,你可以看到........你什么也看不懂!.X509是通用的证书文件格式定义.pkcs的一系列标准是指定的存放密钥的文件标准,你只要知道PEM DER X509 PKCS这几种格式是可以互相转化的.

== End http://www.cnblogs.com/phpinfo/archive/2013/08/09/3246376.html ==

为了方便理解，我画了一个图，如下：





2. 生成证书
参考：http://zctya.blog.163.com/blog/static/1209178201251310292958/
一：生成CA证书 
目前不使用第三方权威机构的CA来认证，自己充当CA的角色。  
网上下载一个openssl软件 
1.创建私钥 ： 
C:\OpenSSL\bin>openssl genrsa -out ca/ca-key.pem 1024  
2.创建证书请求 ： 
C:\OpenSSL\bin>openssl req -new -out ca/ca-req.csr -key ca/ca-key.pem  
----- 
Country Name (2 letter code) [AU]:cn 
State or Province Name (full name) [Some-State]:zhejiang 
Locality Name (eg, city) []:hangzhou 
Organization Name (eg, company) [Internet Widgits Pty Ltd]:skyvision 
Organizational Unit Name (eg, section) []:test 
Common Name (eg, YOUR name) []:root 
Email Address []:sky 
3.自签署证书 ： 
C:\OpenSSL\bin>openssl x509 -req -in ca/ca-req.csr -out ca/ca-cert.pem -signkey ca/ca-key.pem -days 3650 
4.将证书导出成浏览器支持的.p12格式 ： 
C:\OpenSSL\bin>openssl pkcs12 -export -clcerts -in ca/ca-cert.pem -inkey ca/ca-key.pem -out ca/ca.p12  
密码：changeit       
二.生成server证书。  
1.创建私钥 ： 
C:\OpenSSL\bin>openssl genrsa -out server/server-key.pem 1024  
2.创建证书请求 ： 
C:\OpenSSL\bin>openssl req -new -out server/server-req.csr -key server/server-key.pem  
----- 
Country Name (2 letter code) [AU]:cn 
State or Province Name (full name) [Some-State]:zhejiang 
Locality Name (eg, city) []:hangzhou 
Organization Name (eg, company) [Internet Widgits Pty Ltd]:skyvision 
Organizational Unit Name (eg, section) []:test 
Common Name (eg, YOUR name) []:192.168.1.246   注释：一定要写服务器所在的ip地址 
Email Address []:sky 
3.自签署证书 ： 
C:\OpenSSL\bin>openssl x509 -req -in server/server-req.csr -out server/server-cert.pem -signkey server/server-key.pem -CA ca/ca-cert.pem -CAkey ca/ca-key.pem -CAcreateserial -days 3650  
4.将证书导出成浏览器支持的.p12格式 ： 
C:\OpenSSL\bin>openssl pkcs12 -export -clcerts -in server/server-cert.pem -inkey server/server-key.pem -out server/server.p12  
密码：changeit 
三.生成client证书。  
1.创建私钥 ： 
C:\OpenSSL\bin>openssl genrsa -out client/client-key.pem 1024  
2.创建证书请求 ： 
C:\OpenSSL\bin>openssl req -new -out client/client-req.csr -key client/client-key.pem 
----- 
Country Name (2 letter code) [AU]:cn 
State or Province Name (full name) [Some-State]:zhejiang 
Locality Name (eg, city) []:hangzhou 
Organization Name (eg, company) [Internet Widgits Pty Ltd]:skyvision 
Organizational Unit Name (eg, section) []:test 
Common Name (eg, YOUR name) []:sky 
Email Address []:sky      注释：就是登入中心的用户（本来用户名应该是Common Name，但是中山公安的不知道为什么使用的Email Address，其他版本没有测试） 
Please enter the following 'extra' attributes 
to be sent with your certificate request 
A challenge password []:123456 
An optional company name []:tsing  
3.自签署证书 ： 
C:\OpenSSL\bin>openssl x509 -req -in client/client-req.csr -out client/client-cert.pem -signkey client/client-key.pem -CA ca/ca-cert.pem -CAkey ca/ca-key.pem -CAcreateserial -days 3650  
4.将证书导出成浏览器支持的.p12格式 ： 
C:\OpenSSL\bin>openssl pkcs12 -export -clcerts -in client/client-cert.pem -inkey client/client-key.pem -out client/client.p12  
密码：changeit 
== End 参考==
请一定严格根据里面的步骤来，待实验成功后，修改你自己想要修改的内容。我就是一开始没有安装该填写的来，结果生成的证书就无法配对成功。