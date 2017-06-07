###hexo简单使用 ( 本次资料来源于简书 )
>一直比较反对使用cnpm，但是在安装hexo模块的时候模块加载太慢，为了快速使用，说明中使用cnpm。

****
####hexo安装及其相关插件安装
```
1.全局中安装hexo
cnpm install hexo-cli -g
2.项目中安装hexo
进入项目文件夹，依次操作 :
cnpm install hexo --save # 项目中安装hexo
hexo init # hexo项目初始化
cnpm install 
3.安装hexo插件
cnpm install hexo-server --save # 本地服务器插件
cnpm install hexo-deployer-git --save # 使用 git 方式进行部署博客所需插件
```
****
####本地生成博客静态页面并预览
```
hexo generate # 生成放置静态文件的public 文件夹 ( 最终会提交到绑定的仓库上 )
hexo server # 启动本地服务器, 默认地址 http://localhost:4000/
```
****
####创建与github.io的关联
编辑博客配置文件 : _config.yml
```
deploy:
    type: git
    repo: https://github.com/xiaoYown/xiaoYown.github.io.git
    branch: master
```
####同步静态文件到github.io仓库上
```
hexo clean #会清除缓存文件db.json及之前生成的静态文件夹public
hexo g     #会重新生成静态文件夹public
hexo deploy    
#因为之前已经安装了插件并且在博客配置文件中也配置好了，所以这个命令会在博客根目录下生成一个.deploy_git的文件夹，并 把本地生成的静态文件部署到xiaoYown.github.io这个仓库中的master分支上；简写形式为hexo d
```