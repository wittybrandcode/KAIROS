# Accordion Component Specification

## Purpose
A vertically stacked list of headers that reveal or hide associated sections of content.

## HTML Structure
```html
<div class="kairos-accordion" data-kairos-allow-multiple="false">
  <div class="kairos-accordion-item" data-state="closed">
    <button class="kairos-accordion-trigger" data-kairos-toggle="accordion" aria-expanded="false" aria-controls="acc-1-content">
      Section 1
      <span class="kairos-accordion-icon">v</span>
    </button>
    <div id="acc-1-content" class="kairos-accordion-content" role="region" aria-labelledby="...">
      Content
    </div>
  </div>
</div>
```

## Behavior Contract
- Toggling a trigger switches the closest `.kairos-accordion-item`'s `data-state` between `open` and `closed`.
- If `data-kairos-allow-multiple="false"` is set on the parent, opening an item automatically closes all other items in the group.
- The content container must animate its height natively (using grid tricks or max-height).

## Keyboard
- `Tab`: Navigates through accordion triggers.
- `Enter` / `Space`: Toggles the currently focused accordion item.
- `ArrowDown` / `ArrowUp`: (Optional) Can move focus between accordion triggers.

## ARIA
- Triggers use `aria-expanded` (true/false) matching the state.
- Triggers use `aria-controls` pointing to the content ID.

## Events
- `kairos:accordion:before-open`
- `kairos:accordion:opened`
- `kairos:accordion:before-close`
- `kairos:accordion:closed`

## Edge Cases
- **Nested Accordions**: Inner accordions must not trigger the outer accordion's logic. Event delegation must ensure it only affects the closest `.kairos-accordion-item`.
