---
date: 2024-12-21T15:18:21+09:00
title: "Cpp module"
tags:
 - Info
---

daily:: [2023-03-01](/Daily_Note/2023-03-01.md)
up:: [Cpp](../Bar/Program/Cpp.md)

[【C＋＋】C＋＋20のモジュールとincludeの違いについて詳しく調べてみた – 株式会社ロジカルビート](https://logicalbeat.jp/blog/6223/)
[［C++］モジュール理論 基礎編 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2019/07/07/025446)
[C++ のモジュールインターフェースパーティションの使いどころ(1)](https://zenn.dev/uyamae/articles/0acaee53777832)

[モジュール - cpprefjp C++日本語リファレンス](https://cpprefjp.github.io/lang/cpp20/modules.html)
[Modules (since C++20) - cppreference.com](https://en.cppreference.com/w/cpp/language/modules)
[Overview of modules in C++ | Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/modules-cpp?view=msvc-170)

C++20。
includeに変わるプログラム分割。javascriptのシステムがこれだったような。
vs2022でやる場合はプロジェクトの`Configuration Properties > C/C++ > Language > Enable C++ Modules (experimental).`をつけておかないとmoduleが反応しない。

## 基本

まずincludeおさらい。プリプロセッサディレクティブでの単純置き換えだった。
[Cpp include](Cpp%20include.md)

moduleはコンパイル時に自動で依存関係を解決する。そのためめちゃくちゃにファイルを分割して適当にimportしてもなんとかなる。読みにくいからある程度は揃えたほうがいいけど。
ただし依存関係を手繰って一からやるので並列化しにくい。複雑な依存かつ並列ジョブが大量に発行できるPCではincludeよりビルドが長くなる。

この機能の導入に伴い、モジュールではないコードはグローバルモジュールという名前が与えられた。
モジュールではないコードのことである。



## ファイル別
公開したい宣言や定義を書くファイルははモジュールインターフェースユニット。MSVCでの拡張子は`.ixx`。
従来で言うヘッダーファイル。

公開しない宣言や定義はモジュール実装ユニットに書く。
従来で言うソースファイル。

さらに、それぞれには本体とパーティションという区別がある。
パーティションは内部的には別モジュールだが、外部からは見えないファイル。モジュールインターフェースユニット内である塊ごとにモジュール実装ユニットを付けたいときに使う。

## 書き方
`export module moduleName`。ファイル名(namespace)、関数、型、変数など大体何でもmoduleNameに放り込めば出せる。

より詳しく言うと`export(opt) module モジュール名 :パーティション名(opt) 属性(opt);`。
exportがあればモジュールインターフェースユニット、なければモジュール実装ユニット。
パーティションがあればパーティションファイルになる。

使う場合は`import moduleName`だけ。

これらの宣言一つ一つはプライマリモジュールインターフェース単位と呼ばれる(要出典)。
一文で書く必要があり、またプリプロセッサで生成することはできない。

## ヘッダーユニット
従来のヘッダーファイルは、一部モジュールとしてインポートできる。
この機能とヘッダーファイルから生成される翻訳単位をヘッダーユニットという。
新機能特有の互換性機能。

これでインポートできるのはC++ライブラリヘッダー、及び処理系のみ。
従来のincludeと違い新たな翻訳単位となってコンパイルされる。


本当はモジュールインターフェースユニット内にグローバルモジュールを書けるグローバルモジュールフラグメントとか、モジュール内のリンケージであるモジュールリンケージとか、cppファイルから読めなくするプライベートモジュールフラグメントとかあるけどもうわからないので筆投げ。
