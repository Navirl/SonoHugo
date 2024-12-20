---
title: "mise"
tags:
  - Bar
---

date: 2024-12-20T14:05:38+09:00
up:: [py](../Program/Python.md)
up:: [Rust](../Program/Rust.md)
up:: [js](../Program/JavaScript%20and%20TypeScript.md)

読み方は`meez`。
`pyenv`のようなランタイムバージョン管理は他の言語にもあるのだが、それらをまとめて管理するもの。
また、ディレクトリごとの環境変数も管理できる。他にも必要ツールのインストールとか、タスクランナーとか全部これで出来る。

ちなみにrust製。

シンプル解説。
[asdf, direnvをやめてmiseに移行する](https://blog.sh1ma.dev/articles/20240108_from_asdf_to_mise)

導入。windowsならgithubから入れろとあるが、cargoで入れられるのでそっちの方が早いかも。ビルドからになるが。
[mise ではじめる開発環境構築](https://zenn.dev/takamura/articles/dev-started-with-mise)

そこまで一気にやるならdockerでいいじゃんというのはあるが、docker外で管理したいものを管理するときに使える。

今のところ(2024/10/28)windowsのサポートは最小限。


ディレクトリごと環境変数を使わず言語の管理ツールまとめとして使うくらいなら、言語ごとの最適な管理ツールを使ったほうが早い気がする。なので普段使ってない。
Windowsからだとcargoかnpmが一番早いが、結局Rustかnodejsを入れることになり、それらはScoopで入れると考えると、scoop -> rust -> cargo -> mise -> uv -> python みたいな大分長いチェーンが予想される。面倒。

powershellやgitなど、いくつかの開発ツールも管理可能。
でもツールまとめならScoopとかwingetとかあるし……開発ツールだけmiseに分けたいかと言われると。

外部ツールはasdfのものが使えるから何でもできるのだが、miseはそもそもそういうプラグインに厳格らしい。
あとURL指定より必要になった時に自動で用意するLazy Install方式が推奨。
そうでなければaqua使えというのが今（2024/12/06）のスタンス。
[mise-plugins · GitHub](https://github.com/mise-plugins/)

[aqua](aqua.md)

## plugins
開発に使えるものをpluginsとしてインストールできる。
cmakeとか。goなどのバージョン管理もpluginsとして扱う。

pluginsはインストール用とバージョン確認用のシェルスクリプトがセットになったもの。
ツールそのものではない。
(そのせいでwindowsでは上手くインストールできないんだろうなと思う)

どういうpluginsがあるかは`mise plugins ls-remote`。
既に手元にあるpluginsの確認は`mise ls`。
バージョン確認は`mise ls-remote プラグイン名`。
インストールは`mise install プラグイン名`。バージョン指定は`プラグイン名@バージョン`。指定が無いと直下の`mise.toml`が優先される。

その他、標準でリストに無いpluginsは`mise registry`で確認。
ここにも載っていないpluginsとしてasdfのpluginsも使える。

## use
ツールをインストールしmise.tomlに書き込む。
`-g`を指定するとグローバルにインストール可能。

## install
ツールをインストールし`~/.local/share/mise/installs/<PLUGIN>/<VERSION>`に入れる。
PATHを追加しないためそのままでは使えない。そうしたいならuseを使う。

## exec
ツールをコンフィグファイルに書き込むことなく実行する。