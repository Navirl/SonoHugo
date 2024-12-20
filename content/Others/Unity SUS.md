---
date: 2021-08-28 16:28:19
tags: 
 - App
 - Unity
---

## sprite animation
アニメーションさせたい画像を横に並べた物を用意。
1. sprte modeをmultipleにし、apply
2. sprite Editorからsliceを選び、typeから好きなサイズを選択してスライス

あとはその画像をHierarchyに放り込む


次にAnimationウィンドウを開き、Createする。
先ほどスライスした画像をそこにD&Dすれば、キーとして読み込める。

完成したら忘れずにプレハブに。

## Tile Palette
タイルを塗るようにステージが作れる。

## ScriptableObject
別オブジェクトにステータスを分けられる。
[ScriptableObject](Others/ScriptableObject.md)を継承したclass内に変数だけセットして、`[CreateAssetMenu(menuName = "任意の場所")]`というAttributeをclassに付けるだけ。
読む側はSerializeFieldでコンポーネントと同じように読む。

