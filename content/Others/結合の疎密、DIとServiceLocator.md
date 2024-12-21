---
title: "結合の疎密、DIとServiceLocator"
date: 2024-12-21T15:14:18+09:00
tags:
 - Program
 - Learning
---

## 密結合
たとえばインスタンスの生成から利用まで他のクラス1つに依存していると、変更に弱く(依存元の)再利用性が低くなってしまう。

![tight_coupling.drawio](Images/tight_coupling.drawio.svg)

## DI(Dependency Injection)
日本語では依存性の注入と訳されるが、使い方はオブジェクトの注入といったほうが正しい。
別クラスに生成してもらったクラスを**別クラスから注入してもらう**デザインパターン。つまり**利用と生成を分ける。**
テストがしやすくなる分、下のService Locatorより推奨されがち。

これを作りやすくするDI Containerというライブラリもある。

![DI.drawio](Images/DI.drawio.svg)

### 具体的に
引数にクラスを指定しておく。コンストラクタでも、プロパティでもいい。
こうすることで、引数を入れ替えるだけでテスト環境と本番環境を使い分けることが出来る。
ついでに、引数をinterfaceなど抽象化したものにしておけば、より柔軟に使い分けられる。

### DI Container
依存クラスが一つ二つならともかく、それが増えていくと管理がだるい。
そこで、あらかじめDI Containerに使うクラスセットを纏めておく。名前を入れ替えるだけで使うクラスセットを切り替えることが出来る。ちょうど、名前をキーに、クラスセットを値にした辞書型を渡すのに似ている。

注意点として、実際にクラスの引数に依存クラスを書く際、**コンテナを直接指定してはいけない。** めんどくても依存クラスはしっかり書く。だって直接指定したらそのコンテナから変えられなくなっちゃうし……コンテナ定義読まないと何かわからないし……ちなみに、下記のService Locatorの実装はまさにこれのこと。

なお、これの実装に関してはライブラリを使ったほうがいい。
いろんな応用が載っているので。

## Service Locator
インスタンス生成方法を管理するデザインパターン。
クラスBを要求すると、クラスBを返してくれるワンクッション、Service Locatorを置く発想。

このパターンの欠点として、Service Locatorへの依存度が高まる。また、メソッドの再利用の場合は同様のService Locatorが新たに必要になる。
依存関係も分からない。

良いとこなしに見えるが、唯一パフォーマンスは勝ってるらしい。そりゃもう決まってるもんな。

[DIとServiceLocatorの違い - Qiita](https://qiita.com/ask123ee/items/3a660774da7d7b3f7540)
[Service LocatorとDependency InjectionパターンとDI Container - nuits.jp blog](https://www.nuits.jp/entry/servicelocator-vs-dependencyinjection)

一番わかりやすかった。
[やはりあなた方のDependency Injectionはまちがっている。 — A Day in Serenity (Reloaded) — PHP, CodeIgniter, FuelPHP, Linux or something](http://blog.a-way-out.net/blog/2015/08/31/your-dependency-injection-is-wrong-as-I-expected/)

パフォーマンスの話。
[.NET 系の DI コンテナ - Qiita](https://qiita.com/okazuki/items/239ca5ef46e5a085e085)
[【Unity】サービスロケーターを使ってみる - はなちるのマイノート](https://www.hanachiru-blog.com/entry/2020/11/12/120000#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%83%AD%E3%82%B1%E3%83%BC%E3%82%BF%E3%83%BC%E3%81%AE%E8%89%AF%E3%81%97%E6%82%AA%E3%81%97)