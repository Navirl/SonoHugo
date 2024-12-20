---
date: 2021-08-22 13:53:08
tags: 
 - App
 - Unity
---

## 出来てなかったこと
- いちいちタレットの回転を取るより、計算したほうが早い
- Bullet.csをbulletPrefabに付ける

シングルトン
privateのバレットアンカーが無いときだけ、new GameObject。別に必ずゲームオブジェクトを返す必要はない。
嬉しい点はデータの共有が簡単なこと。

このcs自体はバレットに付ける。そこから自分をSetParent。
Invokeで破壊しつつ、Rigidbodyとってスピードを代入。
