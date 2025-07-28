import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path"
const repoName = 'classic-ui'

export default defineConfig({
    base: `/${repoName}/`,
    plugins: [tailwindcss()],
    build: {
        outDir: 'dist/',
        rollupOptions: {
            input: [
                resolve(__dirname, 'src/main.js'),
                resolve(__dirname, 'src/shiki.js')
            ]
        }
    },
})
