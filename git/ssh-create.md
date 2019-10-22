#### 1.查看是否已经有密钥
> 以下操作均在 git gui 下执行

```
cd ~/.ssh
```
#### 2.生成密钥
```
# 生成默认密钥
ssh-keygen -t rsa -C "xxx@xxx.xxx"
# 生成指定密钥
ssh-keygen -t rsa -f ~/.ssh/id_rsa_xxx
```
按三次回车
#### 3.添加密钥
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
#### 4.查看公钥内容拷贝
```
cat ~/.ssh/id_rsa.pub
```
#### 5.添加公钥完成后进行测试公钥
测试SSH链接
```
ssh -T git@git.oschina.net
```
#### 6. 配置 config (可指定多个服务使用密钥)

```
vim ~/.ssh/config
```

```
# github
Host github.com
Port 22
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
User speedly
```
