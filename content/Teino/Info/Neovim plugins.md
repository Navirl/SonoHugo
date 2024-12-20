---
title: "Neovim plugins"
id: Neovim plugins
aliases: []
tags:
  - Info
---

date: 2024-12-20T14:07:25+09:00
up:: [Neovim](../Bar/App/Neovim.md)


## lazy.nvim
init.luaに記述、/lua/config/lazy.luaに設定。
/lua/pluginsに個々の.luaファイルを配置し、内部に以下のようにgithubリポジトリ名を配置する。
```lua
return {
  "folke/lazy.nvim"
}
```
github以外だとURLを直接書けばいい。

initで起動時のスクリプトを設定できる。以下のようにするとキーバインドなども自由に起動可能。
```lua
return {
  "folke/lazy.nvim",
  init = function()
    -- 自由記述
  end,
}
```

configでプラグインごとの設定。同じくfunction()を書くことになる。
正直役割はほぼ同じだが、configはスクリプトが読み込まれた後に動く。
[What is the difference between setting keymaps inside the the \`init\` vs \`config\` table option in Lazy.nvim plugin spec? : r/neovim](https://www.reddit.com/r/neovim/comments/17f9pqi/what_is_the_difference_between_setting_keymaps/?felosearch_translate=1)


/lua/plugins.luaにまとめて書く方法もある。
[📂 Structuring Your Plugins | lazy.nvim](https://lazy.folke.io/usage/structuring)

[lazyvim のプラグインイン管理](https://zenn.dev/vim_jp/articles/31e60fbf12712b)
[使い込んで厳選したNeovimプラグインたちをご紹介します](https://zenn.dev/lighttiger2505/articles/6ff89ea53a10ac#自動補完(auto-compelte))


### プラグイン遅延読み込み
ファイルタイプ、コマンド、キー入力のタイミングで遅延して読み込みできる。
[lazyvimの遅延読み込み (lazyvim load lazy plugin)](https://zenn.dev/vim_jp/articles/609c75cea1208a)

それらのどのタイミングで読み込むかを決めるのがevent。

lazy.nvimの場合は`lazy = true`を設定しておけばとりあえず開幕読み込みは防げる。

遅延読み込みのコマンドは大文字始まりのみ。存在しないコマンドでもOK。



### プラグイン削除
:LazyからCleanを選択、カーソル合わせてx。
ファイルは残るので:!rmなどで消しておく。
[🚀 Usage | lazy.nvim](https://lazy.folke.io/usage)

## nvim-surround
[GitHub - kylechui/nvim-surround: Add/change/delete surrounding delimiter pairs with ease. Written with in Lua.](https://github.com/kylechui/nvim-surround)

選択文字列の囲み文字についてadd / delete / changeを行える。


## nvim-cmp
[GitHub - hrsh7th/nvim-cmp: A completion plugin for neovim coded in Lua.](https://github.com/hrsh7th/nvim-cmp)
補完。プラグイン式。補完する対象ごとに設定が必要。

## nvim-treesitter
[GitHub - nvim-treesitter/nvim-treesitter: Nvim Treesitter configurations and abstraction layer](https://github.com/nvim-treesitter/nvim-treesitter)
基本的な強調表示。
:TSInstallでモジュールをインストールしたうえで直接編集か:TSEnableで有効化しないと意味が無い。

## telescope.nvim
[GitHub - nvim-telescope/telescope.nvim: Find, Filter, Preview, Pick. All lua, all the time.](https://github.com/nvim-telescope/telescope.nvim)
あいまい検索。live_grep機能はripgrepに依存しているので別途インストール。

### ripgrep
全文検索。ありとあらゆるファイルのテキストを検索する。

## [formatter.nvim](https://github.com/mhartington/formatter.nvim)
フォーマッタ。
[nvim-cmp](#nvim-cmp)と同じくプラグイン式。ファイルタイプごとに設定が必要。

## [lexima.vim](https://github.com/cohama/lexima.vim)
かっこ補完。

## **[obsidian.nvim](https://github.com/epwalsh/obsidian.nvim)**
obsidianで出来るような操作を行う。
followlinkでリンクを開いたり、デイリーノート開いたり。

起動前にワークスペースの設定、文章の隠し度合の設定(live editorの程度)が必要。
ワークスペースはいつも通りだが、隠し度合は以下の設定をconfigなどに書く必要がある。
`vim.opt_local.conceallevel = 1`
[Additional markdown syntax not rendering · Issue #286 · epwalsh/obsidian.nvim · GitHub](https://github.com/epwalsh/obsidian.nvim/issues/286)

init.luaにて`require("config.obsidian")`などを書き込めばいい。この時ファイル名にコンマがあると正常に読まない。素直に名前変えろ。

## [plenary.nvim](https://github.com/nvim-lua/plenary.nvim)
非同期処理などを行う。
開発用の依存プラグイン。telescope.nvimなどが採用している。

## [everforest](https://github.com/sainnhe/everforest)
スキン。
lazy.nvimで使用する際はconfig\lazy.lua内の設定をちゃんと変更する。

## [spzenhan.vim](https://github.com/kaz399/spzenhan.vim)
normalモードの時だけIMEをオフにする。
設定を読み込めなかったので没。spzenhanへパスを通すのも面倒。

## [im-select.nvim](https://github.com/keaising/im-select.nvim)
normalモードの時だけ **英語キーボードに切り替える**。
記号関係でめんどくなる。
一応対策っぽいのはあるが、これはssh越しで設定する時っぽい？
[Neovimオススメ設定② 日本語入力を快適にするim-select.nvimのすすめ](https://www.runfunrun.dev/posts/nvim-japanese)

## **[spzenhan-lua](https://github.com/norikatsu/spzenhan-lua)**
spzenhanのlua版。
合ってるはずなのに動かないしエラーも出さない。

## **[jasegment.vim](https://github.com/deton/jasegment.vim)**
日本語の文節でW,E,Bを制御。
ちゃんと動く。

## **[vim-kensaku](https://github.com/lambdalisue/vim-kensaku)**
ローマ字で検索できる。
単体では動かないので別のプラグインが必要。Denoも必要。

## **[vim-kensaku-search](https://github.com/lambdalisue/vim-kensaku-search)**
ローマ字でスラッシュ検索で検索できる。
リマップが要るので以下を使う。

```lua
vim.keymap.set('c', '<CR>', '<Plug>(kensaku-search-replace)', { noremap = true, silent = true })
```

なんかすぐに検索してくれない、一文字追加したりしないと動かない。

## [vim-kensaku-command](https://github.com/lambdalisue/vim-kensaku-command)
:Kensakuで検索する。
手軽で普通に使える。

## [nvim-autopairs](https://github.com/windwp/nvim-autopairs)
かっこ補完。

## **[neo-tree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)**
ファイルブラウザ。:neotreeで動く。

## **[vimdoc-ja](https://github.com/vim-jp/vimdoc-ja)**
helpの日本語化。
地味に重い(300msくらい)ので遅延読み込み推奨。
以下は設定例。`:Hja`を実行するとヘルプが日本語化する。
```lua
return{
	'vim-jp/vimdoc-ja',
	cmd = {"Hja"},
	lazy = true,
	init = function()
		vim.cmd('helptags ALL')
		vim.opt.helplang = 'ja,en'
	end,
} 
```

## [win-ime-con.nvim](https://github.com/pepo-le/win-ime-con.nvim)
モード変更時にIMEを切替。
pipからneovimを入れる必要があるのだが、うちの設定だとuvの関係上仮想環境を作らないとpipが使えない。
どっかにデフォルト仮想環境を作ることになりそうだが、そこにneovimを入れたりというのはまあめんどいなって。