---
title: "not a git repository"
tags:
 - Info
---

date: 2024-12-20T14:08:00+09:00
up:: [Keybase](../Bar/App/Keybase.md)
up:: [Git](../Bar/App/Git.md)
source:: [GIT_DISCOVERY_ACROSS_FILESYSTEMが設定されていません](https://qastack.jp/programming/16853624/git-discovery-across-filesystem-not-set)

fatal: not a git repository (or any parent up to mount point /storage)
Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).

なんかの拍子にHEADやindexにアクセスできなくなってるエラー。
git initすれば直る。ブランチもないはずなのでswitchやpush --set-remote-branch=を忘れず。