---
title: "js アンパサンドと縦線"
tags:
 - Info
---

date: 2024-12-20T14:07:56+09:00
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)

js アンパサンドと縦線
論理演算子。ifの中で使えるほか、値を入れるときにifを省略して入れられる。

後者はちょっと引っかかるが、もともと`&&`は一つ目がfalseなら一つ目を、それ以外で二つ目を。`||`は一つ目がtrueなら一つ目を、それ以外で二つ目を返す演算子なので、まあ本来の使い方。

2個3個結合するときは、左から右、かつ&&を優先することに注意。

[JavaScriptの「&&」「||」について盛大に勘違いをしていた件 - Qiita](https://qiita.com/Imamotty/items/bc659569239379dded55)
