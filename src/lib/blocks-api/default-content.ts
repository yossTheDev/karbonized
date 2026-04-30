/**
 * Default content for HTML Block component
 * Contains example HTML, CSS, and JavaScript to demonstrate functionality
 */

export const defaultHTMLContent = `<div class="container">
  <h1>Hello World!</h1>
  <p>Edit this content in the HTML tab</p>
  <p>Use CSS variables in the :root selector to create dynamic controls.</p>
  <p>Add custom actions using // @action:Name syntax in JavaScript.</p>
</div>`;

export const defaultCSSContent = `:root {
  --primary-color: #3b82f6;
  --text-size: 16px;
  --show-border: true;
  --spacing: 20px;
}

.container {
  padding: var(--spacing);
  border: var(--show-border) ? 2px solid var(--primary-color) : none;
  text-align: center;
  background-color: #f8f9fa;
}

h1 {
  color: var(--primary-color);
  font-size: var(--text-size);
}

p {
  margin-bottom: var(--spacing);
}`;

export const defaultJSContent = `// Custom JavaScript code
// This demonstrates the power of HTML Block with arbitrary code execution

// @action:Change Container Background
const container = htmlBlockAPI.safeDOM.querySelector('.container');
log('Container found: ' + (container ? 'yes' : 'no'));
if (container) {
  try {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    log('Attempting to change background to: ' + randomColor);
    
    if (container.style) {
      container.style.backgroundColor = randomColor;
      log('Direct style assignment completed');
    }
  
    log('Background color change attempt completed');
  } catch (error) {
    error('Error changing background: ' + error);
  }
} else {
  warn('Container element not found');
}

// @action:Add Random Element
const containerEl = htmlBlockAPI.safeDOM.querySelector('.container');
log('root: ' + (root ? 'found' : 'not found'));
log('containerEl: ' + (containerEl ? 'found' : 'not found')); 
 
if (containerEl) {
    try {
        const newElement = htmlBlockAPI.safeDOM.createElement('div');
        if (newElement) {
            newElement.textContent = 'Dynamic element ' + Date.now();
            htmlBlockAPI.safeDOM.setStyle(newElement, 'padding', '10px');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'margin', '5px');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'backgroundColor', '#f0f0f0');
            htmlBlockAPI.safeDOM.setStyle(newElement, 'border', '1px solid #ccc');
            
            // Use the safe API to append child
            if (root) {
                htmlBlockAPI.safeDOM.appendChild(root, newElement);
                log('Element added to root successfully');
            } else {
                htmlBlockAPI.safeDOM.appendChild(containerEl, newElement);
                log('Element added to container successfully');
            }
        }
    } catch (error) {
        error('Error adding element: ' + error);
    }
} else {
    warn('Container element not found for adding element');
}

// @action:Modify CSS Variables
try {
  const rootElement = document.documentElement || host;
  const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  const newSize = (Math.floor(Math.random() * 20) + 12) + 'px';
  rootElement.style.setProperty('--primary-color', newColor);
  rootElement.style.setProperty('--text-size', newSize);
  log('CSS variables modified - Color: ' + newColor + ', Size: ' + newSize);
} catch (error) {
  error('Error modifying CSS variables: ' + error);
}

// @action:Toggle Border Visibility
try {
  const rootElement = document.documentElement || host;
  const currentBorder = getComputedStyle(rootElement).getPropertyValue('--show-border').trim();
  const newBorder = currentBorder === 'true' ? 'false' : 'true';
  rootElement.style.setProperty('--show-border', newBorder);
  log('Border visibility toggled to: ' + newBorder);
} catch (error) {
  error('Error toggling border: ' + error);
}

// @action:Clear All Added Elements
const containerClear = htmlBlockAPI.safeDOM.querySelector('.container');
if (containerClear) {
  try {
    const elements = htmlBlockAPI.safeDOM.querySelectorAll('div[style*="background-color"]');
    let clearedCount = 0;
    // Convert NodeList to array and remove each element
    Array.from(elements).forEach(el => {
      if (el && el.parentNode) {
        htmlBlockAPI.safeDOM.removeChild(el.parentNode, el);
        clearedCount++;
      }
    });
    log('Elements cleared successfully: ' + clearedCount + ' elements removed');
  } catch (error) {
    error('Error clearing elements: ' + error);
  }
} else {
  warn('Container element not found for clearing');
}

// @action:Log DOM Info
try {
  const containerInfo = htmlBlockAPI.safeDOM.querySelector('.container');
  log('Container element: ' + (containerInfo ? 'found' : 'not found'));
  const rootElement = document.documentElement || host;
  const cssVars = {
    primaryColor: getComputedStyle(rootElement).getPropertyValue('--primary-color'),
    textSize: getComputedStyle(rootElement).getPropertyValue('--text-size'),
    showBorder: getComputedStyle(rootElement).getPropertyValue('--show-border')
  };
  log('Current CSS variables: ' + JSON.stringify(cssVars));
  log('DOM information logged - check DevTools console for details!');
} catch (error) {
  error('Error logging DOM info: ' + error);
}`;

export const defaultAutoRefresh = true;
export const defaultShowDevTools = false;
export const defaultAllowScriptExecution = false;
