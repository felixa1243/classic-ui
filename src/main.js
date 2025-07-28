import Alpine from "alpinejs";
import { focus } from "@alpinejs/focus";
import { persist } from "@alpinejs/persist";
import './style.css';
import { codeToHtml } from 'shiki';
import 'shiki/themes/andromeeda.mjs';
window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(persist);
window.addEventListener('alpine:init', () => {
    Alpine.data('genericData', () => ({
        tabOpened: Alpine.$persist('buttons'),

    }))
    Alpine.store('modal', {
        modalOpen: false,
        modalHeader: null,
        modalBody: null,
        modalFooter: null,
        modalData: {},
        setActiveTab(tab) {
            this.tabOpened = tab
        },
        openModal(headerID = 'default-modal-header', bodyID = 'default-modal-body', footerID = 'default-modal-footer') {
            const headerTemplate = document.querySelector('#' + headerID);
            const bodyTemplate = document.querySelector('#' + bodyID);
            const footerTemplate = document.querySelector('#' + footerID);
            this.modalHeader = headerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML || '';
            this.modalBody = bodyTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML || '';
            this.modalFooter = footerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML || '';
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false
        }
    })
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
Alpine.start()