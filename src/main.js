import Alpine from "alpinejs";
import Aos from "aos";
import "aos/dist/aos.css";
import { focus } from "@alpinejs/focus";
import 'iconify-icon';
window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.start();
Aos.init();

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

const dropArea = document.querySelector(".form__label--upload-placeholder");

// Disable prevent and bubbling
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

// TODO: Handle active class

const handleFile = (file, previewImgContainer) => {
    // Only accept image
    if (file.type.split("/")[0] !== "image") {
        console.error("Files have to image");
        alert("Receipt must be image");
        return false;
    }

    // File cannot more than 10MB
    if (file.size / (1024 * 1024) > 10) {
        alert("Please compress your email below 10MB");
        return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        // Hidden text and icon
        document.querySelector("#upload-preview").style.display = "none";
        dropArea.querySelector("span").style.display = "none";

        // Replace image preview
        const hasImagePreview = dropArea.querySelector(".img-preview figure");
        if (hasImagePreview) {
            hasImagePreview.remove();
        }

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = reader.result;
        figure.appendChild(img);
        figure.innerHTML += `<figcaption>${file.name}</figcaption>`;
        previewImgContainer.appendChild(figure);
    };
};
const imagePreviewEle = dropArea.querySelector(".image-preview");
console.log(imagePreviewEle)
const previewImage = (e) => {
    const dt = e.dataTransfer;
    const files = e.target.files || dt.files;

    Array.from(files).forEach((file) => {
        handleFile(file, imagePreviewEle);
    });
};

const uploadFileInput = document.getElementById("receipt-upload");

// Attach Event to Element
dropArea.addEventListener("drop", previewImage, false);
uploadFileInput.addEventListener("change", previewImage);
