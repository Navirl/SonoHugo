---
title: "Unity2Dでの当たり判定付きベジェ曲線"
date: 2024-12-20T14:04:10+09:00
tags: 
 - App
 - Unity
---

[UCSheet](CS_and_SR/Unity%20Cheat%20Sheet.md)
最終的にできたけど、そこまでの流れも含めて。

## 曲がった直方体を当たり判定付きで簡単につく

### 1
**れない。** 少なくとも今はできそうにない。
頂点シェーダで変形させたとしても、自動的にコライダーをつけてくれるわけもなく。
おとなしく円を並べましょう。

[Unity2Dと厚み](Unity2Dと厚み.md)
[C# - \[Unity\] 頂点シェーダーで変形させたメッシュにコライダーを適用するには｜teratail](https://teratail.com/questions/126236)
だったら自動的にコライダー用のメッシュを生成すればいいだろ、と思った。もうめんどいからやんねーけど！
[Unity3D　動的にメッシュコリダー生成して囲み判定 - もりもりゲーム制作ブログ](https://meganeunity.hateblo.jp/entry/2018/12/04/223951)  
[Unity 動的にメッシュを作成する　～まずは四角形だ編～ - おねむゲーマーの備忘録](https://sleepygamersmemo.blogspot.com/2017/04/unity-mesh-square.html)


### 2
研究が進み、ベジェ曲線から生成したLineRendererからBakeMesh、MeshFilterに入れてPolygonColliderで判定をつけていく方法に落ち着いた。途中、BakeMashで作ったメッシュをMeshFilterに入れてMeshColliderなんかもやったけど、2Dだと判定にならない。

#### ベジェ
神アセット。ベジェ曲線が書ける。
[Bezier Curve Editor \| ツール \| Unity Asset Store](https://assetstore.unity.com/packages/tools/bezier-curve-editor-11278?locale=ja-JP)
ただしそれをLineRendererに渡せないと意味がないので、BezierCurve.csに以下のプロパティを追加した。

```csharp
	private List<Vector3> _pot;
    public List<Vector3> pot
    {
        get
        {
            _pot = new List<Vector3>();
            if (points.Length > 1)
            {
                for (int i = 0; i < points.Length - 1; i++)
                {
                    int limit = resolution + 1;
                    float _res = resolution;
                    Vector3 lastPoint = points[i].position;
                    _pot.Add(lastPoint);
                    Vector3 currentPoint = Vector3.zero;

                    for (int j = 1; j < limit; j++)
                    {
                        currentPoint = GetPoint(points[i], points[i + 1], j / _res);
                        _pot.Add(currentPoint);
                        lastPoint = currentPoint;
                    }
                }
            }
            return _pot;
        }
    }
```

これを要求するたびに、補完ポイントも含めた全てのポイントを取得できる。  UnityFunctionsのOnDrawGizmos、PublicStaticFuctionsのDrawCurveを合体させたもの。

#### 3Dから正確に
ツールからPolygonColliderを生成するやつ。
1. リアルタイムで判定を作ってほしかったので、SetPolygonCollider3D.UpdatePolygonCollidersがスクリプトから実行できるよう修正。該当メソッドをpublicに。
2. EditorSceneManagerとEditorUtility（Editor外では実行できないクラス）をコメントに。
3. デバッグログを消す。
4. UnityEditor関連を消す。
5. transformを引数から渡すように
[3Dメッシュから2Dポリゴンコライダーを生成する-UnityAnswers](https://answers.unity.com/questions/1484280/generate-2d-polygon-collider-from-3d-mesh.html) 

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//using UnityEditor;
using System;
//using UnityEditor.SceneManagement;
using System.Linq;


public static class SetPolygonCollider3D
{
    //[MenuItem("Tools/Update Polygon Colliders %t", false, -1)]
    public static void UpdatePolygonColliders(Transform transform)
    {
        // Transform transform = Selection.activeTransform;
        // if (transform == null)
        // {
        //     Debug.LogWarning("No valid GameObject selected!");
        //     return;
        // }

        //EditorSceneManager.MarkSceneDirty(transform.gameObject.scene);

        MeshFilter[] meshFilters = transform.GetComponentsInChildren<MeshFilter>();

        foreach (MeshFilter meshFilter in meshFilters)
        {
            if (meshFilter.GetComponent<PolygonCollider2D>() != null)
            {
                UpdatePolygonCollider2D(meshFilter);
            }
        }
    }

    static void UpdatePolygonCollider2D(MeshFilter meshFilter)
    {
        if (meshFilter.sharedMesh == null)
        {
            Debug.LogWarning(meshFilter.gameObject.name + " has no Mesh set on its MeshFilter component!");
            return;
        }

        PolygonCollider2D polygonCollider2D = meshFilter.GetComponent<PolygonCollider2D>();
        polygonCollider2D.pathCount = 1;

        List<Vector3> vertices = new List<Vector3>();
        meshFilter.sharedMesh.GetVertices(vertices);

        var boundaryPath = EdgeHelpers.GetEdges(meshFilter.sharedMesh.triangles).FindBoundary().SortEdges();

        Vector3[] yourVectors = new Vector3[boundaryPath.Count];
        for (int i = 0; i < boundaryPath.Count; i++)
        {
            yourVectors[i] = vertices[boundaryPath[i].v1];
        }
        List<Vector2> newColliderVertices = new List<Vector2>();

        for (int i = 0; i < yourVectors.Length; i++)
        {
            newColliderVertices.Add(new Vector2(yourVectors[i].x, yourVectors[i].y));
        }

        Vector2[] newPoints = newColliderVertices.Distinct().ToArray();

        //EditorUtility.SetDirty(polygonCollider2D);

        polygonCollider2D.SetPath(0, newPoints);
        //Debug.Log(meshFilter.gameObject.name + " PolygonCollider2D updated.");
    }
}

public static class EdgeHelpers
{
    public struct Edge
    {
        public int v1;
        public int v2;
        public int triangleIndex;
        public Edge(int aV1, int aV2, int aIndex)
        {
            v1 = aV1;
            v2 = aV2;
            triangleIndex = aIndex;
        }
    }

    public static List<Edge> GetEdges(int[] aIndices)
    {
        List<Edge> result = new List<Edge>();
        for (int i = 0; i < aIndices.Length; i += 3)
        {
            int v1 = aIndices[i];
            int v2 = aIndices[i + 1];
            int v3 = aIndices[i + 2];
            result.Add(new Edge(v1, v2, i));
            result.Add(new Edge(v2, v3, i));
            result.Add(new Edge(v3, v1, i));
        }
        return result;
    }

    public static List<Edge> FindBoundary(this List<Edge> aEdges)
    {
        List<Edge> result = new List<Edge>(aEdges);
        for (int i = result.Count - 1; i > 0; i--)
        {
            for (int n = i - 1; n >= 0; n--)
            {
                if (result[i].v1 == result[n].v2 && result[i].v2 == result[n].v1)
                {
                    // shared edge so remove both
                    result.RemoveAt(i);
                    result.RemoveAt(n);
                    i--;
                    break;
                }
            }
        }
        return result;
    }
    public static List<Edge> SortEdges(this List<Edge> aEdges)
    {
        List<Edge> result = new List<Edge>(aEdges);
        for (int i = 0; i < result.Count - 2; i++)
        {
            Edge E = result[i];
            for (int n = i + 1; n < result.Count; n++)
            {
                Edge a = result[n];
                if (E.v2 == a.v1)
                {
                    // in this case they are already in order so just continoue with the next one
                    if (n == i + 1)
                        break;
                    // if we found a match, swap them with the next one after "i"
                    result[n] = result[i + 1];
                    result[i + 1] = a;
                    break;
                }
            }
        }
        return result;
    }
}
```

MeshFilterのリファレンス。meshはインスタンスがない状態だと**自動的に新たなメッシュを作る**ので、基本的にsharedMeshしか使わない。
[UnityEngine.MeshFilter - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/MeshFilter.html)
[\[Unity\] Mesh動的生成 （mesh、sharedMeshの違い）, (subMeshを利用した複数Materialのアタッチ) - Qiita](https://qiita.com/keito_takaishi/items/8e56d5117ee90502e864#meshfilter%E5%86%85%E3%81%AEmesh-sharedmesh%E3%81%AE%E9%81%95%E3%81%84)

**……これめちゃくちゃ重いじゃねーか！**
どうしようか。

#### 外積使って線部分だけ
LineRenderer→PolygonCollider2Dのクリティカル。**だがこれだと端っこが丸いLineに対応できない。** bezierPointsとwireWidthの定義がないのと、PolygonColliderの指定がないので、それだけ追加する。ついでに1から始めてindexがはみ出ないように。
上のプロパティからとれる数値はVector3だが、Vector2に代入しても暗黙的に変換してくれる。ただしリストのままだと変換してくれないのでForEach。
[衝突検出-どのタイプのコライダーをLineRendererに追加する必要がありますか？ -ゲーム開発スタック交換](https://gamedev.stackexchange.com/questions/126245/what-type-of-collider-should-i-add-to-a-linerenderer)　

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class N2 : MonoBehaviour
{
    LineRenderer lr;
    BezierCurve bc;
    float wireWidth;
    List<Vector2> bezierPoints;
    List<Vector2> temp;
    PolygonCollider2D pCol;
    // Start is called before the first frame update
    void Start()
    {
        lr = gameObject.GetComponent<LineRenderer>();
        bc = GameObject.FindWithTag("Bezier").GetComponent<BezierCurve>();
        pCol = gameObject.GetComponent<PolygonCollider2D>();
        bezierPoints = new List<Vector2>();
    }

    // Update is called once per frame
    void Update()
    {

        wireWidth = lr.startWidth;
        bezierPoints.Clear();
        bc.pot.ForEach(v => bezierPoints.Add(v));

        //コライダ用のVector2ポイント
        List<Vector2> edgePoints = new List<Vector2>();

        //ベジェ曲線のポイント分繰り返す
        for (int j = 0; j < bezierPoints.Count; j++)
        {
            //ポイントごとの距離、その距離と前方ベクトルに直交するベクトルの計算
            Vector2 distanceBetweenPoints = bezierPoints[j] - bezierPoints[j + 1];
            Vector3 crossProduct = Vector3.Cross(distanceBetweenPoints, Vector3.forward);

            //両側に伸ばす
            Vector2 up = (wireWidth / 2) * new Vector2(crossProduct.normalized.x, crossProduct.normalized.y) + bezierPoints[j];
            Vector2 down = -(wireWidth / 2) * new Vector2(crossProduct.normalized.x, crossProduct.normalized.y) + bezierPoints[j];

            //先頭にdown、末尾にupを追加
            edgePoints.Insert(0, down);
            edgePoints.Add(up);

            //最後のポイントだけ計算を変更
            if (j == bezierPoints.Count - 1)
            {
                // Compute the values for the last point on the Bezier curve
                up = (wireWidth / 2) * new Vector2(crossProduct.normalized.x, crossProduct.normalized.y) + bezierPoints[j + 1];
                down = -(wireWidth / 2) * new Vector2(crossProduct.normalized.x, crossProduct.normalized.y) + bezierPoints[j + 1];

                edgePoints.Insert(0, down);
                edgePoints.Add(up);
            }
        }

        //コライダポイントを代入
        pCol.points = edgePoints.ToArray();
    }
}

```

ここまでやったのにな。

#### 他
線のエッジコライダーを生成するやつ。面で欲しかったので没。
[LineRendererにコライダーを持たせる：Unity2D](https://www.reddit.com/r/Unity2D/comments/be33u6/making_a_linerenderer_have_a_collider/)

BakeMeshからMeshColliderするやつ。3Dならこれかも。
[ラインレンダラーのコライダー？ --Unity Answers](https://answers.unity.com/questions/470943/collider-for-line-renderer.html)
[Unity - Mesh(Collider)とPolygon(Collider)の変換・互換｜teratail](https://teratail.com/questions/280932)
[Unity-スクリプトAPI：LineRenderer.BakeMesh](https://docs.unity3d.com/ScriptReference/LineRenderer.BakeMesh.html)

## 結果
結局、[ベジェ](#ベジェ)の各ポイントを前述のアセットで読みだした後、[外積使って線部分だけ](#外積使って線部分だけ)で妥協した。それにしても詰まりまくったけど。

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class VoiceCtrl : MonoBehaviour
{
    static Transform _VOICEBULLET_ANCHOR;
    static Transform VOICEBULLET_ANCHOR
    {
        get
        {
            if (_VOICEBULLET_ANCHOR == null)
            {
                GameObject go = new GameObject("VOICEBULLET_ANCHOR");
                _VOICEBULLET_ANCHOR = go.transform;
            }
            return _VOICEBULLET_ANCHOR;
        }
    }
    BezierCurve bc;

    private FacePartsBaseScript faceScript;
    public Vector3 force;
    const int pointCount = 2;

    Vector3 firstLocalPos;
    Vector3 firstHandle;
    Vector3 secondLocalPos;
    Vector3 secondHandle;

    Vector3 firstVec;
    Vector3 firstHandleVec;
    Vector3 secondVec;
    Vector3 secondHandleVec;

    public float speed = 0.01f;
    public float curvature = 0.005f;

    void Start()
    {
        bc = gameObject.GetComponent<BezierCurve>();
        for (int i = 0; i < pointCount; i++)
        {
            bc.AddPointAt(Vector3.zero);
            //bc[i] = gameObject.AddComponent<Rigidbody2D>();
        }
        transform.SetParent(VOICEBULLET_ANCHOR);

        //force = new Vector3(-2, 3, 0).normalized * BossData.bossData.mouthAttackSpeed;
        firstLocalPos = BossDeepData.GetBDpData.bRigid.transform.position;
        secondLocalPos = BossDeepData.GetBDpData.bRigid.transform.position;
        // firstHandle = BossDeepData.GetBDpData.bRigid.transform.position;
        // secondHandle = BossDeepData.GetBDpData.bRigid.transform.position;
        firstVec = Quaternion.AngleAxis(45.0f, Vector3.forward) * force;
        secondVec = Quaternion.AngleAxis(-45.0f, Vector3.forward) * force;
        firstHandleVec = Vector3.Cross(Vector3.forward, firstVec).normalized * BossData.bossData.mouthAttackCurve;
        secondHandleVec = Vector3.Cross(Vector3.forward, secondVec).normalized * BossData.bossData.mouthAttackCurve;
    }

    void Update()
    {
        vecBezier();
        //moveBezier();
    }

    void vecBezier()
    {
        firstLocalPos += firstVec;
        secondLocalPos += secondVec;
        firstHandle += firstHandleVec;
        secondHandle += secondHandleVec;
        bc[0].localPosition = firstLocalPos;
        bc[0].handle1 = firstHandle;
        bc[1].localPosition = secondLocalPos;
        bc[1].handle1 = secondHandle;
    }

    void moveBezier()
    {
        firstLocalPos.x += speed;
        secondLocalPos.y += speed;
        firstHandle.y += curvature;
        secondHandle.x += curvature;
        bc[0].localPosition = firstLocalPos;
        bc[0].handle2 = firstHandle;
        bc[1].localPosition = secondLocalPos;
        bc[1].handle1 = secondHandle;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.transform != BossDeepData.GetBDpData.toPossessParts)
        {
            if (other.gameObject.GetComponent<FacePartsBaseScript>())
            {
                faceScript = other.gameObject.GetComponent<FacePartsBaseScript>();
                faceScript.TakeDamage(BossData.bossData.mouthAttackPower);
                Destroy(this.gameObject);
            }
        }
    }
}

```

ポイントを動かすと、必然的にハンドルもついてくるので、**ハンドルの位置を直接代入したりする必要は全くない。** ここに気づかなかった……っていうかアセットで手間取ってんじゃねぇ。



なお、ここまでのことは**全てレビューですでに出てることだったりする。**
……ちゃんとレビューは読もう！


## Ex
ベジェ曲線はVector Graphicsとかでも書けるかも。
こっちは一応更新してるので、使うなら。

ただしPackageManagerから直接入れることはできない。
入れるなら直接名前をgitパッケージとして読み込む。

[VectorGraphicsで作るエモい表現（完全版） \| Unity Learning Materials](https://learning.unity3d.jp/2642/)