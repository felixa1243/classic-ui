export default {
    modalOpen: false,
    modalTitle: 'An example of Confirmation Modal',
    modalMessage: 'Default message',
    modalOkButtonText: 'Ok',

    // These will be bound directly to x-html in the default modal structure
    modalHeaderContent: '',
    modalBodyContent: '',
    modalFooterContent: '',

    // Cache the main content container element once
    _modalInnerContentEl: null,
    _currentContainerId: null, // Track which custom container is currently active

    init() {
        // Insert the main modal structure once on init.
        // Use x-html to bind content directly to reactive properties.
        const modalComponent = `
      <div x-show="$store.modal.modalOpen" x-transition x-cloak class="modal-container">
        <div class="modal-backdrop" @click.outside="$store.modal.closeModal()">
          <div class="modal" x-ref="modalInnerContent">
            <div x-html="$store.modal.modalHeaderContent"></div>
            <div x-html="$store.modal.modalBodyContent" class="modal-body"></div>
            <div x-html="$store.modal.modalFooterContent"></div>
          </div>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML('beforeend', modalComponent);
        this._modalInnerContentEl = document.querySelector('.modal-container .modal-backdrop ');

        // Initial render of default content. This will populate modalHeaderContent, etc.
        this.render();
    },

    renderDefaultModalHeader(title) {
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

    renderDefaultModalBody(body) {
        return `<p class="text-lg">${body}</p>`;
    },

    renderDefaultModalFooter(okText) {
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

    /**
     * Renders or updates the content *inside* the static <div class="modal">.
     * Leverages Alpine's x-html for default content, and manual DOM for custom templates.
     */
    render({ headerID = '', bodyID = '', footerID = '', title = '', body = '', okText = '', containerID = '' } = {}) {
        // Update text properties (these are reactive in Alpine store)
        if (title) this.modalTitle = title;
        if (body) this.modalMessage = body;
        if (okText) this.modalOkButtonText = okText;

        // Determine HTML for header, body, footer parts
        const headerTemplate = headerID ? document.querySelector(`#${headerID}`) : null;
        const resolvedHeaderHtml = headerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
            || this.renderDefaultModalHeader(this.modalTitle);

        const bodyTemplate = bodyID ? document.querySelector(`#${bodyID}`) : null;
        const resolvedBodyHtml = bodyTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
            || this.renderDefaultModalBody(this.modalMessage);

        const footerTemplate = footerID ? document.querySelector(`#${footerID}`) : null;
        const resolvedFooterHtml = footerTemplate?.content?.cloneNode(true).firstElementChild?.outerHTML
            || this.renderDefaultModalFooter(this.modalOkButtonText);

        // Ensure the main modal inner element is cached
        if (!this._modalInnerContentEl) {
            this._modalInnerContentEl = document.querySelector('.modal-container .modal-backdrop .modal');
            if (!this._modalInnerContentEl) {
                console.error("Modal: The static '.modal' element was not found during render. Ensure init() has completed.");
                return;
            }
        }

        // Determine if we need to switch the inner modal's structure (from default to custom, or custom to different custom)
        const needsNewContainerTemplate = containerID !== this._currentContainerId;

        if (containerID && needsNewContainerTemplate) {
            const customContainerTemplate = document.querySelector(`#${containerID}`);
            if (customContainerTemplate && customContainerTemplate.tagName === 'TEMPLATE') {
                const docFragment = customContainerTemplate.content.cloneNode(true);
                const customInnerModalElement = docFragment.firstElementChild;

                if (!customInnerModalElement) {
                    console.error(`Modal: Custom container template #${containerID} has no root element.`);
                    // Fallback to default rendering if template is invalid
                    this._currentContainerId = null; // Reset to indicate no custom template is active
                    this.modalHeaderContent = resolvedHeaderHtml;
                    this.modalBodyContent = resolvedBodyHtml;
                    this.modalFooterContent = resolvedFooterHtml;
                    // Alpine will update via x-html bindings
                    return;
                }

                // Manual insertion into the custom template's slots
                const headerSlot = customInnerModalElement.querySelector('[data-modal-slot="header"]');
                if (headerSlot) headerSlot.innerHTML = resolvedHeaderHtml; // Use innerHTML on slot element
                else customInnerModalElement.insertAdjacentHTML('afterbegin', resolvedHeaderHtml);

                const bodySlot = customInnerModalElement.querySelector('[data-modal-slot="body"]');
                if (bodySlot) bodySlot.innerHTML = resolvedBodyHtml; // Use innerHTML on slot element
                else {
                    const existingHeader = customInnerModalElement.querySelector('.modal-header');
                    if (existingHeader) existingHeader.insertAdjacentHTML('afterend', resolvedBodyHtml);
                    else customInnerModalElement.insertAdjacentHTML('beforeend', resolvedBodyHtml);
                }

                const footerSlot = customInnerModalElement.querySelector('[data-modal-slot="footer"]');
                if (footerSlot) footerSlot.innerHTML = resolvedFooterHtml; // Use innerHTML on slot element
                else customInnerModalElement.insertAdjacentHTML('beforeend', resolvedFooterHtml);

                // Replace the entire content of the static .modal div with the new custom structure
                this._modalInnerContentEl.innerHTML = ''; // Clear existing
                this._modalInnerContentEl.appendChild(customInnerModalElement);
                this._currentContainerId = containerID; // Update tracking

                // Important: Re-initialize Alpine on the new DOM subtree
                // This is crucial for x-data, @click, x-bind etc. inside the custom template
                Alpine.initTree(this._modalInnerContentEl);

            } else {
                console.warn(`Modal: Custom container template with ID "${containerID}" not found or is not a <template> element. Falling back to default inner modal structure.`);
                // Fallback to default Alpine-bound structure
                this._currentContainerId = null;
                this.modalHeaderContent = resolvedHeaderHtml;
                this.modalBodyContent = resolvedBodyHtml;
                this.modalFooterContent = resolvedFooterHtml;
                // Alpine will update via x-html bindings
            }
        }
        // If no containerID, or if it's the *same* containerID as currently active,
        // just update the reactive properties, and Alpine will handle it efficiently.
        else {
            // Restore default Alpine-bound structure if a custom one was previously active
            if (this._currentContainerId !== null) {
                this._modalInnerContentEl.innerHTML = `
              <div x-html="$store.modal.modalHeaderContent"></div>
              <div x-html="$store.modal.modalBodyContent" class="modal-body"></div>
              <div x-html="$store.modal.modalFooterContent"></div>
          `;
                Alpine.initTree(this._modalInnerContentEl); // Re-init Alpine on the default structure
                this._currentContainerId = null;
            }
            this.modalHeaderContent = resolvedHeaderHtml;
            this.modalBodyContent = resolvedBodyHtml;
            this.modalFooterContent = resolvedFooterHtml;
        }
    },

    openModal(options = {}) {
        this.render(options);
        this.modalOpen = true;
    },

    closeModal() {
        this.modalOpen = false;
    }
};