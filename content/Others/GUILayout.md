---
title: "GUILayout"
date: 2024-12-20T14:03:39+09:00
tags:
 - App/Unity
---

### GUILayout.BeginHorizontal()
コントロールグループを作るメソッド。
引数には形状などをセットできる。
こいつから`GUILayout.EndHorizontal`までをグループ化する。


[GUILayout-BeginHorizontal - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/GUILayout.BeginHorizontal.html)

### GUILayout.Label()
プレイヤーが触れない物体を生成するメソッド。
画像もテキストも表示できる。

[UnityのGUIでラベルを表示させる方法【初心者向け】 \| TechAcademyマガジン](https://techacademy.jp/magazine/4301)

### GUILayout.TextField()
ユーザーが編集できるテキストエリアを生成するメソッド。
第一引数には文字入力を受け取る変数を設定できる。**この変数と同じ変数にGUILayout.TextFieldを代入することが推奨されている。** じゃないとどんどん入力できないっぽい？
第二関数にはGUILayout.Widthを指定することで横の長さを変えられる。


[GUILayout-TextField - Unity スクリプトリファレンス](https://docs.unity3d.com/ja/current/ScriptReference/GUILayout.TextField.html)

### GUILayout.Button()
ボタンを生成するメソッド。
第一引数には文字列を、第二関数にはGUILayout.Widthを指定することで横の長さを変えられる。

