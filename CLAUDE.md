# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

**task-board** — タスク管理ボードアプリケーション。

<!-- TODO: 目的・主な機能・対象ユーザーを追記 -->

## 技術スタック

- React 19(JavaScript / JSX)
- Vite 8
- Lint: oxlint
- パッケージマネージャ: npm
- データ保存: なし(タスクはメモリ上の state のみ。リロードで消える)

## 開発コマンド

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動
npm run lint     # Lint
npm run build    # ビルド(dist/ に出力)
npm run preview  # ビルド結果の確認
```

テストは未導入。プッシュ前に最低限 `npm run lint` と `npm run build` を通すこと。

## ディレクトリ構成

```
index.html       エントリ HTML
src/main.jsx     React のマウント
src/App.jsx      タスクボード本体(追加・完了切替・削除)
src/App.css      ボードのスタイル(完了タスクのグレー表示を含む)
src/index.css    全体の基本スタイル
public/          静的ファイル(favicon)
```

## Git 運用ルール

### 基本方針: 変更のたびに GitHub へプッシュする

コードを変更したら、**その都度コミットして GitHub(`origin`)へプッシュすること**。変更をローカルに溜め込まない。

作業の流れ:

1. 変更を加える
2. テスト・Lint が用意されていれば実行し、通ることを確認する(失敗したままプッシュしない)
3. 変更内容を確認する: `git status` / `git diff`
4. 関連するファイルだけをステージする(`git add -A` で無関係なファイルを巻き込まない)
5. コミットする
6. プッシュする: `git push`(初回は `git push -u origin <ブランチ名>`)
7. プッシュが成功したことを確認し、ユーザーに報告する

### コミットメッセージ

- 1 行目に変更内容を簡潔に書く(日本語可、50 文字程度まで)
- 必要に応じて 2 行目を空けて詳細を書く
- 1 コミット = 1 つの意味のある変更 を目安にする

例:
```
タスクのドラッグ&ドロップ並び替えを追加

- カラム間の移動に対応
- 並び順を保存するように変更
```

### ブランチ

- `main` は常に動作する状態を保つ
- 大きな機能追加や実験的な変更はブランチを切って作業する(例: `feature/xxx`, `fix/xxx`)
- ブランチで作業した場合も、変更のたびにそのブランチをプッシュする

### 禁止事項

- `git push --force` は使わない(どうしても必要な場合はユーザーに確認する)
- 秘密情報(`.env`、API キー、認証情報、`.claude/settings.local.json` など)をコミットしない。`.gitignore` に登録しておく
- テストやビルドが壊れた状態でプッシュしない

### 初期セットアップ(未実施の場合)

```bash
git init
git branch -M main
git remote add origin https://github.com/<ユーザー名>/task-board.git
git push -u origin main
```

## コーディング規約

<!-- TODO: 命名規則・フォーマッタ設定などを追記 -->
