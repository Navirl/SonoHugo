---
date: 2024-12-21T15:19:13+09:00
title: "ps シンボリックリンク"
tags:
 - Info
aliases: Symbolic_Link
---

daily:: [2022-09-14](Daily_Note/2022-09-14.md)
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