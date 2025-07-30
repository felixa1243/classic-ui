import Modals from "./Modals";
export class VanillaUnstyledUI {
    install() {
        window.addEventListener('alpine:init', () => {
            Alpine.store('modal', Modals);
        })
    }
}