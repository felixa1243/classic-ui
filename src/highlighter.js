import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/nord.min.css';
hljs.registerLanguage('xml', xml);
window.addEventListener('alpine:init', () => {
    function createCodeComponent({ templateId, withToggle = false, withCopy = false }) {
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

                this.highlightedCode = hljs.highlight(this.rawCode, { language: 'xml' }).value;
                console.log(hljs.highlight(this.rawCode, { language: 'xml' }).value);
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

    Alpine.data('renderSourceCode', (templateId) =>
        createCodeComponent({ templateId })
    );
})