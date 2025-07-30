# 🍦 Vanilla Unstyled UI

A lightweight and modifiable component library built with Alpine.js and Tailwind CSS 4.<br/>
Vanilla Unstyled UI provides a collection of clean, accessible, and framework-agnostic UI primitives — with zero styling opinions.<br/>
Perfect for developers who want full design control without reinventing the structure.
<br/>

<blockquote>Powered by Tailwind CSS 4 and bundled with Vite 6.</blockquote>

# ✨ Features

🧩 Unstyled Components – Bring your own design system

⚡ Alpine.js Interactions – Simple yet powerful behavior out of the box

🧱 Composable – Use only what you need

🎨 Style-Agnostic – A perfect starting point for custom UI kits

🛠️ Fully Customizable – No enforced styles, just structure and behavior

# 📦 Installation

Install using your preferred package manager:

```
npm install tailwindcss alpinejs vanilla-unstyled-ui
```

And then in your css file add this line

```css
@import "tailwindcss";
```

<br/>
after that you should import our package to js file in order to make it works..<br/>

```js
import Alpine from "alpinejs";
import { VanillaUnstyledUI } from "vanilla-unstyled-ui";

const vanillaUnstyledUI = new VanillaUnstyledUI();
vanillaUnstyledUI.install();

Alpine.start();
```

🧪 Usage
Each component is shipped in a standard HTML + Alpine.js structure, enhanced with utility classes from Tailwind.
Start customizing right away:

```html
<!-- Example Button Component -->
<button class="btn" x-data @click="alert('Clicked!')">Click me</button>
```

🧩 Components
Here are some available primitives (more coming soon):<br/>

- [x] Button
- [x] Modal
- [ ] Dropdown
- [ ] Tabs
- [ ] Accordion
- [ ] Toast

You can view all components inside the /components directory or the upcoming Docs Site.

ou can modify and theme components however you'd like — it's just HTML and utilities.

# 🔧 Technologies Used

<ol>
<li>Tailwind CSS v4</li>
<li>
Alpine.js v3
</li>
<li>
Vite v6
</li>
</ol>

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to open a PR or submit an issue!

# 🪪 License

MIT © Rajiph iqbal ghandi
