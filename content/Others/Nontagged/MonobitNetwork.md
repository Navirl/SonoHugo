
### MonobitNetwork.isConnect
Monobitネットワークに繋がってるかをboolで返す変数。


### MonobitNetwork.playerName
自身のプレイヤーの名前変数。**初期値はnull。**
chatscriptではTextFieldから文字を入力している。

### MonobitNetwork.autoJoinLobby
デフォルトロビーへの自動入出を許可するbool変数。
サーバ接続前に立てておかないと有効にならないフラグ。

### MonobitNetwork.ConnectServer()
**MUNサーバに接続するメソッド。** 引数には任意の文字列で**ゲームバージョン**を指定できる。
認証コード、MUNのバージョン、ゲームバージョンが同じアプリケーションを同一とみなす。


### MonobitNetwork.inRoom
ルームに入室しているかを示すbool変数。

### MonobitNetwork.CreateRoom()
引数に指定した名前でルームを立てるメソッド。

### MonobitNetwork.GetRoomData()
入室中のロビー内に存在するルームの**一覧**を取得するメソッド。
foreachで回すとRoomData型が得られる。

### RoomData
`RoomData.name`
ルーム名。
`RoomData.playerCount`
現在入室しているプレイヤー数。
`RoomData.maxPlayers`
最大入室可能なプレイヤー数。**0だと無制限。**

### MonobitNetwork.JoinRoom()
引数で指定したルームに入室するメソッド。
JoinRandomroomとするとランダムな部屋に入れる。

### MonobitNetwork.playerList
ルーム内のプレイヤーの一覧を配列で格納している**変数**。
.nameにプレイヤー名が入っている。
