---
title: "py 文字列とリストとnumpy"
tags:
 - Info
---

date: 2024-12-20T14:08:08+09:00
up:: [Python](../Bar/Program/Python.md)

## 文字列→リスト
split。
引数に区切り文字を指定すると、文字列内のその区切り文字で分割して文字列リストにしてくれる。
例えば`"Hello, World!".split(',')`だと`["Hello", "World!"]`。

## リスト→文字列
join。
区切り文字に対して呼び出し、引数にリストを設定すると結合できる。
注意として、あくまで文字列が入ったリストじゃないと通らない。数値が含まれる場合はリスト内包表記なりで全部strにする。

`','.join([str(a) for a in x[i]])`

## numpy→文字列
np.array2string。引数のseparatorに区切り文字を指定する。
数値配列を一気に文字列にできる。