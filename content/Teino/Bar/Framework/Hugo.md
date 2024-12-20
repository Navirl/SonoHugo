---
tags:
  - Bar
---

date:: [2024-12-07](Daily_Note/2024-12-07.md)
up::

[Git+Hugo+Netlify](Git+Hugo+Netlify.md)
まさかの三年前からの続き。

## 特定のディレクトリのみビルド
### headless page

```yaml
---
build: 
  list: always
  publishResources: true 
  render: always
---
```

各ファイルにビルドオプションをつけられる。
ここでrender: neverを指定すればファイルはレンダーされない。

### headless section

```yaml
---
cascade:
- build:
    list: local
    publishResources: false
    render: never
title: Headless section
---
```

cascadeをつけることで、それよりも下のページに設定を渡せる。
子ページであって本体ページの設定は別にやる必要がある。

listをlocalにすると、page collectionがglobalからlocalになるらしい。page collectionはhugo側からpageを認識する単位。

publishResourceをfalseにすると、参照されないページリソースをビルドしないようになるっぽい。

[Build options | Hugo](https://gohugo.io/content-management/build-options/)


これはyamlによる方法であり、他にも
- ビルド時に`--contentDir`を指定する
- config.tomlで除外ディレクトリを指定する
などがある。永続ならconfig.tomlが早そう。


## セクションページ
hugoはディレクトリごとにセクションというコンテンツ管理の単位を作る。
セクションには_index.mdを置くことでセクションページ、つまりセクションの見出しを作ることができる。

見出しがある以外はディレクトリと大して変わらない。

セクションページはセクションのリストページのため、リストテンプレートが適用される。
セクション内やsection以下、default以下などからリストテンプレートは検索される。

リストページはこの他、タグやカテゴリなどのタクソノミーに自動生成されるものがある。

[hugoのセクションページという概念について基礎から詳しく解説してください。](https://felo.ai/search/apxgf89KZK6Qt8YwjL6BQw?invite=rRKXGDWOelDkk)

## page collection
hugoでページをまとめて扱うための概念。
動的ページ生成などが可能。近いのはobsidianのdataviewか。
関数でページの塊が取得できるのも同様。

フィルタリング、並べ替え、単一ページの複数ページ分割などが可能。
日付による記事一覧やサイトマップに。

## ファイル名とurl
urlはファイル名と関係なく自由に変更可能。
エイリアスや日付によってセクション変更も可能。

[URL management | Hugo](https://gohugo.io/content-management/urls/#permalinks)

## 設定
直下にhugo.yamlを置く。
tomlやjsonも可能。

設定をディレクトリで分けたり結合して読んだりできる。

レスポンスコードによってファイルも指定可能。
つまり404ページが作れる。

[Configure Hugo | Hugo](https://gohugo.io/getting-started/configuration/#configure-page)

## 改行できない
hugoはgoldmarkをパーサーとして使用している。
goldmarkのレンダラー設定をhugo.yamlから弄ればOK。
```yaml
markup:
  goldmark:
    renderer:
      hardWraps: tru
```

[Configure markup | Hugo](https://gohugo.io/getting-started/configuration-markup/)
[HugoのMarkdownでGitHub的改行をしたい #Hugo - Qiita](https://qiita.com/sijiaoh/items/3dcbbed720a2fc668ca8)

## contentディレクトリの変更
一応できるが、postsフォルダの変更が見つからない。

[【HUGO】content フォルダを変更する方法【contentDir, config.toml】 | シラベルノート](https://srbrnote.work/archives/6635)

## 要約が長い
CJKに対応させる。
```yaml
hasCJKLanguage: true
```
[Configure Hugo | Hugo](https://gohugo.io/getting-started/configuration/#hascjklanguage)

## ファイル名をタイトルに
テンプレートの問題。
テーマのテンプレートを書き換える。

```yaml
{{ if .Title }}
    <h1>{{ .Title }}</h1>
{{ else }}
    <h1>{{ .File.BaseFileName }}</h1>
{{ end }}
```

## submoduleの削除
```powershell
git submodule deinit -f 追加したサブモジュール
git rm -f 追加したサブモジュール
rm -rf .git/modules/追加したサブモジュール 
```

[\[git\] submoduleの削除、再追加について #Git - Qiita](https://qiita.com/k_yamashita/items/040c04f8798d2384806e)

deinitとgit rmを使用する。
