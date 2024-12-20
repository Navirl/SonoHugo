```plantuml-svg
@startuml
'https://plantuml.com/sequence-diagram

autonumber

machine --> allpanel:オールパネルにアクセス
allpanel --> panel:選択したパネルを\n問い合わせ
panel --> methodorg:パネルで選択したメソッドが\n存在するか問い合わせ
methodorg --> methodstruct:実メソッドを発見
methodstruct --> methodstruct:メソッドが\n実行可能かどうか確認


@enduml
```