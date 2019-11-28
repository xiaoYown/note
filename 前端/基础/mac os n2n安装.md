Mac OS High Sierra上编译N2N通过


编译需要autoconf支持

### autoconf 等安装
```
curl -O http://mirrors.kernel.org/gnu/m4/m4-1.4.18.tar.gz

tar -xzvf m4-1.4.18.tar.gz
cd m4-1.4.18
./configure --prefix=/usr/local
make
sudo make install
cd ..


curl -O http://mirrors.kernel.org/gnu/autoconf/autoconf-2.69.tar.gz
tar -xzvf autoconf-2.69.tar.gz
cd autoconf-2.69
./configure --prefix=/usr/local
make
sudo make install
cd ..

curl -O http://mirrors.kernel.org/gnu/automake/automake-1.16.tar.gz
tar xzvf automake-1.16.tar.gz
cd automake-1.16
./configure --prefix=/usr/local
make
sudo make install
cd ..

curl -O http://mirrors.kernel.org/gnu/libtool/libtool-2.4.6.tar.gz
tar xzvf libtool-2.4.6.tar.gz
cd libtool-2.4.6
./configure --prefix=/usr/local
make
sudo make install

```

### 下载n2n

```
git clone https://github.com/ntop/n2n.git
```


### 手动编译安装n2n
```
./autogen.sh
./configure
make

# optionally install
make install
```


### 启动节点
```
sudo /usr/local/sbin/edge -d n2n0 -c mynetwork -k encryptme -a 10.0.0.180 -l 123.207.142.90:1000

ps aux|grep edge
kill -9 
```

ps 补充有些机器上可能会报错，通过加入参数-vf发现日志ERROR: Unable to open tap device，可以通过下面方式安装虚拟网卡:

```
brew tap homebrew/cask
brew cask install tuntap
查看是否有如下两个内核扩展
ls /Library/Extensions/tap.kext
ls /Library/Extensions/tun.kext
校验内核扩展的参数
find /Library/Extensions/{tap,tun}.kext/ -type f | xargs shasum
加载内核扩展
sudo /sbin/kextload /Library/Extensions/tap.kext
sudo /sbin/kextload /Library/Extensions/tun.kext
在尝试运行下连接试试应该就可以了,如果还是不行的话别忘记里尝试加上sudo用root权限执行下试试呢
```