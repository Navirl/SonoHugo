---
date: 2022-03-10 14:33:50
tags:
 - Program/Paradigm
---

[AI意思決定アルゴリズム](Others/AI意思決定アルゴリズム.md)

## MVC, MVP, MVVM
いずれもGUIの整理法。
### MVVM
表示にかかわらないドメインロジックの入った**Model**、
ユーザー操作を受けViewModelの状態監視、画面を更新する**View**、
ユーザーが操作する画面のロジック、及びViewのデータを保持する**ViewModel**

の三つに分けるやり方。

利点として、参照関係がView→ViewModel→Modelの**一方向**になっており、実装しやすいということが挙げられる。
反対の変化、ViewModelでViewの変化が見たいなどの場合はイベントで掴む。

欠点として、Viewの更新は**データバインド**というものを使うらしく、それを使うのに特殊なライブラリが必要になる。


### MVP
#### Passive View
表示にかかわらないドメインロジックの入った**Model**、
ユーザー操作を受けPresenterに処理を投げ、Presenterの指示で画面を更新する**View**、
二つを仲介し画面表示ロジックを持つ**Presenter**

の三つに分けるやり方。

こちらはView→←Presenter→←Modelで**相互依存**しており、簡単なModelの変更でもView→Presenter→Model→Presenter→Viewと経由する必要がある。冗長。

利点としては、画面表示をPresenterに一任できるためテストが簡単。大きな変更もなくプロジェクトに導入しやすい。
一方欠点として、相互依存で両側から縛られるためPresenterの実装そのものが難しいということがある。

[MVVMとMVPパターン - Qiita](https://qiita.com/gdate/items/512f6fb9aba2a35a04e3)

MVPでも相互依存するわけじゃないよ、ということもあるらしい。

[UniRxでMV(R)Pパターンをやってみた](https://www.slideshare.net/torisoup/unirxmvrp)

#### Supervising Controller
ほぼPassive Viewと同じだが、PresenterからViewに表示情報を渡さず、Modelに仕込んだイベントから直接Viewに読み込む。

### MVC
データ処理の**Model**、
画面表示の**View**、
ユーザーが操作する**Controller**

の三つに分ける手法。
かつてはUser→Controller→Model→View→Userという流れだったらしいが、今はModelとViewを切り離しModel→Controller、Controller→Viewの関係を追加したModel2MVCというのも出てる。