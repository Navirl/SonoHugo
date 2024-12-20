---
tags:
  - Bar
---

date:: [2024-08-14](Daily_Note/2024-08-14.md)
up:: [Rust](../Program/Rust.md)

Electronと同様、デスクトップアプリをブラウザ技術で作る。
ElectronはChromiumを搭載しているのに比べ、こちらはWebViewというOS固有のものを使用しているので小さい。あとバックエンドがRustなので早い。

wryというライブラリが各OSのWebViewへアクセスを提供している。

## hot-reloading
live-serverをインストールし、tauri.conf.jsonのdevpathと合わせて起動。
package.jsonのscriptに`"dev": "vite && live-server public --port=1420 --no-borwser",`を仕込むと自動で起動できる。
Viteの後じゃないとviteが実行されないのか上手くいかない。

[すべてをカスタマイズせよ RustでTAURI GUIツールキットを試す(2)：ホットリロードにする](https://jnsmith.blog.fc2.com/blog-entry-188.html)
[live-server - npm](https://www.npmjs.com/package/live-server)

## `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]`
内部属性。main.rsにあるため、プロジェクト全体≒バイナリクレート全体にかかる。

デバッグアサーションが無効な際（リリースビルド）にwindows用にビルドする。つまりコンソールを表示しない。

## フロントとバックを繋ぐ
Eventを使う。

[Events | Tauri Apps](https://tauri.app/v1/guides/features/events/)

なお、reactは`@tauri-apps/api`を通してinvokeを使うことでtauri側で`#[tauri::command]`、及び`tauri::Builder::default().invoke_handler`を通し公開されているコマンドを使用することができる。

複数公開する場合は以下のようにgenerate_handlerを増やす。直接Builderを増やすと上書きしてしまう。

```rust
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_image_paths])
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
```

[Calling Rust from the frontend | Tauri Apps](https://tauri.app/v1/guides/features/command/)

## 画像を読み込む
ファイルパスがそのままだと`ERR_UNKNOWN_URL_SCHEME`で引っかかる。
なのでまず`convertFileSrc`で変更。

その後、ローカルファイルを読めるように`tauri.conf.json`でプロトコルを変更。

```json
"tauri": {
    "allowlist": {
      "protocol": {
        "asset": true,
        "assetScope": ["**"]
      }
    },
```

安全のためにCSPで自分のファイルだけ読めるように。

```json
{
  "tauri": {
    "security": {
      "csp": "default-src 'self'; img-src 'self' asset: https://asset.localhost"
    },
```

[tauriでWebViewから直接ローカルファイル読み込む](https://zenn.dev/bpk_t/scraps/4f9523470ea151)
[コンテンツセキュリティポリシー (CSP) - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)

## vscodeでフロントエンドデバッグ
デバッグで出来たexeに対してlaunch.jsonを仕掛ける。
bunに変えたりexe名を変える。9222はwindows用。
一度`bun tauri dev`などでexeを作っておかないとダメ。

[Is there a recommended way to debug a tauri application (react used as frontend) in vscode on Windows? · tauri-apps/tauri · Discussion #4210 · GitHub](https://github.com/tauri-apps/tauri/discussions/4210)