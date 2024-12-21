---
title: "Unity2Dと厚み"
date: 2024-12-21T15:14:08+09:00
tags: App/Unity
---

![](https://preview.redd.it/cvdvj1zbmo441.png?width=567&format=png&auto=webp&s=becd073c4e0705f8ecc9f0557c31fc29020c1435)
[shader or script for adding thickness to sprites? : Unity3D](https://www.reddit.com/r/Unity3D/comments/ear2v0/shader_or_script_for_adding_thickness_to_sprites/)

まさにこんな感じのことがしたい。


[【Unity】SpriteをMeshとして利用可能にする - テラシュールブログ](https://tsubakit1.hateblo.jp/entry/2018/04/18/234424)


まずは一枚絵をメッシュにしてExtrudeすればいいのだろうか。

[【Unity】Sprite を Mesh に変換する - うにてぃブログ](https://hacchi-man.hatenablog.com/entry/2021/01/24/220000)
[3Dメッシュから2Dポリゴンコライダーを生成する-UnityAnswers](https://answers.unity.com/questions/1484280/generate-2d-polygon-collider-from-3d-mesh.html)

これらは動作しなかった。

[【Unity】RangeAttributeの最小値・最大値をConstで指定する │ エクスプラボ](https://ekulabo.com/range-const)
Extrudeの程度を決めるのにこれが役立つかも。



[MurabitoB / UnitySpriteExtrudeShader：Unity標準レンダリングパイプラインシェーダー。](https://github.com/MurabitoB/UnitySpriteExtrudeShader)

色々見てたら、こういうのがあった。たぶんこれで行けるのだろうけど、当たり判定だけがうまくいかない。

[Unity - Shaderを勉強する - Qiita](https://qiita.com/ShirakawaMaru/items/5d6d8bad041c835f858a)
[\[Unity\]かっこよく沢山の円を表示するシェーダー \| notargs.com](http://wordpress.notargs.com/blog/blog/2015/02/03/unity%e3%81%8b%e3%81%a3%e3%81%93%e3%82%88%e3%81%8f%e6%b2%a2%e5%b1%b1%e3%81%ae%e5%86%86%e3%82%92%e8%a1%a8%e7%a4%ba%e3%81%99%e3%82%8b%e3%81%9f%e3%82%81%e3%81%ae%e3%82%b7%e3%82%a7%e3%83%bc%e3%83%80/)
どうもシェーダーには当たり判定がつかないらしい。
シェーダーはGPUで、当たり判定はCPU。その辺の関係？