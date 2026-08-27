document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------------
     1. Inventory Definition (Moved from components.js)
     ------------------------------------------------------------------------- */
  const KairosInventory = [
    {
      category: "P1: Foundation",
      items: [
        { id: "typography", name: "Typography", key: "P1" }
      ]
    },
    {
      category: "P2: Content Primitives",
      items: [
        { id: "icons", name: "Icons", key: "P2" },
        { id: "badges", name: "Badges", key: "P2" },
        { id: "kbd", name: "Kbd", key: "P2" },
        { id: "code", name: "Code", key: "P2" },
        { id: "link", name: "Link", key: "P2" },
        { id: "data-display", name: "Data Display", key: "P2" },
        { id: "heading", name: "Heading", key: "P2" },
        { id: "paragraph", name: "Paragraph", key: "P2" },
        { id: "divider", name: "Divider", key: "P2" },
        { id: "layout", name: "Layout", key: "P2" }
      ]
    },
    {
      category: "P3: Feedback Primitives",
      items: [
        { id: "alert", name: "Alert", key: "P3" },
        { id: "status-dot", name: "Status Dot", key: "P3" },
        { id: "indicator", name: "Indicator", key: "P3" },
        { id: "tag", name: "Tag", key: "P3" },
        { id: "loading", name: "Loading", key: "P3" },
        { id: "progress", name: "Progress", key: "P3" }
      ]
    },
    {
      category: "P4: Input Primitives",
      items: [
        { id: "checkbox", name: "Checkbox", key: "P4" },
        { id: "radio", name: "Radio", key: "P4" },
        { id: "buttons", name: "Buttons", key: "P4" },
        { id: "switch", name: "Switch", key: "P4" },
        { id: "forms", name: "Forms", key: "P4" },
        { id: "slider", name: "Slider", key: "P4" },
        { id: "tag-input", name: "Tag Input", key: "P4" }
      ]
    },
    {
      category: "P6: Overlay Primitives",
      items: [
        { id: "surface", name: "Surface", key: "P6" },
        { id: "overlay", name: "Overlay", key: "P6" }
      ]
    },
    {
      category: "P8: Composites",
      items: [
        { id: "accordion", name: "Accordion", key: "P8" }
      ]
    }
  ];

  /* -------------------------------------------------------------------------
     2. Build Sidebar Navigation from Inventory
     ------------------------------------------------------------------------- */
  const sidebarNav = document.getElementById('sidebar-nav');
  const mainViewer = document.getElementById('main-viewer');
  
  if (KairosInventory) {
    let navHTML = '';
    KairosInventory.forEach((category, ci) => {
      navHTML += `
        <div class="kairos-sidebar-group">
          <div class="kairos-sidebar-heading">${category.category}</div>
      `;
      category.items.forEach((item, ii) => {
        navHTML += `
          <div class="kairos-sidebar-item kairos-justify-between" data-component="${item.id}"${ci === 0 && ii === 0 ? ' data-state="active"' : ''}>
            <span class="kairos-font-bold">${item.name}</span>
            <span class="kairos-text-xs kairos-text-color-muted kairos-font-mono">${item.key}</span>
          </div>
        `;
      });
      navHTML += `</div>`;
    });
    sidebarNav.innerHTML = navHTML;
  }

  /* -------------------------------------------------------------------------
     3. Component Loader Injection Engine (Using Fetch)
     ------------------------------------------------------------------------- */
  const navItems = document.querySelectorAll('[data-component]');
  
  async function loadComponent(compId) {
    try {
      const response = await fetch(`showcase-data/${compId}.html`);
      if (!response.ok) throw new Error('Not found');
      
      const htmlText = await response.text();
      mainViewer.innerHTML = htmlText;
    } catch (error) {
      mainViewer.innerHTML = `
        <div class="kairos-flex kairos-col kairos-gap-standard kairos-p-loose kairos-bg-surface kairos-border kairos-border-color-muted">
          <h2 class="kairos-text-xl kairos-text-color-warning">Component Not Built Yet</h2>
          <p class="kairos-text-color-muted">The HTML file "showcase-data/${compId}.html" could not be loaded via fetch(). Check if the server is running.</p>
        </div>
      `;
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.removeAttribute('data-state'));
      item.setAttribute('data-state', 'active');
      const compId = item.getAttribute('data-component');
      loadComponent(compId);
    });
  });

  // Load first component by default if exists
  if (navItems.length > 0) {
    navItems[0].click();
  }


  /* -------------------------------------------------------------------------
     3. Omni-Token Controller (Live CSS Override)
     ------------------------------------------------------------------------- */
  const colorInputs = document.querySelectorAll('input[type="color"][data-token]');
  const btnReset = document.getElementById('reset-tokens');

  // Hex to RGBA Converter for Alpha calculations
  function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function updateToken(tokenName, hexValue) {
    // 1. Set the main token
    document.documentElement.style.setProperty(tokenName, hexValue);

    // 2. Automatically compute alpha variants for PGM
    if (tokenName === '--kairos-status-pgm') {
      document.documentElement.style.setProperty('--kairos-pgm-alpha-10', hexToRgba(hexValue, 0.1));
      document.documentElement.style.setProperty('--kairos-pgm-alpha-15', hexToRgba(hexValue, 0.15));
      document.documentElement.style.setProperty('--kairos-pgm-alpha-20', hexToRgba(hexValue, 0.2));
      document.documentElement.style.setProperty('--kairos-pgm-alpha-30', hexToRgba(hexValue, 0.3));
      document.documentElement.style.setProperty('--kairos-border-error', hexValue);
      // Brighter version for active (naive calculation, just re-use hex for now)
      document.documentElement.style.setProperty('--kairos-pgm-bright', hexValue); 
    }

    // 3. Automatically compute alpha variants for PVW
    if (tokenName === '--kairos-status-pvw') {
      document.documentElement.style.setProperty('--kairos-pvw-alpha-10', hexToRgba(hexValue, 0.1));
      document.documentElement.style.setProperty('--kairos-pvw-alpha-15', hexToRgba(hexValue, 0.15));
      document.documentElement.style.setProperty('--kairos-pvw-alpha-20', hexToRgba(hexValue, 0.2));
      document.documentElement.style.setProperty('--kairos-pvw-alpha-30', hexToRgba(hexValue, 0.3));
      document.documentElement.style.setProperty('--kairos-pvw-alpha-40', hexToRgba(hexValue, 0.4));
      document.documentElement.style.setProperty('--kairos-pvw-alpha-80', hexToRgba(hexValue, 0.8));
      document.documentElement.style.setProperty('--kairos-pvw-bright', hexValue);
    }
  }

  // Attach Listeners
  colorInputs.forEach(input => {
    // Store original default value for reset
    input.setAttribute('data-default', input.value);
    
    input.addEventListener('input', (e) => {
      const token = e.target.getAttribute('data-token');
      updateToken(token, e.target.value);
    });
  });

  // Reset functionality
  btnReset.addEventListener('click', () => {
    colorInputs.forEach(input => {
      const def = input.getAttribute('data-default');
      input.value = def;
      updateToken(input.getAttribute('data-token'), def);
    });
  });

});
