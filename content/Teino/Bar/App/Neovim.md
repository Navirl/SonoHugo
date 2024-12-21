---
date: 2024-12-21T15:15:01+09:00
title: "Neovim"
id: Neovim
aliases: 
tags:
  - Bar
---

daily:: [2024-12-03](/Daily_Note/2024-12-03.md)
up:: [Vim](Vim.md)

[Neovim plugins](Neovim%20plugins.md)

設定は~APPDATA\Local\nvim\init.lua。
分からない場合でも`:echo stdpath('config')`で見つかる。

```lua
-- jjでインサートモードからノーマルモードに変更 
vim.api.nvim_set_keymap('i', 'jj', '<Esc>', { noremap = true, silent = true })

-- システムクリップボードを使用
vim.opt.clipboard:append({"unnamedplus"})
```
[Neovim Part1.5 \~jjとクリップボードの設定\~](https://zenn.dev/ryo1217intern/articles/38e1bab0d8b6eb)
[NeoVimでクリップボードを使う | ツイートするには長すぎる](https://blog.nfurudono.com/posts/nvim-clipboard/)

WSL越しのクリップボードだとちょっと面倒。

[WSL×NeoVim(init.lua) クリップボードにコピーできるようにする方法 #neovim - Qiita](https://qiita.com/hwatahik/items/32279372ea7182d75677)

init.vimのほかinit.luaが使えるが、これはどちらかしか使えない。
[NeovimのためのLua入門 init.lua編](https://zenn.dev/slin/articles/2020-11-03-neovim-lua2)

プラグインはたまに見直す。
[Neovimの設定を見直して起動を30倍速にした](https://zenn.dev/kawarimidoll/articles/8172a4c29a6653)

プラグインマネージャー関係
[Vimのプラグインマネージャの種類と選び方 #Vim - Qiita](https://qiita.com/nil2/items/ddcf23f1163d0abd805b)

## init.vimをinit.luaに変える
[Neovimのconfigファイルをinit.lua化したので覚書 | Atusy's blog](https://blog.atusy.net/2022/02/21/nvim-init-lua/)
[init.vimからinit.luaへの移行手順 #Vim - Qiita](https://qiita.com/reisuta/items/3d0cab193137bb32099d)

## 行番号
`vim.opt.number = true  -- 行番号を表示する`
`vim.opt.relativenumber = true  -- 相対行番号を表示する`
両方設定すると、現在行だけ絶対で残りは相対になる。
[Vim/NeoVim で行番号を表示する (set number, vim.opt.number) - まくまく Vim ノート](https://maku77.github.io/p/t8o6tum/)
[NeoVimで現在行だけ絶対行、他は相対行番号で表示する](https://zenn.dev/sisi0808/articles/ec628737c95ad3)

## tab
:tabe。新しいタブを開く。edit
:tabn。次のタブに移動。gtでもOK。next
:tabp。前のタブに移動。gTでもOK。present
:tabc。タブを閉じる。close
[Tabpage - Neovim docs](https://neovim.io/doc/user/tabpage.html)


## space leader
spaceキーをleaderという特殊な修飾キーに割り当てられる。
```lua
vim.api.nvim_set_keymap('', '<Space>', '<Nop>', { noremap = true, silent = true })
vim.g.mapleader = " "
vim.g.maplocalleader = " "
```
[Neovim 初心者向け設定ガイド #Vim - Qiita](https://qiita.com/4roro4/items/4c535300ccf210bcbcf4#leaderキー)

試に以下を入れておくと、`<leader>e` でファイルエクスプローラーが開く。
```lua
-- <leader>e でファイルエクスプローラーを開く 
vim.api.nvim_set_keymap('n', '<leader>e', ':Ex<CR>', { noremap = true, silent = true })
```

最初のは、spaceがデフォルトで一文字進む操作に入ってるのでその無効化。
leaderはグローバル、localleaderはファイルタイププラグインで使うらしい。
[Map - Neovim docs](https://neovim.io/doc/user/map.html#_1.3-mapping-and-modes)

leaderの初期位置はバックスラッシュらしい。
[【Vim/Neovimキーマップ】map/noremapやLeaderキー - フルスタックLinuxプログラミング](https://reisuta.com/map-command/)

vimだが、全選択や保存を割り当てると楽。
[\[Vim\]基本操作負担軽減のための最低限Leader設定 #Linux - Qiita](https://qiita.com/t_o_d/items/4c0a841778712e1eed4e)

## terminalモード
:terminalで起動する。:teでも可。

insertはiでいいが、normalに戻るのに`<C-\><C-n>`というコマンドが必要。Escじゃないのは`<C-c>`とぶつかるから説。
[neovimの便利設定 ターミナルモードのマッピング – MY ROBOTICS](https://sy-base.com/myrobotics/vim/neovim-settings/)

たいていはinsertから入りたいはずなので、以下の設定を追加してterminalに入った瞬間insertにするようにする。
```lua
vim.api.nvim_create_autocmd("TermOpen", {
    pattern = "*",
    command = "startinsert",
})

```
[neovimでターミナルモードから元のファイル編集画面に戻るには](https://felo.ai/search/fJDq2onj8vbLnNjmth9eV3?invite=rRKXGDWOelDkk)

元のファイルに戻るにはバッファを辿る。
:bnextで即戻れる。:bn。
:bpresent,:bp,前バッファ
:bdelete,:bd,バッファ削除

:lsか:buffers(:b)でバッファ一覧を表示し、:b 数値でも戻れる。

面倒なら事前に:vsや:splitで分割画面にする手がある。`<C-w>s`などでも分割可能。
分割後は`<C-w>h`などで選択可能。
[慣れてきた頃に知りたいVimの便利機能](https://zenn.dev/sun_asterisk/articles/6b2bf762a7e510)

## ターミナルを変更
`vim.o.shell = "C:\\Scoop\\apps\\pwsh\\current\\pwsh.exe"`を追加。
パスは`(Get-Process -Id $PID).Path`で拾える。

[WindowsのNeovimで任意のPowerShellを起動する](https://zenn.dev/seesaw_monster/articles/0f1cf8c282020a)

## 矩形選択出来ない
`<C-v>`が貼り付けになってしまう場合、`<C-q>`に代替のキーバインドがある。

[vim - How do you select a whole column in visual block mode? - Stack Overflow](https://stackoverflow.com/questions/3736678/how-do-you-select-a-whole-column-in-visual-block-mode)

## 複数の設定を使いたい
`NVIM_APPNAME`にフォルダ名を突っ込むことで、その設定ファイルを読むようになる。
linuxなら以下のコマンドでエイリアスを張ることもできる。

`alias nvim-kickstart='NVIM_APPNAME="nvim-kickstart" nvim'`

[GitHub - nvim-lua/kickstart.nvim: A launch point for your personal nvim configuration](https://github.com/nvim-lua/kickstart.nvim)
[Starting - Neovim docs](https://neovim.io/doc/user/starting.html#%24NVIM_APPNAME)