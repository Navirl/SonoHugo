---
date: 2021-08-06 13:55:57
tags: 
 - App
 - Unity
---

チャレンジ2 - ヒントとコツ
解像度は1920x1080に固定されていることを忘れないでください。
個々のクラスを比較的小さくし、画面の折り返し動作など複数の異なるオブジェクトで動作するコードを
個々のクラスを比較的小さくし、複数の異なるオブジェクトで動作するコード（画面の折り返し動作など）を、すべての異なるオブジェクトにアタッチできる単一のコンポーネントスクリプトにすることを考えます。
● 個々のクラスを比較的小さくし、画面の折り返し動作など、複数の異なるオブジェクトで動作するコードを、それらすべての異なるオブジェクトにアタッチできる単一のコンポーネントスクリプトにすることを考えます。
UnityEngineのアトリビュート（[RequireComponent()]、[Header()]、[ToolTip()]など）が非常に役に立ちます。
は非常に役に立ちます。これらは、Unity Scripting Reference -  - で見つけることができます。
https://docs.unity3d.com/2017.4/Documentation/ScriptReference/ - 左側のUnityの下にある目次を見てください。
Unity Scripting Reference -  - 左側の目次「UnityEngine」→「Attributes」で確認できます。
画面の折り返しについては、画面上の領域をトリガーColliderで表現し、GameObjectが出てきたときに折り返すようにします。
画面の回り込みは、画面上の領域をトリガーColliderで表現し、GameObjectがそのトリガーを抜けたときに回り込みます。
他の課題と同様に、これが正しいという方法はありません。他の課題と同様に、これが正しい方法というのはありません。ただ、私たちは
テストに出てくるような素材を最近使ったことがあるかどうかを確認しています。