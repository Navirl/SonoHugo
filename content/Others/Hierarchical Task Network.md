---
title: "Hierarchical Task Network"
date: 2024-12-20T14:03:39+09:00
tags: 
 - App
 - Unity
---

## 基本
階層化型タスクネットワーク。

- 大小さまざまな**タスク**
- タスクの関係性である**ネットワーク**
- 抽象度と効率を上げるため、タスク間に持たせる**階層構造**

の三つの要素をもとにできている。特に最後はタスク分割がしやすくなるので覚えておくこと。

## 内容
![スクリーンショット 2019-12-11 19.13.17.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F159348%2F02bffcb3-584c-38f1-58a4-fd89e94c0b62.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=8671d14610c78e5b401d97ce5425595b)

### World State
世界。環境情報のまとめ。  
ただしAIが必要な情報のみがまとめられている。

### Domain
階層化されたTaskすべて。
ここに問い合わせればTaskが出る。

### Task
HTNの基本単位。
Primitive TaskとCompound Taskの2種類がある。

#### Compound Task  
複合タスク。階層上位。**タスクの分岐点。**
保有MethodからWorld Stateの状況に合うものを探し、MethodのSubTaskを後続に流す。

##### Method
Compund Taskの持つ機能。
これが持つのは2つ。

1. PreCondition
	このMethodの選択条件
2. SubTasks
	複数個のTask群
	
#### Primitive Task
行動の最小単位。
これが持つのは3つ。

1. PreCondition
	このTaskの選択条件
2. Operator
	行動内容
3. Effects
	Taskによる実行結果、World Stateへの影響
	
### Planner
プランニングの本体。プラン管理者。
Domainを見て最適Taskリスト、つまり**Plan**を作成し、現在行うべきTaskを監視する。

再プランニングタイミングは三つ。

1. 現在のPlanが完了 or 失敗した
2. Planがない
3. 外部センサーでWorld Stateが更新された
	
###  Operator
Taskを実際のActionに変える部分。

英語のPDFだけど大体ここから引用してるから読まねば↓
[
Exploring HTN Planners through Example](http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter12_Exploring_HTN_Planners_through_Example.pdf)

[階層化型タスクネットワークを勉強して、ゲームAIのコードを書いてみた - Qiita](https://qiita.com/tyemiya/items/5c56678fe4b8afb2ee4f)