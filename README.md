vanilla-unstyled-ui <br/>
A lightweight and customizable CSS package built with Tailwind CSS 4 and Vite 6, providing a foundational set of unstyled UI components and base styles for your projects. This package offers a clean slate, allowing you to easily apply your own design system on top of robust, accessible structures.
<br/>

# 🚀 Installation

To integrate this package into your project, install it using your preferred package manager:

```
npm install vanilla-unstyled-ui
```

# 💡 Usage

After installation, you can import the compiled CSS into your project's main stylesheet or JavaScript entry point.

In your main CSS file (Recommended for Tailwind projects)
Import this package at the top of your primary CSS file (e.g., src/app.css or src/index.css). This ensures that its base styles are applied before your project's own Tailwind utilities, allowing for easy overrides and consistent styling.

/_ src/app.css or src/index.css in your consuming project _/

@import "vanilla-unstyled-ui"; /_ Imports the unstyled base UI from this package _/

/_ Your project's own Tailwind imports should come after _/
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/_ Any additional project-specific CSS or custom components _/

In your JavaScript/TypeScript entry file
If your project's build setup processes CSS imports from JavaScript, you can import the package directly into your main entry file (e.g., src/main.js or src/main.ts):

// src/main.js or src/main.ts in your consuming project
import 'vanilla-unstyled-ui';

// Your application's JavaScript/TypeScript code

Overriding Styles
This package is designed with Tailwind's utility-first philosophy in mind. Any base or component style provided by vanilla-unstyled-ui can be easily overridden by applying Tailwind's utility classes directly in your HTML.

Example:

Consider a .card class defined in this package, which might only provide structural styling without colors or shadows:

/_ Inside vanilla-unstyled-ui _/
.card {
@apply block rounded-lg; /_ Provides basic shape, but no visual styling _/
}

When used in your HTML, you can easily add your desired visual styles:

<!-- The card will have the default structural styling -->
<div class="card">
  This is a basic unstyled card.
</div>

<!-- The card will gain custom padding, shadow, and background color -->
<div class="card p-6 shadow-md bg-white">
  This card is styled with Tailwind utilities.
</div>

✨ Features
Unstyled Base UI: Provides foundational, unopinionated CSS for common HTML elements and UI patterns, ready for your custom styling.

Reusable Component Classes: Includes semantic component classes (e.g., .card, .button) that provide structural integrity without imposing visual design.

Highly Customizable: Designed for maximum flexibility, allowing you to easily apply your own design system's colors, spacing, typography, and more using Tailwind utilities.

Lightweight & Optimized: The package ships only the necessary, compiled, and minified CSS, ensuring minimal impact on your bundle size.

Modern Tooling: Built using Vite 6 for fast and efficient compilation, and leverages Tailwind CSS 4 for powerful, utility-first styling capabilities.

📦 Development
If you're interested in contributing to this package or understanding its internal structure:

Setup
Clone the repository and install dependencies:

git clone https://github.com/your-username/vanilla-unstyled-ui.git
cd vanilla-unstyled-ui
npm install

Build Process
This project uses Vite 6 in library mode to compile the CSS, processing Tailwind CSS and PostCSS plugins.

npm run build

This command will generate the production-ready CSS file(s) in the dist/ directory.

# 🤝 Contributing

We welcome contributions! If you encounter any bugs, have feature requests, or want to improve the codebase, please feel free to:

Open an issue to discuss your ideas or report problems.

Fork the repository and submit a pull request with your changes.

Please ensure your code adheres to the existing style.

Made with ❤️ by Me
