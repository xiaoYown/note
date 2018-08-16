#### Mac
```
nvm 安装:
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

编辑 .bash_profile
vim ~/.bash_profile
添加以下代码:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

配置环境变量:
source ~./bash_profile

node 安装:
nvm install 10.8.0
nvm use --delete-prefix 10.8.0
```