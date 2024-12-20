---
title: "Docker"
tags:
 - Bar
 - App
---

date: 2024-12-20T14:04:30+09:00
up::

## docker run
コンテナを起動させるコマンド。
--rmと-itを忘れずに。結構なフラグがexecと共有。

`--rm`
コンテナを停止したときに消去できる。

`-it`
`--interactive`と`--tty`を同時に指定している。
これをつけるとwindowsのターミナルから直接コンテナ内のCLIにアクセスできる。

`-d`
バックグラウンドで起動する。非対話型モードというらしい。

`--privileged`
ちょっとよくわかんないです。
でもこれが無いとvpngate-with-proxyが動かない。

`-p`
ホストポートをコンテナポートにマッピングする。順序大事。マッピング的にはコンテナをホストに繋げてるが、コマンド的には`-p [host port]:[container port]`なので。
サーバーマシンを作るなら必須。

`--add-host`
適当なホスト名をipアドレスにマッピングする。

`-u`
特定のユーザーでログインする。

`--gpus`
GPUをコンテナに使わせる。
allをくっつけて全部使わせるのがいつもの。



## docker-compose
複数のDockerイメージを組み合わせたイメージを作る際に使うコマンド。
docker-compose.ymlが必要。

`build`
イメージだけ作る。

`up`
イメージを作ると同時にコンテナも作る。
キャッシュが無い場合は`--build`が要る。

`--no-cache`
キャッシュを無視して実行する。
普通にやるとキャッシュを使用してしまい、Dockerfileの変更を受け付けないことがある。
そんなときのオプション。

`down`
コンテナの停止と削除をしてくれる。

今はdocker composeとして分離されたらしい。

## docker exec
コンテナにジョブを渡すときに使うコマンド。
`docker exec -it コンテナ名 /bin/bash` でwindowsターミナルをコンテナに接続できる。
二窓したいときに。

## docker start
コンテナを開始するコマンド。
`-a`で標準出力とエラー出力を、`-i`で標準入力を繋いでbashのように扱える。
なので`-ai`でいい。runの`-it`と同じ。

## docker restart
コンテナ再起動。

## docker commit
コンテナに加えた変更を反映したイメージファイルが作れる。
`docker commit コンテナid 新イメージ名:タグ`

## docker system df
Docker imageなどが占める容量を一括表示する。

## docker builder prune
Dockerのキャッシュ全消去するコマンド。
キャッシュはDockerfileからimage作ったりするとすぐ溜まる。

## volumesとbind mount
ファイル共有するためのやつ。
volumesはdockerで特定の場所を作り、そこでだけファイルを共有する。docker側でいじれる。
bind mountはホスト側の特定フォルダを指定してコンテナにバインドする。
どちらもrunコマンドでコンテナ作成時に追加しないといけない。既にコンテナにしちゃってたら`docker commit container imagename:latest`で作る。

volumesを使うなら、事前に`docker volume create ボリューム名`でボリュームを作る必要がある。
その後`docker run -d --mount source=myvol,target=/app [image]`として起動時にマウントする。,の前後は空けないこと。

bind mountの場合は`docker run -d --mount type=bind,source=/path/on/host,target=/path/in/container [image]`などとして直接マウント。
`-v`フラグだと短く書ける。`docker run -d -v /path/on/host:/path/in/container [image]`

["なんとなく”Dockerのファイル共有について語れるようになる - Qiita](https://qiita.com/kobori_akira/items/73488918d6fb2a1ae020)

--mountと-vはほぼ同じだが、-vは存在しないディレクトリを指定すると自動で作ってくれる。--mountは作らない。

-dはバックグラウンドで動かすフラグ。detached mode。

[Bind mounts](https://docs.docker.com/storage/bind-mounts/)

なお、普通にファイルを外に出したいだけならdocker cpコマンドで出せる。`docker cp localpath container:containerpath`。ディレクトリもこれで。

## rm -rf /var/lib/apt/lists/*
dockerコマンドじゃないけど。
拾った更新情報を消す奴。これを行うとimageが軽くなり、次からもう一度`apt update`が必要になる。

## host.docker.internal
コマンドじゃないけど。
**コンテナ内からホストマシン**のアクセスに使うカスタムホスト名。ホストマシンで`http://127.0.0.1:7860`にサイトを公開してたりすると、コンテナからは`http://host.docker.internal:7860`にアクセスすると読める。

## Optimize-VHD
PowerShellのコマンドレット。仮想ディスクを最適化するために使用されます。このコマンドの引数にWSL2のext4.vhdxを指定すると、ディスクが最適化され、ディスクイメージのうち使われていない部分の領域を切り詰めてくれます

例えば、次のようなコマンドを実行することができます: `Optimize-VHD -Path .\\ext4.vhdx -Mode full`

[Docker(Windows) - 肥大化した ext4.vhdx の容量を減らす](https://www.curict.com/item/f4/f46da60.html)