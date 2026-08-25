# Why CSS Owns Rendering

In Kairos, JavaScript is strictly forbidden from manipulating inline styles (e.g., `element.style.display = 'block'`). 

## Why?
1. **Performance:** Browser rendering engines optimize CSS class and attribute matching far better than inline style mutations. Hardware-accelerated CSS transitions are significantly smoother than JS-driven animations.
2. **Theming & Overrides:** When JS writes an inline style, it gets maximum specificity. This makes it impossible for themes (like dark mode or high-contrast mode) to override the layout cleanly. By keeping rendering strictly in CSS, we ensure theming remains robust.
3. **Separation of Concerns:** JavaScript should only answer the question "What is the state?" (Behavior). CSS answers "What does that state look like?" (Presentation). Crossing these streams leads to technical debt.
