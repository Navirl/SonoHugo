---
title: "Notion to Obsidian 2021-03-22"
date: 2024-12-21T15:13:07+09:00
---
#Public/Post


[Zettelkasten/2021-03-07](Zettelkasten/2021-03-07.md)

- python版は半角スペースさえ直せばURLが効く
	- ただしcsvは死んでる
- js版は論外
- ts版はcsvが完璧
	- しかし画像を別フォルダに分けられてしまうしURLが短縮＆無意味化される

csvをフォルダ構造保って分離→元のにpython+markdownlinks化 or URLデコード、csvにts→結合、という流れで行ける可能性。


という前提の下、流れをまとめる。
## 1. Robocopy
まずはPowershellのRobocopyでフォルダ構造を保ってcsvファイルを分離する。
cp試したけどうまくいかんかった。
```powershell
robocopy Notionフォルダ 適当に作った一時フォルダ /e *.csv
```
`/e`
サブフォルダの構造を保ってコピーする。
たぶん`/s`でも行けるけど一応。

[Robocopyでよく使用するオプションについてまとめてみた | ITStudy](https://it-study.info/robocopy/)

## 2. python版を一部修正して使用
次にpython版の修正にかかる。
必要なのはURLをデコードするための`urllib.parse.unquote`というもの。

なのでN2module.mdの二か所を修正。
```python
from io import TextIOWrapper
from os import path
from re import compile, search
from csv import DictReader
from pathlib import Path
import urllib.parse				#<-ここ
```

```python
def N2Omd(mdFile):
    # Local Dependancies: convertInternalLink(), convertBlankLink()
  
    newLines = []
	
	・
	・
	・
	
	        attachment = regex20.sub(" ",attachment)
            attachment = regexSlash.sub("/",attachment).strip()
            attachment = urllib.parse.unquote(attachment)			#<-ここ　248行目くらい
			# Reconstruct Links as embedded links
            embededLink = "![["+attachment+"]] "
```

N2Omd関数では、変換対象のマークダウンファイルのリストをforで回している。それが入る変数がattachment。
なのでそれがwikilink化される直前にURLデコード処理を挟む。

修正を終えたら起動。ちゃんと`python3 N2Omd.py` としてシェルから起動しないと即終了する。
また、こちらは解凍前のzipファイルに作用するのでちょっと注意。

## 3. TypeScript版を使用
こっちはNode.jsをインストールし、シェルから`npm i`と`npm run start`するだけ。
ちゃんと **Robocopyで振り分けたcsvファイルが入っている一時フォルダ** を指定すること。

## 4. zipを解凍して成形
2.で作ったzipファイルを解凍する。あとは一時フォルダをここに上書きコピペすればいいのだが、その前に解凍したフォルダからcsvファイルを消しておく。
TypeScript版はcsvを消してマークダウンだけにしてくれるが、python版はcsvを残してしまうためである。

```powershell
rm 2.で解凍したフォルダ -include *.csv -Recurse -Force
```
-includeで指定し、-Recurceでサブフォルダも検索し、-Forceで存在しないファイルを無視する。
-Forceは別に要らないかもしれない。

## 5. 上書きコピペしてObsidianで開く
うまくいっているか確認する。
