---
title: "js forEach"
tags:
 - Info
---

date: 2024-12-20T14:07:55+09:00
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)

javascriptの配列の後ろに付けるforeachは、関数なので普通のforof文の様なbreakやcontinueは使えない。
一応returnを返せばcontinue相当のことは出来る。
ただ関数型プログラミングの観点で言うと、filterでフィルタリングした方が良い。

[Using Continue in JavaScript forEach() - Mastering JS](https://masteringjs.io/tutorials/fundamentals/foreach-continue)