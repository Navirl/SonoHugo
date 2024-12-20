---
tags:
 - Bar
 - App
---

date:: [2022-07-01](../../Daily_Note/2022-07-01.md)

## ObsidianPlugin一言紹介
[ObsidianPlugin一言紹介](../../Info/ObsidianPlugin一言紹介.md)

細かな記法はヘルプを読むのが一番早い。

## Front Matter
ファイルのメタデータをくっつけられる機能。YAMLで書かれていることが多い。
Obsidianでは主にタグとエイリアスのために使用される。\[,\]どころか,だけで区切っても機能するが、まあそれはObsidianだからなので。
なお、YAML制約上**リンクは入らない**。リンクが使いたいなら下にもう一つMatterをつけることが推奨されている。

[Allow links in YAML front matter; Notion-like databases from metadata; links as first-class citizens - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/allow-links-in-yaml-front-matter-notion-like-databases-from-metadata-links-as-first-class-citizens/10052/31)

### tags
tagもしくはtagsで、\#(タグ名) と同じようにタグがつけられる。\#タグとは違うのでサジェストは出ない。欲しいなら\#打って\#消せ。

ちなみに、そのまま\#タグを使っても問題なく機能する。
ただそれを許すのはObsidianだからなので、移植性を考えるとちょっと。

内部的には1つでも、途中が大文字でもTagsとして認識する。
ただ見栄えのためにTemplateではtagsにしてる。

### Aliases
aliasもしくはaliases。ファイルの別名をつけ、リンクするときに別名でもサジェスト出るようにする機能。内部的にはAliases。
**Front Matterでしか定義できない。**

## Nested Tag
\#tag/tag とすると、タグがネストになる。
検索のときもそれぞれヒットする。

## 拡張Template機能
Templaterという拡張機能がある。
Templateにファイル名やフォルダ名を含むことが出来る。

[SilentVoid13/Templater: A template plugin for obsidian](https://github.com/SilentVoid13/Templater)
[File Module \| Templater](https://silentvoid13.github.io/Templater/docs/internal-variables-functions/internal-modules/file-module/)

### タグをフロントマタータグに変換
[Gather up tags and format for YAML frontmatter · Discussion #140 · SilentVoid13/Templater](https://github.com/SilentVoid13/Templater/discussions/140)

Templaterからこのファイル二つを順番通り呼び出せばいい。

## LF will be replaced by CRLF in
なんか開いてて、gitがアクセスできないファイルとかあると一緒に表示されるかもしれないエラー。
パワポを閉じろ。

## 同期
[Obsidian 同期](../../Info/Obsidian%20同期.md)

## Nested Vault
ネストすると下位からリンクを張れなくなるので、新たな発想は生まれにくい。でも今だってそんなにリンク活用してるか？

軽くなるのは確実に利点。

## Search
マイナス検索可能。

[Obsidianで特定のフォルダのみ検索結果から除外する – ごりゅご.com](https://goryugo.com/20201207/obsidian-path-search/)

## iOS shortcuts連携
[iOS Shortcuts - Share your ideas! - #32 by cutting_shapes - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/ios-shortcuts-share-your-ideas/15149/32)
[Fetching Title#p34m](https://www.reddit.com/r/ObsidianMD/comments/owfz60/2_ios_shortcuts_for_obsidian_mobile/)

隠しフォルダを覗けるのは便利。
[Obsidian mobile使いに便利なショートカット｜しおん｜note](https://note.com/shion_medical/n/nfec27558f47a)

## Obsidian 高速化
Templaterを使ってプラグインを遅延ロードする。
[Improve Obsidian Startup Time on Older Devices with the FastStart Script | by TfTHacker | Medium](https://tfthacker.medium.com/improve-obsidian-startup-time-on-older-devices-with-the-faststart-script-70a6c590309f)

## Obsidian Sandbox
helpから出せる気になるプラグインなんかを気軽に試せる場所。

## CallOut進化系
＞で出している引用に、[!Caution]などを付けるとAnnotationプラグインの様なCalloutが出せる。
V0.14.0から。

## ローカルファイル考察
プラグインで直接file://を使ってローカルファイルを開こうとすると、ブラウザの制限で止められるっぽい。
ObsidianのURIで開けるのは当然Obsidianで管理されてるファイルのみなので、これも使えない。
理想はObsidianにローカルファイルを表示させて表示だけプラグインで取ること。

## プラグイン攻略
[Ob Plugin Note](../../Info/Ob%20Plugin%20Note.md)

## developer mode
Ctrl+Shift+i