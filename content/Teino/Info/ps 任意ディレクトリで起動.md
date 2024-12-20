---
title: "ps 任意ディレクトリで起動"
tags:
 - Info
---

date: 2024-12-20T14:08:03+09:00
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)
source:: [PowerShellを指定したディレクトリで起動する方法 | miajimyu note](https://www.miajimyu.com/docs/powershell/powershell-tips/how-to-set-location-at-startup/)

`$profile`に起動オプションが設定できるので、`cd $home`とでもしてやればいい。
存在しない場合は`New-Item`や`ni`で作成。

