import Alpine from "alpinejs";
import { persist } from "@alpinejs/persist";
import './style.css';
import { VanillaUnstyledUI } from "./components/VanillaUnstyledUI";
window.Alpine = Alpine;
Alpine.plugin(persist);
window.addEventListener('alpine:init', () => {
    Alpine.data('vanilla_data', () => ({
        tabOpened: Alpine.$persist('buttons'),
    }))
})
const vanilaUI = new VanillaUnstyledUI;
vanilaUI.install();
Alpine.start();