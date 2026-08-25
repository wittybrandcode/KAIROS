# Kairos API Contract (Freeze v1.0)

> This document defines the stable, public API for Kairos 1.x.
> Any change to this API requires an explicit architectural decision and may necessitate a major version bump if breaking.

---

## 1. CSS Contract (Variables)

All components MUST consume the following variables for rendering. These variables are guaranteed to be present or safely fallback.

### Component Scope (`--kairos-comp-*`)
- `--kairos-comp-current-bg`
- `--kairos-comp-current-text`
- `--kairos-comp-current-border`
- `--kairos-comp-current-shadow`
- `--kairos-comp-padding-x`
- `--kairos-comp-padding-y`
- `--kairos-comp-font-size`
- `--kairos-comp-border-width`

---

## 2. CSS Modifiers (Classes)

The following class name patterns are strictly reserved and form the core styling API:

### Intent
- `.kairos-intent-neutral`
- `.kairos-intent-pvw`
- `.kairos-intent-pgm`
- `.kairos-intent-warning`
- `.kairos-intent-info`

### Variant
- `.kairos-variant-solid`
- `.kairos-variant-subtle`
- `.kairos-variant-outline`
- `.kairos-variant-ghost`

### Size
- `.kairos-size-sm`
- `.kairos-size-md`
- `.kairos-size-lg`

---

## 3. DOM State (Data Attributes)

The framework relies exclusively on `data-state` to manage visibility and interactivity.

### Valid States
- `data-state="closed"` (Default implicit state)
- `data-state="open"` (Overlays, Accordions)
- `data-state="active"` (Tabs, Selected Items)
- `data-state="disabled"` (Non-interactive)
- `data-state="loading"` (Async processing)
- `data-state="selected"` (List navigation)

---

## 4. Triggers & Targets

Interactive components are controlled declaratively in HTML:

- `data-kairos-toggle="[module]"` (e.g., `modal`, `dropdown`, `accordion`, `toast`, `sidebar`, `command`, `tab`)
- `data-kairos-target="[selector]"` (e.g., `#my-modal`)
- `data-kairos-dismiss` (e.g., `modal`, `toast` - closes closest parent if value omitted)
- `data-kairos-duration="[ms]"` (Specific to Toast)

---

## 5. JavaScript Global Object

The `window.Kairos` object exposes the complete programmable API.

### Core Utilities (`Kairos.*`)
- `dom.q(selector, context?)`: Query single element.
- `dom.qa(selector, context?)`: Query all elements.
- `dom.closest(el, selector)`: Find closest matching ancestor.
- `dom.resolveTarget(trigger)`: Find element based on `data-kairos-target`.
- `dom.getFocusable(container)`: Return array of focusable elements.
- `events.emit(el, name, detail?, options?)`: Dispatch CustomEvent.
- `events.on(el, type, handler, options?)`: Add listener (returns cleanup fn).
- `events.off(el, type, handler, options?)`: Remove listener.
- `events.once(el, type, handler)`: Add one-time listener.
- `state.open(el)`, `close(el)`, `toggle(el)`, `activate(el)`, `deactivate(el)`, `loading(el)`, `selected(el)`, `disable(el)`: Mutate `data-state`.
- `state.read(el)`: Get current state string.
- `state.is(el, stateName)`: Boolean check for specific state.
- `focus.trap(container)`: Trap focus within element.
- `focus.restore()`: Return focus to previous element.
- `focus.next(container)`, `previous(container)`: Navigate focusable siblings.
- `keyboard.onEscape(handler)`, `onActivate(el, handler)`, `onArrows(el, handlers)`, `onHorizontalArrows(el, handlers)`, `onHomeEnd(el, handlers)`, `onTab(el, handler)`, `hotkey(combo, handler)`: Keyboard listeners.
- `animation.waitTransition(el, fallbackMs?)`: Promise resolving on transition end.
- `animation.waitAnimation(el, fallbackMs?)`: Promise resolving on animation end.
- `observer.onMutation(el, cb, opts?)`, `onAttributeChange(el, cb, attrs?)`, `onResize(el, cb)`, `onIntersection(el, cb, opts?)`: Native observer wrappers.
- `utils.debounce(fn, ms)`, `throttle(fn, ms)`, `uid(prefix?)`, `clamp(val, min, max)`, `merge(...objs)`: Generic helpers.

### Modules (`Kairos.*`)
- `Modal.open(el)` / `Modal.close(el)`
- `Dropdown.open(trigger, dropdown)` / `Dropdown.close(dropdown)`
- `Accordion.toggle(trigger)`
- `Tabs.activate(tab)`
- `Toast.show(toast, options?)` / `Toast.dismiss(toast)`
- `Sidebar.open(sidebar)` / `Sidebar.close(sidebar)`
- `Command.open(palette)` / `Command.close(palette)`

---

## 6. Events (CustomEvents)

Namespaced events emitted on component root elements:

- `kairos:modal:before-open` / `opened` / `before-close` / `closed`
- `kairos:dropdown:before-open` / `opened` / `before-close` / `closed` / `select`
- `kairos:accordion:before-open` / `opened` / `before-close` / `closed`
- `kairos:tab:changed`
- `kairos:toast:show` / `hide`
- `kairos:sidebar:before-open` / `opened` / `before-close` / `closed`
- `kairos:command:execute`
