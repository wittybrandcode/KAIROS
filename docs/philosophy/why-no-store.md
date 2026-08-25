# Why We Reject External State Stores

Kairos does not use and actively discourages the use of external state managers like Redux, MobX, or reactive signals within the framework's core UI layer.

## Why?
1. **Framework Agnosticism:** Kairos must be usable in a vanilla HTML file, a React app, an Angular module, or an HTMX project. Forcing a proprietary state store couples the consumer to our architectural choices.
2. **Reduced Surface Area for Bugs:** State synchronization issues (where the Store says "Open" but the DOM says "Closed") account for the majority of UI bugs in complex systems. By eliminating the middleman and querying the DOM directly, synchronization errors become impossible.
3. **Simplicity:** A broadcast engineer trying to hook up a physical tally light to a UI tally indicator shouldn't have to learn a complex reactive state tree. `document.querySelector('[data-state="pgm"]')` is universal and timeless.
