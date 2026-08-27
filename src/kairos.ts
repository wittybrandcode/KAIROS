/**
 * ═══════════════════════════════════════════════════
 *  Kairos v01 — Entry Point
 *  المصدر الرئيسي للإطار
 *
 *  Architecture:
 *    src/core/     → Shared utilities (DOM, Events, State, Focus, Keyboard, Animation)
 *    src/modules/  → Component modules (Modal, Dropdown, Accordion, Tabs, Toast, Sidebar, Command)
 *
 *  Philosophy:
 *    - DOM is the single source of truth
 *    - CSS handles all rendering via data-state
 *    - JS handles behavior only (no inline styles, no display:none)
 *    - Every module depends on core only (no inter-module dependencies)
 * ═══════════════════════════════════════════════════
 */

import './kairos.css';

// ─── Core ───
import * as dom from './core/dom';
import * as events from './core/events';
import * as state from './core/state';
import * as focus from './core/focus';
import * as keyboard from './core/keyboard';
import * as animation from './core/animation';
import * as observer from './core/observer';
import * as utils from './core/utils';

// ─── Modules ───
import { Modal, init as initModal } from './modules/modal';
import { Dropdown, init as initDropdown } from './modules/dropdown';
import { Accordion, init as initAccordion } from './modules/accordion';
import { Tabs, init as initTabs } from './modules/tabs';
import { Toast, init as initToast } from './modules/toast';
import { Popover, init as initPopover } from './modules/popover';
import { Tooltip, init as initTooltip } from './modules/tooltip';
import { init as initIcons } from './icons';

// ─── Initialize ───
function init(): void {
  initIcons();
  initModal();
  initDropdown();
  initAccordion();
  initTabs();
  initToast();
  initPopover();
  initTooltip();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ─── Public API ───
const Kairos = {
  // Core
  dom,
  events,
  state,
  focus,
  keyboard,
  animation,
  observer,
  utils,

  // Modules
  Modal,
  Dropdown,
  Accordion,
  Tabs,
  Toast,
  Popover,
  Tooltip,

  // Utilities
  init,
};

// Expose globally
declare global {
  interface Window {
    Kairos: typeof Kairos;
  }
}
window.Kairos = Kairos;

export default Kairos;
