查看网卡:
iwconfig
#### 1.设置ip地址
vi /etc/network/interface
```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto ens32 # 网卡名
iface ens32 inet static
address 192.168.159.130
netmask 255.255.255.0
gateway 192.168.2.1
```

#### 2.设置dns
```
vi /etc/resolvconf/resolv.conf.d/base
nameserver 114.114.114.114
nameserver 8.8.8.8
```

#### 3.刷新配置文件
```
resolvconf -u
```
4.重启网络服务
```
/etc/init.d/networking restart
```