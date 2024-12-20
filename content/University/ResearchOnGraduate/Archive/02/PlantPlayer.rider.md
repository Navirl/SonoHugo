```plantuml
@startuml
hide empty members
!theme vibrant
!include Item.rider.md
!include Player.rider.md
!include CraftMachine.rider.md
!include Car.rider.md

class Storage{
	    int[] itemList
		Item findInItems(int ID)
}

    IPackable <-- Storage
    Storage <.. PlayerValues

  


@enduml
```

[UE4_cheat_sheet](../../../Unreal%20Engine%20Cheat%20Sheet.md)