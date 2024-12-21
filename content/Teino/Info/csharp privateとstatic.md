---
date: 2024-12-21T15:19:00+09:00
title: "csharp privateとstatic"
tags:
 - Info
---

daily:: [2021-10-04](Daily_Note/2021-10-04.md)
up:: [Csharp](../Bar/Program/Csharp.md)

## privateとstatic
privateを指定すると、クラス内でしか参照できなくなる。
staticを指定すると、インスタンスごとに変数が複製されることなく、共通の値として扱える。

ではクラスそのものをstaticに指定するとどうなるか。
答えは**staticメンバ以外持てず、インスタンスを作れないクラスになる**。
実例が最初でusingしてるモジュール群。

[csharp constとstatic](csharp%20constとstatic.md)