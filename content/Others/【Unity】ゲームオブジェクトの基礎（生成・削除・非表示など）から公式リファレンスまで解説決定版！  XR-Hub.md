---
date: 2024-12-20T14:04:13+09:00
title: "【Unity】ゲームオブジェクトの基礎（生成・削除・非表示など）から公式リファレンスまで解説決定版！  XR-Hub"
created: 2021-08-03T19:17:54 (UTC +09:00)
tags:
 - App/Unity
 - Article
source: https://xr-hub.com/archives/14348
author: あきごろう
---

# 【Unity】ゲームオブジェクトの基礎（生成・削除・非表示など）から公式リファレンスまで解説決定版！ – XR-Hub

> ## Excerpt
> » 【Unity】ゲームオブジェクトの基礎（生成・削除・非表示など）から公式リファレンスまで解説決定版！

---
Unityでゲームを作る際に、**GameObject（ゲームオブジェクト）**という言葉を目にしたことがあると思います。

どういうものかは何となく分かっているものの、**GameObjectの生成や削除、非表示**など、細かいところで悩んでいる人も少なくないと思います。

そこで、それらのGameObjectに関する悩みを解決できるよう、「GameObjectとは」からGameObjectの詰まりやすいPoint解説（生成・削除・tagなど）、公式リファレンスの詳細説明まで徹底的にご紹介します

GameObjectに関する**解説決定版**なので、「公式リファレンスが分かりにくい」と思っている初学者の方は勿論、上級者の方も**辞書代わり**に是非ご一読いただければ幸いです。

本記事は

-   GameObjectとは？
-   GameObjectでつまづきやすい4つのPoint(動的生成・動的削除・findなど)
-   GameObjectの公式リファレンスを分かりやすく解説

以上の流れで解説していきます。

## GameObject（ゲームオブジェクト）とは？

**Unity内で作成するあらゆるオブジェクトのことをGameObject（ゲームオブジェクト）**と呼びます。

一見GameObjectが何かしらの機能を持っているような表現をしていることが多いですが、あくまでGameObjectは箱（入れ物）であって、GameObjectのみだけでは何も効果を発揮しません。

GameObjectは中に部品を詰めていくことで意味のあるオブジェクトになっていくのです。

その**部品にあたるのがCompornent**（コンポーネント）になります。Compornentにはそれぞれ機能があり（TransformコンポーネントやRigidbodyコンポーネントなど）機能同士を掛け合わせ調整することで想定の動きを実現していきます。

上記の組み合わせをGameObjectという箱の中で行う、というのがUnityでの作成の基本となります。

下の図はGameObjectとCompornentの関係を図式化したものです。このように様々なCompornentを組み込まれてGameObjectが出来ています。

![](https://xr-hub.com/wp-content/uploads/2019/05/1.gif)

## GameObjectでつまづきやすい4つのPoint

さて、ここからはGameObject関連で引っ掛かりやすい部分を説明していきます。

ここの項目は今後も増やしていきたいので、「**GameObjectの〇〇に関してまとめてほしい**」という要望がありましたら、お問い合わせから遠慮なくご連絡ください。

**【目次】**

-   GameObjectをゲーム途中で自動生成する方法（動的生成/Instantiate）
-   GameObjectをゲーム途中で削除する方法（動的削除/Destroy）
-   スクリプトでGameObjectを検索する3つの方法（Find/FindGameObjectsWithTag/FindWithTag）
-   GameObjectのゲーム中での非表示化/enabled化（SetActive）

### GameObjectをゲーム途中で自動生成する方法（動的生成/Instantiate）

キー入力で銃弾を発射させたい、時間経過で敵の機体が出現させたいなど、スタート時点では出現していなかったGameObjectをゲーム実施中に出現させたい場合はよくあると思います。

この場合は基本的に**Instantiate関数（メソッド）**を使います。

例えば、1秒間に1回オブジェクトを複製したい場合、以下のようなスクリプトで実現します。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

using System.Collections;

using System.Collections.Generic;

using UnityEngine;

public class Cube : MonoBehaviour

{

  //生成の間隔（1秒）を決めるための変数

  public float timeOut \= 1;

  private float timeElapsed;

  void Update()

  {

      //timeElapsedに経過時間(Time.deltaTime)を加算

      timeElapsed += Time.deltaTime;

      if (timeElapsed &gt;\= timeOut)

      {

          //InstantiateでGameObject生成

          //Instantiate(複製するGameObject,位置,回転)の順番で記載

          Instantiate(this, new Vector3(Random.Range(\-5.0f, 5.0f), Random.Range(\-5.0f, 5.0f), Random.Range(\-5.0f, 5.0f)), Quaternion.identity);

          //timeElapsedを0.0fに戻す

           timeElapsed \= 0.0f;

       }

  }

}

このスクリプトで実際に動かしてみると以下のように1秒ごとにGameObjectが増えていきます。

![](https://xr-hub.com/wp-content/uploads/2019/05/2019-05-05_15h40_42.gif)

このInstantiateを使って、衝突した時に新しいブロックが生成されたり(**private void OnCollisionEnter(Collision collision)**)、ボタンを押した時に銃弾が発射されたり（**if (Input.GetKey(KeyCode.Space****))**)など、色んな条件やタイミングで生成できるので、色々な条件を自分で作ってみてください！

### GameObjectをゲーム途中で削除する方法（動的削除/Destroy）

例えばブロック崩しでボールがブロックに当たった時にブロックが消えるようにする、一定時間経過した時にアイテムが消えるようにする、などGameObjectをゲーム実施中に動的に削除したい時があると思います。

この場合は**Destroy関数**を使用します。

例として、3秒後に自動でGameObjectを削除したいとします。この場合以下のスクリプトで実現できます。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

using System.Collections;

using System.Collections.Generic;

using UnityEngine;

public class Cube : MonoBehaviour

{

  //3秒間を計るための変数

  public float timeOut \= 3;

  private float timeElapsed;

  void Update()

  {

      //timeElapsedに経過時間(Time.deltaTime)を加算

      timeElapsed += Time.deltaTime;

      //timeElapsedが3秒(timeOut)を超えた時

      if (timeElapsed &gt;\= timeOut)

      {

          // アタッチしているGameObjectをDestroyする

          Destroy(this.gameObject);

       }

  }

}

このスクリプトを使うと以下のように確かに3秒後に消えます。

![](https://xr-hub.com/wp-content/uploads/2019/05/2019-05-05_15h57_23.gif)

あとは条件の組み合わせ方次第で様々なパターンを表現することができるので、色々と試して自由にDestroyを使えるようにしましょう。

### スクリプトでGameObjectを検索する3つの方法（Find/FindGameObjectsWithTag/FindWithTag）

ゲームを作成している際にスクリプト内でGameObjectを検索したい場合は多々あると思います。

この時に使える関数が以下の3つです。

-   **Find**
-   **FindGameObjectsWithTag**
-   **FindWithTag**

これらの使い分けの判断基準は

1.  GameObject名で検索するか、Tagで検索するか
2.  Tagで検索する場合、1つのGameObjectの検索か、複数のGameObjectの検索か

以上の2つになります。

まず1のGameObject名の場合は「**Find**」を使用します。

例えば「Cube」という名前のGameObjectを見つけたい場合は以下のスクリプトになります。

GameObject cube1 \= GameObject.Find("Cube");

次に2のTagで検索する場合で1つのGameObjectの場合は「**FindWithTag**」を使います。

例えば、「Test」というTagを持つGameObjectを検索したい場合は以下のスクリプトになります。

GameObject test1 \= GameObject.FindWithTag ("Test");

最後に2のTagで複数のGameObjectを検索したい場合は「**FindGameObjectsWithTag**」を使います。

例えば、「Test」というTagを持つ複数のGameObjectを検索したい場合は以下のスクリプトになります。

他の検索と異なり、**戻り値が配列になる**のが注意点です。

GameObject\[\] test2 \= GameObject.FindGameObjectsWithTag ("Test");

Findを使って特定のGameObject情報を抽出し、他のGameObjectに反映させたり、GameObjectのCompornentを変更したりすることもあり、使用頻度は非常に高いものになるので、是非使えるようになりましょう。

また、**Findで検索できない時は基本的に検索したいGameObjectが非アクティブになっていることが多い**のでご注意ください。

### GameObjectのゲーム中での非表示化/enabled化（SetActive）

ゲーム実施中にあるオブジェクトを非表示にしたい時があると思います。

例えば、リスタートのUIがボタンを押した時に非表示にするとか、敵からの攻撃を受けた時に自機を非表示にするとかです。

この時に使うのが**SetActive**や**Destroy**になり、特によく使うのがSetActiveの方です。

SetActiveとは、GameObjectのアクティブ（enabled）/非アクティブ（unenabled）を切り替える関数で、以下のような簡単なスクリプトになります。

//GameObjectをアクティブにする

GameObject.SetActive(true);

//GameObjectを非アクティブにする

GameObject.SetActive(false);

こちらを用いて、非表示または再表示などを実施するのです。

ちなみに前述の通り**非アクティブなGameObjectはFindで検索できなくなる**ので、ご注意ください。

## GameObjectの公式リファレンスを分かりやすく解説

最後に、GameObjectの[公式リファレンス](https://docs.unity3d.com/ja/current/ScriptReference/GameObject.html)を、使い方を踏まえてより分かりやすくご紹介します。

ここからは一読してもらうというよりは、**分からない時に辞書的に使っていただくことを想定して作っています**。

なので、GameObjectに関して分からないことが生じた際にじっくりと読んでもらえれば幸いです。

始めにGameObjectに関する変数や関数を表で簡潔にまとめました。

更に各項目ごとにより詳細に記載した文章（使うタイミングや注意点など）を表の後ろに記載しています。

始めに表で確認してもらい、分からなければ下の詳細説明をご参照ください。

### リファレンスの表

↓変数名や関数をクリックすると詳細まで遷移できます↓

**変数**

**格納される値**

[activeInHierarchy](https://xr-hub.com/archives/14348#a01)

GameObjectがシーンでアクティブかどうか（Bool値）

[activeSelf](https://xr-hub.com/archives/14348#a02)

GameObject自身のActive/非Active（Bool値）

[isStatic](https://xr-hub.com/archives/14348#a03)

GameObjectがstaticかどうか（Bool値）

[layer](https://xr-hub.com/archives/14348#a04)

GameObjectが存際しているレイヤー名（String）

[scene](https://xr-hub.com/archives/14348#a05)

GameObjectが属しているシーン名（String）

[tag](https://xr-hub.com/archives/14348#a06)

GameObjectのタグ名（String）

[transform](https://xr-hub.com/archives/14348#a07)

GameObject にアタッチされている Transform（Transform）

**Public関数**

**関数の内容**

[AddComponent](https://xr-hub.com/archives/14348#a09)

GameObjectに指定したコンポーネントクラスを追加します。

[BroadcastMessage](https://xr-hub.com/archives/14348#a10)

指定したGameObjectまたは子オブジェクトにあるすべての MonoBehaviour を継承したクラスにある指定したメソッドを呼び出します。

[CompareTag](https://xr-hub.com/archives/14348#a11)

このGameObjectが tag とタグ付けされているかどうかを判断します。（戻り値はBool値）

[GetComponent](https://xr-hub.com/archives/14348#a12)

指定したGameObjectに type（主にCompornent） がアタッチされている場合は typeを指定してCompornentを返します。
ない場合は null を返します。

[GetComponentInChildren](https://xr-hub.com/archives/14348#a13)

指定したGameObjectまたはその子オブジェクトたちの type（主にCompornent）から指定したCompornentを取得します。

[GetComponentInParent](https://xr-hub.com/archives/14348#a14)

指定したGameObject やその親オブジェクトたちの type（主にCompornent）から指定したCompornentを取得します。

[GetComponents](https://xr-hub.com/archives/14348#a15)

指定したGameObjectの type（主にCompornent）のすべてのCompornentを返します。

[GetComponentsInChildren](https://xr-hub.com/archives/14348#a16)

指定したGameObjectまたはGameObjectの子たちから type（主にCompornent）のすべてのCompornentを取得します。

[GetComponentsInParent](https://xr-hub.com/archives/14348#a17)

指定したGameObjectまたはその親たちから type（主にCompornent）のすべてのCompornentを返します。

[SendMessage](https://xr-hub.com/archives/14348#a18)

指定したGameObjectにアタッチされているすべての MonoBehaviour にある指定したメソッドを呼び出します。

[SendMessageUpwards](https://xr-hub.com/archives/14348#a19)

GameObjectと親（の親、さらに親 … ）にアタッチされているすべての MonoBehaviour にある指定したメソッドを呼び出します。

[SetActive](https://xr-hub.com/archives/14348#a20)

指定したGameObjectをActive/非Activeにします。

**Static関数**

**関数の説明**

[CreatePrimitive](https://xr-hub.com/archives/14348#a21)

基本的なGameObject（プリミティブメッシュレンダラーと適切なコライダー）を作成します。
簡単にGameObjectを生成したい時に利用します。

[Find](https://xr-hub.com/archives/14348#a22)

GameObject名で GameObject を検索し返します。

[FindGameObjectsWithTag](https://xr-hub.com/archives/14348#a23)

指定したtagを持つアクティブなGameObjectのリストを返します。もし見つからない場合は空配列（null）を返します

[FindWithTag](https://xr-hub.com/archives/14348#a24)

指定したtagを持つアクティブなGameObjectを返します。もし見つからない場合は null を返します

### 継承メンバー

↓変数名や関数をクリックすると詳細まで遷移できます↓

**変数**

**持っている値**

[hideFlags](https://xr-hub.com/archives/14348#a25)

GameObjectの見え方や保存対象を制御するためのフラグ
詳細は下の詳細解説をご参考ください。

[name](https://xr-hub.com/archives/14348#a26)

GameObjectの名前

**Static関数**

**関数の内容**

[Destroy](https://xr-hub.com/archives/14348#a29)

GameObjectやコンポーネント、アセットなどを削除します。

[DestroyImmediate](https://xr-hub.com/archives/14348#a30)

GameObjectを即時削除します。公式ではこちらよりDestroyを使う方をおススメしています。

[DontDestroyOnLoad](https://xr-hub.com/archives/14348#a31)

デフォルトだとシーン切替の際に削除されてしまうGameObjectを指定することで、シーンを切り替えた際にそのまま残しておくことができます。

[FindObjectOfType](https://xr-hub.com/archives/14348#a32)

Type（主にCompornent）から最初に見つけたアクティブのGameObjectを返します。

[FindObjectsOfType](https://xr-hub.com/archives/14348#a33)

Type（主にCompornent）から見つけたすべてのアクティブのGameObject配列を返します。

[Instantiate](https://xr-hub.com/archives/14348#a34)

指定したGameObjectをクローン（複製）します。

**Operator**

**解説**

bool

オブジェクトが存在するかどうかをtrue/falseで返します。オペレーターなので下記での詳細解説は割愛します。

operator !=

二つのオブジェクトが異なるオブジェクトを参照しているか比較します。オペレーターなので下記での詳細解説は割愛します。

operator ==

2つのオブジェクト参照が同じオブジェクトを参照しているか比較します。オペレーターなので下記での詳細解説は割愛します。

### GameObjectの変数

ここからは上の表の項目1つずつを詳細に解説していきます。

#### activeInHierarchy

activeInHierarchyとは、**自分もしくは親オブジェクトがActiveか非Activeを判断する**ためのものになります。

返り値は**Bool値（True/False）**になります。

例えば、以下のような階層関係にあるGameObjectがあったとします。

![](https://xr-hub.com/wp-content/uploads/2019/05/2.gif)

この場合、Wall1がActive（True）であっても、Walls（親オブジェクト）が非Active（False）だとactiveInHierarchyではFalseと返ってきます。

このように親オブジェクトが優先度高く判断されます。

実際にゲームにおいて親オブジェクトが非アクティブの場合、子も非アクティブ（シーンで無効）になることが多いので、実際にそのオブジェクトがアクティブかどうかを判断する場合に利用できます。

#### activeSelf

activeSelfは、activeInHierarchyとは異なり、自分自身がActiveか非Activeを判断する変数になります。

activeInHierarchyと同様、以下のような階層関係にあるGameObjectがあったとします。

![](https://xr-hub.com/wp-content/plugins/a3-lazy-load/assets/images/lazy_placeholder.gif)

この場合、Wall1がActive（True）でWalls（親オブジェクト）が非Active（False）だと、activeSelfではTrueが返ってきます。

このようにactiveSelfは親オブジェクトに関係なく、自分自身がActiveか非Activeだけを判断します。

どちらかというと、activeInHierarchyの方が使用することが多いです。

#### isStatic

isStaticはそのGameObjectがStatic（静的）かどうかをBool値で返します。

Staticの設定はInspectorビューのオブジェクト名の隣で設定するか、Scriptで設定します。

![](https://xr-hub.com/wp-content/plugins/a3-lazy-load/assets/images/lazy_placeholder.gif)

#### layer

layerとは、GameObjectの優先順位を付けたグルーピングの役割を持ちます。

特定のLayerに属するGameObjectに対して、カメラの描画（レンダリング）の有無、特定のゲームオブジェクトの表示・非表示などを設定できます。

また、特定のオブジェクト同士のみ衝突判定を無くすこともできます。

![](https://xr-hub.com/wp-content/plugins/a3-lazy-load/assets/images/lazy_placeholder.gif)

Layerの設定はStaticと同様、Inspectorビューから設定できます。

初めから画像のようなLayerが存在し、増やしたい場合は自分でLayerを増やすこともできます。

##### Layerの追加方法

Add Layer…を選択します。

![](https://xr-hub.com/wp-content/uploads/2019/05/4-1.gif)

すると、以下の画面が開かれるので、選びたいLayerの空欄にLayerの名前を入れます。

![](https://xr-hub.com/wp-content/uploads/2019/05/5.gif)

以上で完了です。

##### Layerの削除方法

削除方法はより簡単で、作成時に使用したLayer画面のLayer名を削除し、空欄にすることで削除できます。

![](https://xr-hub.com/wp-content/uploads/2019/05/8.gif)

#### scene

sceneは自分（GameObject）自身がどのシーンに属しているかを返します。

返り値はシーン名（String）です。

例えば、複数のシーンを使ったゲームにおいて、指定したGameObjectがどのシーンに存在するのかを確認したい場合に使用したりします。

#### tag

tag（タグ）とはゲームオブジェクトをグルーピングするために使うものになります。まさにタグ付けになります。

特にスクリプトで特定の複数オブジェクトに対して何か動作させたい場合にTagを利用してオブジェクトを指定することが多いです。

例えば、以下のブロック崩しゲームがあったとします。

![](https://xr-hub.com/wp-content/uploads/2019/05/9.gif)

クリア条件として全てのBlockが消えた時という条件を付けたいとした場合、各Blockに対して存在しているかどうかを確認するスクリプトを作成すると非常に手間になってしまいます。

こういう時にBlock全てに同じTag（BlockというTag）を設定して、そのTagを持つオブジェクトが存在しなくなった時にゲームクリアというスクリプトにしたりします。

これらをスクリプトにすると以下のようになります。

public void Update()

{

  // BlockというTagを持つオブジェクトの個数をcountに保存する

  int count \= GameObject.FindGameObjectsWithTag("Block").Length;

  //オブジェクトの個数（count）が0になった時

  if (count \== 0)

  {

      // クリア条件を満たしたので、ClearUIをアクティブにする

      ClearUI.SetActive(true);

  }

}

上記のようにTagを使って特定のオブジェクトをグルーピングできるようになると、処理を単純化できます。

ちなみに、今回使用したブロック崩しゲームは1から作り方を説明している記事があるので、良かったら作成にチャレンジしてみてください！

##### GameObjectのTagの設定

Tagの存在理由は分かったところで、設定方法が分からないと意味ないですよね。

ではTagの設定方法を説明します。

StaticやLayerと同様、Inspectorビューから設定できます。

InspectorビューのGameObject名の下にあるTagの「Untagged」をクリックすると下の画像のようなメニューが表示されます。

メニューから選ぶとGameObjectのTagとなります。

![](https://xr-hub.com/wp-content/uploads/2019/05/10.gif)

上の画像のTagは初めから設定されているもので、これらを使うこともできますし、自分でTagを作ることもできます。

##### Tagの新規作成

自分でTagを作成する場合、上の画像の「Add Tag…」を選択します。

![](https://xr-hub.com/wp-content/uploads/2019/05/11.gif)

すると上のようにTagを新規作成できる画面が開かれるので、Tagsの＋をクリックします。

下のようにTagの名前を設定する画面が開かれるので、新規作成したいTagの名前に変更します。

![](https://xr-hub.com/wp-content/uploads/2019/05/12-1.gif)

すると先ほどの「List is Empty」に作成したTagが表示されます。

![](https://xr-hub.com/wp-content/uploads/2019/05/13-1.gif)

そして、作成したTagを設定する場合はTagを設定しようとすると作成したTagがメニューの中に表示されます。

![](https://xr-hub.com/wp-content/uploads/2019/05/14.gif)

##### 作成したTagの削除

自分で作成したTagに関しては削除することもできます。

削除するには「Add Tag…」のページに行き、削除したいTagを選択した上で「ー」をクリックすると削除できます。

![](https://xr-hub.com/wp-content/uploads/2019/05/17.gif)

#### transform

transformは、オブジェクトの位置（Position）、回転（Rotation）、スケール（Scale）を扱うクラスになります。

基本的にオブジェクトを移動したい場合や回転させたい場合、大きさを変更し合い場合に使用されます。

全てのGameObjectには常にTransformコンポーネントがアタッチされており、このコンポーネントは削除することができません。

![](https://xr-hub.com/wp-content/uploads/2019/05/18.gif)

Transformに関してもっと深く説明すべき内容なので、良かったらより詳細に解説しているこちらの記事をご一読ください。

### GameObjectのコンストラクタ

GameObjectのコンストラクタは1つしかありません。

GameObjectというコンストラクタで、新しい名前のGameObjectを作成することができます。

主に新規のGameObjectを作りたい時に使用します。

具体的な使用例としては、新しいゲームオブジェクトを作りたい場合に以下のスクリプトで「Player」という名前の新規オブジェクトを作成できます。

using UnityEngine;

public class GameConstractor : MonoBehaviour

{

 void Start()

 {

 GameObject player;

 player \= new GameObject("Player");

 //GameObjectにCompornentを設定していく。

 player.AddComponent&lt;Rigidbody&gt;();

 player.AddComponent&lt;BoxCollider&gt;();

 }

}

### **GameObjectのPublic****関数**

#### AddComponent

AddComponentでは、指定したGameObjectに指定したCompornentを付与することができます。

この関数は主に**ゲーム実行中に新しいRigidbodyやColliderを追加したい場合などに使用します**。

例えば、ゲームを実行したタイミングで「Wall1」というGameObjectに「Audio Source」を追加したい場合、以下のスクリプトを使います。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

using System.Collections;

using System.Collections.Generic;

using UnityEngine;

public class AddComponent : MonoBehaviour

{

  //GameObject型を作成

  GameObject Wall1;

  // Start is called before the first frame update

  void Start()

  {

      //Wall1という名前のGameObjectを検索し、あればそのGameObjectを返す

      Wall1 \= GameObject.Find("Wall1");

      //AudioSourceというコンポーネントを追加する

      Wall1.AddComponent&lt;AudioSource&gt;();

  }

}

これをWall1にアタッチして実際にゲームをスタートしてみると、確かにAudioSourceが追加されていることが分かります。（下のGIFを参照）

![](https://xr-hub.com/wp-content/uploads/2019/05/2019-05-03_14h17_49.gif)

ゲーム途中でCompornentを付与したい場合などで使うことが多いので、しっかりと使えるようにしていきましょう。

#### BroadcastMessage

BrodcastMessageはGameObjectもしくは子オブジェクトにある全てのMonoBehaviorを継承したクラスのメソッドをメソッド名で呼び出します。

他のGameObjectやCompornentのメソッドを呼び出したい時に使います。（オブジェクト指向の考え方がここで生かされていますね）

スクリプトの表記方法は

<span class\="pl-smi"\>GameObject</span\>.<span class\="pl-en"\>BroadcastMessage</span\>(メソッド名,引数);

となります。

#### CompareTag

CompareTagはあるGameObjectがあるtagとタグ付けされているかどうかを判断するので、Tagの存在判定や特定のTagを削除したい場合などに使用します。

例えば、「Player」というTagを持っているGameObject（Wall1）があった場合、そのGameObjectを削除したい時には以下のスクリプトを使用します。

using System.Collections;

using System.Collections.Generic;

using UnityEngine;

public class AddComponent : MonoBehaviour

{

  void Start()

  {

      //PlayerというTagをこのGameObjectが持っているかを検索します

      if (this.gameObject.CompareTag("Player"))

      {

          //このGameObjectを削除します。

          Destroy(this.gameObject);

      }

  }

}

#### GetComponent

GetComponentは、指定したGameObjectのCompornentの情報を取得することができる関数です。

どういう時に使うかというと、ゲーム実行中にCompornentの要素を動的に変更したい場合であり、例えば「Transform Compornent」の要素を書き換えて**座標移動**や**回転**を行ったり、「BoxCollider Compornent」の中身を編集し**当たり判定の領域を変更**したりします。

非常に使用頻度が高い関数なので、仕組みを理解して使えるようにして欲しい関数の1つです。

スクリプトでは以下のように記述します。

<span class\="n"\>//GameObject1のコンポーネントの要素取得

コンポーネント型 \= GameObject1.GetComponent</span\><span class\="p"\>&lt;コンポーネント名</span\><span class\="p"\>&gt;();

//GameObject2のrigidbodyのuseGravityをtrueに変更

GameObject2.GetComponent&lt;Rigidbody&gt;().useGravity \= true;</span\>

冒頭の架空のGameObjectで各Compornentを取得しようとすると以下のような表記になります。

![](https://xr-hub.com/wp-content/uploads/2019/05/19-1.gif)

ちなみに注意点として、**GameObjectが非Activeの場合は検索することができないので、見つけることができません**。あくまでActive状態のObjectを対象とするものになります。

先述の通りGetComponentは様々な用途があるので、自分で色々と使って覚えていきましょう。

#### GetComponentInChildren

この関数はGetComponentと同様、コンポーネントの情報を取得するのですが、異なる点は対象が自分自身でなく、子オブジェクトの特定のコンポーネントを配列として取得するという点です。

そのため、複数当てはまるコンポーネントが存在する場合は配列として返ってきて、対象がなければnullとして返ってきます。

自分がどのObjectの情報を取得したいのか、という点から使い分けてください。

#### GetComponentInParent

この関数はGetComponentと同様、コンポーネントの情報を取得するのですが、異なる点は対象が自分自身でなく、親オブジェクトの特定のコンポーネントを配列として取得するという点です。

要はGetComponentinChildrenの親バージョンになります。

指定したコンポーネントが複数存在する場合は配列として返ってきて、対象がなければnullとして返ってきます。

自分がどのObjectの情報を取得したいのか、という点から使い分けてください。

#### GetComponents

この関数は指定したGameObjectの全てのコンポーネントを取得することができます。

基本的な使い方はGetComponentと同じですが、全てのコンポーネントを取得するという部分が異なります。

もちろん、返り値は配列となりますので、ご注意ください。

#### GetComponentsInChildren

この関数はGetComponentsを子オブジェクトを対象にした関数です。

したがって、子オブジェクトの全てのコンポーネントを取得してきます。

#### GetComponentsInParent

この関数はGetComponentsを親オブジェクトを対象にした関数です。

したがって、親オブジェクトの全てのコンポーネントを取得してきます。

#### SendMessage

SendMessageは、あるGameObjectにアタッチされている全てのMonoBehaviorに存在するメソッドを呼び出すことができます。

そのため、他のGameObjectのあるメソッド（関数）を呼び出したい時に使用します。

スクリプトは下記の通りです。

<span class\="pl-smi"\>GameObject</span\>.<span class\="pl-en"\>SendMessage</span\>(メソッド名,引数);

SendMessegeの特徴は**1つのGameObjectしか参照できない**という点です。

似たような機能を持つBrodcastMessageは指定したGameObjectと子オブジェクトを参照できます。ただ、その分処理が重くなります。

また、後述のSendMessageUpwardsは指定したGameObjectと親オブジェクトを参照できます。ただ、その分処理が重くなります。

なので、どこまでのオブジェクトを参照したいかで使い分けると良いです。

#### SendMessageUpwards

この関数はあるGameObjectとその親オブジェクトにアタッチされている全てのMonoBehaviorに存在するメソッドを呼び出すことができます。

スクリプトは下記の通りです。

<span class\="pl-smi"\>GameObject</span\>.<span class\="pl-en"\>SendMessageUpwards</span\>(メソッド名,引数);

#### SetActive

SetActiveはGameObjectのアクティブ/非アクティブを切り替えることができる関数になります。

例えばあるボタンを押した時に「Start」という名前のUIを非表示にしたい場合などに、UIを意図的に非アクティブにしたりします。

この場合、以下のようにSetActiveを使ってGameObjectを非アクティブに変更にすることがあります。

using System.Collections;

using System.Collections.Generic;

using UnityEngine;

public class BallToRestart : MonoBehaviour

{

   GameObject StartUI \= GameObject.Find("Start");

   private void Update()

   {

       if (Input.GetKey(KeyCode.Space))

       {

              StartUI.SetActive(false);

       }

  }

}

非表示にしたい場合はDestroy（詳細な説明は後述）を使ってもいいのでは？という考えもあると思います。

判断基準としては何度も表示/非表示を切り替えたい場合はSetActive、一度非表示にしたら以後変更しない場合はDestroyになります。

### **GameObjectのStatic****関数**

#### CreatePrimitive

この関数は、Primitiveな（基本的な）GameObjectを簡単に生成することができます。

生成されたGameObjectはワールド座標の原点に生成されます。

生成できるオブジェクトの種類は以下の6種類です。

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

//capsuleはカプセル型

GameObject capsule \= GameObject.CreatePrimitive (PrimitiveType.Capsule);

//cubeは立方体

GameObject cube \= GameObject.CreatePrimitive (PrimitiveType.Cube);

//Cylinderは筒状

GameObject cylinder \= GameObject.CreatePrimitive (PrimitiveType.Cylinder);

//planeは平面

GameObject plane \= GameObject.CreatePrimitive (PrimitiveType.Plane);

//quadは4頂点、2ポリゴンで生成される平面

GameObject quad \= GameObject.CreatePrimitive (PrimitiveType.Quad);

//sphereは球体

GameObject sphere \= GameObject.CreatePrimitive (PrimitiveType.Sphere);

GameObject クラスのコンストラクタで生成した空のゲームオブジェクトからでも構築できますが、メッシュなどの少し面倒な設定を行う必要があります。

そこで、簡単に作成したい場合はCreatePrimitiveを使用します。

#### Find

この関数はGameObjectを検索する関数です。

検索する際は**GameObjectの名前**で検索します。対象となるオブジェクトはアクティブになっているオブジェクト全てです。

SetActiveでの参考スクリプトにもさりげなく使っていますが、あるオブジェクトを操作したい場合にまずFindで見つけるということはよくあります。

子オブジェクトを取得するときは、GameObject.Find(親/子”);のようにスラッシュで区切って下の階層に降りてください。

ただし、名前検索は完全一致しかできず、部分一致ができないのでご注意ください。

また、非アクティブのオブジェクトは検索できません。もし非アクティブのオブジェクトを検索したい場合はTransform.Find関数をお使いください。

「Box」という名前のGameObjectを検索したい時のスクリプトは以下です。

GameObject obj \= GameObject.Find("Box");

#### FindGameObjectsWithTag

この関数は複数のGameObjectをTagによって検索する関数です。

Findと違う点はGameObjectの名前ではなく**GameObjectのTag**を使って検索することです。

Tagによってグルーピングしたオブジェクト達を一斉に変更したい場合（操作を加えたい場合）に使用することが多いです。

ちなみに戻り値は配列になります。

「Test」というTagを持つGameObjectを検索したい時のスクリプトは以下です。

GameObject\[\] obj \= GameObject.FindGameObjectsWithTag ("Test");

#### FindWithTag

この関数はTagを使って1つのGameObjectを検索する関数です。

FindGameObjectsWithTagと似ていますが、この関数の場合1つのGameObjectだけが返ってくること、FindWithTagの方が処理が早いという点が異なります。

したがって、検索したいTagを持つGameObjectが1つの場合にはFindWithTagを使い、複数の場合はFindGameObjectsWithTagを使ってください。

「Cube」というTagを持つGameObjectを検索したい時のスクリプトは以下です。

GameObject obj \= GameObject.FindGameObjectsWithTag ("Cube");

### 継承メンバーの変数

#### hideFlags

この変数を用いることでGameObjectやコンポーネントをHierarchyビューやInspectorビュー上で非表示にすることができます。

例えば「obj」というゲームオブジェクトがあった時にHierarchyビューから見えなくする方法は以下です。

GameObject obj \= GameObject.CreatePrimitive(PrimitiveType.Plane);

obj.hideFlags \= HIdeFlags.HideInHierarchy;

hideFlagsの種類は以下です。

**変数**

**説明**

None

全てのオブジェクトを表示します。
HideInHierarchyなどで非表示にしているオブジェクトを表示する時に使います。

HideInHierarchy

オブジェクトがHierarchyビューで非表示にします。

HideInInspector

オブジェクトのCompornentをInspectorビューで非表示にします。

DontSaveInEditor

オブジェクトが自動で破棄されてしまうことを無効にします。（基本的にはDontSaveを使います）

NotEditable

オブジェクトのコンポーネントををInspectorビュー上で編集不可にします。

DontSaveInBuild

ビルド時にオブジェクトをシーンに含めないようにします。（基本的にはDontSaveを使います）

DontUnloadUnusedAsset

オブジェクトが自動でアンロードされてしまうのを無効にします。（基本的にはDontSaveを使います）

DontSave

Unityではゲーム再生時に変更した情報がゲーム停止時にリセットされるようになっていますが、そのリセットを無視するようにします。
DontSaveInBuildとDontSaveInEditorとDontUnloadUnuserdAssetの機能を併せ持ちます。

HideAndDontSave

HideInInspector以外の上記変数全ての機能を併せ持ちます。

このHideFlagsは、複数人数での開発の時に使うことが多いです。具体的には、他人に編集されたくないGameObjectやCompornentをHideさせて編集できないようにします。

#### name

この変数はGameObjectの名前にあたる変数です。

例えば新しく作成したGameObjectに「Plane1」という名前を設定する際には以下のスクリプトになります。

GameObject obj \= GameObject.CreatePrimitive(PrimitiveType.Plane);

obj.name \= "Plane1";

### 継承メンバーのPublic関数

#### GetInstance

この関数は各GameObjectに付与されている固有のIDを取得するものです。

返ってくる値は数値（int型）になります。

以下は固有IDを取得するスクリプトの参考例です。

GameObject obj \= GameObject.CreatePrimitive(PrimitiveType.Plane);

int int1 \= obj.GetInstanceID();

この関数の使い方は「同じオブジェクトに対して操作を複数回連続で行ったことを検知したい場合」などに使います。

一度操作を行ったときにIDを取得しておき、次の操作の時にそのIDと同じ値かを比較するという方法になります。

固有で変化しない値なので、GameObjectを絶対参照したい場合には使うことが多いと思います。

#### ToString

GameObjectの名前をString型（文字列）として返す関数になります。

スクリプトは以下のようになります。

<span class\="crayon-t"\>string</span\> objName<span class\="crayon-o"\>=</span\> obj<span class\="crayon-sy"\>.</span\><span class\="crayon-e"\>ToString</span\><span class\="crayon-sy"\>(</span\><span class\="crayon-sy"\>)</span\><span class\="crayon-sy"\>;</span\>

GameObjectの名前を取得したい場合に使用します。

### 継承メンバーのStatic関数

#### Destroy

この関数はGameObject・Compornent・Assetなどを削除する時に使います。

例えば、「ボールとブロックがぶつかった時にブロックが消えてほしい場合」に衝突判定を条件にDestroyを使用します。

スクリプトは以下のようになり、ブロックにアタッチします。

private void OnCollisionEnter(Collision collision)

{

  Destroy(gameObject);

}

ちなみに、GameObjectをDestroyした場合、Hierarchyビュー上からは消えても存在は消えないため、GetComponentsで要素を検索するとカウントされてしまいます。この部分は思わぬ落とし穴なのでご注意ください。

もし表示/非表示を何度も切り替えたい場合はSetActiveを使う方がおすすめです。

Destroyは非常に使用頻度が高い関数になるので、しっかりと使えるようにしましょう。

#### DestroyImmediate

この関数はDestroyよりも強力な即時削除するための関数です。

DestroyImmediateを使うと、Hierarchyビュー上からも存在自体も削除されます。

DestroyImmediate(gameObject);

非常に強力な関数のため、公式ではこの関数の使用をおススメしていません。

削除や非表示を実現したい場合はDestroyやSetActiveをご使用ください。

#### DontDestroyOnLoad

Unityのデフォルトではシーンを切り替えた時にGameObjectの引継ぎができず全て削除されてしまいます。

しかし、複数のシーンをまたいで使用したい（引き継ぎたい）GameObjectがある場合にこの関数を使うと、各シーンで同じGameObjectを設定する手間を省くことができます。

スクリプト例は以下です。

DontDestroyOnLoad(ゲームオブジェクト名);

#### FindObjectOfType

この関数はType（Compornentとほぼ同義です）を元にTypeを検索するものです。

例えばRigidbodyを持つGameObjectを検索したい場合

Rigidbody rid \= FindObjectOfType&lt;Rigidbody&gt;();

のようなスクリプトになります。

この関数は複数当てはまるオブジェクトがあっても1つだけを返すので、複数をリストで返したい場合はFindObjectsOfTypeを使います。

#### FindObjectsOfType

この関数はFindObjectOfTypeの複数バージョンです。

そのためスクリプトも複数形にするだけで使えます。

戻り値が配列になるのでご注意ください。

#### Instantiate

この関数はGameObjectのクローンを生成する関数です。

例えば、「obj」というGameObjectをクローンする場合のスクリプトは以下のように作成します。

//Instantiate(クローンの元になるオブジェクト,位置,回転）

Instantiate(obj,new Vector3( 1.0f, 0.0f, 0.0f), Quarternion.identity);

このInstantiateはPrefab化したオブジェクトを動的生成する場合に頻繁に使うのですが、その方法については詳細に説明した記事があるのでご参考ください。

## まとめ

今回の記事ではGameObjectに関してまとめてみました。

GameObjectはUnityにおける基礎となるオブジェクト（クラス）なので、本記事を参考にして、少しずつ使えるようにしていきましょう。

また、**今回は辞書的に使っていただくことを目的に作成したものですので、GameObjectでつまづいた際に参考にしていただければ幸いです**。

では、楽しいUnity開発を！

Unityに関して他にも様々な記事で解説しているので、ご興味ある方はご一読ください。
