import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages は https://<user>.github.io/task-board/ で配信されるため、
  // ビルド時のみサブパスを指定する(開発サーバーは / のまま)
  base: command === 'build' ? '/task-board/' : '/',
}))
