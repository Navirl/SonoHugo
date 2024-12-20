---
title: "ps Windows Font"
tags:
 - Info
---

date: 2024-12-20T14:08:01+09:00
up:: [PowerShell_and_Command-Line](../Bar/App/PowerShell_and_Command-Line.md)
up:: [Scoop](../Bar/App/Scoop.md)

意味が分からないのだが、ダブルクリックじゃなく設定からフォントインストールしないと読み込んでくれないソフトがある。
インストール場所はどっちにしても`ユーザーフォルダ\AppData\Local\Microsoft\Windows\Fonts`。シンボリックリンクでも張ってるのか。

とか思ってたら再起動で全部消えた。ファイル位置は変わっていない。意味が分からない。
ちゃんと全ユーザー向けにインストールしてしまおう。`C:\\Windows\Fonts`に入るらしい。

