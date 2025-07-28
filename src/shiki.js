import { codeToHtml } from 'shiki';
window.addEventListener('alpine:init', () => {
    function createCodeComponent({ templateId, withToggle = false, withCopy = false }) {
        return {
            toggle: 'Display',
            rawCode: '',
            highlightedCode: '',

            async init() {
                const template = document.getElementById(templateId);
                if (!template) return;

                this.rawCode = template.innerHTML.trim().replace(/'/g, '"');
                this.highlightedCode = await codeToHtml(this.rawCode, {
                    lang: 'html',
                    theme: 'andromeeda',
                });
            },

            async toggleView() {
                if (!withToggle) return;
                this.toggle = this.toggle === 'Display' ? 'Code' : 'Display';

                if (this.toggle === 'Code' && !this.highlightedCode) {
                    this.highlightedCode = await codeToHtml(this.rawCode, {
                        lang: 'html',
                        theme: 'andromeeda',
                    });
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