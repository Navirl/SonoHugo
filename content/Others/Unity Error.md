---
title: "Unity Error"
date: 2024-12-21T15:14:06+09:00
tags:
 - App/Unity
 - Errors
---

## Object reference not set to an instance of an object
スクリプト記述の問題ではなく、prefab内でスクリプトがアタッチされていないために起きた。
prefabを修正すると直った。

## this == null
newしたクラスからはthisがnullになる。
まあ、冷静に考えるとnewされたんだから何かのオブジェクトの下にいるわけじゃない。だから、thisが無いのは当然ではある。

## Inconsistent accessibility: field type is less accessible than field
アクセシビリティが一貫してない。
アクセシビリティを確認する。

## type mismatch
ScriptableObjectのやつ。
よくわからないが、たぶんplayから抜けた時にアンロードされてる？　動かす分には問題ない。
ただ、そもそもこれが出るということはスクリプト内部で値が変化する、つまり**ScriptableObjectに向いてない**値なので使わないほうがいい。

[ScriptableObject variable type mismatch, when it's clearly one type. - Unity Forum](https://forum.unity.com/threads/scriptableobject-variable-type-mismatch-when-its-clearly-one-type.715892/)

## Evaluate request failed (UnityEngine.UnityException: get_transform is not allowed to be called from a MonoBehaviour constructor (or instance field initializer), call it in Awake or Start instead. Called from MonoBehaviour 'TearCtrl'. See "Script Serialization" page in the Unity Manual for further details.).
メンバ定義に関数を使ってもコンストラクタで初期化できないよ、やりたいならStart()やUpdate()でやってねというエラー。
知ってるわそんなん、と思ってたら**Coroutineで詰んだ。** Coroutineはイベントじゃなく、コンストラクタで初期化される存在らしい。

[Help Wanted - UnityException: get_main is not allowed to be called from a MonoBehavior constructor - Unity Forum](https://forum.unity.com/threads/unityexception-get_main-is-not-allowed-to-be-called-from-a-monobehavior-constructor.1169963/)

## il2cpp.exe
WebGLビルドの際に発生。
Editorフォルダに`using UnityEditor;`のファイルを投げ込み、**プロジェクト自体のパスから**日本語を外す（プロジェクトフォルダを移動）ことで起動した。
……シンボリックリンク作ったって駄目だからな！　Unityが起動しない！　まあたぶんジャンクションならいいけど。

ちなみにWebGLビルドしたものは（Markdownリンクすれば）JAMStackからも普通に読める。何ならフォルダ構造を直接URLに入力しても読める。

[using UnityEditor; を含むDLLを作るときに気をつけること - Qiita](https://qiita.com/GONBEEE_project/items/31e0475ead13bb157710)

## Project has invalid dependencies:  com.achimmihca.protrans: Could not clone [https://github.com/achimmihca/ProTrans.git]. Revision [v1.0.0] could not be found.
これは別の例だが、とりあえずmanifest.jsonに値を入れた時のエラー。
**Scoopのせい。** Scoopは内部でショートカットみたいなのを作るのだが、それを通すとUnityが正しくIOを受け取れないことがあるよ、というもの。
なので環境変数のPATHに、ショートカットへのパスより早く実際の実行ファイル(が入ってるフォルダ)へのパスを張るようにすると動く。

[FogBugz](https://fogbugz.unity3d.com/default.asp?1336823_c0t2noqpvtu36lhr)
[Git URL revision not found (still in Unity 2021.1.5f1) - Unity Forum](https://forum.unity.com/threads/git-url-revision-not-found-still-in-unity-2021-1-5f1.1105612/)

## Cannot access static field 'first' in non-static context
見たまんまだが、これ**non-staticクラス内のstatic変数をインスタンスから呼ぼうとして発生してた。** それに気づかずにちょっと苦戦。

staticはインスタンスではなく、クラス.変数と呼ぼう。

[c# - Cannot access non-static field \[fieldname\] in static contex - Stack Overflow](https://stackoverflow.com/questions/1511912/cannot-access-non-static-field-fieldname-in-static-contex)
[c# - Cannot access non-static field in static context - Stack Overflow](https://stackoverflow.com/questions/25543682/cannot-access-non-static-field-in-static-context)
[C#超・初心者が知っておくべき10のエラー - プログラミングとかブログ](https://shirakamisauto.hatenablog.com/entry/2016/01/26/153715#static%E5%86%85%E3%81%A7%E9%9D%9Estatic%E4%BD%BF%E7%94%A8%E3%82%A8%E3%83%A9%E3%83%BC)

## The referenced script on this Behaviour is missing!
エラーをダブルクリックして外れてるスクリプトをアタッチしなおせばいいのだが、**Prefabが外れてる場合は飛べない**ので注意。

[【Unity】ちょっと待った! そのスクリプトを消す前にComponentを確認だ! │ エクスプラボ](https://ekulabo.com/check-component-before-delete)

## NullReferenceException: Object reference not set to an instance of an object  Cinemachine.Editor.CinemachineVirtualCameraEditor.UpdateStageState
この後も数行続く、CinemachineのVirtual Cameraを開くときだけ出るエラー。
結論は**パスにASCii外の文字がある**から。プロジェクトを移動するか、ジャンクションを仕込もう。

[3 problems with cinemachine - Unity Forum](https://forum.unity.com/threads/3-problems-with-cinemachine.1065989/)

## Parameter does not exist in controller
アニメーションファイル内のパラメータに数値入れろ。

[Parameter does not exist in controller - Unity Forum](https://forum.unity.com/threads/parameter-does-not-exist-in-controller.506115/)

## Input Button Submit is not setup
Input ManagerでSubmitキーを消してると怒られるやつ。これに限らずEventSystemが使うものを消してると怒られる。
適当でいいのでSubmitと名のついたキーを用意しておく。

[【Unity】Input Button Submit is not setupというエラーが出たお話 - はなちるのマイノート](https://www.hanachiru-blog.com/entry/2018/10/11/063523)

## The character used for Underline is not available
何故かはさっぱりわからないが、アンダーラインをフォントアセットに含めていないと怒られる。
フォントアセットを作るときはちゃんとアンダーラインを含めよう。

[The character used for Underline is not available in font asset \[FONTNAME\]. \| Unity Indies](https://www.create-forever.games/the-character-used-for-underline-is-not-available-in-font-asset/)

## UnityException: Load is not allowed to be called during serialization, call it from Awake or Start instead.
GameObject.FindやResources.LoadのようなスクリプトAPIを、Serializableをつけたクラス内のコンストラクタで呼ぶなというエラー。
シングルトンの中で呼んでて詰むことがある。

[【Unityエラー】UnityException: Load is not allowed to be called during serialization, call it from Awake or Start instead. - nekosuko.jp](https://nekosuko.jp/1929/)

## unity webgl RuntimeError: memory access out of bounds
まずはDevelopment Buildしてないかチェック。
それからメモリ管理を始める。

[Unity：WebGLでメモリエラーに苦しんだ話 - Qiita](https://qiita.com/kingyo222/items/1995383a394251abd86d)