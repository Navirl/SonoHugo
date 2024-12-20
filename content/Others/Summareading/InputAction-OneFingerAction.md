---
uid: 20220624140027
tags:
 - App/UnrealEngine
 - CheatSheet
version: 5.0.2
---

[[InputAction-OneFingerAction]]

- 物が置かれてる
- 一本指が置かれた
- ジェスチャーを認識してない
- 二本指で押してない
	- これらすべてがTrueなら進む
- DTと一本指有効時間を足し、それが0.2以上ならばジェスチャーとして有効化
- 移動する