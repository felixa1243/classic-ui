import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
const repoName = 'vanilla-classic-ui'

export default defineConfig({
    base: `/${repoName}/`,
    plugins: [tailwindcss()],
    build: {
        outDir: 'dist/',
    },
})
