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
    Alpine.store('popUpState', {
        modalOpen: false,
        modalType: null,
        modalData: {},
        setActiveTab(tab) {
            this.tabOpened = tab
        },
        openModal(modalType, modalData) {
            this.modalOpen = true;
            this.modalType = modalType;
            this.modalData = modalData;
        },
        closeModal() {
            this.modalOpen = false
        }
    })
    Alpine.data('confirmModal', () => ({
        modal: Alpine.store('popUpState'),
        modalData: {},
        onClick() {
            this.modal.openModal('CONFIRM_MODAL', this)
        },
        title: 'This is Confirm Modal',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor felis quis arcu consequat, vitae eleifend turpis euismod. Vivamus elementum lacus quam, at sagittis libero dictum sit amet. Praesent maximus purus et sollicitudin porttitor. Mauris augue magna, bibendum vel luctus et, sodales eget sapien. Cras cursus aliquet lorem. Fusce ultricies orci sit amet mi pharetra, condimentum vestibulum nunc mattis. Suspendisse ornare urna sapien, et condimentum tellus consectetur eget. Curabitur tristique convallis est varius iaculis. Donec lacinia lacinia nisi, eu varius dolor. Curabitur posuere ipsum et arcu commodo, eget rutrum dui pretium. Cras dapibus lectus suscipit, malesuada erat sed, consequat augue. Phasellus vitae finibus leo. Maecenas sollicitudin pretium egestas. Donec ut placerat justo, vel finibus nunc.

Duis tellus orci, tincidunt eget nulla in, elementum aliquet nibh. Nunc venenatis neque sed nunc lacinia, non finibus nisl interdum. Maecenas viverra laoreet leo a consectetur. Quisque eget risus viverra, dapibus erat et, accumsan felis. Morbi posuere, orci vitae tempor posuere, justo libero volutpat magna, sit amet vestibulum odio turpis vitae nisl. Ut leo neque, maximus fermentum ex ac, dapibus imperdiet lectus. Etiam at tincidunt dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur at placerat elit. Donec consectetur consequat sapien efficitur pulvinar. Nullam bibendum magna eu neque fringilla, nec tincidunt lorem vestibulum. Suspendisse tristique euismod tincidunt. Integer facilisis convallis luctus.

Mauris fringilla dolor eu neque elementum, vel sollicitudin lacus rhoncus. Suspendisse purus eros, porta non ex et, congue efficitur nisi. Pellentesque iaculis porta augue. Morbi sollicitudin, felis vitae interdum condimentum, enim eros feugiat est, id viverra purus ligula a lorem. Praesent quis laoreet est. Duis est ante, lacinia id placerat et, facilisis sit amet mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vehicula nisl dapibus diam ullamcorper, vitae laoreet mauris aliquet. Sed faucibus eu ex a suscipit. In nibh lorem, imperdiet eu tincidunt et, tempus ac mauris. Donec luctus vitae augue vitae auctor. Ut vehicula dignissim sem non ultricies. Sed ut sapien vitae ex tempor iaculis. In a lectus arcu. Maecenas ac turpis tincidunt velit volutpat rhoncus. Praesent at leo interdum, posuere mauris ullamcorper, mattis purus.

Morbi quis turpis velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum vehicula lectus eu augue laoreet sollicitudin. Donec eleifend leo nunc. Proin et varius leo. Integer tristique finibus ante, vitae bibendum nisl placerat nec. Duis justo elit, pharetra eget magna eget, condimentum suscipit felis.

Praesent pulvinar tellus eget tincidunt ultricies. Praesent vitae enim pretium, eleifend metus ut, maximus enim. Donec pulvinar aliquet neque sed ullamcorper. Morbi ultricies feugiat magna eu maximus. Donec tempor urna quis hendrerit elementum. Sed vel tincidunt lorem, sed vehicula ipsum. Quisque ut risus pharetra, elementum dui nec, aliquet elit. Pellentesque sed faucibus nunc, in sollicitudin tellus. Vestibulum finibus bibendum sem non facilisis. Vivamus non blandit eros. In sagittis urna urna, at vehicula est euismod vitae. Sed consequat eu sapien at elementum. Integer et feugiat quam.`,
        onCancel() {
            console.log('Canceled');
            Alpine.store('popUpState').closeModal();
        },
        onConfirm() {
            console.log('Confirmed');
            Alpine.store('popUpState').closeModal();
        }
    }))
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