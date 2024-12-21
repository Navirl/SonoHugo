---
date: 2024-12-21T15:14:15+09:00
title: "共変戻り値と反変引数 - Qiita"
created: 2022-03-29T15:17:42 (UTC +09:00)
source: https://qiita.com/7shi/items/39a222b5928bf0b6f745#java
author: 7shi
sr-due: 2022-04-13
sr-interval: 11
sr-ease: 270
---

# 共変戻り値と反変引数 - Qiita

> ## Excerpt
> C#を学習すると共変と反変という用語がでてきます。難しそうな用語ですが、その取っ掛かりとして戻り値と引数に的を絞って図によるイメージで説明します。数学的な知識は前提としませんし、コードも簡単なものしか出て来ません。型周りの知識を整理す...

---
C#を学習すると共変と反変という用語がでてきます。難しそうな用語ですが、その取っ掛かりとして戻り値と引数に的を絞って図によるイメージで説明します。数学的な知識は前提としませんし、コードも簡単なものしか出て来ません。型周りの知識を整理するのにも役立つでしょう。

この記事で最終的に説明したいことは、次のようにデリゲートから参照するメソッドの戻り値や引数の型を変える規則についてです。

```
C Foo(A a) { return new C(); }  // 戻り値はBの派生クラスC、引数はBの基底クラスA
delegate B Delg(B b);           // 戻り値と引数ともにB
Delg d = Foo;                   // 型が一致しないのに、なぜ許されるのか？
```

この規則はイメージしにくく混乱を招きがちですが、図による直感的な説明を試みます。

※ 具体例で用語に慣れることも目的としています。なるべく話を単純にするため、ジェネリックとの関係には触れません。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E7%B6%99%E6%89%BF)継承

例として、`A`を継承した`B`というクラスを考えます。

```
class A {}
class B : A {}
```

継承を包含関係で図示すれば、視点によって次の2種類が考えられます。

| 視点 | 図 | 概要 |
| --- | --- | --- |
| 型 | [![1_A⊃B.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fd37f9cb5-dd7d-c0c8-b3b0-db23da478d2e.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a1a30f7a7c2d9189fbd82eacb1b0acf9)](https://camo.qiitausercontent.com/7e0b251db5024d0da3677f57a3f3a3834252afda/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f64333766396362352d646437642d633063382d623362302d6462323364613437386432652e706e67) | `B` を `A` として扱えることから、`A` が `B` を含むイメージ
`A a = new B();` |
| 実装 | [![2_A⊂B.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F4de6ebbc-6ff3-6302-e317-08923f7f3a31.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=3cc634773a4d424c323e3053d9be5757)](https://camo.qiitausercontent.com/d2117a7a8630e872b91170c47703b6ddb4e7229c/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f34646536656262632d366666332d363330322d653331372d3038393233663766336133312e706e67) | `A` を継承した `B` が実装を追加することから、`B` が `A` を含むイメージ |

まったく逆の図ですが、どちらかが正しいというものではなく、目的に応じて選択することになります。今回は**型が話題の中心**のため、「型」の図を使用します。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%9B%B3%E3%81%AE%E4%BE%8B)図の例

先ほどの図に`Object`と`String`を追加してみます。

[![3_ObjStrAB.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F03f725f8-d809-b452-088f-09690ad71ee0.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=26d121c9fce343c6066a294d588ac000)](https://camo.qiitausercontent.com/49caf385e8653e9e04f8f32aee742badcbe90a39/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f30336637323566382d643830392d623435322d303838662d3039363930616437316565302e706e67)

図の見方というか、イメージが湧いたでしょうか。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%85%B1%E5%A4%89%E5%8F%8D%E5%A4%89)共変・反変

MSDN では次のように説明されています。（「」内の訳語を補っています）

[ジェネリックの共変性と反変性](https://msdn.microsoft.com/ja-jp/library/dd799517(v=vs.110).aspx) より

> -   「共変」Covariance
>     最初に指定された型よりも強い派生型を使用できるようにします。
> -   「反変」Contravariance
>     最初に指定された型よりも一般的な (弱い派生の) 型を使用できるようにします。

「強い」「弱い」は「狭い」「広い」とも表現されることがあります。ここでは当面必要な範囲で割り切って、継承に限定して話を進めます。

-   共変：型の制限を強める（対象範囲を狭める） → 継承先の派生クラスに変更すること
-   反変：型の制限を弱める（対象範囲を広げる） → 継承元の基底クラスに変更すること

便宜上、継承が進む方向と**共**通なのが「**共**変」と覚えておけば良いでしょう。

図で考えれば、内側への矢印が共変、外側への矢印が反変となります。「狭い」「広い」というイメージも表現されています。

[![4_共変・反変.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F245b7050-afb3-6c9b-9bf6-5299970823b8.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=28b2b2b98dd85eb83d59be079268b485)](https://camo.qiitausercontent.com/8eb17f1a577a359bff9476a2249f99dcad611e3a/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f32343562373035302d616662332d366339622d396266362d3532393939373038323362382e706e67)

※ これは説明のためのイメージに過ぎず、実際に何か物理的な広さを持っているわけではありません。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#ruby)Ruby

イメージを補強するため、Rubyでの継承の書式を紹介します。

※ この記事でRubyが出て来るのはここだけです。

クラスの定義で、C#では継承関係を `:` で表しますが、Rubyでは `<` で表します。

C#

```
class A {}
class B : A {}
```

Ruby

```
class A
end

class B < A
end
```

`<` は矢印として捉えて `B` は `A` から派生する（B ← A）というイメージが持てます。それが**共変**の方向です。

※ この矢印は[UMLのクラス図](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%A9%E3%82%B9%E5%9B%B3)とは逆向きなのに注意してください。

今回の図にこじつければ、`B < A` はサイズ比較で `A` が広いとも解釈できます。

[![1_A⊃B.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fd33c897a-8e66-54a5-5ac9-ecaeaf853b8a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=4a03df28025a272f49de6baddb3cbc06)](https://camo.qiitausercontent.com/2b2747c44921e0a74aed09b0ccdfa4a04456a81f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f64333363383937612d386536362d353461352d356163392d6563616561663835336238612e706e67)

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%8F%82%E7%85%A7)参照

図による型のイメージに慣れるため、ここからしばらくは基本的な言語仕様を図で説明します。

説明には `B` を継承した `C` も使用します。

A→B→C

```
class A {}
class B : A {}
class C : B {}
```

[![5_A⊃B⊃C.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F19ceb95f-694f-8a9e-c4bd-190477aab9df.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9f258a741aef2522ca84ff4086178bf0)](https://camo.qiitausercontent.com/802718b1b0fa45ab552466fd7d2e9a17e4358585/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f31396365623935662d363934662d386139652d633462642d3139303437376161623964662e706e67)

インスタンスを生成して変数に代入する書式を示します。

```
A a = new A();
B b = new B();
C c = new C();
```

これを変化させて結果を観察します。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%8F%B3%E8%BE%BA%E3%81%AE%E5%9E%8B%E3%82%92%E5%A4%89%E5%8C%96)右辺の型を変化

左辺を `B` に固定して、右辺の型を変化させてみます。`B` が入るのは当然として、`A` はエラー、`C` はOKです。

```
B b = new A();  // エラー
B b = new B();  // OK
B b = new C();  // OK
```

これを図で考えれば、大きい箱に小さいオブジェクトは入るのに対して、その逆はできないとイメージできます。`B` の通り口より大きな `A` は通り抜けができません。

[![6_右辺.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F09c70616-0c86-fe56-7100-b6ac4b1d525f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=cb6026e3bafd47ed0c27da420278cea9)](https://camo.qiitausercontent.com/0d4ff8018f37cc8b9d96218b1e9a2dbedc27929e/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f30396337303631362d306338362d666535362d373130302d6236616334623164353235662e706e67)

※ 実際には、参照型は値型と異なりインスタンス本体が代入されるわけではありません。あくまで説明のためのイメージです。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%B7%A6%E8%BE%BA%E3%81%AE%E5%9E%8B%E3%82%92%E5%A4%89%E5%8C%96)左辺の型を変化

次に右辺を `B` に固定して、左辺の型を変化させてみます。`B` が入るのは当然として、`A` はOK、`C` はエラーです。

```
A a = new B();  // OK
B b = new B();  // OK
C c = new B();  // エラー
```

先ほどと同様に通路が通れるかどうかでイメージできます。

[![7_左辺.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F8e0396ca-1032-a0a5-07e9-5e2ccc12bd28.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=96317eb83faecb7596fbf0fd48bfe9a5)](https://camo.qiitausercontent.com/b6416bfa5fd0b30a9e9bb28ab015635f33c985f3/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f38653033393663612d313033322d613061352d303765392d3565326363633132626432382e706e67)

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%85%B1%E5%A4%89%E3%81%A8%E3%82%A2%E3%83%83%E3%83%97%E3%82%AD%E3%83%A3%E3%82%B9%E3%83%88)共変とアップキャスト

`A a = new B();` は左辺が `A` の型ですが、`A` は派生クラスの `B` を含むため、`new B()` が代入できます。このように左辺に注目して「`A` だから `B` もいける」と考えることは、普段のプログラミングでも感覚的に行っているのではないでしょうか。

この考え方を形式的に `A` → `B` と表せば、継承が進む方向のため**共変**だと解釈できます。このように普段感覚的に行っていることに名前を付けたと捉えれば、少しは抵抗感が減るかもしれません。

また右辺に注目すれば、暗黙で `A a = (A)new B();` という `B` → `A` のキャストが行われているとも考えられます。このような基底クラスへのキャストを**アップキャスト**と呼びます。

左辺に注目するか右辺に注目するかで、型の変化が逆向きになっていることに注意してください。これは後でも出て来ますが、どこを基準に考えるかということが重要になります。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89)メソッド

メソッドを図にすれば、入力（引数）と出力（戻り値）のある箱として表現できます。

※ ここでは簡単のため、戻り値がない（`void`）メソッドを除外します。

引数と戻り値ともに `B` のメソッド `Foo` を考えます。

```
B Foo(B b)
{
    return new B();
}
```

[![8_Foo.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fa4b08817-93d0-26ae-cad0-cd854635a018.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b9a499840576a35fa907c4ec481209fc)](https://camo.qiitausercontent.com/8f1ec81ac26e1500ecf5442e47cb0e2e31123bb4/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f61346230383831372d393364302d323661652d636164302d6364383534363335613031382e706e67)

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%BC%95%E6%95%B0)引数

`Foo` の引数に別の型を渡すことを考えます。

呼び出し側

```
Foo(new A());  // エラー
Foo(new C());  // OK
```

代入と同様に `A` は通り抜けできず、`C` は通り抜けできるとイメージできます。

[![9_Foo引数.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fe96f6b1e-22ae-67af-b180-028a874cadc3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2b82e32d324280fca46565743f09dddd)](https://camo.qiitausercontent.com/faec29bb25ddd94ff8c8456787fa15b457f25d97/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f65393666366231652d323261652d363761662d623138302d3032386138373463616463332e706e67)

引数 `B b` へ参照を代入していると考えれば、本質的には `B b = new A();` と同じ条件だと分かります。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E6%88%BB%E3%82%8A%E5%80%A4)戻り値

今度は戻り値の方を変えてみます。

```
B Foo(B b)
{
    return new A();  // エラー
    return new C();  // OK
}
```

やはり通り抜けでイメージできます。`A` は大き過ぎて外に出られません。

[![10_Foo戻り値.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fe374fcba-4a42-a696-6751-cdf7439083bf.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=28d06741def9f80e37c94227cb2fa3ea)](https://camo.qiitausercontent.com/ab014842f3bab75b278a006b88896d3db096a947/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f65333734666362612d346134322d613639362d363735312d6364663734333930383362662e706e67)

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%8F%97%E3%81%91%E5%8F%96%E3%82%8A)受け取り

メソッドの戻り値を受け取ることを考えます。メソッドから出て来たオブジェクトを漏れなく受け取るには、受け口はメソッドの戻り値と同じか広く取る必要があります。

```
A a = Foo(null);  // OK
B b = Foo(null);  // OK
C c = Foo(null);  // エラー
```

[![11_Foo代入.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F46eca0fb-83ed-00ad-3cb2-1c24b1b69d77.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0d0b712e7dce673c27b0518b3e6b6cdb)](https://camo.qiitausercontent.com/5ded36169c7a0a7a541fb1e1ab434a9c62195b65/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f34366563613066622d383365642d303061642d336362322d3163323462316236396437372e706e67)

このように出入口をつなぐ場合、型の変化は進行方向に向かって広がること（暗黙のアップキャスト）しか許されないことが分かります。

[![12_進行方向.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F52b53c60-f2a1-02eb-fe80-e8a2905edf6b.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0eb75107921a30d6a2ce762408a55d38)](https://camo.qiitausercontent.com/d81f77fb37dab8cba52fad9fca3fab5344ecba00/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f35326235336336302d663261312d303265622d666538302d6538613239303565646636622e706e67)

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E3%83%87%E3%83%AA%E3%82%B2%E3%83%BC%E3%83%88)デリゲート

オブジェクトを変数に代入するように、メソッドはデリゲートに代入できます。

※ マルチキャストデリゲートまで考えればこの言い方は不正確ですが、デリゲートにまつわる共変・反変の理解を優先するため、単純化して説明します。

引数と戻り値ともに `B` のデリゲート `Delg` を考えます。

デリゲートを図にすれば、メソッドと同じように入力（引数）と出力（戻り値）のある箱として表現できます。

[![13_Delg.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fbed3aac8-0daa-2ed8-8502-ab49ca0040dc.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=cdbb734261558e454aaab413f1e62898)](https://camo.qiitausercontent.com/ab6417c4034d386d0748f28a01ed37156ac07d5a/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f62656433616163382d306461612d326564382d383530322d6162343963613030343064632e706e67)

デリゲート単体で呼び出すことはできません。

```
Delg d;
d(new B());  // エラー
```

[![14_DelgEmpty.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F056bb2ed-4783-10db-b963-30745b6079a0.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b1612a5823e6ffd331d712e44d831dfc)](https://camo.qiitausercontent.com/d4fbd6eebed1d9a0639d0c221d7510d2ec6c9227/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f30353662623265642d343738332d313064622d623936332d3330373435623630373961302e706e67)

メソッドを割り当てれば呼び出せるようになります。

```
Delg d = Foo;
d(new B());
```

[![15_DelgFoo.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fbc89066c-5414-e1d1-20a8-10f28fa3a2ba.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=60e4380fc3f170f8abf47e6232dc0c93)](https://camo.qiitausercontent.com/5b1a017ddc3c9c9818bdb5f581b77133bde9e27f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f62633839303636632d353431342d653164312d323061382d3130663238666133613262612e706e67)

※ 実際にはデリゲートからメソッドが参照されており、中に入るわけではありません。あくまで説明のためのイメージです。

さて、ここまでは準備でした。いよいよここから先がこの記事の核心です。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%85%B1%E5%A4%89%E6%88%BB%E3%82%8A%E5%80%A4)共変戻り値

戻り値の異なるメソッドを用意します。

※ 後で引数を変える都合上、戻り値と引数を接尾辞として追加しています。

```
A FooAB(B b)
{
    return new A();
}

C FooCB(B b)
{
    return new C();
}
```

これを `Delg` に割り当てようとすると、`FooAB` はエラーになりますが、`FooCB` はOKです。

```
Delg d = FooAB;  // エラー
Delg d = FooCB;  // OK
```

メソッドから出て来た戻り値がデリゲートを通り抜けられるかどうかでイメージできます。

[![16_共変戻り値.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Fe1e1e6ec-24a0-21d9-2491-ef21bff25991.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=48045eefa656a0c8bb2ded0873f038b8)](https://camo.qiitausercontent.com/301580e7db66de6b570939e774579a47fc14a9de/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f65316531653665632d323461302d323164392d323439312d6566323162666632353939312e706e67)

メソッドの方が狭ければ通り抜けられます。デリゲートの型からメソッドの型を見れば `B` → `C` となり共変です。このようにデリゲートが共変の戻り値を受け付けることを**共変戻り値**と呼びます。

進行方向に対して広がることしか許されないという原則を満たしています。戻り値をデリゲートから見ると進行方向とは逆になることに注意が必要です。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%8F%8D%E5%A4%89%E5%BC%95%E6%95%B0)反変引数

今度は引数の型を変えてみます。

```
B FooBA (A a)
{
    return new B ();
}

B FooBC (C c)
{
    return new B ();
}
```

これを `Delg` に割り当てようとすると、`FooBA` はOKですが、`FooBC` はエラーになります。

```
Delg d = FooBA;  // OK
Delg d = FooBC;  // エラー
```

戻り値と同様に、引数がデリゲートを通り抜けられるかどうかでイメージできます。外から見えているのはデリゲートの引数型 `B` であることに注意してください。

[![17_反変引数.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2Ffdaa73cd-da3f-a5fb-5ccd-e2c194269619.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ea6c3af8f81eabbbba28744b18aec7f6)](https://camo.qiitausercontent.com/fff0b752263eb4aaf0eced758d345e96b5fafa4e/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f66646161373363642d646133662d613566622d356363642d6532633139343236393631392e706e67)

※ 右の図は `C` なら通り抜けられそうですが、デリゲートは `B` を通すことを保証しないといけないため、`B` が通らないのは認められません。

メソッドの方が広ければ通り抜けられます。デリゲートの型からメソッドの型を見れば `B` → `A` となり反変です。このようにデリゲートが反変の引数を受け付けることを**反変引数**と呼びます（あまり一般的な用語ではありません）。

ここでも進行方向に対して広がることしか許されないという原則を満たしています。戻り値とは逆になっているのは、進行方向ではなくデリゲートを基準に見ているためです。戻り値では進行方向とは逆になっています。

[![18_共変・反変.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F32057%2F55db7f66-1fc6-9c46-c33d-5a7194aea0ba.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ca49f9c2b453c7e3025328a49bc32eeb)](https://camo.qiitausercontent.com/97bd04ded89e4109d4fe2c1a64d8199b0ce2a036/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f33323035372f35356462376636362d316663362d396334362d633333642d3561373139346165613062612e706e67)

このように共変・反変を考えるときは、どこを基準に見ているのかを押さえておかないと混乱します。

※ この図式を一般化して、入力に関係するものは反変、出力に関係するものは共変という図式を意識しておけば、この記事では言及しませんがジェネリックとの絡みも理解しやすくなるでしょう。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%89)オーバーライド

派生クラスでメソッドをオーバーライドするケースを考えます。

引数の型を変えるとメソッドのオーバーロードとして扱われてしまうため、引数の型を変えることはできません。戻り値も型を変えるとエラーになります。

C#

```
class A {}
class B : A {}
class C : B {}

class Test1
{
    protected virtual B Apply(B b)
    {
        return new B();
    }
}

class Test2 : Test1
{
    protected override B Apply(A b)  // エラー: オーバーライド元がない
    {
        return new B();
    }

    protected override C Apply(B b)  // エラー: 共変戻り値不可
    {
        return new C();
    }
}
```

このようにオーバーライドでは型を変えることはできません。デリゲートの方が柔軟です。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#java)Java

参考までにJavaのことを書いておきます。

Javaでも引数の型を変えるとオーバーロードとして扱われる点は同じですが、共変戻り値は認められています。

Java

```
class A {}
class B extends A {}
class C extends B {}

class Test1 {
    protected B apply(B b) {
        return new B();
    }
}

class Test2 extends Test1 {
    protected B apply(A b) {  // 単なるオーバーロード
        return new B();
    }

    protected C apply(B b) {  // OK: 共変戻り値
        return new C();
    }
}
```

Javaのメソッドはデフォルトでオーバーライドが可能なため、C#と異なり `virtual`, `override` キーワードはありません。逆に、オーバーライドを禁止するとき `final` を明示します。

## [](https://qiita.com/7shi/items/39a222b5928bf0b6f745#%E5%8F%82%E8%80%83)参考

-   [Covariant return type](https://en.wikipedia.org/wiki/Covariant_return_type)
-   [共変性と反変性 (計算機科学)](https://ja.wikipedia.org/wiki/%E5%85%B1%E5%A4%89%E6%80%A7%E3%81%A8%E5%8F%8D%E5%A4%89%E6%80%A7_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%A6))
