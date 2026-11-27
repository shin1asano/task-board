# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

**task-board** — ブラウザだけで動くシンプルなタスク管理アプリ。

主な機能:
- テキスト入力でタスクを追加
- チェックボックスで完了・未完了を切り替え(完了済みはグレー+取り消し線で表示)
- タスクの削除
- タスクは localStorage に保存され、リロードしても残る

## 技術スタック

| 分類 | 採用技術 | 備考 |
|---|---|---|
| UI ライブラリ | React 19 | 関数コンポーネント + Hooks(`useState` / `useEffect`)のみ。クラスコンポーネントは使わない |
| 言語 | JavaScript(JSX) | TypeScript は未導入 |
| ビルドツール | Vite 8(`@vitejs/plugin-react`) | ES Modules(`"type": "module"`) |
| スタイル | 素の CSS | コンポーネントと同名の `.css` を import。CSS フレームワーク・CSS-in-JS は未使用 |
| 状態管理 | React の state のみ | Redux 等の外部ライブラリは未使用 |
| データ保存 | localStorage | キー `task-board:tasks` にタスク配列を JSON で保存 |
| Lint | oxlint | 設定は `.oxlintrc.json` |
| パッケージマネージャ | npm | `package-lock.json` をコミットする |
| CI / ホスティング | GitHub Actions + GitHub Pages | Node.js 24 でビルド |

タスクのデータ形式:
```js
{ id: string /* crypto.randomUUID() */, title: string, done: boolean }
```

新しいライブラリを追加する場合は、事前にユーザーに確認すること。

## 開発コマンド

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動
npm run lint     # Lint
npm run build    # ビルド(dist/ に出力)
npm run preview  # ビルド結果の確認
```

テストは未導入。プッシュ前に最低限 `npm run lint` と `npm run build` を通すこと。

## デプロイ先

https://shin1asano.github.io/task-board/

- GitHub Pages で公開(リポジトリ: https://github.com/shin1asano/task-board)
- `main` へのプッシュで `.github/workflows/deploy.yml` が lint → build → Pages デプロイを自動実行する
- `vite.config.js` の `base` はビルド時のみ `/task-board/`。リポジトリ名を変えたらここも変える

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

### リモート

- `origin`: https://github.com/shin1asano/task-board.git
- `main` へプッシュすると GitHub Pages へ自動デプロイされる点に注意する

## コーディング規約

### コンポーネントの命名規約

| 対象 | 規約 | 例 |
|---|---|---|
| コンポーネント名 | PascalCase、名詞で役割を表す | `App`, `TaskList`, `TaskItem`, `AddTaskForm` |
| コンポーネントのファイル | コンポーネント名と同じ PascalCase + `.jsx` | `App.jsx`, `TaskItem.jsx` |
| コンポーネント用 CSS | コンポーネントと同名の `.css` を同じ場所に置く | `App.jsx` ↔ `App.css` |
| 配置場所 | ルートの `App` は `src/` 直下、それ以外は `src/components/` | `src/components/TaskItem.jsx` |
| エクスポート | 1 ファイル 1 コンポーネント、`function` 宣言 + `export default` | `function TaskItem() {…}` / `export default TaskItem` |
| イベント処理関数 | camelCase の「動詞 + 名詞」 | `addTask`, `toggleTask`, `deleteTask` |
| イベント用 props | `on` + 動詞(PascalCase) | `onToggle`, `onDelete`, `onAdd` |
| state | 名詞、更新関数は `set` + 名詞 | `[tasks, setTasks]`, `[text, setText]` |
| 真偽値 | 状態を表す形容詞・過去分詞 | `done` |

### その他の命名

| 対象 | 規約 | 例 |
|---|---|---|
| 変数・関数 | camelCase | `remaining`, `loadTasks` |
| モジュール定数 | UPPER_SNAKE_CASE | `STORAGE_KEY` |
| CSS クラス | kebab-case。状態は別クラスで付与する | `task-list`, `add-form`, `task done` |
| localStorage キー | `task-board:<名前>` | `task-board:tasks` |

### 書き方

- インデントはスペース 2 つ、文字列はシングルクォート、セミコロンなし(既存コードに合わせる)
- state の更新は直接変更せず、新しい配列・オブジェクトを作る(`map` / `filter` / スプレッド構文)
- ユーザーに見える文言は日本語で書く。アイコンだけのボタンなどには `aria-label` を付ける
- コメントは日本語で、「なぜそうしているか」を書く
