---
title: "Singleton必要性"
date: 2024-12-20T14:03:57+09:00
tags:
 - #Program
---

## 何がいけない？
1. ガベージコレクションが解放しないので、テストした後の状態がずっと続き、テストしにくい。
2. クラス名がハードコーディングされるので、あとから書き換えるときに非常にめんどくさい。

## 対処
初期化用関数Init()の採用......なんてしたら2. が解決できないので、ここはDependency Injectionを使う。
難しいことは無く、引数で何を見ればいいか指定するようにすればいい。これだけで中身へのアクセスがなくなるため、あとから差し替えるのも簡単になる。

[例えば, Singleton を避ける - Born Too Late](http://blog.yuyat.jp/archives/1500)
[結合の疎密、DIとServiceLocator](結合の疎密、DIとServiceLocator.md)
