---
title: "letとvar"
tags:
 - Info
---

date: 2024-12-20T14:07:57+09:00
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)
source:: [letとvarの違い - Qiita](https://qiita.com/y-temp4/items/289686fbdde896d22b5e)

let（ES6から）はブロックレベル、varは関数レベルで動作する。
```javascript
function f() {
  let x \= 1;
  console.log(x);
  {
    let x \= 2;
    console.log(x);
  }
  console.log(x);
}
f()
// 1
// 2
// 1
```

```javascript
function f() {
  var x \= 1;
  console.log(x);
  {
    var x \= 2;
    console.log(x);
  }
  console.log(x);
}
f()
// 1
// 2
// 2
```

