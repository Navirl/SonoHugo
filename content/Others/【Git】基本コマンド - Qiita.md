---
title: "【Git】基本コマンド - Qiita"
date: 2024-12-20T14:04:13+09:00
tags:
 - Article
 - App/Git
source: https://qiita.com/konweb/items/621722f67fdd8f86a017
---

## [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E5%9F%BA%E6%9C%AC%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)基本コマンド

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AE%E4%BD%9C%E6%88%90)ローカルリポジトリの作成

初期化して、現在あるファイルを追加して、コミットすればOK

ファイルがなければ`git init`のみでOK

```
git init
git add *
git commit -m "initial commit"
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%8B%E3%82%89%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E3%82%B3%E3%83%94%E3%83%BC)リモートリポジトリからプロジェクトをコピー

ターミナルでローカルリポジトリに移動して以下のコマンド

```
cd [ローカルリポジトリのパス]
git clone [リモートリポジトリパス] (例： https://github.com/jquery/jquery.git)
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E6%9B%B4%E6%96%B0%E3%81%BE%E3%81%A7%E3%81%AE%E5%9F%BA%E6%9C%AC%E6%89%8B%E9%A0%86)ファイル更新までの基本手順

ざっくりは以下の様な流れ

-   ファイルを追加
  
-   ファイルをコミット
  
-   ファイルを更新

```
git add [ファイル名] //追加
git commit -a -m "任意のコメント"  //コミット (-aオプションは変更を自動検出してくれる)
git push origin master  //masterを更新
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#git-add%E3%81%AE%E4%BD%BF%E7%94%A8%E4%BE%8B)git addの使用例

```
git add . //すべてのファイル・ディレクトリ
git add *.css //すべてのCSSファイル
git add -n //追加されるファイルを調べる
git add -u //変更されたファイルを追加する
git rm --cached //addしてしまったファイルを除外
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#git-commit%E3%81%AE%E4%BD%BF%E7%94%A8%E4%BE%8B)git commitの使用例

```
git commit -a //変更のあったファイルすべて
git commit --amend //直前のコミットを取り消す
git commit -v //変更点を表示してコミット
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E5%8F%96%E3%82%8A%E6%B6%88%E3%81%97)コミットの取り消し

```
git reset --soft HEAD~2 // 最新のコミットから2件分をワークディレクトリの内容を保持し取り消す
git reset --hard HEAD~2 // 最新のコミットから2件分のワークディレクトリの内容とコミットを取り消す
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%81%AE%E4%BF%AE%E6%AD%A3)コミットメッセージの修正

```
git rebase -i HEAD~2 // HEADから2件のコミットメッセージ
```

上記のコマンドを実行するとVimが起動し、最新から過去2件のコミットが表示されます。
※ Vimのコマンドはこちらを参考に → [Vimコマンドまとめ](http://qiita.com/merrill/items/9c800030333ab4c9408f)

```
pick {commit_id} {commit_meessage} // 2件目
pick {commit_id} {commit_meessage} // 1件目(最新コミット)
```

`pick`の部分を`edit`もしくは`e`に変更後ファイルを保存し、
修正が完了したら`--amend`オプションを付けてコミットする。

最後に下記のコマンドを実行し完了。

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%81%AE%E4%BD%9C%E6%88%90%E7%A7%BB%E5%8B%95%E5%89%8A%E9%99%A4%E5%A4%89%E6%9B%B4%E4%B8%80%E8%A6%A7)ブランチの作成/移動/削除/変更/一覧/

ブランチは変更履歴を記録できる。

```
git branch [branch_name]  //ブランチの作成
git checkout [branch_name]  //ブランチの移動
git branch -d [branch_name]  //ブランチの削除
git branch -m [branch_name]  //現在のブランチ名の変更
git branch // ローカルブランチの一覧
git branch -a //リモートとローカルのブランチの一覧
git branch -r //リモートブランチの一覧
git checkout -b branch_name origin/branch_name //リモートブランチへチェックアウト
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E7%B7%A8%E9%9B%86%E3%82%92%E3%83%9E%E3%83%BC%E3%82%B8)編集をマージ

master以外のブランチで編集した箇所をmasterに反映させる

```
git checkout [branch_name]  //ブランチに移動
git commit -a -m "コメント"  //変更ファイルをコミット

git checkout master  //masterに移動
git merge [branch_name]  //差分をマージ
git push origin master  //ファイルの更新
```

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%9E%E3%83%BC%E3%82%B8%E3%82%92%E5%8F%96%E3%82%8A%E6%B6%88%E3%81%99)マージを取り消す

コンフリクトが発生して一旦戻したい場合

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E5%B7%AE%E5%88%86%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)差分を確認する

```
git diff
git diff HEAD^ //最後のコミットからの差分を表示
git diff --name-only HEAD^ //差分ファイルを表示
git diff file1.txt file2.txt //特定フィイルの差分
git diff commit1 commit2 //コミットの差分
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%AD%E3%82%B0%E3%81%AE%E8%A1%A8%E7%A4%BA)ログの表示

```
git log //コミットのログが見れる
git reflog //いろいろ見れる
git reflog origin/branch_name //pushのログが見れる
```

ログには色々なオプションがあるけど、おすすめは以下のコマンド。

```
git log --graph --name-status --pretty=format:"%C(red)%h %C(green)%an %Creset%s %C(yellow)%d%Creset"
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E5%90%8D%E5%89%8D%E5%A4%89%E6%9B%B4)ファイルの名前変更

```
git mv [変更前のファイル名] [変更後のファイル名]
git commit -a -m "rename"
git push origin master
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E7%89%B9%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E7%89%B9%E5%AE%9A%E3%81%AE%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AB%E6%88%BB%E3%81%99)特定ファイルを特定のコミットに戻す

特定のコミットに戻してmasterに反映したい場合は以下のコマンドで。

```
git checkout [commit_id] [file_name]  //特定ファイルの指定
git commit -a -m "return" //戻した内容をコミット
git push origin master //変更をプッシュ
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E4%BB%8A%E3%82%84%E3%81%A3%E3%81%A6%E3%82%8B%E4%BD%9C%E6%A5%AD%E3%82%92%E4%B8%80%E6%99%82%E9%80%80%E9%81%BF%E3%81%99%E3%82%8B)今やってる作業を一時退避する

```
git stash
git stash pop //戻す場合
git stash list //退避の一覧
git stash clear //退避の消去
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%BF%E3%82%B0)タグ

```
git tag // タグの一覧表示
git tag -l 'v1.*' // パターンでタグを検索
git tag -a v0.0.0 -m 'version 0.0.0' // タグの作成
git push origin v0.0.0 // タグの共有
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E5%89%8A%E9%99%A4)ファイルの削除

```
git rm [name]  //特定のファイルorディレクトリの削除
git rm *  //全ファイルorディレクトリ
git commit -a -m "remove"  //削除をコミット
chgit push origin master  //削除を反映
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#add%E3%81%AE%E5%8F%96%E3%82%8A%E6%B6%88%E3%81%97)addの取り消し

間違えて`git add`してしまった場合は`reset`でキャンセルできる。

```
git reset HEAD
git reset HEAD {file_name}
```

___

## [](https://qiita.com/konweb/items/621722f67fdd8f86a017#tips)Tips

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%B3%E3%83%B3%E3%83%95%E3%83%AA%E3%82%AF%E3%83%88%E3%81%AE%E8%A7%A3%E6%B6%88)コンフリクトの解消

#### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E6%89%8B%E5%8B%95%E3%81%A7%E8%A7%A3%E6%B1%BA%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)手動で解決する場合

コンフリクトを解消しファイルを保存後、下記のコマンドを実行

```
git add {file_name}
git commit {file_name} -m "コミットメッセージ"
```

#### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E8%87%AA%E5%8B%95%E3%81%A7%E8%A7%A3%E6%B1%BA%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)自動で解決する場合

現在のブランチを正とする

```
git checkout --ours {fime_name}
```

マージで指定したブランチを正とする

```
git checkout --theirs {fime_name}
```

また、mergetoolを使って解決することもできます。
[Gitコンフリクト解消ガイド（git mergetoolの使い方） - Qiita](https://www.google.co.jp/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjdhfzf7PHKAhXMEpQKHbYpAtAQFggcMAA&url=http%3A%2F%2Fqiita.com%2Fyuya_presto%2Fitems%2F5d99499cf96c0ebb09f8&usg=AFQjCNFOOaTItltq5Fx2nFJDvodk3aAkvw&sig2=tCg4ZXi3CVjmUG_Pf42LOA)

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E5%9C%A7%E7%B8%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BD%9C%E6%88%90)圧縮ファイルの作成

詳しくは → [gitで差分ファイルを抽出する](http://qiita.com/kaminaly/items/28f9cb4e680deb700833)

#### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E7%8F%BE%E5%9C%A8%E3%81%AE%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AEzip%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90)現在のリポジトリのzipファイルを作成

```
git archive --format=zip HEAD -o ./hoge.zip
```

#### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E9%96%93%E3%81%AE%E5%B7%AE%E5%88%86%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B)コミット間の差分を取得する

1つ前のコミットから差分を取得し、hoge.zipを作成する例

```
git archive --format=zip --prefix=root/ HEAD `git diff --diff-filter=D --name-only HEAD HEAD^` -o hoge.zip
```

特定のコミット間の差分

```
git archive --format=zip --prefix=root/ HEAD `git diff [old commit ID] [new commit ID] --name-only | git checkout-index --prefix=./diff_ --stdin` -o hoge.zip
```

なんかうまくいかない場合は、`zip`コマンドを試してみる。

```
 zip -r archive.zip `git diff --name-only HEAD [old commit ID]`
```

#### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%82%BF%E3%82%B0%E9%96%93%E3%81%AE%E5%B7%AE%E5%88%86%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B)タグ間の差分を取得する

v1.0とv2.0間を差分ファイルを取得し、hoge.zipを作成する例

```
git archive --format=zip --prefix=root/ v2.0 `git diff --name-only v1.0 v2.0` -o ./hoge.zip
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E7%84%A1%E8%A6%96%E3%81%99%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E6%8C%87%E5%AE%9A%E6%96%B9%E6%B3%95)無視するファイルの指定方法

.gitignoreファイルを使用する

```
#Directory
node_modules/
styleguide/

#一致するファイルすべて
*.txt

#aaa.cacheは除く
*.cache
!aaa.cache

```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#git%E7%AE%A1%E7%90%86%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E3%81%82%E3%81%88%E3%81%A6%E7%84%A1%E8%A6%96%E3%81%99%E3%82%8B)git管理しているファイルをあえて無視する

```
git update-index --skip-worktree [ファイル名]
```

取り消す場合

```
git update-index --no-skip-worktree [ファイル名]
```

詳しくは→ [既に git 管理しているファイルをあえて無視したい](http://qiita.com/usamik26/items/56d0d3ba7a1300625f92)

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#gitignore%E3%81%AB%E8%A8%98%E8%BF%B0%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E7%AE%A1%E7%90%86%E5%AF%BE%E8%B1%A1%E3%81%8B%E3%82%89%E5%A4%96%E3%81%99).gitignoreに記述されているファイルを管理対象から外す

```
git rm --cached `git ls-files --full-name -i --exclude-from=.gitignore`
```

___

### [](https://qiita.com/konweb/items/621722f67fdd8f86a017#%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AE%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%92%E6%88%BB%E3%81%99)リモートリポジトリのコミットバージョンを戻す

念の為バックアップを作成

```
git push origin master:master_bk
```

一つ前に戻す場合

```
git push -f origin HEAD^:master
```

特定のコミットバージョンに戻す場合

```
git push -f origin ハッシュ値:master
```

バックアップを削除

```
git push origin :master_bk
```