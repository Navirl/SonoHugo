---
date: 2024-12-21T15:19:14+09:00
title: "ps 任意ディレクトリで起動"
tags:
 - Info
---

daily:: [2022-10-06](Daily_Note/2022-10-06.md)
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)
source:: [PowerShellを指定したディレクトリで起動する方法 | miajimyu note](https://www.miajimyu.com/docs/powershell/powershell-tips/how-to-set-location-at-startup/)

`$profile`に起動オプションが設定できるので、`cd $home`とでもしてやればいい。
存在しない場合は`New-Item`や`ni`で作成。

