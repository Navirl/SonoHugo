---
title: "Logical Operation"
date: 2024-12-20T14:03:42+09:00
---
 #Program

計算時は$\lnot \land \lor$の順。


# 論理演算子
| 記号              | 名称                                 |
| ----------------- | ------------------------------------ |
| $\lnot$           | 否定(negation)                       |
| $\land$           | 論理積 (連言:conjuction)             |
| $\lor$            | 論理和 (選言:disjunction)            |
| $ightarrow$     | 含意(implication)                    |
| $\Leftrightarrow$ | 同値 (equivalence)                   |
| $eebar$         | 排他的論理和（exclusive disjunction) |


否定は￣、論理積は･、論理和は+という書き方もあるけど今回はこっち。･だと時々省略される。

全称限量子$orall$、存在限量子$xists$なんかも打てるけど省略。同じくトートロジー$	op$、矛盾$ot$、モデル(~を含意する)$Dash$、含意の別記号$\supset$、ゆえに$	herefore$、なぜなら$ecause$も省略。

ちなみに排他的論理和とはどちらか一方が真のとき真になる演算。XOR。

[LaTeXコマンド集 - 論理式 (論理記号,限量子)](http://www.latex-cmd.com:80/equation/logical.html)
[論理記号の一覧 - Wikipedia](https://ja.wikipedia.org/wiki/%E8%AB%96%E7%90%86%E8%A8%98%E5%8F%B7%E3%81%AE%E4%B8%80%E8%A6%A7)

## 含意
英語では if...then... に値する。
前提が満たされるとき、結論が導かれるという論理式。
しかし真理値表は少しだけ複雑。

| A   | B   | $A ightarrow B$ |
| --- | --- |:-----------------:|
| 1   | 1   |         1         |
| 1   | 0   |         0         |
| 0   | 1   |         1         |
| 0   | 0   |         1         |

例えば、Aを「明日雨が降る」、Bを「私は傘を持っていく」と置いてみる。これが正しければ真であり、正しくなければ偽となる。
余談だが実会話はともかく、論理演算の含意ではこの二つに意味上の関連性は必要でない。

1行目は、雨が降り、かつ、傘を持参しているので真である。
2行目は、雨が降り、かつ、傘を持参していないので偽である。
3行目と4行目は、雨が降らなかった場合の話。この命題は**雨が降った場合についてのみ言及しており、雨が降らなかった場合については何も言っていない。** そのため、実際に雨が降った場合に傘を持っていくかどうかはわからない。
だが、もう一度命題に戻ってみると、$A ightarrow B$を**「正しくない」と証明できなかった** と言える。この場合はまるで法学の推定無罪のように**その命題は真である**ということになる。

### どうしてこうなった

この直感に反する結果は、論理演算の$ightarrow$と日常会話のthen(ならば)が**完全に互換ではない**ことによって生じる。

日常会話のthen(ならば)は$ightarrow$のほかに **$\Leftrightarrow$** の意味も持っている。「雨が降る」ならば「傘を持っていく」と言ったとき、**暗黙的に「雨が降らない」ならば「傘を持って行かない」と言っている** ことが大多数である。これは論理的には$A \Leftrightarrow B$を表している。
当然、別記号である$ightarrow$には後者の意味は含まれないため、直感的にわかりにくくなってしまうのである。

### どうすればいい？

それでも直感的にわかりやすくしたいなら、そもそも含意を使わないほうがいい。上記の真偽値は**$\lnot A \lor B$と等しい** ため、**「Aでない、もしくはBである」** と書き換えれば誤解は起こらない。

もしくは、**「嘘かそうでないか」** を考えることによっても直感的にできる。
例えば「加藤が来る」ならば「佐藤が来る」場合、

| A   | B   | $A ightarrow B$ |                                                                                                            |
| --- | --- |:-----------------:| ---------------------------------------------------------------------------------------------------------- |
| 1   | 1   |         1         | 「加藤も佐藤も来た」ので**命題は嘘ではない。よって真。**                                                       |
| 1   | 0   |         0         | 「加藤が来たが佐藤が来なかった」ので**命題は嘘。よって偽。**                                                   |
| 0   | 1   |         1         | 「加藤が来なかったが佐藤が来た」ことと「加藤が来るならば佐藤が来る」ことは**矛盾せず、嘘ではない。よって真。** |
| 0   | 0   |         1         | 「加藤も佐藤も来なかった」ことと「加藤が来るならば佐藤が来る」ことは**矛盾せず、嘘ではない。よって真。**       |

このようにできる。事実に対して命題を比較し、嘘かそうでないかを判断してやればそこそこ直感的。

[含意の値 \| 命題論理 \| 論理 \| 数学 \| ワイズ](https://wiis.info/math/logic/propositional-logic/value-of-implication/)
[前提命題が偽ならば全体の命題は真とは \| Math Relish](https://mathrelish.com/mathematics/implication)



# 変換法則

8つの変換法則。このうち後ろ三つは(一般の)数学でも成り立つ。

## ド・モルガンの法則
- $\lnot(A \land B)=\lnot{A} \lor \lnot{B}$
- $\lnot(A \lor B)=\lnot{A} \land \lnot{B}$

## 恒等則
- $A \land 1=A$
- $A \land 0=0$
- $A \lor 1=1$
- $A \lor 0=0$

1や0をくっつけた時の結果。

## 同一則
- $A \land A=A$
- $A \lor A=A$

同じ文字をくっつけた時の結果。

## 補元則
- $A \land \lnot{A}=0$
- $A \lor \lnot{A}=1$

Notで同じ文字をくっつけた時の結果。同一則から発展。

## 吸収則
- $A \land (A \lor B)=A$
- $A \lor A \land B=A$

それがAを含むなら$\land$AでAになるし、
それがAの一部なら$\lor$AでAになる。

## 交換則
- $A \land B=B \land A$
- $A \lor B=B \lor A$

## 結合則
- $A \land (B \land C)=(A \land B) \land C$
- $A \lor (B \lor C)=(A \lor B) \lor C$

## 分配則
- $A \land (B \lor C)=A \land B \lor A \land C$

# 双対原理
## 双対論理式
ある論理式に対し、以下の操作を行った式。
- $0 ightarrow 1$
- $1 ightarrow 0$
- $\land  ightarrow  \lor$
- $\lor  ightarrow  \land$

例えば、 $(x \lor y) \land z$ の双対論理式は $x \land y \lor z$となる。
$\lnot$がついたりは**しない**。

ここで気づきにくいのが、**$x \land y \lor z$** の双対論理式が **$(x \lor y) \land z$** であること。$\land$が$\lor$より先といったが、あれは**暗黙的に()がつく**ということを指している。そのため$x \land y \lor z$を正確に書くと **$(x \land y) \lor z$** となる。
そして、**双対原理は計算順序まで変えろとは言っていない**のでこのまま変換して$(x \lor y) \land z$になる。

これをやらないと、$x \land y \lor z$の双対論理式が$x \land z \lor y \land z$になることが理解できない。証明だとたまに使う。

そして、ある論理式 **$X$** に対する双対論理式を **$X^d$** と表す。

## 双対定理
**$X=Y$ が成り立つとき、 $X^d=Y^d$ が成り立つ。**
当然だが**$X=X^d$ ではない。**

[【あの定理を知っていますか？】ブール代数における証明のコツ【分かりやすい】 \| Golden-Database](https://www.virtualinvader.com/bool-algebra-prove/#toc3)

## 3値論理
True、Falseに**Undefined**を加えた論理演算。
$\land$を **$\&\&$**、$\lor$を **$||$**、$\lnot$を$!$ と表記する。

### &&
| A         | B         | A && B    | 説明         |
|-----------|-----------|-----------|--------------|
| true      | true      | true      | B の値と一致 |
| true      | false     | false     | B の値と一致 |
| true      | undefined | undefined | B の値と一致 |
| false     | true      | false     | A の値と一致 |
| false     | false     | false     | A の値と一致 |
| false     | undefined | false     | A の値と一致 |
| undefined | true      | undefined | A の値と一致 |
| undefined | false     | undefined | A の値と一致 |
| undefined | undefined | undefined | A の値と一致 |

どれにせよ、**Aの値によってBを評価するかどうか決めている。**

AがTrueの時は、B次第。
AがFalseの時は、Bを見るまでもなくFalse（A次第）。
AがUndefinedの時は、Bを見るまでもなくUndefined（A次第）。

プログラミング的に書くならこうなる。
```
if (A) {
    if (B) {
        // 処理
    }
}
```

### ||
| A         | B         | A && B    | 説明         |
|-----------|-----------|-----------|--------------|
| true      | true      | true      | A の値と一致 |
| true      | false     | true      | A の値と一致 |
| true      | undefined | true      | A の値と一致 |
| false     | true      | true      | B の値と一致 |
| false     | false     | false     | B の値と一致 |
| false     | undefined | undefined | B の値と一致 |
| undefined | true      | undefined | A の値と一致 |
| undefined | false     | undefined | A の値と一致 |
| undefined | undefined | undefined | A の値と一致 |

AがTrueなら、Bを見るまでもなくTrue（A次第）。
AがFalseなら、B次第。
AがUndefinedなら、Bを見るまでもなくUndefined（A次第）。

コードはこう。
```
if (A) {
// 処理
} else {
	if (B) {
	// 処理
	}
}
```

### !
表は書かないが、**Undefinedの否定はUndefined**。

### ド・モルガンの法則
例にもれず、3値でもド・モルガンは通る。
$!A||!B = !(A\&\&B)$
$!A\&\&!B = !(A||B)$


[【3値論理】プログラミングで使われる命題の真偽【boolean】](https://suwaru.tokyo/%E3%80%903%E5%80%A4%E8%AB%96%E7%90%86%E3%80%91%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%A7%E4%BD%BF%E3%82%8F%E3%82%8C%E3%82%8B%E5%91%BD%E9%A1%8C%E3%81%AE%E7%9C%9F%E5%81%BD/)
