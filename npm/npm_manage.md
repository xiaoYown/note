#### cache 管理

> 默认路径: C:\Users\<user>\AppData\Roaming\npm-cache

修改路径: npm config set cache "<new path>" 

#### nrm 管理 npm 仓库地址

npm install -g nrm
```
查看当前可用仓库: nrm ls
使用该仓库地址: nrm use <registry_name>
添加地址: nrm add <registry_name> <registry_url>
```