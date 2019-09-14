#### 安装文档
> https://about.gitlab.com/install/#ubuntu

#### Unable to locate package gitlab-ee

```
sudo apt-get install gitlab-ee

报错 Unable to locate package gitlab-ce
```

> 解决方法

```
a) 修改 /etc/apt/sources.list.d/gitlab_gitlab-ce.list

原来:

deb https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ zesty main
deb-src https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ zesty main

改成:

deb https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ xenial main
deb-src https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ xenial main

```

```
sudo apt-get update
sudo apt-get install gitlab-ee
```

修改 external_url

```
vim /etc/gitlab/gitlab.rb
# 修改
external_url='http://localhost:8010'
# 重新设置配置文件
sudo gitlab-ctl reconfigure
# 重启
gitlab-ctl restart 
```

| 命令功能 | 执行命令 |
|-|-|
| 重启配置并启动 gitlab 服务 | sudo gitlab-ctl reconfigure |
| 启动所有 | gitlab	sudo gitlab-ctl start |
| 重新启动GitLab | sudo gitlab-ctl restart |
| 停止所有 | gitlab sudo gitlab-ctl stop |
| 查看服务状态 | sudo gitlab-ctl status |
| 查看Gitlab日志 | sudo gitlab-ctl tail |
| 修改默认的配置文件 | sudo vim /etc/gitlab/gitlab.rb |
| 检查gitlab | gitlab-rake gitlab:check SANITIZE=true --trace |