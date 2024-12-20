---
title: "AI_text"
tags:
  - Bar
aliases:
  - AIt
---

date: 2024-12-20T14:04:28+09:00
up:: [AI_local](AI_local.md)
up:: [AI_online](AI_online.md)

## local

### Instructモデル
以下のURL先のようにチャットに適したモデル。

[Chat Templates](https://huggingface.co/docs/transformers/main/en/chat_templating)

## online
### perplexity
検索サービスの先駆け。
ファイルを添付して調べられるのが強み。あとアプリがある。
文字がたくさん入る。
https://www.perplexity.ai

### Genspark
ウェブページにまとめてくれる。内容指定してウェブページ作成も可能。
ファクトチェックもできる。つよい。
ただしファクトチェックは事実一つずつかつクローズな問い（y/n）じゃないとちゃんと動かない。
https://www.genspark.ai

### Consensus
研究特化。流石に新しすぎる論文(2024, 2024/09/29)とかには言及してくれない。
[Consensus: AI-powered Academic Search Engine](https://consensus.app)

### Felo
マインドマップを作ってくれる。
スライドも作れる。

[Felo - 無料のAI検索エンジン](https://felo.ai/ja/search)
ぱぷれに似すぎだが、日本製らしい。
[日本発のAI検索エンジン「Felo」を使ってみたので、Feloの使い方とマインドマップ機能の活用方法を語ってみる｜斉藤 智彦(Tomohiko Saitoh)](https://note.com/saitohtm/n/n38a64fc01e96)

有能だが、文字数がぱぷれに劣る。
ファクトチェックなどはPerplexityで。

### Napkin AI
指定した画像を生成する。
PNGやSVGを出力できるのが強み。

パワポに合わせて出力するのが主目的？
[App - Napkin AI](https://app.napkin.ai/)

### v0
next.jsのvercelが贈る、UIプロトタイピングAI。
コードに詳しいわけではないので、細かい修正を頼んでも直さない。UIの機能は思いつくけどどんな見た目にするんだ、みたいなときに使う。

あくまで見た目だけ、なのでこれを元にFigmaで詰めるみたいな使い方が主流。

[v0 by Vercel](https://v0.dev/)

### bolt.new
フルスタックプログラムAI。
v0はフロントエンド限定だが、これはバックエンドも含めて作る。

[bolt.new](https://bolt.new)

### Replit Agent
boltと同じタイプ
[Replit Docs](https://docs.replit.com/replitai/agent)

### LibrAI
ファクトチェック。
米国をメインにしてるっぽい。日本の話にはちょっと弱い。

[LibrAI](https://aip.librai.tech/app/fact-check/new)

ローカルバージョンがある。
[GitHub - Libr-AI/OpenFactVerification: Loki: Open-source solution designed to automate the process of verifying factuality](https://github.com/Libr-AI/OpenFactVerification)
### tl;dv

会議の文字起こしとか共有とか行う。

[tl;dv - app](https://tldv.io/app/meetings)

### Gladia
文字起こし特化。
[Gladia](https://app.gladia.io)

### 天秤AI
ChatGPT、Gemini、Claudeの3つの出力を比較できる。その出力をまとめてより考えさせる壁打ち機能も搭載。
なぜかOpusや1.5 Proなども無料で使える。

[比較検索なら 天秤AI byGMO │ ChatGPT Claude Gemini等最新AIチャットボットが無料で試せる！](https://tenbin.ai/workspace)

### Gamma
スライドを制作する。
クレジットの回復方法は紹介とプランしかない。Freeで使い続けることは出来ない。
実力は割とある。コード投げ込むだけで大枠を捉えられる。

[AIを使ったプレゼンテーションとスライドデッキ｜Gamma (ガンマ)](https://gamma.app/ja)

### irusiru
日本人向けスライド制作。
真面目に文章を送ろうとすると1600文字しかない。

出力にPDF・PPTX形式があったり、自社テンプレートを使用できるのが強み。
Freeだと3個までしかドキュメントは作れない。

[Irusiru](https://app.irusiru.jp)

### Simplified
書く、動画作る、デザインするなど全て一つでこなす。

[Simplified: An Easy to Use All-In-One App For Modern Marketing Teams](https://simplified.com)

### ChatGPT
回答速度がいい。
コードも割とできる。
ちゃんとウェブ検索もしてくれる。必要だったら。

### Claude
人間っぽさが強み。
コードにも強いが、最近はChatGPTが追い上げてるかも。

### Gemini
分析に強いらしい。
APIがほぼタダ。

### PLaMO
日本のAI。
https://plamo.preferredai.jp/

### minimax
cohereのようなマルチAIプラットフォーム。
中国系。
https://www.minimaxi.com/en

### Markdown AI
マークダウンを書いてシンプルに公開する。
特徴はGPT-4oなどのモデルにアクセスできるテキストボックスを設置できること。
[MarkdownAI β](https://mdown.ai/file)
[生成AIを使いこなす！初心者向け導入手順とプロンプト作成のポイント(完全無料のMarkdown AI) #MarkdownAI - Qiita](https://qiita.com/waka_m/items/c43a04739a6f5fdf139c)

AIへの指示は、7Rというのがいいらしい。（2024/11/16）
[【ChatGPT】野口竜司氏提示、7Rプロンプト #ChatGPT - Qiita](https://qiita.com/kabumira/items/77bcfeac699673d99c09)

| 英単語             | 和単語    |
| --------------- | ------ |
| Request         | 依頼     |
| Role            | 役割     |
| Regulation      | 形式     |
| Rule            | ルール    |
| Review & Refine | 評価・改善  |
| Reference       | 参照知識・例 |
| Run Scenario    | 実行シナリオ |


### groq
現在（2024/08/02）無料で使えるLLMAPI。
GPT-4相当とされているllama-3 405bを使えるはずだがレートリミットが激しい。

[GroqCloud](https://console.groq.com/settings/limit
