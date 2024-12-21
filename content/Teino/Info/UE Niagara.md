---
date: 2024-12-21T15:18:50+09:00
title: "UE Niagara"
tags:
 - Info
---

daily:: [2022-11-12](Daily_Note/2022-11-12.md)
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)

パーティクル出すシステム。
弾幕とか背景とか。

source:: [How can I change Niagara variables via blueprint? - Asset Creation / FX - Unreal Engine Forums](https://forums.unrealengine.com/t/how-can-i-change-niagara-variables-via-blueprint/437640/6)

値をBlueprintで制御するときは、User Exposedに登録して参照させる。
そして外部から`Set Niagara Variable`を使って**名前参照で**値を入れる。

値型さえ合えばなんにでも入るので、やりたいことを実現できそうなパラメータはしっかり押さえる。

