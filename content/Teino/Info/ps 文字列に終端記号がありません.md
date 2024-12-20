---
title: "ps 文字列に終端記号がありません"
tags:
  - Info
---

date: 2024-12-20T14:08:04+09:00
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)

文字コードがutf-8かつ日本語を含んだファイルを読ませると怒られる。
デフォルトがShift-JISのせいらしい。
UTF-8 BOMで保存すれば大丈夫。

[【PowerShell】"日本語を含むスクリプトで「終端記号がありません」というエラーが出る" -](https://tech.sparrow-tune.work/post/dev/powershell/日本語を含むスクリプトで終端記号がありませんというエラーが出る/)