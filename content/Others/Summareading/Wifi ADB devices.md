---
uid: 20220620011503
tags:
 - App/UnrealEngine
 - CheatSheet
version: 5.0.2
---

source:: [Site Unreachable](https://www.servernote.net/article.cgi?id=android-wireless-debug-list-devices)

普通につなぐならAndroidのWifiデバッグから認証コードを打ち込めば……というだけではない。
それはAndroidとの通信を許可するだけであり、実際につなぐなら`adb connect 表示されている端末IPとポート`が必要。
これでつなげばdevicesに表示され、普通につながっているデバイスと同じように扱える。
