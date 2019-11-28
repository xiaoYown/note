### brew一直卡在Updating Homebrew的解决办法

方法一:直接关闭brew每次执行命令时的自动更新

```

vim ~/.bash_profile

# 新增一行
export HOMEBREW_NO_AUTO_UPDATE=true

重启或者source ~/.bash_profile应用一下配置
    
```



方法二:替换brew源


```
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

#替换homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
brew update


# 备用地址-1
cd "$(brew --repo)"
git remote set-url origin https://git.coding.net/homebrew/homebrew.git
brew update


# 备用地址-2
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew-core.git
brew update


# 官方地址
#重置brew.git
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

#重置homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```