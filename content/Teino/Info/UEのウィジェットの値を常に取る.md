---
title: "UEのウィジェットの値を常に取る"
tags:
 - Info
---

date: 2024-12-20T14:07:46+09:00
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)
source:: [プロパティのバインディング | Unreal Engine ドキュメント](https://docs.unrealengine.com/4.26/ja/InteractiveExperiences/UMG/UserGuide/PropertyBinding/)

ウィジェットの変数に値を入力するための関数をバインドする機能。
戻り値部分が変数の中身になるため、そこに値を入れさえすればいい。ただし**引数を取ることが出来ない**ので、`Get Player Character`などを使う必要があることには注意。