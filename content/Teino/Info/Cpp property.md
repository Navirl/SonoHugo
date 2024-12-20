---
title: "Cpp property"
tags:
 - Info
---

date: 2024-12-20T14:07:14+09:00
up:: [Cpp](../Bar/Program/Cpp.md)

Csharpにあるaccessor機能をcppで！


結論から言うと公式は想定してないので、都度getterとsetter組む方が早い。

それでも組みたいなら、基本は＝のオーバーライドというアクロバットで実装することになる。読みにくいし実行速度もそんなない。

MSVCならサポートしてる。
[方法: C++/CLI でプロパティを使用する | Microsoft Learn](https://learn.microsoft.com/ja-jp/cpp/dotnet/how-to-use-properties-in-cpp-cli?view=msvc-170)

テンプレートを使うともうちょい柔軟になるが、中身は結局＝オーバーライドだったり。

[C++でプロパティ - Qiita](https://qiita.com/DandyMania/items/78bb31492bee095bc4b0)
[# C++でプロパティーを実現する方法 - Qiita](https://qiita.com/m5knt/items/1da740db9c1b1935f304)
[C++でProperty（getter/setter） - Qiita](https://qiita.com/HogeTatu/items/1bb3a394f88ba90cd37e)