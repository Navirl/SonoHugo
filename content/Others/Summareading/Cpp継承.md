---
uid: 20220610200924
tags:
 - App/Cpp
 - CheatSheet
---

```cpp
class DerivedClass : public BaseClass
{
};
```

`派生クラス名 : public 基底クラス名` で行う。
派生クラスを呼び出したとき、基底クラスのコンストラクタも動く。

![[派生から基底のコンストラクタで初期化]]

publicということは、当然privateやprotectedによる継承も存在する。
機能は継承したメンバのアクセス権限をこれに合わせるというもの。privateで継承すればpublicメンバも派生クラスではprivateになる。
使いどころは……

[非公開継承と限定公開継承(C++) - 超初心者向けプログラミング入門](https://programming.pc-note.net/cpp/inheritance_private.html)