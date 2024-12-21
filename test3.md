\--
title: "test3"
tags:
title: "test3"

title: "test3"
* Bar
title: "test3"

title: "test3"
***
title: "test3"

title: "test3"
date: 2024-12-21T15:40:41+09:00
title: "test3"
up:: [Programming](Programming.md)
title: "test3"

title: "test3"
上にYAML Front-Matterを挿入
title: "test3"

title: "test3"
しれっとHugoでは一つの改行が効かない。Notionと同じくブロック単位で管理している模様。
title: "test3"

title: "test3"
## エスケープ
title: "test3"

title: "test3"
\でエスケープできる。
title: "test3"
適宜解説で使う。
title: "test3"

title: "test3"
## 改行
title: "test3"

title: "test3"
\<br>で改行できる。
title: "test3"
後ろに二つ以上のスペースや、
title: "test3"
円記号を入れる方法なんかもある。\
title: "test3"
互換性を考えるなら\<br>かダブルスペース。
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## コメント
title: "test3"

title: "test3"
\<!--この中に書いたことはレンダリングされない。-->
title: "test3"

title: "test3"
\<!--このまま
title: "test3"
改行もできる。-->
title: "test3"

title: "test3"
\[]\(ただ上記はHTMLの記法なので、Markdownでやるならこんな感じの空リンクを作るのが一番。)
title: "test3"

title: "test3"
\[]\(
title: "test3"
無論こっちも改行可。
title: "test3"
)
title: "test3"

title: "test3"
%%obsidianなら、このようにパーセントで囲むことでエスケープできるっぽい%%
title: "test3"

title: "test3"
やっぱり独自記法だけど。
title: "test3"

title: "test3"
<ちなみに、うっかりやりやすいこととして、このカッコに英字だけ入力するとhtmlタグとして認識され、レンダリングされなくなる。>
title: "test3"

title: "test3"
\<konoyouni>
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Code - コードブロック
title: "test3"

title: "test3"
```python:test.py
title: "test3"
print("バッククォート三つで囲うことでコードブロックが作れる")
title: "test3"
print("始めのクォートの方に言語名、その後ろにコロンを挟むとファイル名が足せる")
title: "test3"
```
title: "test3"

title: "test3"
`インラインコード`もできる
title: "test3"

title: "test3"
```markdown
title: "test3"
ちなみにマークダウンも一言語なので
title: "test3"
**こういうこと**ができる。
title: "test3"
```
title: "test3"

title: "test3"
Qiitaでは`rgb(255,0,0)`とかカラーコードとかで色が出るらしい。
title: "test3"
また、mathを言語指定することでLaTeX記法の数式が書けるがObsidianは非対応。
title: "test3"
LaTeXが使いたいなら$$で囲う。
title: "test3"

title: "test3"
[LaTeX](LaTeX.md)
title: "test3"

title: "test3"
```
title: "test3"
ちなみに、行頭にタブを入れるとコードブロックになる。
title: "test3"
これはどこで使うんだ。
title: "test3"
```
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Format Text - テキストの装飾
title: "test3"

title: "test3"
### Headers - 見出し
title: "test3"

title: "test3"
```markdown
title: "test3"
# シャープと半角スペースを置くと見出しが作れる
title: "test3"
## 実用はH3まで
title: "test3"
### H3はほとんど太字と変わらない
title: "test3"
```
title: "test3"

title: "test3"
また、==や--を見出しにしたい文字の下に置くことでも作れる。
title: "test3"

title: "test3"
```markdown
title: "test3"
こんな風に。
title: "test3"
==
title: "test3"

title: "test3"
=はh1で、-はh2。
title: "test3"
--
title: "test3"

title: "test3"
記号は二つ以上必要。
title: "test3"
```
title: "test3"

title: "test3"
ちゃんと上下に空行を作ること。
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
### Emphasis - 強調
title: "test3"

title: "test3"
*アスタリスクかアンダーラインで囲って強調*
title: "test3"

title: "test3"
*ひとつだとitalicになる（Obsidianだと英文だけっぽい？）*
title: "test3"

title: "test3"
**太字はどちらも問題ない**
title: "test3"

title: "test3"
**前後空白が必要な場合もあるもよう**
title: "test3"

title: "test3"
主流はアスタリスク。
title: "test3"

title: "test3"
### Strikethrough - 打ち消し線
title: "test3"

title: "test3"
\~~波線二つで囲めば打ち消せる~~
title: "test3"

title: "test3"
### Details - 折り畳み
title: "test3"

title: "test3"
<details><summary>detailsタグで囲むことで、折り畳み文章が作れる。</summary>その中でsummaryタグに囲まれた文章は、折り畳みの要約になる。</details>
title: "test3"

title: "test3"
<details><summary>折り畳みの中では、基本的に**マークダウンが使えない。**</summary><div>
title: "test3"
```
title: "test3"
ただしdivタグと前後空白or改行で囲めば……Obsidianでは無理っぽい。残念。
title: "test3"
```
title: "test3"
</div></details>
title: "test3"

title: "test3"
また、Hugoだとこういうタグ系は **見えなくなる** 。
title: "test3"
そらそうよ、これhtmlの記法であってMarkdownじゃないもん。
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Lists - リスト
title: "test3"

title: "test3"
### Disc型
title: "test3"

title: "test3"
* 文頭にアスタリスクか
title: "test3"

title: "test3"
- プラスか
title: "test3"

title: "test3"
* マイナス、それに半角スペースを置くとDisc型リストになる
title: "test3"
  * 手前にインデントを入れるとネストできる
title: "test3"
* マイナスというかハイフン推奨。
title: "test3"

title: "test3"
### Decimal型
title: "test3"

title: "test3"
1. 数字とピリオドと半スぺでDecimal型リスト
title: "test3"
2. 1.1.1.と振り、あとから要素を挿入するときの手動振りなおしを避けるテクニックがある
title: "test3"
3. Obsidianは途中で改行を挿入しても全部数字を振りなおしてくれるので安心
title: "test3"
4. **行頭にタブがあると数字を振ってくれない**
title: "test3"

title: "test3"
### Definition型
title: "test3"

title: "test3"
用語を書き、
title: "test3"
: コロンとスペースを二行目以降に入れて定義を書くとDefinition型リスト……
title: "test3"
: なのだが、割と一部でしか対応してない。ObsidianもNotionも非対応。
title: "test3"
まあ、単純に太字にすればいいもんな。
title: "test3"

title: "test3"
```Markdown
title: "test3"
余談だけど
title: "test3"
**strong** = <strong>strong</strong>
title: "test3"
_italic_ = <em>italic</em>
title: "test3"
`code` = <code>code</code>
title: "test3"
でも
title: "test3"
[link](test) ≠ <a href="test">link</a>
title: "test3"

title: "test3"
Obsidianだと左はローカルファイルのリンクになれるが、右は必ず外部宛てのURLになる。
title: "test3"
右はhtmlだし当たり前ではある。
title: "test3"
```
title: "test3"

title: "test3"
### Checkbox型
title: "test3"

title: "test3"
* \[ ] Disc型の後ろに\[ ]を入れるとチェックボックスになる
title: "test3"
* \[x] \[x]にするとチェック入りになる、前後スペースを忘れずに
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Blockquotes - 引用
title: "test3"

title: "test3"
> 文頭に>を置くだけ。
title: "test3"
>
title: "test3"
> > 二つ書けばネスト。
title: "test3"

title: "test3"
> Obsidianだと前後空行は要らない。
title: "test3"
> **マークダウンが効く。**
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Horizontal rules - 水平線
title: "test3"

title: "test3"
***
title: "test3"

title: "test3"
***
title: "test3"

title: "test3"
***
title: "test3"

title: "test3"
アスタリスク、アンダーライン、ハイフンのいずれかを三つ並べると水平線になる。
title: "test3"
前後空行推奨。
title: "test3"

title: "test3"
<br>
title: "test3"

title: "test3"
## Links - リンク
title: "test3"

title: "test3"
`[link](URL "title")`
title: "test3"
title付きのリンクを設定できる。
title: "test3"
titleはマウスホバーで確認可。
title: "test3"
ObsidianではURL部分が<u>リンクするマークダウンファイルのタイトル</u>になる。
title: "test3"

title: "test3"
スペースがあると誤検知するので、大体はパーセントエンコーディングを挟む。これがまた忘れやすい。
title: "test3"

title: "test3"
また、頭に!をつけることで展開された状態でリンクを張れる。
title: "test3"
これを応用して画像を貼ったり別ファイルを丸々引用したりできる。
title: "test3"
更に二重化することでローカルファイルにリンクを張れるみたいだけど、それはObsidianだと正しく表記されない。
title: "test3"
[![片翼女神さま](片翼女神さま.jpg "いいね")](https://www.markdownguide.org/basic-syntax)
title: "test3"
リンクを最短にすることによってフォルダー移動したとしてもリンク維持することができる。
title: "test3"
Wikilinks使えばいいんですけど。
title: "test3"

title: "test3"
### alias
title: "test3"

title: "test3"
```markdown
title: "test3"
[this][alias]
title: "test3"
[alias][]
title: "test3"
[alias]:[URL]
title: "test3"
```
title: "test3"

title: "test3"
URLのエイリアスを設定できる。
title: "test3"
二行目はエイリアスを直接リンクとしたいときに。 <font color='#F6C0C0'>でもObsidianだと機能しない。</font>
title: "test3"

title: "test3"
Obsidianで機能させるには、<u>リンクしたいMarkdownファイル</u>のFront matterブロック（Markdownファイルの一番最初に置くハイフン三つで囲んだブロック）に
title: "test3"

title: "test3"
```markdown
title: "test3"
---
date: 2024-12-21T15:40:41+09:00
title: "test3"
aliases:[alias1, alias2]
---
```

と書く。
こうすればwikilinksで`[[alias1]]`と書こうが`[[alias2]]`と書こうが同じファイルに行きつく。
リンクされてる側から書かなきゃなんで使い勝手違うけど。

あったわ。`[[Title|URL]]`

<br>

## 注釈

これが注釈。\[^1]

\[^1]:\[^ \[^ty] key]で始めると注釈.。注釈の中身は \[^key]: を頭に付けて書く。keyは何でもいい。ただスペースやタブは不可。
\[^ty]:サーカムフレックス（英）またはアクサンシルコンフレックス（仏）。キャレット（‸）は厳密には別の記号。そっちは文字挿入に使うらしい。

<br>

## Table記法

| Left align | Right align | Center align |
|:---------- | -----------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

ハイフンと縦棒で書くやつ。コロンでalignを決める。
ふつうは入力補完を頼る。
align決めてる部分は別にハイフンの数を合わせる必要はない。見栄え。
ただし書かなくていいわけではない。
**真上に見出しなどではない文字があると無効化される。**
Hugoだと真下に文字があると無効化されるっぽい。もう上下改行すれば安定じゃないかな。

<br>

## その他

\==イコール二つで囲むことでハイライトができる。==
割と物による。

> \[!warning]
> `> [! name]`でいろいろなAnnotateが出せる。ObsidianではCall outという名前。使えるのは以下の通り。

> \[! note]

> \[! abstract]
> summary, tldr

> \[! info]
> todo

> \[! tip]
> hint, important

> \[! success]
> check, done

> \[! question]
> help, faq

> \[! warning]
> caution, attention

> \[! failure]
> fail, missing

> \[! danger]
> error

> \[! bug]

> \[! example]

> \[! quote]
> cite

## Mermaid

[Mermaid](../../Teino/Bar/Mermaid.md)

[基本構文| マークダウンガイド](https://www.markdownguide.org/basic-syntax#headings)
[拡張構文| マークダウンガイド](https://www.markdownguide.org/extended-syntax/#heading-ids)
[ObsidianMarkdownリファレンス| マークダウンガイド](https://www.markdownguide.org/tools/obsidian/)

## PDF変換

記法じゃないが、NotebookLMを使うのに欲しかったので。
Obsidianのノート全体をPDF化。

まずは一つのノートにまとめる。

```powershell
Get-ChildItem -Path "D:\Dropbox\Sonolart\Teino\Novels" -Include *.md -Recurse | Get-Content | Set-Content combinedFile.txt
```

そのあとPandocやMarpやmistuneで変換するのだが、クッソ長いのを直接やると失敗する。
なのでHTMLに変換してからブラウザ印刷機能でPDFにするのが良い。

## lint

markdownlintとremarkという二つがあるらしい。
markdownlintは使うのが簡単だが新しいルールを追加するのは難しそう。
remarkを使う。

remark-frontmatterを入れないとfrontmatterに対応できない。

remark-cliを入れないとcliから手軽に使えない。
