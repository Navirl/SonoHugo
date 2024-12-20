---
title: "Updateと時間系変数"
date: 2024-12-20T14:04:11+09:00
tags:
 - App/Unity
 - Learning
---

## Updateと時間系変数
### Update
1フレームに一回呼ばれるメソッド。**フレーム数の基準。**

### LateUpdate
1フレームに一回呼ばれるメソッド。
Updateとの違いは、**Updateが終わった後に呼び出される**こと。

### FixedUpdate
**物理演算の前**に呼ばれるメソッド。**Unity内での時間の基準。**
画面描画されるごとに呼ばれる前二つとは違い、**Fixed TimeStepの時間ごとに呼ばれている。**

たとえば60fpsだと約0.17秒ごとにUpdateとLateUpdateが呼ばれるが、FixedUpdateは0.02秒(既定値)ごとに呼ばれる。

問題は処理落ちしたときで、画面に表示した後、前のFixedUpdateから1秒も空いてしまった(FixedUpdate50回分足りない)ということが起きる。

この時、帳尻を合わせるためにFixedUpdateは**Updateより先に何十回と呼ばれる。**
いいかえると、Updateを止めてでもFixedUpdateを動かす。
といっても、本当に遅れた分を全部取り戻すとフレームが全然進まないので、Maximum Allowed Timestepに何秒分まで取り返すかの限界値が設定してある。限界値に達すると、Updateに処理を渡してフレームを進ませる。

このフレームが進んだ時、現実で何秒経っていても、Unity内ではMaximum Allowed Timestep分の時間しか進まない。言い換えるなら、どんなに処理落ちしても1fにつき0.3333333秒(既定値)はUnity内の時間が進む。

こうまでしてUnity内の時間を守りたいのは、**物理演算がUnity内時間を元に動いているから。** 時間がめちゃくちゃだと物理表現ができないため、FixedUpdateを時間の保障、あるいは基準として運用している。

[UnityのUpdateとFixedUpdateとLateUpdateの違い \| ゲームの作り方！](https://dkrevel.com/unity-explain/update-fixedupdate-lateupdate/)

### 時間系変数

#### fixedDeltaTime
前述のFixed Timestepは、スクリプト内ではfixedDeltaTimeとして定義されている。
これをスクリプトから書き換えると、当然物理演算の精度が上がり負荷も上がる。

#### maximumDeltaTime
Maximum Allowed Timestepのこと。

#### realtimeSinceStartup
システムの時計から取り出している現実時間。
**同一フレームで呼び出しても結果が変わる。**

[【Unity】 Timeクラス詳説 - エフアンダーバー](https://www.f-sp.com/entry/2016/08/15/190636)

ちなみに、deltatimeはUpdateが実行される(フレームが進む)度に実行されるので、**forなどの中で使用しても適切な値は返ってこない。** そらそうよ。

