---
title: "SVP"
date: 2024-12-21T15:13:37+09:00
tags:
 - Learning
---

```
# mediainfo
sudo apt-get -y install mediainfo
# qt
# Ubuntu 16.04+ and others (e.g. ElementaryOS) - Qt5Concurrent, Qt5Svg, Qt5Qml packages are probably not installed by default
sudo apt-get -y install libqt5concurrent5 libqt5svg5 libqt5qml5
# Python 3.8 - needed for SVPtube
# Ubuntu 18.04 have it in the "updates" repo
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get -y install libpython3.8
# SMPlayer:
sudo add-apt-repository ppa:rvm/smplayer
sudo apt-get update
sudo apt-get -y install smplayer smplayer-themes smplayer-skins
# VLC
sudo apt-get -y install vlc
# common build tools
sudo apt-get -y install g++ make autoconf automake libtool pkg-config nasm git
# zimg library
git clone [https://github.com/sekrit-twc/zimg.git](https://github.com/sekrit-twc/zimg.git)
cd zimg 
./autogen.sh
./configure
make -j4
sudo make install
cd ..
# Cython for Python3. !!! Vapoursynth requires Cython >= 0.28 !!!
sudo apt-get -y install cython3
# OR
pip3 install Cython
# build Vapoursynth
git clone --branch R52 [https://github.com/vapoursynth/vapoursynth.git](https://github.com/vapoursynth/vapoursynth.git)
cd vapoursynth
./autogen.sh
./configure
make -j4
sudo make install
cd ..
sudo ldconfig
# make Python find the Vapoursynth module
# there MUST be a better way to do this!
sudo ln -s /usr/local/lib/python3.8/site-packages/vapoursynth.so /usr/lib/python3.8/lib-dynload/vapoursynth.so
# install dependencies: add more if you want additional ffmpeg/mpv codecs and features
sudo apt-get -y install libssl-dev libfribidi-dev libluajit-5.1-dev libx264-dev xorg-dev libegl1-mesa-dev libfreetype-dev libfontconfig-dev
# you need at least one of these to enable audio output
sudo apt-get -y install libasound2-dev libpulse-dev
# Ubuntu 20.04
sudo apt-get -y install python-is-python3
# Ubuntu <= 19.04
sudo apt-get -y install python-minimal
git clone https://github.com/mpv-player/mpv-build.git
cd mpv-build
# minimal install, feel free to add more options to ffmpeg_options and mpv_options
echo --enable-libx264 >> ffmpeg_options
echo --enable-vapoursynth >> mpv_options
echo --enable-libmpv-shared >> mpv_options
./rebuild -j4
sudo ./install
cd ..
sudo chmod 777 /usr/lib/vlc/plugins/video_filter
# OR (e.g. Ubuntu 17.04)
sudo chmod 777 /usr/lib/x86_64-linux-gnu/vlc/plugins/video_filter
#SVP
wget https://www.svp-team.com/files/svp4-linux.4.5.205-1.tar.bz2
tar -jxvf svp4-linux.4.5.205-1.tar.bz2
./svp4-linux-64.run
```