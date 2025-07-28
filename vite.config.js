import { defineConfig } from 'vite'


const repoName = 'classic-ui'

export default defineConfig({
    base: `/${repoName}/`,
    build: {
        outDir: 'dist/docs',
    },
})
