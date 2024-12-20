---
uid: 20220610200909
tags:
- App/UnrealEngine
- Reading
version: 5.0.1
---

source:: [ハンドヘルド AR テンプレート テクニカル リファレンス | Unreal Engine ドキュメント](https://docs.unrealengine.com/5.0/ja/handheld-ar-template-technical-reference/)

## 初期化
BP_MainMenuを追加する。

## カメラ深度
- 深度シーンテクスチャを取得する。
	- BP_ARPawn、Fetch camera depth map if available
		- Texture TypeのDepth Mapからそのまま取り出す関数
			- Get AR Texture
				- CameraDepthTextureに格納される
				- Create Plane Candidate関数内で使用する
					- もしCameraDepthTextureが無いなら、CameraDepthFallback関数を呼ぶ

## ライト強度
- ライト推定データを取得する
	- 取得したデータでディレクショナルライトとスカイライトを更新する
	- Feed Light Estimate関数内で取得される

## ARプレーン
- スキャニング後、バーチャルシーン内のPlaneCandidateアクタを更新開始する。
	- 環境内のオブジェクトがARプレーンジオメトリにフィットしてるかチェックする
- BP_Planeアクタをスポーンする
	- Create Plnae Candidate関数でスポーンさせる
	- プレーンは1秒に一回更新する
	- 視覚的複雑さを軽減するため、自分から最も近いオブジェクトの追跡が優先される
		- ようにできる
- BP_PlaneをSelectedPlaneとしてロックする
	- プレーン選択

## シーン操作
- AR_Pawn内に実装
	- プレーン選択、オブジェクト配置
		- InputTouchイベント
			- Event Graphは広いが、焦らずMy Blueprintから探す
	- オブジェクト配置後の操作
		- OneFingerActionイベント
		- TwoFingerActionイベント
			- どっちもデータを記録してるだけ
	- Tickイベント
		- Reset Recognized Gesture関数
			- 前のジェスチャの情報をクリーンアップ
		- 入力アクションイベントのデータ処理
			- OneFingerGestrueRecognition関数
			- TwoFingerGestrueRecognition関数
				- どちらもまずジェスチャを列挙する
					- CurrentTransformation列挙
						- Translate関数
						- Rotate関数
						- Scale関数

## 配置可能オブジェクト
- 基本クラス
	- BP_Placeableブループリント
		- ビジュアル、ロジック、HUDロジック全てを持つ
			- BeginPlayイベント
				- 作成する製品タイプに基づき配置可能オブジェクトのアセット選択
					- Assign Product Asset関数
						- Games
						- 自動車
						- 土木
						- 上記三タイプによってアセットが分けられてる
						- 空のSM Object変数に入れるStatic Meshを保持しているブループリントコンポーネント
							- BP_ProductAssetRefコンポーネント
								- 中身はグレイマンのStatic MeshとScale値っぽいFloatのみ
								- つまり、BP_PlaceableによってPlane上に配置できるのは**Static Meshのみ**。

## ビジュアル制御
- マテリアルとUIウィジェット同時制御
	- Set Visuals関数
		- Position,Rotation,Scaleから呼び出される
		- Tickイベント
			- Update Interaction関数
			- 各操作に基づきUIウィジェットを更新

## オブジェクト配置
- AR_Pawnブループリント
	- InputTouchイベント
		- BP_Placeableアクタをスポーン
		- Placeable Object変数に割り当て

## ARプレーン
- AR_PawnがBP_Planeアクタよりバーチャルプレーンを作成
	- Update Plane Candidate関数
	- Create Plane Candidate関数
		- こっちはPlaneのマテリアルやカラー設定を初期化する
			- Initialize Plane関数

- BP_Plane
	- スタティックメッシュ
		- BlockAllDynamic
	- 未選択状態でのマテリアル
		- DM_Scan
			- AndroidかiOSによってマテリアルを切り替える
				- Get Platform Scan Material関数
			- DM_Scanを視覚的にカットするため、シーン深度を使用
				- Initialize Plane関数
			- AR_Pawnにカラーを設定
				- Get Plane Color関数
				- ARツールキットより、ARジオメトリインデックスを取得し、そこからカラーを設定するらしい
	- プレーン選択後、オブジェクト配置ステートに切り替える
		- BPPlane Is Selectedイベント ディスパッチャー
		- この時、プレーンは非表示になる
	- プレーンのマテリアルをDM_Plainに変更する
		- Switch to Material Translate関数
		- オブジェクトに対してPosition,Rotation,Scaleなどの変換関数を使用した際に発動
		- Planeが見やすい、つまりオブジェクトの移動できる範囲が分かりやすい

## HUD
- 基底クラス
	- BP_StylisedUIクラス
		- Light、DarkなどUIスタイルを切り替える
		- データ自体が入っている場所
			- DT_Stylesデータテーブル
				- カラー、フォント、アイコン
		- 現在のスタイルに関する情報を取得する
			- Get Style Data関数
- サブメニューのスタイル切り替えをトリガーする
	- BP_MainMenuクラス
		- Call Switch Style関数
			- Switch Styleイベントディスパッチャー
				- 定義自体はBP_StylisedUIにある
- その他ウィジェットは独自にChange Style関数を持っている

## メインメニュー
- メニューを初期化し、ディスパッチャーをバインドする
	- BP_MainMenu
		- 全てのメニューのコンテナかつマネージャー
		- AR_Pawnによってビューポートに追加されるタイミングで初期化する
		- ARセッションを開始する
		- BP_StylisedUIの代わりにベースのユーザーウィジェットクラスを拡張する

### 初期化、バインド
- UIを初期化し、Lightを設定し、ディスパッチャーをバインドする
	- On Initializedイベント
		- ユーザージャーニーを通じた手順
		- チュートリアルのポップアップ
		- スクリーンショット撮影フロー
		- サブメニュー間移動
		- 設定変更確認
	- ビジュアル要素と主要機能をつなげるイベント

## ARセッション
- BP_MainMenu
	- スキャンを開始する
		- BP_StartMenuボタンを押す
	- ARセッションをRunningステートをリッスン
		- Tick関数
			- Runningステートになると
				- BP_StartMenuがスキャニングステータスを開始
				- ステート変更を分かりやすくするため外観変更
			- オブジェクトの配置を開始するタイミングもリッスンしている
				- AR_Pawnで使うため

## サブメニュー
- 大体ディスパッチャ
- BP_StylisedUIにより、スタイル変更をサポートしている
- ユーザージャーニー用の最初のメニュー
	- BP_StartMenu
		- 各ステートにより、UI_ScanninngやUI_PlaceObjectなどを配置する
- オブジェクト配置後、OptionやInfoといった関数にアクセスする手段になるメニュー
	- BP_BottomMenu
		- 各テーマによってレイアウトが変わるが、全て同じカスタムイベントがバインドされている
- オプションメニュー
	- BP_OptionMenu
		- UIボタンがバインドされているのは、メインメニューの関数
		- わざわざバインドで表現されてるのは、可視性を向上するため
- Infoメニュー
	- BP_InfoMenu
- ボタン
	- UI_CapsuleButton
	- UI_ToggleButton

## 中身
- ARセッションにて、物体認識などを行っているらしい
	- バーチャルワールドのものに対してラインを引き、その間にあるものを認識して物を配置している
- BP_MainMenu
	- Get All AR Geometries
		- ARで認識した物体を列挙するモノっぽい

- バーチャルワールドのオブジェクトに対するヒット
	- Line Trace For Objects
		- [LineTraceForObjects | ueHow-日本語](https://uehow.web.fc2.com/Contents/Jpn/UE4/BluePrint/NodeReference_Collision/LineTraceForObjects.html)
		- 前々からある関数
		- 始点と終点を決めてラインを引き、最初にヒットしたオブジェクトを 返す
- ARでトラックされたジオメトリに対するヒット
	- Line Trace Tracked Objects
		- [Line Trace Tracked Objects | Unreal Engine Documentation](https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/ARAugmentedReality/TraceResult/LineTraceTrackedObjects/)
		- BP_ARPawn内にある
		- ARBlueprintライブラリに対して実行する
		- Screen Coordから貫通の光線が出てるっぽい、返ってくるのは**カメラからの距離でソートされた結果のリスト**
		- この時、0番目に入ってるもののワールド座標を使うだけで物体を配置できるらしい。
			- ……これ、かなりガバガバな配置なのでは。
- 画面をタッチした場所に、バーチャルワールドのオブジェクトが存在するか
	- World Hit Test関数
		- 中では単純にLine Trace For Objectsを実行してるだけ

- BP_PlaceableのAssign Product Asset関数内


- これを踏まえてオブジェクトを配置するには
	- Line Trace Tracked Objectではポイントが出ないが
	- 地面を表すポイントから、周囲にグイッと広げる
	- 壁と地面が交差しているポイントから、上にグイッと伸ばす
	- まずは壁と地面とを使い、壁打ちを予想