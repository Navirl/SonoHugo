---
title: "Automate"
tags:
 - Bar
---

date: 2024-12-20T14:05:33+09:00
up:: [Programming](Programming.md)

## 変数
pythonと同じく、事前に宣言する必要はない。
`[]`で配列になるし、`[c:g]`みたいな感じでkey:valueとして辞書も宣言できる。
呼び出したいときは`{variable}`。

## Strings
++でくっつく。
[Expressions & operators ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/expression.html#special_operators)

## Termux連携
taskerプラグインがそのまま読めるのでそれを使う。
直接コマンドは打てないので、ファイルを実行する。ただしTermuxの内部ストレージにあるファイルしか使えないっぽい。
そこに置いてればchmodが7かどうかは問題ないらしい。
[GitHub - termux/termux-tasker: Termux add-on app for integration with Tasker.](https://github.com/termux/termux-tasker#plugin-variables)


## Termux git
コア機能
ワンタップでgitを使用

変えたいもの
パス
コマンド


gitコマンドファイルを作成する


コンフィギュアフォルダを作成、その中にgitコマンドを並べる
名前を見て、そこに無ければ作成

git add .
git commit -m 'c'
git switch main
git pull
git merge sub --commit
git push
git branch -d sub
git switch -c sub

## fork or subroutine
forkは処理を分岐させる。
親側と分岐側は同時に実行される。戻り値なし。
https://llamalab.com/automate/doc/block/fork.html

subroutineは新たな処理を行う。
分岐側が終了するまで親は動かない。戻り値あり。
https://llamalab.com/automate/doc/block/subroutine.html

## Atomic
変数を永続化する。
明示的に消去しない限り残り続ける。
[Atomic example ⋅ Community ⋅ Automate for Android](https://llamalab.com/automate/community/flows/906)
### add and load
保存されている数値に数値を足し合わせるブロック。
足し合わせるほうの数値をデルタ値と呼称する。
[Atomic add & load ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/block/atomic_add.html)

## Expression true
式結果がtrueかどうかでflowを分割する、いわゆるif文。
[Expression true ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/block/expression_decision.html)
### true
Automateは**bool値を持たない**。
代わりに、下記の値をfalseとし、それ以外をすべてtrueとする。
- null
- 0(number)
- NaN
- 空、もしくは長さが0のtext
- 空のarray
- 空のdictionary

また、boolは無いが論理演算はある。あくまで**左から一つずつ演算していき結果だけ返す**というもの。
普段組み合わせ表だけ見ていると混乱しそう(例えばANDは両方trueの時にtrueを返す→両方をいっぺんに演算している、という誤解を持っている場合)だが、意味は何も変わっていない。

- &&
もし式がfalseなら左の値を返す演算。
- ||
もし式がtrueなら左の値を返す演算。
- ?
もし式がtrueならfalseを返す演算。

もちろん式は()で括れる。

[Expressions & operators ⋅ Automate ⋅ LlamaLab](https://llamalab.com/automate/doc/expression.html#logical_operators)

## split
`array split(text,regex)`
blockではなくfunctionのほうにある。
textを正規表現で分割してarrayにする。
[split ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/split.html)

逆の操作はjoin。
`text join(container, delimiter)`
デリミタを入力してarrayかdictionaryをtext変換。
[join ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/join.html)

## 現在時刻
`Now`
組み込みの変数。idempotent - 冪等であるため、ブロック中なら何度呼び出しても値は変わらない。

[Variables ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/variable.html#now)

冪等でない値が欲しいなら`text clock(type)`。デバイス起動からの時間も取得可能。

[clock ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/function/clock.html)

なお、どれにしてもUNIX TIMESTAMP、つまり秒数しか取れない。
現在の時間を取りたいなら`text dateFormat(timestamp, pattern, timeZone, language)`を使用する。

## foreach
そのものずばりforeachブロックがある。
ちゃんと最後にforwachブロックに処理を返さないとそこで終わるので注意。

[For each ⋅ Automate for Android ⋅ LlamaLab](https://llamalab.com/automate/doc/block/for_each.html)