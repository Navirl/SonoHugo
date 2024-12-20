---
date: 2021-08-03 17:06:42
tags:
 - App/Unity
 - Article
source: https://tsubakit1.hateblo.jp/entry/2015/01/03/203843
---

Unityの属性について紹介します。

### 目次

### 属性(Attribute)とは

Unityを利用する[C#](http://d.hatena.ne.jp/keyword/C%23)は、クラス定義や変数定義に**属性（Attribute）**を付与する事で他の変数と区別したり、特別な挙動を設定することが出来ます。[\*1](https://tsubakit1.hateblo.jp/entry/2015/01/03/203843#f-8cfa1c7d "エレメーラ（属性力）とは関係ありません。")

例えば変数に**\[SerializeField\]**属性を追加すれば、privateな変数であっても[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)されシーン上に表示されるようになります。

> \[SerializeField\]
>  int count; 

![f:id:tsubaki_t1:20150103165049p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103165049.png "f:id:tsubaki_t1:20150103165049p:plain")

[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)は、とりあえずは「シーンやプレハブに値が保存される」と認識しておけばOKです。シーンやプレハブとった[メタデータ](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BF%A5%C7%A1%BC%A5%BF)に値が保存されるため、ゲームを再生せずともInspectorで値を設定する事が出来る訳です。

また、**\[RequireComponent\]**をクラスに追加すれば、記述した[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)[\*2](https://tsubakit1.hateblo.jp/entry/2015/01/03/203843#f-8db97c58 "AttributeSample")がアタッチされているオブジェクトに指定した[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)[\*3](https://tsubakit1.hateblo.jp/entry/2015/01/03/203843#f-5a9ea85c "今回はRigidbody")を強制する事が出来ます。

> \[RequireComponent(typeof(Rigidbody))\]
> public class AttributeSample : MonoBehaviour {
>
> }

属性を利用することで、[命名規則](http://d.hatena.ne.jp/keyword/%CC%BF%CC%BE%B5%AC%C2%A7)以外で変数に特別な挙動を設定することが出来ます。Unityは属性を利用して、エディタや[メソッド](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9)等に特別な挙動を設定しています。

### 属性の表記ルール

属性は変数やクラスの定義前に **\[＊＊＊\]** のような形で記述します。[複数](http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4)の属性を設定したい場合、\[＊＊＊**,** ＊＊＊\] のようにカンマで区切り記述します。

例えばSerializeFieldかつRangeの属性を設定したい場合、以下のように記述します。

>  \[SerializeField, Range(0, 5)\]
>  int count;

![f:id:tsubaki_t1:20150103165851p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103165851.png "f:id:tsubaki_t1:20150103165851p:plain")

属性は直後に定義した変数全てに適応されます。例えば一つの宣言で[複数](http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4)の変数を定義するような場合、そのどちらにも適応されます。

>  \[SerializeField, Range(0, 5)\]
>  int count3, count4;

![f:id:tsubaki_t1:20150103170135p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103170135.png "f:id:tsubaki_t1:20150103170135p:plain")

同様に配列に対して適当した場合、内包する全ての変数に適応されます。

>  \[SerializeField, Range(0, 5)\]
>  int\[\] counts;

![f:id:tsubaki_t1:20150103170258p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103170258.png "f:id:tsubaki_t1:20150103170258p:plain")

### Unity標準の属性

#### Inspectorを拡張する属性

フィールドに設定することでInspectorの挙動を拡張します。

-   ##### **SerializeField**
  
    privateやprotectedの値を[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)します。
    シーンビューで編集したい場合に有効です。
  
    >  \[SerializeField\]
    >  int count;
  

-   ##### **TooltipAttribute**
  
    [マウスカーソル](http://d.hatena.ne.jp/keyword/%A5%DE%A5%A6%A5%B9%A5%AB%A1%BC%A5%BD%A5%EB)がフィールドの上にある場合に説明文を表示します。
  
    \[SerializeField, TooltipAttribute("説明文")\]
    int count5;
  
    ![f:id:tsubaki_t1:20150103170913p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103170913.png "f:id:tsubaki_t1:20150103170913p:plain")
  

-   ##### **SpaceAttribute**
  
    フィールドとフィールドの間にスペースを設定します。
  
    \[SerializeField, Space(15)\]
    int count6;
  
    ![f:id:tsubaki_t1:20150103171238p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103171238.png "f:id:tsubaki_t1:20150103171238p:plain")
  

-   フィールドの頭にタイトルを設定します。リストにHeaderAttributeを追加すると全項目にタイトルが付与されるので注意が必要です
  
    \[SerializeField, HeaderAttribute ("Title")\]
    int count7;
  
    ![f:id:tsubaki_t1:20150103171504p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103171504.png "f:id:tsubaki_t1:20150103171504p:plain")
  

-   ##### **MultilineAttribute**
  
    [複数](http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4)行の入力が可能なテキストフィールドを設定します。
  
     \[SerializeField, MultilineAttribute (2)\]
     string message1;
  
    ![f:id:tsubaki_t1:20150103172116p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103172116.png "f:id:tsubaki_t1:20150103172116p:plain")
  

-   ##### **TextAreaAttribute**
  
    [複数](http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4)行の入力が可能なテキストフィールドを設定します。行数の最小値・最大値を設定することができます。
  
    \[SerializeField, TextAreaAttribute(2, 5)\]
     string message2;
  
    ![f:id:tsubaki_t1:20150103172425p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103172425.png "f:id:tsubaki_t1:20150103172425p:plain")
  

-   ##### **HideInInspector**
  
    public等の[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)するフィールドをInspectorから隠します。エディタ拡張で参照関係やパラメータを構築した状態で、パラメータを隠したい場合等に便利です。
  
    Unityはシーンを構築する際に[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)した値を優先して使用するため、HideInInspectorで隠すとInspectorから編集出来ず、フィールド変数宣言時の初期化も無視される点に注意して下さい。
  
    純粋に[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)したくない場合は**NonSerializable**を利用します。
  
     \[HideInInspector\]
     public int count8;
  

-   ##### **NonSerializable**
  
    [シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)しないように設定し、Inspectorから表示されなくします。
  
     \[System.NonSerialized\]
     public int count9;
  

-   ##### **FormerlySerializedAs**
  
-   変数名を変更した際に破棄される情報を保持します。
    Unityはフィールドの情報をフィールド名で保持するため、フィールド名が変更されると値が破棄されます。その際、FormerlySerializedAsを指定しておくことで移行先の変数名にこの情報が引き継がれるようになります。
  
    >  public float first;
  
    ![f:id:tsubaki_t1:20150103191655p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103191655.png "f:id:tsubaki_t1:20150103191655p:plain")まずは変数firstがあります。これを変数secondに変更しようと思います。その際、FormerlySerializedAs属性を追加し、旧名"first"を設定します。
  
    > \[FormerlySerializedAs("first")\]
    >  public float second;
  
    ![f:id:tsubaki_t1:20150103191702p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103191702.png "f:id:tsubaki_t1:20150103191702p:plain")
  
     これで変数名firstで設定した値は変数名secondに変更した後も破棄されず残ります。移行後はFormerlySerializedAsは削除して構いませんが、他のシーンで使っていた場合に色々面倒かもしれないので注意して下さい。
  

#### [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の動作に関連する属性

-   ##### **RequireComponentAttribute**
  
    [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の動作に必要な[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)がオブジェクトにアタッチされていなければ追加します。例えばRigidbody等。
  
    \[RequireComponent(typeof(Rigidbody))\]
    public class AttributeSample : MonoBehaviour {
    }
  

-   ##### **DisallowMultipleComponent**
  
    同一オブジェクトに[複数](http://d.hatena.ne.jp/keyword/%CA%A3%BF%F4)の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を追加出来ないようにします。
  
    \[DisallowMultipleComponent\]
    public class AttributeSample : MonoBehaviour {
    }
  
    ![f:id:tsubaki_t1:20150103203508p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103203508.png "f:id:tsubaki_t1:20150103203508p:plain")
  

-   [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の[コンテキストメニュー](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%C6%A5%AD%A5%B9%A5%C8%A5%E1%A5%CB%A5%E5%A1%BC)（右上のマーク）から[メソッド](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9)を呼び出せるようにします。例えばセットアップをランタイムではなく事前に行う場合に便利です。
  
    \[ContextMenu("Init")\]
    void Init(){
    }
  
    ![f:id:tsubaki_t1:20150103182902p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103182902.png "f:id:tsubaki_t1:20150103182902p:plain")
  

#### ゲームの動作に影響する属性

-   ##### **RPC**
  
    RPCを行う時に使うやつです。NetworkViewで通信したりPhotonで通信する際に使います。この属性がある[メソッド](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9)は、ネットワーク越しに呼ばれます。
  
    \[RPC\]
    void Damage(){
    }
  

-   ##### **ImageEffectTransformsToLDR**
  
    [HDR](http://d.hatena.ne.jp/keyword/HDR)から[LDR](http://d.hatena.ne.jp/keyword/LDR)に変換するらしいです。使い方不明。
  

-   ##### **ImageEffectOpaque**
  
    OnRenderImageに付与すると透明より前に[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)します。
  
    \[ImageEffectOpaque\]
    void OnRenderImage (RenderTexture source, RenderTexture [destination](http://d.hatena.ne.jp/keyword/destination)){
    }
  

-   ##### **MonoPInvokeCallbackAttribute**
  
    [C#](http://d.hatena.ne.jp/keyword/C%23)（マネージドコード）の[メソッド](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9)を[C++](http://d.hatena.ne.jp/keyword/C%2B%2B)（アンマネージドコード）から呼び出せるように登録します。
  
    [NativePluginsにC#デリゲートを登録する - テラシュールブログ](http://tsubakit1.hateblo.jp/entry/20140326/1395783640)
  

-   ##### **DLLImport**
  
    [C++](http://d.hatena.ne.jp/keyword/C%2B%2B)（アンマネージドコード）の[メソッド](http://d.hatena.ne.jp/keyword/%A5%E1%A5%BD%A5%C3%A5%C9)を[C#](http://d.hatena.ne.jp/keyword/C%23)から呼び出せるようにします。
  
    \[DllImport("DLL Name")\]
     private static extern void MethodName();
  

#### エディタの動作に関連する属性

エディタの上からシーンに影響を与える事のできる属性です。

- ##### **AddComponentMenu**
	メニューバーのComponentやAddComponentボタンから指定する際のパスを設定します。これを行わない場合、Script/Namespace/[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)名が設定されます。
  
    \[AddComponentMenu("Sample/TestCode")\]
    public class AttributeSample : MonoBehaviour{
  
    }
  
    ![f:id:tsubaki_t1:20150103174334p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103174334.png "f:id:tsubaki_t1:20150103174334p:plain")
  

-   ##### **ExecuteInEditMode**
  
    [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のUpdateやStartといったイベントを、ゲームを再生しない状態でも動作するようにします。ランタイムで動作する挙動を確認する際に便利です。
  
    \[ExecuteInEditMode\]
    public class AttributeSample : MonoBehaviour {}
  
    
    ExecuteInEditMode は[ホットスポット](http://d.hatena.ne.jp/keyword/%A5%DB%A5%C3%A5%C8%A5%B9%A5%DD%A5%C3%A5%C8)のような形で動作し、コードが変更になった際に[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)出来る値は[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)→[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)→再注入となり、出来ない値は破棄されま す。このため、Start等で初期化しているコードやstaticに依存するコードはシーンを再生する必要が出たりするので注意が必要です。
    例えば以下のコードはコード変更前は3を出力し、コード変更し[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)が走ると0を出力します。
  
    static int sCount = 0;
    void Start(){
     sCount = 3;
    }
    void Update(){
     Debug.Log("export:" + sCount);
    }
  
    ![f:id:tsubaki_t1:20150103184915p:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103184915.png "f:id:tsubaki_t1:20150103184915p:plain")
  

-    **SelectionBaseAttribute**
  
    シーンビューで選択した際にこの属性を持つ[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を選択するようにします。
  
    \[SelectionBase\]
    public class AttributeSample : MonoBehaviour {}
  
    例えばモデルがシーンビューにあった場合、シーンビューで選択するとモデルのRendererが選択されますが、親オブジェクトにSelectionBaseAttributeを付与した[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を付与すると、選択時に親オブジェクトが選択されます。![f:id:tsubaki_t1:20150103185829g:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103185829.gif "f:id:tsubaki_t1:20150103185829g:plain")![f:id:tsubaki_t1:20150103185848g:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20150103/20150103185848.gif "f:id:tsubaki_t1:20150103185848g:plain")
  
    上がGameObjectオブジェクトにSelectionBaseを付与した際の動作、下が付与していない場合の動作です。付与していない物は[Sphere](http://d.hatena.ne.jp/keyword/Sphere)を取得しますが、付与しているとGameObjectオブジェクトを取得します。
  
- ##### **CreateAssetMenu**
	メニューバーにScriptableObjectのアセットを生成するメニューを追加します。

> \[CreateAssetMenu()\] 
> public class Data : ScriptableObjec{}

![f:id:tsubaki_t1:20151108193758j:plain](http://cdn-ak.f.st-hatena.com/images/fotolife/t/tsubaki_t1/20151108/20151108193758.jpg "f:id:tsubaki_t1:20151108193758j:plain")

エディタ関連はまた後日まとめます多分。

### 属性を自作する

Inspectorで描画を行う属性や、通常の属性は自作することが出来ます。

この記事が参考になります。

 [Unity3D - 自分だけのPropertyDrawerを作ろう！ - Qiita](http://qiita.com/kyusyukeigo/items/8be4cdef97496a68a39d)

結構な量のサンプルがココにあるので、自作する前に見ておくと良さそうです。[anchan828/property-drawer-collection · GitHub](https://github.com/anchan828/property-drawer-collection)

また、単純に属性を使用する場合もそこそこ役立つケースが有ります。

例えば[エディタでゲーム再生中に変更した値を停止しても消さない その２](http://tsubakit1.hateblo.jp/entry/20131107/1383834400) では属性を持った変数を識別し、値を一時保存する事でシーン終了時に破棄されるパラメータを保持するのに使ったり、シーンのビルド時にプラットフォーム毎に値を変更するのに使用したりといった活用が出来ます。

### 関連資料

[PanzerSoftのブログ Unityのスクリプトで利用する属性（アトリビュート）](http://panzersoft.blog.fc2.com/blog-entry-51.html)

[An Overview of Unity Attributes](http://www.tallior.com/unity-attributes/)

[Extending Unity Container to Support DefaultValue Attribute - CodeProject](http://www.codeproject.com/Articles/69126/Extending-Unity-Container-to-Support-DefaultValue)

[Unity3D - 自分だけのPropertyDrawerを作ろう！ - Qiita](http://qiita.com/kyusyukeigo/items/8be4cdef97496a68a39d)

[HeaderとSpaceを使ってInspectorを整理する - テラシュールブログ](http://tsubakit1.hateblo.jp/entry/2014/07/23/095513)

[NativePluginsにC#デリゲートを登録する - テラシュールブログ](http://tsubakit1.hateblo.jp/entry/20140326/1395783640)

[エディタでゲーム再生中に変更した値を停止しても消さない その２ - テラシュールブログ](http://tsubakit1.hateblo.jp/entry/20131107/1383834400)

[属性 (C# によるプログラミング入門)](http://ufcpp.net/study/csharp/sp_attribute.html)

サンプル

[anchan828/property-drawer-collection · GitHub](https://github.com/anchan828/property-drawer-collection)