1、关闭npm的https

npm config set strict-ssl false 
2、设置npm的获取地址

npm config set registry "http://registry.npmjs.org/"
一般这样运气的好的话，速度就会快许多，可能会安装成功。如果你还脸黑，这样设置还是一直卡住无法下载依赖，那就只能使用proxy代理方式来解决了，命令如下：

> 淘宝镜像: https://registry.npm.taobao.org/

3、设置npm获取的代理服务器地址：

npm config set proxy=http://代理服务器ip:代理服务器端口
我就比较脸黑，最后在国外vps上加了http代理才将这些依赖全部下载下来。

希望本文能让一直无法正常下载npm而抓狂的同学有所帮助。

清除npm的代理命令如下：

npm config delete http-proxy
npm config delete https-proxy
也可以单独为这次npm下载定义代理

npm install -g pomelo --proxy http://代理服务器ip:代理服务器端口