# Tabs Component Specification

## Purpose
A set of layered sections of content, displaying one panel of content at a time.

## HTML Structure
```html
<div class="kairos-tabs">
  <div class="kairos-tabs-list" role="tablist">
    <button class="kairos-tab" data-kairos-toggle="tab" data-kairos-target="#tab-1" role="tab" aria-selected="true" data-state="active">Tab 1</button>
    <button class="kairos-tab" data-kairos-toggle="tab" data-kairos-target="#tab-2" role="tab" aria-selected="false" data-state="inactive">Tab 2</button>
  </div>
  <div id="tab-1" class="kairos-tabs-panel" role="tabpanel" data-state="active">...</div>
  <div id="tab-2" class="kairos-tabs-panel" role="tabpanel" data-state="inactive">...</div>
</div>
```

## Behavior Contract
- Clicking a tab sets `data-state="active"` on both the tab and the target panel.
- All sibling tabs and panels within the same `.kairos-tabs` container are set to `data-state="inactive"`.

## Keyboard
- `Tab`: Enters the tablist, focuses the active tab. Next `Tab` leaves the tablist and enters the panel.
- `ArrowRight` / `ArrowLeft`: Moves focus between tabs and automatically activates them (or requires Enter, depending on `data-kairos-activation="manual|automatic"`).

## ARIA
- `role="tablist"`, `role="tab"`, `role="tabpanel"`.
- `aria-selected` matches the active state.
- `aria-controls` links the tab to the panel.

## Events
- `kairos:tab:changed` (Dispatched on the tab container with details of the new active tab).

## Edge Cases
- **Disabled Tabs**: Must be skipped during keyboard navigation and ignored on click.
