---
tags:
  - Info
---

date:: [2024-07-13](/Daily_Note/2024-07-13.md)
up:: [ts](../Bar/Program/JavaScript%20and%20TypeScript.md)

[ジャンプTOON Flutter アプリの全体像 | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/48761/)

# SDK・ツール管理
- SDKバージョン管理（複数開発言語の一括管理、pyenvとnvmなど同時に使える）
    - [GitHub - asdf-vm/asdf: Extendable version manager with support for Ruby, Node.js, Elixir, Erlang & more](https://github.com/asdf-vm/asdf)
        - Shell製
    - [GitHub - jdx/mise: dev tools, env vars, task runner](https://github.com/jdx/mise)
        - Rust製
- パッケージマネージャ
    - [GitHub - oven-sh/bun: Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one](https://github.com/oven-sh/bun)
        - npmより早い、Runnerとしても使える
        - Zigというデータ指向言語で出来ている
            - [Zig言語のドキュメントを見て「なるほど!」と思ったところ](https://zenn.dev/tetsu_koba/articles/032d3a2f675f50)
            - Post C（Rust is post C++）
- 依存関係更新
    - [GitHub - renovatebot/renovate: Home of the Renovate CLI: Cross-platform Dependency Automation by Mend.io](https://github.com/renovatebot/renovate)
        - Golang、Java、Pythonなどサポート
        - Dockerもいける、GoogleのビルダーBazelもいける
- コミットメッセージリント
    - [GitHub - conventional-changelog/commitlint: 📓 Lint commit messages](https://github.com/conventional-changelog/commitlint)
- git hook管理
    - [GitHub - evilmartians/lefthook: Fast and powerful Git hooks manager for any type of projects.](https://github.com/evilmartians/lefthook)
- Visual Regression Test
    - UIを画像で保存し、画像差分を取るフロントエンドテストツール
        - [2023年にVisual Regression Testingを始めるならどんな選択肢があるか](https://zenn.dev/loglass/articles/visual-regression-testing-comparison)
            - Playwrightにもちょっとついてる
    - [GitHub - reg-viz/reg-suit: :recycle: Visual Regression Testing tool](https://github.com/reg-viz/reg-suit)
- テンプレート生成
    - [GitHub - scaffdog/scaffdog: :dog: scaffdog is Markdown driven scaffolding tool.](https://github.com/scaffdog/scaffdog)
        - マークダウンファイルからテンプレが作れる
- 資格情報(Credential)のコミットを防ぐ
    - [GitHub - secretlint/secretlint: Pluggable linting tool to prevent committing credential.](https://github.com/secretlint/secretlint)
    - jsonで設定可能
- SVGの最適化
    - 素のSVGはデフォルト値やコメントやメタデータがあるので、それを消すツール
    - [GitHub - svg/svgo: ⚙️ Node.js tool for optimizing SVG files](https://github.com/svg/svgo)

# プロジェクト管理・タスクランナー
- Dartはライブラリのかたまりで出来た環境のことをパッケージと呼ぶっぽい？
- [invertase/melos](https://melos.invertase.dev/~melos-latest)
    - 複数のDartパッケージを一括管理
    - パッケージに対するタスクのRunnerにもなる
- [GitHub - yonaskolb/XcodeGen: A Swift command line tool for generating your Xcode project](https://github.com/yonaskolb/XcodeGen)
    - iOSプロジェクトのネイティブファイルをYAML管理

# CI・CD
- GitHub Actionsで使える機能
    - [About rulesets - GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
        - リポジトリでプッシュやブランチやタグにかけられる制限
    - [Reusing workflows - GitHub Docs](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
        - ワークフローを関数のように呼び出せる
    - [GitHub - github/command: IssueOps commands in GitHub Actions](https://github.com/github/command)
        - IssueやPRからCIを呼べる
        - `issue_comment:`を追加
        - [Branch Deploy Action: GitHub Actions でブランチデプロイと IssueOps を試す - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2023/07/18/192109)
        - [Branch Deployments With IssueOps and GitHub Actions | by Grant Birkinbine | Better Programming](https://betterprogramming.pub/branch-deployments-with-issueops-and-github-actions-d9405311ad8b)

