import { icons, type IconRecord } from './registry';

const MODIFIERS = new Set([
  'xs', 'sm', 'md', 'lg', 'xl',
  'pgm', 'pvw', 'warn', 'info', 'muted', 'placeholder', 'clickable',
]);

const PREFIX = 'kairos-icon-';

function replace(el: Element): void {
  if (el.tagName?.toLowerCase() === 'svg') return;
  const classStr = el.getAttribute('class') || '';
  const classes = classStr.split(/\s+/);
  const iconClass = classes.find(c => c.startsWith(PREFIX) && !MODIFIERS.has(c.slice(PREFIX.length)));
  if (!iconClass) return;

  const name = iconClass.slice(PREFIX.length);
  const icon = (icons as Record<string, IconRecord>)[name];
  if (!icon) return;

  const svgClasses = classes.filter(c => c === iconClass || MODIFIERS.has(c.slice(PREFIX.length))).join(' ');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', icon.v);
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', svgClasses);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', icon.d);
  svg.appendChild(path);

  el.replaceWith(svg);
}

function scan(root: Document | Element = document): void {
  const elements = root.querySelectorAll(`[class*="${PREFIX}"]`);
  for (const el of elements) replace(el);
}

export function init(): void {
  const ready = () => {
    scan();
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) {
            const el = node as Element;
            try {
              if (el.matches?.(`[class*="${PREFIX}"]`)) replace(el);
              el.querySelectorAll?.(`[class*="${PREFIX}"]`).forEach(replace);
            } catch (e) {
              console.warn('Kairos icon replacement error:', e);
            }
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
}

export default { init };
