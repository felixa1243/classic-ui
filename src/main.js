import Alpine from "alpinejs";
import { focus } from "@alpinejs/focus";
import { persist } from "@alpinejs/persist";
import './style.css';
window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(persist);
window.addEventListener('alpine:init', () => {
    Alpine.data('genericData', () => ({
        tabOpened: Alpine.$persist('buttons'),
        modalOpen: false,
        modalType: null,
        modaData: null,
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
    }))
})
Alpine.start();
