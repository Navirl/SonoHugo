---
title: "Unity Attribute"
date: 2024-12-21T15:14:05+09:00
tags: App/Unity
---

属性値。様々な挙動を付加できる。
複数付与する場合は,で区切る。

[UnityのスクリプトでAttribute（属性）を付ける \| Unityを使った３Dゲームの作り方（かめくめ）](https://gametukurikata.com/customize/inspector/attribute)

## SerializeField
データ構造やオブジェクトの状態をUnityに保存させる(シリアライズ)ためのアトリビュート。
主な使い道はInspector上で数値をいじくれるようにすること。
```csharp
public class TestA : MonoBehaviour{
	[SerializeField] int maxScore = 100;
	[SerializeField] int minScore = 0;
}
```
こうすることでInspectorに数値が表示される。

一方で、Inspectorに表示するだけならアクセス修飾子をpublicにしても出てくる。
```csharp
public class TestB : MonoBehaviour{
	public int maxLife = 500;
}
```

しかし、これだとpublic特有の**他から書き換えられてしまう**という問題が発生する。
例えばこうすると、TestAが実行された瞬間TestBのmaxLifeが増える。
```csharp
public class TestB : MonoBehaviour {
	public int maxLife = 500;
}

public class TestA : MonoBehaviour{
	...
	void Start () {
		[SerializeField] TestB testB;
		testB.maxLife = 1000;
	}
	...
}
```
個人開発ならまだしも、複数人でやるとこれで不用意に書き換えてしまいかねない。

ちなみに、\[SerializeField\]単体だとprivateをつけるのと同じ効果が得られる。たぶん、デフォルトでprivateがつく仕様に引っかかってるだけだが。
そのため`[SerializeField] int maxLife`としても問題ない。

逆に、「Inspectorに表示しないけどpublicにしたい」というときは、プロパティを使う。
```csharp
public class TestB : MonoBehaviour
{
    public int MaxLife { get; set; }

    TestB()
    {
        MaxLife = 500;
    }
}
```
もしくは\[HideInInspector\]や\[System.NonSerialized\]などの手がある。
```csharp
[HideInInspector] public int MaxLife1;
[System.NonSerialized] public int MaxLife2;
```
上はUnityへの保存と再構築、つまりシリアライゼーションが行われる。保存はされるので意図しない値が残ったままになるかも。
下は文字通り何もしない。

それを踏まえたうえで、\[SerializeField\]を使うなら**インスペクタで決めておき、後で変更することがない**変数に付けるのがベスト……ってどっかで見たんだけど、どこだっけ。

また、\[SerializeField\]をくっつけ、Unity上で編集した変数は、**あとから変数名を変更すると値が消滅する。**
それを回避したいなら、いったん [FormerlySerializedAs](https://docs.unity3d.com/ScriptReference/Serialization.FormerlySerializedAsAttribute.html)を使うこと。これをつけて編集した後は外してもいい。

[Unityの\[SerializeField\]について色々な疑問に答えてみる - Qiita](https://qiita.com/makopo/items/8ef280b00f1cc18aec91)
[\[Unity\] 設定した値を保持して変数名を変更するFormerlySerializedAs - JoyPlotドキュメント](https://joyplot.com/documents/unity-formerlyserializedas/)

ちなみに、プロパティを公開したいときは\[field: SerializeField\]をつける。

## RequireComponent
RequireComponent(typeof(component))として**クラスに**追加することで、アタッチしたオブジェクトに強制的にコンポーネントをつけられる。
```csharp
[RequireComponent(typeof(Rigidbody))]
public class AttributeSample : MonoBehaviour {
}
```

## System.Serializable
処理を分割してクラスにして、それをpublicにするだけだとInspectorに表示されない。（MonoBehaviourじゃないからシリアライズされない）
そんなとき、クラスにこれを付ければちゃんとシリアライズされるよというAttribute。

[\[System.Serializable\]を使ってEditor上に調整パラメータを出す - Qiita](https://qiita.com/waken/items/30e087480626e3d8229d)

[Unity serializeについてのまとめ - PaperSloth’s diary](https://papersloth.hatenablog.com/entry/2020/05/25/135813#class-struct%E3%82%92Inspector%E3%81%AB%E5%85%AC%E9%96%8B%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)

[UnityのAttribute（属性）についてまとめてメモる。 - テラシュールブログ](UnityのAttribute（属性）についてまとめてメモる。%20-%20テラシュールブログ.md)


## RuntimeInitializeOnLoadMethod
Awake直後にメソッドを呼ぶ属性。
**MonoBehaviourが無くても、ゲームオブジェクトに付けてシリアライズしなくても動作する。**
LoadTypeによりある程度読み込みタイミングを制御することが可能。