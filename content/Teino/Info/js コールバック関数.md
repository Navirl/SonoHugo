---
title: "js コールバック関数"
tags:
 - Info
---

date: 2024-12-20T14:07:56+09:00
up:: [Programming](../Bar/Program/Programming.md)
up:: [JavaScript and TypeScript](../Bar/Program/JavaScript%20and%20TypeScript.md)

引数として渡す関数をコールバック関数という。

```js
function getDate(callback){
	callback(new Date);
}
```

こんな感じに、引数に別関数を要求しておけば、関数内でその別関数の処理タイミングを自由に決められる。

[高階関数、カリー化](高階関数、カリー化.md)

が、これは例えばこのように階層が深くなると見にくくなる。

```js
getDate(function(data1) {
 
    getSomething1(function(data2) {
    
        getSomething2(function(data3) {
        
            getSomething3(function(data4) {
 
            });
 
        });
 
    });
```

それを解決するのがPromise。