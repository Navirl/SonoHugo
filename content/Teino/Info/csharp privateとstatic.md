---
title: "csharp privateとstatic"
tags:
 - Info
---

date: 2024-12-20T14:07:51+09:00
up:: [Csharp](../Bar/Program/Csharp.md)

## privateとstatic
privateを指定すると、クラス内でしか参照できなくなる。
staticを指定すると、インスタンスごとに変数が複製されることなく、共通の値として扱える。

ではクラスそのものをstaticに指定するとどうなるか。
答えは**staticメンバ以外持てず、インスタンスを作れないクラスになる**。
実例が最初でusingしてるモジュール群。

[csharp constとstatic](csharp%20constとstatic.md)