---
title: "ps シンボリックリンク"
tags:
 - Info
aliases: Symbolic_Link
---

date: 2024-12-20T14:08:03+09:00
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)

cmd:`mklink /D path target`
pwd:`New-Item -ItemType SymbolicLink -Path path -Target target`

**管理者権限が必要。**
targetのものをpathのフォルダーに転写する。
pathは存在しないフォルダじゃないと怒られる。
絶対リンクを使うこと。

ハードリンク
`New-Item -Value '../a.txt' -Path './hard_link_a.txt' -ItemType HardLink`

[Powershellによるファイル操作のまとめ - Qiita](https://qiita.com/mima_ita/items/ae31f3a19389e69b307f)