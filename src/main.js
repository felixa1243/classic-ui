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
    Alpine.data('vanilla_data', () => ({
        tabOpened: Alpine.$persist('buttons'),

    }))
    Alpine.store('modal', {
        modalOpen: false,
        modalHeader: null,
        modalBody: null,
        modalFooter: null,
        modalData: {},
        init() {
            const modalComponent = `
            <div x-show="$store.modal.modalOpen" x-transition x-cloak class="modal" @click.outside="modalOpen = false">
    <div class="modal-header" x-html="$store.modal.modalHeader">
    </div>
    <div class="modal-body" x-html="$store.modal.modalBody">
    </div>
    <div class="modal-footer" x-html="$store.modal.modalFooter">
    </div>
  </div>`;
            const modalHeader = document.createElement('template');
            modalHeader.id = 'default-modal-header';
            modalHeader.innerHTML = `<h5 class="text-2xl font-semibold">An example of Confirmation Modal</h5>
    <button type="button" class="text-2xl text-red-500 hover:text-red-600" @click="$store.modal.modalOpen = false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
          d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" />
      </svg>
    </button>`;
            const modalBody = document.createElement('template');
            modalBody.id = 'default-modal-body';
            modalBody.innerHTML = `<p class="text-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam suscipit, voluptatibus repellendus
      molestiae consectetur? Accusamus, amet cupiditate quidem, adipisci explicabo libero iste deleniti labore
      quibusdam tempore provident nisi fugiat quas illo illum similique sapiente aliquam eveniet perferendis fuga.
      Animi, consequuntur! Facere dolores modi voluptas, reiciendis autem libero magni at amet veniam doloremque?
      Suscipit nobis inventore nostrum quisquam nulla assumenda, sequi eaque eum. Minima, soluta dolorum quod eos
      consectetur asperiores amet ea numquam vitae tempora! Similique perspiciatis ratione, atque sit iusto incidunt
      ipsum quaerat eos ex. Repellat quidem itaque, expedita eaque consequuntur dolor, ducimus voluptatibus, cumque
      quae qui atque perspiciatis.
    </p>`;
            const modalFooter = document.createElement('template');
            modalFooter.id = 'default-modal-footer';
            modalFooter.innerHTML = `<div class="flex gap-3">
      <button type="button" class="btn bg-gray-600"
        @click="()=>console.log('canceled');$store.modal.closeModal()">Cancel</button>
      <button type="button" class="btn" @click="()=>console.log('confirmed');$store.modal.closeModal()">Ok!</button>
    </div>`;
            document.body.appendChild(modalHeader);
            document.body.appendChild(modalBody);
            document.body.appendChild(modalFooter);
            document.body.insertAdjacentHTML('beforeend', modalComponent);
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