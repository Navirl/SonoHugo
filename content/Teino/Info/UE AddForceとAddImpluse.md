---
title: "UE AddForceとAddImpluse"
tags:
 - Info
---

date: 2024-12-20T14:07:39+09:00
up:: [UE](../Bar/App/Unreal_Engine.md)
source:: [第一次 Add Force / Add Impulse 戦争 - UnrealYoshidaのUE4講座](https://ikagamedev.hatenablog.com/entry/2017/02/01/204221)

AddForceは毎フレーム力を与える感じ。つまり1秒で指定量の力が入る？
AddImpluseは実行の瞬間に力を集中させる。

どちらにせよ、標準質量100kgに対しては10万単位で力を与えないと動かないので注意。
質量無視直接加速度のVel Changeにチェックが入っているならその限りでない。