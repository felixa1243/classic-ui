import { defineConfig } from "vite";
import { resolve } from "path"
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [
        tailwindcss()
    ],
    // build: {
    //     lib: {
    //         name: 'classic-ui',
    //         // **Change this:** Point the entry to your new JS entry file
    //         entry: resolve(__dirname, 'src/main.js'),
    //         // No 'name' property needed if you're only exporting CSS.
    //         // No 'fileName' needed if you are just producing CSS and not a JS bundle for the library.
    //     },
    //     outDir: 'dist',
    //     // `cssCodeSplit` is `false` by default in lib mode, so you don't strictly need to set it,
    //     // but it's fine to leave it for clarity.
    //     cssCodeSplit: false,
    //     cssMinify: true,
    //     rollupOptions: {
    //         output: {
    //             // Define the output CSS file name
    //             assetFileNames: (assetInfo) => {
    //                 // Check for CSS files (they usually have 'css' in their name or type)
    //                 if (assetInfo.name && assetInfo.name.endsWith('.css')) {
    //                     return 'index.css'; // Your desired output file name
    //                 }
    //                 // For other assets (e.g., fonts, images) if any
    //                 return assetInfo.name;
    //             },
    //         },
    //     },
    //     emptyOutDir: true,
    // },
});