# Why the DOM is our Source of Truth

In modern web development, it's common practice to keep a "virtual" state (like in React, Vue, or signals-based frameworks) that syncs down to the DOM.

**In Kairos, we do the opposite. The DOM *is* the state.**

## Why?
1. **Zero Abstraction Cost:** We are building a vanilla HTML/CSS framework for performance-critical broadcast interfaces. Virtual DOMs add overhead.
2. **Inspectability:** If a broadcast engineer needs to debug a routing matrix UI mid-show, they open the browser DevTools. With the DOM as the source of truth, the state is completely visible on the element itself (`data-state="open"`).
3. **CSS Integration:** CSS cannot read a JavaScript variable or a React store. CSS *can* read DOM attributes perfectly and instantaneously via attribute selectors (`[data-state="open"]`). By making the DOM the truth, CSS reacts without any JS bridging.
