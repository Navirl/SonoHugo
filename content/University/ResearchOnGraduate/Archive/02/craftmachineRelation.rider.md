---
title: "craftmachineRelation.rider"
date: 2024-12-20T14:17:05+09:00
---
﻿```plantuml-svg
@startuml
'https://plantuml.com/sequence-diagram

autonumber

machine --> allpanel:オールパネルにアクセス
allpanel --> panel:選択したパネルを
問い合わせ
panel --> methodorg:パネルで選択したメソッドが
存在するか問い合わせ
methodorg --> methodstruct:実メソッドを発見
methodstruct --> methodstruct:メソッドが
実行可能かどうか確認


@enduml
```
