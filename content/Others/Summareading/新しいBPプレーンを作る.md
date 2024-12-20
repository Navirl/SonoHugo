---
uid: 20220617201317
tags:
 - App/UnrealEngine
 - CheatSheet
aliases: Create Plane Candidate
version: 5.0.2
---

- ARプレーンの座標をワールドに変換
- 座標をもとにBPプレーンをスポーン
- ARプレーンからGet Extentでprobe coverのサイズを取る
	- 何でも反射用キューブマップのサイズらしい、こんなんでARプレーンのサイズわかんの……？
	- ここCppなんで詳細が分からない
- BPプレーンにExtentのサイズでスケールをセット
- [[Plane色を取る]]
- プレーンを初期化
	- デプスマップ
		- こっちはカメラから本当にDepthとれたかどうかで処理を分けて安全になってる
		- 実際にここに値を入れてるのはBP_ARPawnのEvent TickのSequence1、Fetch camera depth map if available
	- プレーンカラー
		- 関数内で何もしてねぇ

ARTrackable.h 428
The size of area this probe covers
FVector Extent;