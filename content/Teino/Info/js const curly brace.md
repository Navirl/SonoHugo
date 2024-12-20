---
title: "js const curly brace"
tags:
 - Info
---

date: 2024-12-20T14:07:55+09:00
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)

以下の二つは等価。

```javascript
const {
  abc,
  def
} = Object;
```

```javascript
var abc = Object.abc;
var def = Object.def;
```

要はオブジェクトプロパティをそのままどこかで使いたいときに短く書ける記法。
配列でも同じような記法が使える。

```javascript
const a = items[0];
const b = items[1];
const c = items[2];

// Can be written as:
const [a, b, c] = items;
```