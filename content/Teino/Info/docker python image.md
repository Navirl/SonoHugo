---
title: "docker python image"
tags:
 - Info
---

date: 2024-12-20T14:07:52+09:00
up:: [Docker](../Bar/App/Docker.md)

pythonのver、debianのver、slim(余計なパッケージが入ってない)、alpineなどでイメージが分けられている。

[2022年度版Python環境構築徹底解説 - Qiita](https://qiita.com/kjm_nuco/items/733d67ff39acb41839f2)

普通に点けると対話型シェルから始まる。exit()かquit()で抜けられるが、それをやるとコンテナが終了してしまう。
なので起動時にbashを付けbashを使う。runには使えるがstartには使えないので注意。



