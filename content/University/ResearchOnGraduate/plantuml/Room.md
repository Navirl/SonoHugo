---
title: "Room"
date: 2024-12-21T15:30:18+09:00
---
```plantuml
@startuml
hide empty members
package Room{
	interface IChangeRoom
	class Room
	class RoomData
}

interface IChangeRoom{
	+void roomChange()
}

IChangeRoom <-- ChangeRoomItem

class Room implements IChangeRoom{
	RoomData rData
	[SerializeField] float changeRoomValue
	
	Vector3 calcRoomLoc(RoomData rd)
	void tuneRoomData(RoomData rd)
}

Room o-- RoomData

class RoomData{
	bool roomMoving
	float fromPlayerDistance
	List<Gimmick> gList
	List<Enemy> eList
	
	//このVector3は極座標
	//部屋を繋いだ時にどこに繋がったか示す
	Dictionary<RoomData, Vector3> cRList
}

RoomData o-- Gimmick
RoomData o-- Enemy
RoomData <-- ChangeRoomItem



@enduml
```

Roomのほうが先に進んだ
