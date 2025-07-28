import Alpine from "alpinejs";
import { focus } from "@alpinejs/focus";
import { persist } from "@alpinejs/persist";
import './style.css';
window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(persist);
window.addEventListener('alpine:init', () => {
  Alpine.data('vanilla_data', () => ({
    tabOpened: Alpine.$persist('buttons'),

  }))
  Alpine.store('modal', {
    modalOpen: false,
    modalTitle: 'An example of Confirmation Modal',
    modalMessage: 'Default message',
    modalOkButtonText: 'Ok',

    modalHeader: '',
    modalBody: '',
    modalFooter: '',

    init() {
      const modalComponent = `
      <div x-show="$store.modal.modalOpen" x-transition x-cloak class="modal" @click.outside="$store.modal.closeModal()">
        <div x-html="$store.modal.modalHeader"></div>
        <div x-html="$store.modal.modalBody" class="modal-body"></div>
        <div x-html="$store.modal.modalFooter"></div>
      </div>`;
      document.body.insertAdjacentHTML('beforeend', modalComponent);
    },

    renderModalHeader(title) {
      return `
      <div class="modal-header">
        <h5 class="text-2xl font-semibold">${title}</h5>
        <button type="button" class="text-2xl text-red-500 hover:text-red-600" @click="$store.modal.closeModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
              d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" />
          </svg>
        </button>
      </div>`;
    },

    renderModalBody(body) {
      return `<p class="text-lg">${body}</p>
      `;
    },

    renderModalFooter(okText) {
      return `
      <div class="modal-footer">
        <button type="button" class="btn bg-gray-600" @click="$store.modal.closeModal()">Cancel</button>
        <button type="button" class="btn" @click="$store.modal.confirm()">${okText}</button>
      </div>`;
    },

    confirm() {
      console.log('confirmed');
      this.closeModal();
    },

    openModal({
      title = '',
      body = '',
      okText = '',
      headerID = null,
      bodyID = null,
      footerID = null,
    } = {}) {
      // Update text values
      if (title) this.modalTitle = title;
      if (body) this.modalMessage = body;
      if (okText) this.modalOkButtonText = okText;

      // Get custom templates if provided
      const headerTemplate = headerID ? document.querySelector(`#${headerID}`) : null;
      const bodyTemplate = bodyID ? document.querySelector(`#${bodyID}`) : null;
      const footerTemplate = footerID ? document.querySelector(`#${footerID}`) : null;

      // Fallback to default rendering if templates are not found
      this.modalHeader = headerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
        || this.renderModalHeader(this.modalTitle);

      this.modalBody = bodyTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
        || this.renderModalBody(this.modalMessage);

      this.modalFooter = footerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
        || this.renderModalFooter(this.modalOkButtonText);

      this.modalOpen = true;
    }
    ,

    closeModal() {
      this.modalOpen = false;
    }
  });

})
Alpine.start()