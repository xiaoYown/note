1.安装前更新：
sudo apt-get -y update
sudo apt-get install cmake
sudo apt-get install -y build-essential zlib1g-dev libyaml-dev libssl-dev libgdbm-dev libreadline-dev
   libncurses5-dev libffi-dev curl git-core openssh-server redis-server postfix checkinstall libxml2-dev
  libxslt-dev libcurl4-openssl-dev libicu-dev mysql-client libmysqlclient-dev libreadline6-dev

2.下载并安装ruby：
curl --progress http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz | tar xz
curl --progress http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz | tar xz
cd ruby-2.1.2
./configure
make
sudo make install