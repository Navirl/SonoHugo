---
title: "Player.rider"
date: 2024-12-20T14:17:05+09:00
---
﻿```plantuml
@startuml
'https://plantuml.com/class-diagram
hide empty members
!theme vibrant

package players{

	interface FFunction{
		fキーで起動する物
	}

	abstract class Player{
		PlayerValues pv
		void playerControl()
		void useFunction(bool fKey):fキーで起動する物
	}
	note left of Player: entity

	Player o-- PlayerValues
	FFunction <.. Player

	class PlayerValues<<(S,pink)struct>>{
		Storage backpack
	}
	note left of PlayerValues: value object

	/'class CraftMethodOrg{
		private List<CraftMethodStruct> cms;
		void add(Func craftMethod,int panelID,int methodID)
		Func find(int panelID,int methodID)
	}

	CraftMethodOrg <.. CraftMethodStruct

	class CraftMethodStruct<<(S,orchid)struct>>{
		Func CraftMethod
		int PanelID
		int MethodID

		public CraftMethodStruct(Func craftMethod,int PanelID,int MethodID)
	}

	note bottom of CraftMethodStruct

	endnote
	'/

	
}

@enduml
```
