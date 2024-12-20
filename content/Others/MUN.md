---
title: "MUN"
date: 2024-12-20T14:03:39+09:00
tags:
 - App/Unity
 - Learning
---

[Monobit Unity Networking (MUN) official document](http://www.monobitengine.com/doc/mun/)


## chatScript
まずは`using MonobitEngine`を追加、続いて`MonobitEngine.MonoBehavior`を継承。
`OnGUI()`内にGUI処理を書いていく。

[[Others/GUILayout]]
[[Nontagged/MonobitNetwork]]
### monobitView.RPC()
[[Nontagged/RPC]]
これを使ってメッセージを送るためのメソッド。

第一引数はString。受信メソッドの名前を指定する。
第二引数はMonobitTargets。とりあえず **.All(全員)と.Others(送信者以外)と.Host(ホストのみ)** をまず覚えておく。途中入室者が必要になったら別途覚える。
第三引数以降はメッセージ内容。大体何でも、配列でも送れる。ただし受信メソッドが対応してないとダメ。

#### 受信
`monobitView.RPC()`の第一引数の名前のメソッドを書く……のだが、注意点。
1. **\[MunRPC\]** のアトリビュートを頭に付記すること。
2. `monobitView.RPC()`の**第三引数以降に対応するデータ型の引数**値を定義すること。

### List.Add()
引数に指定した要素をListの末尾に追加する。

### List.RemoveAt()
引数に指定した**インデックスの要素を**削除する。

