import Alpine from "alpinejs";
class Button extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<template id="basic-button">
              <button class="btn">This is a Button</button>
            </template>
        `
        Alpine.initTree(this);
    }
}
