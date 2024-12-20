---
title: "nanoservice"
tags:
 - Info
---

date: 2024-12-20T14:08:00+09:00
up:: [Docker](Docker.md)

cloudflareのnanoservice

マイクロサービス
API渡してhttpsとかで読み出しつつ、まるで一つのように振る舞う

ネットワークごしなのでとても遅い
それを関数呼び出しくらいまで高速化したnanoservice

これは同一のインフラストラクチャで分解して、共通できるCPUとかは共通させているから