---
date: 2024-12-21T15:24:27+09:00
title: "関数とForEachLoop"
tags:
 - Info
---

daily:: [2022-07-15](Daily_Note/2022-07-15.md)
up:: [Unreal_Engine](../Bar/App/Unreal_Engine.md)
source:: [UE4 配列要素の処理をForEachLoopなしで行う - Let's Enjoy Unreal Engine](https://unrealengine.hatenablog.com/entry/2017/01/14/133301)

Pure関数を引数にしてForEachLoopに突っ込むのはご法度。[Pure Function](Pure%20Function.md)
一方、すでにある配列は関数の単変数の引数としてそのまま突っ込むと**普通に内部で自動でForEachLoopしてくれる**。小さいが最適化になる。