import Alpine from 'alpinejs';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/nord.min.css';
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
window.addEventListener('alpine:init', () => {
    function createCodeComponent({ templateId, withToggle = false, withCopy = false, language = 'xml' }) {
        return {
            toggle: 'Display',
            rawCode: '',
            highlightedCode: '',

            async init() {
                const template = document.getElementById(templateId);
                if (!template) return;

                // Get the pre element within the template, if it exists
                const preElement = template.querySelector('pre');

                if (preElement) {
                    this.rawCode = preElement.textContent; // Use textContent to preserve whitespace
                } else {
                    // Fallback if no pre tag, though this might still be single-line
                    this.rawCode = template.innerHTML;
                }

                this.highlightedCode = hljs.highlight(this.rawCode, { language }).value;
            },

            async toggleView() {
                if (!withToggle) return;
                this.toggle = this.toggle === 'Display' ? 'Code' : 'Display';

                if (this.toggle === 'Code' && !this.highlightedCode) {
                    this.highlightedCode = this.highlightedCode = hljs.highlight(this.rawCode, { language: 'xml' }).value;
                }
            },

            async handleCopy() {
                if (!withCopy) return;
                await navigator.clipboard.writeText(this.rawCode);
            }
        };
    }

    Alpine.data('codePreviewComponent', (templateId) =>
        createCodeComponent({ templateId, withToggle: true, withCopy: true })
    );

    Alpine.data('renderSourceCode', (templateId, language) =>
        createCodeComponent({ templateId, language })
    );
    Alpine.data('installation', () => ({
        codes: [{
            code: `npm install vanilla-unstyled-ui alpinejs tailwindcss`,
            language: 'bash'
        }, {
            code: `@import 'tailwindcss`,
            language: 'css'
        },
        {
            code: `import Alpine from 'alpinejs';\nimport { VanillaUnstyledUI } from 'vanilla-unstyled-ui';\n\nconst vanillaUnstyledUI = new VanillaUnstyledUI();\nvanillaUnstyledUI.install();\n\nAlpine.start();`,
            language: 'javascript'
        },
        ],
        highlightedCodes: [],
        init() {
            this.highlightedCodes = this.codes.map(code => hljs.highlight(code.code, { language: code.language }).value);
        }
    }))
})