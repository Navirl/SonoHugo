---
title: "Solution 2C - Screen Wrap"
date: 2024-12-20T14:03:58+09:00
tags: 
 - App
 - Unity
---

- コンポーネントが必須のscriptには、RequireComponentをつける。
- 使うであろう計算メソッドを定義しておく

- 毎秒ScaleSelfを呼ぶ

Unityのチェックボックスが無効化するのは**Updateのみ**であり、Triggerなんかは無効化しても普通に動く。
嫌ならif(!enabled)return;する。