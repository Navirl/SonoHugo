---
title: "Js import"
tags:
 - Info
---

date: 2024-12-20T14:07:23+09:00
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)
source:: [TypeScriptでモジュールを作成する／インポートする (export, import)｜まくろぐ](https://maku.blog/p/fbu8k8j/)

外部ファイルをモジュールとして読み込むやつ。
`import { exportした対象 } from '外部ファイル相対パス’;`で読める。拡張子はつけない。
exportした対象の名前の後に`as 適当な名前`を付けることで別名で対象を呼び出せる。

`{}`はdefault export以外を指定する為の記法。
`{}`に必要な関数名だけ書いとけばそれだけimportできる。
複数でも同様に可能。

exportしたやつ全部ほしいなら`import * as 適当な名前 from '外部ファイル相対パス'`で読める。この場合はas必須。

クラスだけでなく変数、定数、関数、クラスインスタンス入り変数も全部export出来る。

[js export default](js%20export%20default.md)