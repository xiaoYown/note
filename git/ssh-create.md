####1.查看是否已经有密钥
```
cd ~/.ssh
```
####2.生成密钥
```
ssh-keygen -t rsa -C "xxx@xxx.xxx"
```
按三次回车
####3.添加密钥
```
ssh-add
```
若提示 
>
Could not open a connection to your authentication agent
```
eval `ssh-agent -s`
ssh-add
```
####4.查看公钥内容拷贝
```
cat ~/.ssh/id_rsa.pub
```
####5.添加公钥完成后进行测试公钥
测试SSH链接
```
ssh -T git@git.oschina.net
```
