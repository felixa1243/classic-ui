import { defineConfig } from "vite";
import { resolve } from "path"
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [
        tailwindcss()
    ],
    build: {
        lib: {
            name: 'classic-ui',
            entry: resolve(__dirname, 'src/main.js'),
        },
        outDir: 'dist',
        cssCodeSplit: false,
        cssMinify: true,
        rollupOptions: {
            output: {
                // Define the output CSS file name
                assetFileNames: (assetInfo) => {
                    // Check for CSS files (they usually have 'css' in their name or type)
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'index.css'; // Your desired output file name
                    }
                    // For other assets (e.g., fonts, images) if any
                    return assetInfo.name;
                },
            },
        },
        emptyOutDir: true,
    },
    optimizeDeps: {
        include: ['alpinejs']
    }
});