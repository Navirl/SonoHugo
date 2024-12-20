---
title: "Scoop 実行ファイル設定"
tags:
 - Info
---

date: 2024-12-20T14:07:35+09:00
up:: [Scoop](Bar/App/Scoop.md)

`$env:SCOOP='C:\Scoop'`
`environment:setEnvironmentVariable('SCOOP',$env:SCOOP,'User')`
このコマンドを実行するとCドライブのScoopがscoopコマンドで呼べるようになる。

2023/04/17
なんか動かなくなってたので、下の関数だけ更新。
` [System.Environment]::SetEnvironmentVariable('SCOOP',$env:SCOOP,'User')`