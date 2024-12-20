---
title: "自作PC参考"
date: 2024-12-20T14:04:15+09:00
tags:
 -
---

## CPU
[IntelのCPUの末尾にあるK, S, T, Uなどのアルファベットについてまとめ](https://pssection9.com/archives/intel-cpu-alphabet-suffix-meaning.html)
### F
**iGPUが無効化**されている。「こっち使って電力消費を抑えるか」みたいなことはできない。
その分、価格は安め。

一応iGPU自体はついてるが、**ユーザーが有効化することはできない**。
### K
OC可能。
OCしなくても、許容する使い方が広いために壊れにくいというメリットあり。
### X
Kのやべーやつ。
性能だけを目指すならこれ。
## メモリ
## HDD
## SSD
### NVMe SSD
## GPU
[GPU仕様一覧表 - NVIDIA GeForce Wiki*](https://wikiwiki.jp/nvidiavga/GPU%E4%BB%95%E6%A7%98%E4%B8%80%E8%A6%A7%E8%A1%A8)
[GPU UserBenchmarks - 673 Graphics Cards Compared](https://gpu.userbenchmark.com/)
一番電力がかかる部分。

### SLI, CrossFireX
[グラフィック性能を上げたい！SLI、CrossFireXとは？構築方法と注意点│本気で勝ちたいゲーマーにおすすめのゲーミングPC・ゲームパソコン](https://www.satallax.com/news/sli-crossfirex/)

**グラボ二枚刺し。**
NvidiaではSLI、AMDではCrossFireXと呼ばれる。

### Nvidia
#### TITAN
[GeForce TITAN シリーズと TESLA シリーズの違い](http://direct.pc-physics.com/videochip/geforce-titan-tesla-difference.html)

業務用で使われるTeslaというGPUを、民生用にチューニングしたもの。
ゲームにも使えるが、主な用途は科学技術計算なのでコスパが悪い。

## Cooler
### 水冷
空冷に比べ冷却効率がいいとされている。
ただしホース内を冷却液が行き来する関係上、時々ホースの交換が必要になる。怠ると冷却液が漏れて諸々お釈迦に。

## PSU
Power Supply Unit。電源のこと。

[電源容量計算（電源電卓）電源の選び方｜ドスパラ通販【公式】](http://aws-www-elb01-1204188479.ap-northeast-1.elb.amazonaws.com/5info/cts_str_power_calculation_main)
[適切な PC 電源の選び方: 知っておくべきこと - インテル](https://www.intel.co.jp/content/www/jp/ja/gaming/resources/power-supply.html)
[ASCII.jp：いまさら聞けないIT用語集　TDPってなに？ 消費電力じゃないの？ (1/3)](https://ascii.jp/elem/000/001/724/1724010/)

コンセントとの兼ね合い上、現実的に見るなら最も気にするべき部分。これによって拡張性も決まるので重要。なお、ガチ勢にとっては3,4年程度で買い替えるモノらしい。

電力変換効率の良い負荷率は **50%** なので、実計算の2倍程度の電源を用意しておけば問題ないことになる。

[【自作PC】最大の2倍は多すぎ？寿命や効率からＰＣ電源ユニットの選び方とオススメの倍率 \| あさくひろくPCゲーミング](https://asahirogame.com/entry/dengen2bai)

**が、実際に消費電力MAXを出すことなんてほとんどない**のでもっと小さい電源を使ったほうがお得。これはインテルの公式ページでも言っている。

[Power Supply Calculator - PSU Calculator \| OuterVision](https://outervision.com/power-supply-calculator)

ざっくり計算ページはこちら。
CPUやGPUで使われている数値は、各製造元が公開しているTDPの数値による。

[ASCII.jp：いまさら聞けないIT用語集　TDPってなに？ 消費電力じゃないの？ (1/3)](https://ascii.jp/elem/000/001/724/1724010/)

### 保護機能
変換効率に目が行きがちだが、とても重要な部分。
過剰電圧時にPSUをシャットダウンするOVP、短絡保護などがある。

### 80plus
[電源ユニットの80PLUSエディションの違い \| ゲーミングPCなう](https://gamingpc-now.com/choice/psu-80plus)
[電源ユニットの変換効率～指標の共通規格！80PLUS【パソコン購入術】](https://www.pasonisan.com/pc-jisaku/power-80plus.html)

電源の変換効率が規格化された認証グレード。6段階。
- STANDARD
- BROZE
- SILVER
- GOLD
- PLATINUM
- TITANIUM

それぞれに負荷率に対する電源効率は以下の通り。
ちなみにSTANDARDの80%でもなかなかすごいこと。

|                 | 20% | 50% | 100% |
|:---------------:|:---:|:---:|:----:|
| 80PLUS STANDARD | 80% | 80% |  80% |
|  80PLUS BRONZE  | 82% | 85% |  82% |
|  80PLUS SILVER  | 85% | 88% |  85% |
|   80PLUS GOLD   | 87% | 90% |  87% |
| 80PLUS PLATINUM | 90% | 92% |  89% |
| 80PLUS TITANIUM | 92% | 94% |  90% |

例えばGOLDの90%の場合、500Wを使うと450Wの電力が生成され、50Wは放熱や電源ユニットの消費電力に使われる。

これの認証には金がかかるので、あえて認証せずに安くして売ってる電源もあるらしい。
いや、認証って保証も兼ねてるんでやるべきだと思うんですけど。

### モジュール、非モジュール、セミモジュール
電源から伸びているケーブルが電源に一体化されてるかどうかで分けられている。
一般的に、**使わないケーブルは取り外したほうがエアフローがよくなる**のでモジュールがおすすめ。
セミモジュールは必要なケーブルだけ一体化し、残りをモジュールにしたもの。
## モニター
[ディスプレイと技術](Others/ディスプレイと技術.md)
[ゲーマーなら知っておきたい！V-SYNCとG-Syncと144Hzについて！](https://harukin.com/games/%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4120hz144hz/)

### TN
応答速度、入力遅延が少なく、安価。視野角は悪い。
### VA
色再現が良く、視野角良し。  応答速度もそこそこ。
丁度TNとIPSの中間くらい。
ただしコントラスト比はどちらにも勝る。
### IPS
視野角、色再現に優れる。高価。応答速度は遅め。
ただ最近の技術で応答1msや0.6msなんてのも出てるので、もう応答速度に関してあまり心配はない。迷ったらこれ。
## Misc
