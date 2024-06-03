import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: ['./test-setup.ts'],
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/index.tsx'],
      thresholds: {
        lines: 70,
        branches: 70,
        statements: 70,
        functions: 70,
      }
    }
  },
})
