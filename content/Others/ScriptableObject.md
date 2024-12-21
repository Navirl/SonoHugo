---
title: "ScriptableObject"
date: 2024-12-21T15:13:37+09:00
tags: App/Unity
---

# Scriptable Object

ざっくり言うと、共有データを格納するために、クラスやインスタンスとして作成されるアセット。
シーンをまたいでもデータが保持できる。[ただし……](#ScripatableObjectの保持範囲)

## 使い方
いつもはMonoBehaviourを継承するところ、ScriptableObjectを継承すれば使えるようになる。

そのままだとただのスクリプトファイルなので、アセットファイルが作れるように[CreateAssetMenu](UnityのAttribute（属性）についてまとめてメモる。%20-%20テラシュールブログ.md)をつける。

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "MyScriptable/Create EnemyData")]
public class EnemyData : ScriptableObject {
	public string enemyName;
	public int maxHp;
	public int atk;
	public int def;
	public int exp;
	public int gold;
}
```

### 注意
- menuNameに入れた値で、Create以下の作成メニューの場所を決められる。
- fileNameもつけると作成されるScripatableObjectの名前を決められる。
- ScriptableObjectではMonoBehaviourのStart()やUpdate()は使えない。
- publicじゃないとアクセスできないが、これで外部書き換えが心配ならSerializeField + Get~()メソッドで書く。


### 応用
CreateAssetMenuがめんどいなら、それを拡張するエディタ拡張もある。
[ScriptableObjectをAssetsファイルとして出力する汎用スクリプト](https://gist.github.com/tsubaki/5149402)


[【Unity】ScriptableObjectってなんなん? って時に読む記事【解説】 │ エクスプラボ](https://ekulabo.com/about-scriptable-object)
[UnityEngine.ScriptableObject - Unity スクリプトリファレンス](http://docs.unity3d.com/ja/current/ScriptReference/ScriptableObject.html)

## 詳しく
ScriptableObjectはアセットであり**インスタンス**。
しかし**複数から参照されても単一のまま**、という特徴を持つ。シングルトン。

### 問題
エディター上でシーンを一時停止したとき、見た目では値が初期化されるが、再度変更した際に前回の値を引き継ぐ。プレイヤーでは問題ない。

#### 対策1 値の分割
Inspector表示用の値とゲーム上での値を分ける。
そしてOnEnableのタイミングで値を流し込む。

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu]
public class ClickCount : ScriptableObject
{
	[SerializeField] int _count = 0;
	public int count { get; set; }

	void OnEnable()
	{
		Init ();
	}

	void OnValidate()
	{
		Init ();
	}

	void Init()
	{
		count = _count;
	}

	public void Add()
	{
		count ++;
	}
}
```

さほど難しいことではなく、片方だけSerializeFieldしてOnEnable()で入力するだけ。OnValidate()も定義しておくと、この状態でも再生中のInspectorからの値変更が可能になる。

#### 対策2 再生停止時のUnload
インスタンスなので、ScripatableObjectはUnloadできる。
それを利用して再生停止時にUnloadする。

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu]
public class ClickCount : ResettableScriptableObject
{
	public int count;

	public void Add()
	{
		count ++;
	}
}
```

例では派生クラス、ResettableScripatableObjectを使用している。
この派生クラスは以下のgistからダウンロードする。

[ゲーム再生終了時にパラメータをリセットする（ゲーム開始時の値に戻す）ScriptableObject](https://gist.github.com/tsubaki/6bacf17a930e686722a9cecdc4900344)

この派生クラスでは、**シーン再生時に値が最後にProject Saveした際の値まで巻き戻る**。つまり、逆にそのままにしたいときは再生後にProject Saveすればいい。

[【Unity】ScriptableObjectを使用した、コンポーネント・シーン間でのデータ共有について - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/06/19/233000#%E3%82%A2%E3%82%BB%E3%83%83%E3%83%88%E3%82%92%E5%8B%9D%E6%89%8B%E3%81%AB%E9%96%8B%E6%94%BE%E3%81%95%E3%81%9B%E3%81%AA%E3%81%84%E6%96%B9%E6%B3%95)

### 逆利用？
これを利用してセーブデータが作れるかというと、無理。
アプリを終了した際に情報は失われる。

[エディタでゲーム再生中に変更した値を停止しても消さない方法 - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/20130929/1380459054)

## Misc
### Find Reference In Scene
そのファイルへの参照を持つアセットをHierarchyに表示する。
ScriptableObjectでも使える。

### ScripatableObjectの保持範囲
ScripatableObjectが解放されるまで。
この仕様上、シーンをまたぐ際に**一つでもScripatableObjectを参照していないシーンがあると、ScripatableObjectのデータは失われてしまう。**
これを防ぐためには、
- staticに登録
- PreLoadAssetsに登録
- HideFlags.DontUnloadUnusedAssetを設定(クリティカルに解放しなくなる、設定はインスタンス化したオブジェクトで.hideFlags = HideFlags.DontUnloadUnusedAssetするだけ)
といった手がある。

[【Unity】ゲームオブジェクトの基礎（生成・削除・非表示など）から公式リファレンスまで解説決定版！  XR-Hub](Others/【Unity】ゲームオブジェクトの基礎（生成・削除・非表示など）から公式リファレンスまで解説決定版！%20%20XR-Hub.md)
[Unityのリソース管理 - エフアンダーバー](https://www.f-sp.com/entry/2016/09/03/140006)

### 積極的解放
Resources.Unloadで素のScripatableObjectを受け取れる。
ただし、これは**C#のScripatableObjectが解放されるわけではない**ので、アンロード後も参照をキャッシュしたスクリプト側から呼び出すと数値は残っている。

### 何に効くのか
既に作成されていて **(変更されない)**、複数シーンやオブジェクトで共有するようなクラス。例えば音楽とか。
下手に作るとアンロード関係でめんどい。共有したいからって変更される値とか突っ込まないこと。

[【Unity】ボタンを押したら音が出る…を、出来る限りコードを書かずに実現する - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2017/06/13/235900)
[【Unity】他のシーンに切り替えてもオブジェクトを保持（BGMを鳴らし続ける）方法 \| Unishar-ユニシャー](https://miyagame.net/dontdestroyonload-obj/)

### 利点
YAMLやJSONと比べて処理が早くて柔軟。
そんなに大規模じゃないならScripatableObjectが一番。
暗号化が必要ならJSON。

[【Unity】ScriptableObjectにマスタデータを持たせるメリットについて │ エクスプラボ](https://ekulabo.com/scriptableobject-for-master-data#outline__4_7)

### クラスごとにアクセスするのめんどい
そんなあなたにシングルトン。
仕組み的には初アクセス時についでに初期化するgetterを組んでるだけ。

[ScriptableObjectの参照をちょっと楽にしてみる【Unity】【ScriptableObject】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/ScriptableObject_Entity)

### プログラム内から変えた値が反映されない
using UnityEditorを入れ、EditorUtility.SetDirtyで記録、AssetDatabase.SaveAssetsで保存する。

[ScriptableObjectの変更した値が戻ってしまう場合の対処法【Unity】【ScriptableObject】【トラブルシューティング】 - (:3\[kanのメモ帳\]](https://kan-kikuchi.hatenablog.com/entry/ScriptableObject_SetDirty_SaveAssets)