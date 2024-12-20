---
tags:
  - Info
---

date:: [2024-06-04](/Daily_Note/2024-06-04.md)
up:: [sd](../Bar/Stable%20Diffusion.md)
down:: [sd work2](sd%20work2.md)

[2024-06-14](../Daily_Note/2024-06-14.md)

sdを使用した仕事のメモ。
多分日誌に近くなる。


キャラの指定が入るので、それを元にキャライメージ固め→ストーリーに沿った画像を生成する

```
主人公：没個性（フツメン）、ちょっと気の強いイメージ、サラリーマン
ヒロイン：黒髪、OL、ちょっと地味目、Cカップ→Gカップ
    ※ヒロインは大体 F ~ K カップ
鬼瓦：胸小さめ、美人ではない、ギャグキャラ、強面
```

[sdwebui 問題確認](sdwebui%20問題確認.md)

基本一枚、厳しければ背景とキャラで分けて編集で合わせる
- rembgなどによる切抜き
- 白背景

>[! note]
>layerdiffuseが使えるなら使う。たまに足が透けるが綺麗。
>i2iなどでは使えない点には注意。ControlNet、ReferenceやIP-Adapterなど画像を入力するものもうまくいかない。
>
>背景を一緒に出力するjointはそんなに背景との整合性を保っている感じじゃない
>なので出力した後普通にi2iした方がよさそう


キャラ以外に強調するべきものがある際には、背景のみの画像も必要

生成終わったらナンバリング
"画像通し番号_セリフ行数 セリフ" とする

下着は切抜き、白飛ばし
キスシーンは一色塗りつぶし
大きく肌が見える場合は白靄、布面積拡大など加工
（ただし、広告じゃなく動画販売で収益上げる方針でもあるらしいので気持ち程度で）

■OK 着衣での胸や臀部のアップ 胸の谷間（際どくてもOK） 胸・肌色が透ける表現 へそ出し 水着（ビキニOK） レオタード アップではないパンチラ キスシーン ■NG 下半身のアップ 乳首出し 乳首透け・ピンク色が透ける表現 下着姿・ヌード パンチラのアップ パンモロ

小物など出すのが難しいんのはi2iを使用する

>[! tips]
> - 顔アップ、バストアップ、lookingAtViewerが多いので出来るだけ差をつける
> - キャラのポーズもちょいちょい挟んで変化付ける（髪かきあげとか）

長尺がメインになるのでそれ想定
パンチラ、胸揺れの為にinpaintでその辺を修正できるとGood

---

 - [ ] 一枚に時間を決める
     - 仮に30枚つくるとして、報酬6000円
     - 時給1000円、日に6時間働くとする
     - 30枚を6時間以内に作るので、一枚0.2時間、12分になる
         - 実際は変動が生じるので8分くらいにはしたい
     - 時給1500円だと2/3になるので、一枚8分になる


背景、前景どちらかを先に生成
背景先だとinpaintの手間がかかるので前景先がよさそう（キャラを目立たせる直感的にも）
しかし合わせて生成できないものに対してのみという感じ

なのでキャラ全生成

---

## プロット
まず台本読んで画像決定
ざっくりどこに何が必要なのか、どのキャラなのか、キャラが居ないのか確認
ついでに枚数と想定時給から一枚何分かざっくり決めておく
この後のガチャで時間がかかる理由はキャラのポーズ等が決まってないからなので、出来ればラフも描く

---

ChatGPTやClaudeも使える
CSVを渡し、画像の割り振り付与
    ここの付与はちょっとズレるので手動直し
そのままでもいいが、SD1.5用のプロンプトにしてDantaggenに放り込む方法がある
あまり必要はない

```
ありがとうございます。以下は完成した台本です。
この台本に15~20枚ほど画像を付け、Youtubeのshort動画にしようと考えています。
どの行にどのような画像を加えるかを、CSVフォーマットに則り、新たな列に付記してください。
また、画像はFawとSeikaの関係性によりフォーカスしたものにしてください。
動画制作のスペシャリストである貴方の意見をお聞かせ願います。
```

```
では、回答の長さ制限を考慮し、各行の本文とセリフ/ナレーション列をカットして、行番号と画像の説明のみが書かれたCSVフォーマットで回答してください。20枚の画像は台本全体にまんべんなく割り振ってください。ただし、話の流れで画像に疎密を付けたい場合はその限りではありません。
念のため、完成原稿をもう一度お送りします。こちらを元に回答してください。
```

[Claude](https://claude.ai/chat/02f53b64-21b1-4460-bc51-1333ea3b1a63)じゃないと、キャラや背景をまず規定するという動作をしない
でもChatGPTじゃないとプライベートじゃない

## タネ生成
### キャラ
決まったらキャラ生成ガチャEndless
一枚に対して基本決定的な一枚が出た時点で終了する
多くて三枚まで
ここは後でComfyUIの情報も、webuiの情報も使うのでPrompt Readerを使用してpng保存

重視するのは想定する雰囲気にどれだけ近いか
手や小物の精細さや **背景** ではない、その辺は後で修正する

Hyper、cfg1、Negpip高速化、~~scribble~~

生成終了したらlama消し、webuiでinpaint
ざっくりそれっぽくなるまで
**出来る限りシンプルでいい**、どうせアプスケで変わる
ここで三回やって上手くいかなければ別の一枚を使用する

よっぽど背景がクソならAnimeSegで切って差し替え入れるが、それは

### 風景
風景の方は、一発で出すのは結構難しい
写真を使うならSoftedgeやDepth使用、M-LSDを混ぜたりする
i2iだとなかなか絵に近づけなかったりするので

これでラフが出来るので一気に渡す

## アップスケール
最後にTileとTile Diffusionでアップスケール


---

Negative一例
```
((EasyNegative)), (worst quality:2), (low quality:2), (normal quality:2),((monochrome)), ((grayscale)), paintings, sketches, skin spots, acnes, skin blemishes, age spot, glans,extra fingers,missing fingers,strange fingers,bad hand, deformed, poorly drawn, extra limbs, close up, weird colors, blurry, watermark, blur haze, long neck, watermark, elongated body, cropped image, out of frame, draft, (((deformed hands))), ((twisted fingers)), double image, ((malformed hands)), multiple heads, extra limb, extra breasts, ugly, missing limb, cut-off, grain, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, long nack, disgusting, extra fingers, (weird figure), missing arms, mutated hands, cloned face, missing legs,misaligned teeth, bad teeth,hat, cap,tattoo, straps, swim wears, closed eyes, under bust,cow boy hat, cap, dark circles,split,NSFW, ((tiara, headpieces, animal ears)), badhandv4, negative_hand-neg,crop_top, angel, short_tops, ((tie:1.4)), nude, topless, split_skirt, split, bed_room,
```