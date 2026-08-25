/**
 * Kairos v01 — Custom Stylelint Plugin
 * Enforces Kairos design system constraints at the CSS linting level.
 *
 * Rules:
 *   kairos/no-border-radius      — border-radius must always be 0
 *   kairos/class-prefix          — all classes must start with "kairos-"
 *   kairos/custom-property-prefix — all custom properties must start with "--kairos-"
 */
const stylelint = require('stylelint');

/* ═══════════════════════════════════════════════════
   Rule: kairos/no-border-radius
   ═══════════════════════════════════════════════════ */
const noBorderRadius = stylelint.createPlugin('kairos/no-border-radius', (primary) => {
  return (root, result) => {
    const valid = stylelint.utils.validateOptions(result, 'kairos/no-border-radius', {
      actual: primary,
      possible: [true],
    });
    if (!valid) return;

    root.walkDecls('border-radius', (decl) => {
      const val = decl.value.trim();
      if (val !== '0' && val !== '0px' && !val.startsWith('var(--kairos-radius')) {
        stylelint.utils.report({
          message: 'Kairos: border-radius must be 0. الزوايا الحادة دائماً. Got: "' + val + '"',
          node: decl,
          result,
          ruleName: 'kairos/no-border-radius',
        });
      }
    });
  };
});

/* ═══════════════════════════════════════════════════
   Rule: kairos/class-prefix
   ═══════════════════════════════════════════════════ */
const classPrefix = stylelint.createPlugin('kairos/class-prefix', (primary) => {
  return (root, result) => {
    const valid = stylelint.utils.validateOptions(result, 'kairos/class-prefix', {
      actual: primary,
      possible: [true],
    });
    if (!valid) return;

    // Allowed non-kairos classes — short modifier/state classes scoped within kairos- parents
    const allowed = new Set([
      // State
      'active', 'open', 'show', 'checked', 'on', 'off', 'idle', 'live',
      'done', 'bypassed', 'locked', 'dest-locked', 'recording', 'streaming',
      'hidden', 'selected', 'sel', 'taken', 'next', 'prep', 'reversed',
      // Status
      'ok', 'warn', 'err', 'info', 'error', 'success', 'warning', 'danger',
      // Broadcast domain
      'pgm', 'pvw', 'aux', 'cut', 'auto', 'play', 'preview', 'pip',
      // Size
      'sm', 'md', 'lg', 'tiny', 'small', 'dense', 'compact',
      // Variant
      'dashed', 'dotted', 'thick', 'fast', 'slow',
      // Color
      'red', 'green', 'yellow',
      // Layout
      'h', 'v', 'top', 'bottom', 'left', 'right',
      'indent-1', 'indent-2', 'side-by-side', 'num',
      // Element
      'badge', 'tag', 'icon',
      // Count
      'one', 'two', 'three', 'four',
      // Inline feedback
      'i-success', 'i-error',
      // Misc
      'ar', 'sr-only',
    ]);
    // Allow icon-* prefix pattern as well
    const allowedPrefix = /^icon-/;

    root.walkRules((rule) => {
      if (!rule.selectors) return;
      rule.selectors.forEach((selector) => {
        const classes = selector.match(/\.[a-zA-Z][\w-]*/g);
        if (!classes) return;
        classes.forEach((cls) => {
          const name = cls.slice(1);
          if (!name.startsWith('kairos-') && !allowed.has(name) && !allowedPrefix.test(name)) {
            stylelint.utils.report({
              message: 'Kairos: Class ".kairos-' + name + '" must start with "kairos-". Found: "' + cls + '"',
              node: rule,
              result,
              ruleName: 'kairos/class-prefix',
            });
          }
        });
      });
    });
  };
});

/* ═══════════════════════════════════════════════════
   Rule: kairos/custom-property-prefix
   ═══════════════════════════════════════════════════ */
const customPropertyPrefix = stylelint.createPlugin('kairos/custom-property-prefix', (primary) => {
  return (root, result) => {
    const valid = stylelint.utils.validateOptions(result, 'kairos/custom-property-prefix', {
      actual: primary,
      possible: [true],
    });
    if (!valid) return;

    root.walkDecls(/^--(?!kairos-)/, (decl) => {
      stylelint.utils.report({
        message: 'Kairos: Custom property "' + decl.prop + '" must start with "--kairos-".',
        node: decl,
        result,
        ruleName: 'kairos/custom-property-prefix',
      });
    });
  };
});

/* ═══════════════════════════════════════════════════
   Rule: kairos/contract-enforcement
   ═══════════════════════════════════════════════════ */
const contractEnforcement = stylelint.createPlugin('kairos/contract-enforcement', (primary) => {
  return (root, result) => {
    const valid = stylelint.utils.validateOptions(result, 'kairos/contract-enforcement', {
      actual: primary,
      possible: [true],
    });
    if (!valid) return;

    const source = root.source && root.source.input && root.source.input.file;
    if (!source) return;

    const normalizedSource = source.replace(/\\/g, '/');
    if (!normalizedSource.includes('/src/components/') && !normalizedSource.includes('/src/domain/')) {
      return;
    }
    if (normalizedSource.endsWith('/src/components/components.css')) {
      return;
    }

    const regex = /var\(--kairos-(?:space|cs)-[^\)]+\)/g;

    root.walkDecls((decl) => {
      const val = decl.value;
      let match;
      while ((match = regex.exec(val)) !== null) {
        stylelint.utils.report({
          message: `Kairos Contract Enforcement: Direct use of foundation token "${match[0]}" is forbidden in components/domain. Use a contract token instead.`,
          node: decl,
          result,
          ruleName: 'kairos/contract-enforcement',
        });
      }
    });
  };
});

module.exports = [noBorderRadius, classPrefix, customPropertyPrefix, contractEnforcement];
