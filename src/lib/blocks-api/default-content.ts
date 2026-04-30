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
if (container) {
  try {
    htmlBlockAPI.safeDOM.setStyle(container, 'backgroundColor', '#' + Math.floor(Math.random()*16777215).toString(16));
    console.log('Background color changed successfully');
  } catch (error) {
    console.error('Error changing background:', error);
  }
} else {
  console.warn('Container element not found');
}

// @action:Add Random Element
const containerEl = htmlBlockAPI.safeDOM.querySelector('.container');
console.log('root:', root);
console.log('containerEl:', containerEl); 
 
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
            } else {
                htmlBlockAPI.safeDOM.appendChild(containerEl, newElement);
            }
            console.log('Element added successfully');
        }
    } catch (error) {
        console.error('Error adding element:', error);
    }
} else {
    console.warn('Container element not found for adding element');
}

// @action:Modify CSS Variables
try {
  const rootElement = document.documentElement || host;
  rootElement.style.setProperty('--primary-color', '#' + Math.floor(Math.random()*16777215).toString(16));
  rootElement.style.setProperty('--text-size', (Math.floor(Math.random() * 20) + 12) + 'px');
  console.log('CSS variables modified successfully');
} catch (error) {
  console.error('Error modifying CSS variables:', error);
}

// @action:Toggle Border Visibility
try {
  const rootElement = document.documentElement || host;
  const currentBorder = getComputedStyle(rootElement).getPropertyValue('--show-border').trim();
  rootElement.style.setProperty('--show-border', currentBorder === 'true' ? 'false' : 'true');
  console.log('Border visibility toggled successfully');
} catch (error) {
  console.error('Error toggling border:', error);
}

// @action:Clear All Added Elements
const containerClear = htmlBlockAPI.safeDOM.querySelector('.container');
if (containerClear) {
  try {
    const elements = htmlBlockAPI.safeDOM.querySelectorAll('div[style*="background-color"]');
    // Convert NodeList to array and remove each element
    Array.from(elements).forEach(el => {
      if (el && el.parentNode) {
        htmlBlockAPI.safeDOM.removeChild(el.parentNode, el);
      }
    });
    console.log('Elements cleared successfully');
  } catch (error) {
    console.error('Error clearing elements:', error);
  }
} else {
  console.warn('Container element not found for clearing');
}

// @action:Log DOM Info
try {
  const containerInfo = htmlBlockAPI.safeDOM.querySelector('.container');
  console.log('Container element:', containerInfo);
  const rootElement = document.documentElement || host;
  console.log('Current CSS variables:', {
    primaryColor: getComputedStyle(rootElement).getPropertyValue('--primary-color'),
    textSize: getComputedStyle(rootElement).getPropertyValue('--text-size'),
    showBorder: getComputedStyle(rootElement).getPropertyValue('--show-border')
  });
  alert('Check console for DOM information!');
} catch (error) {
  console.error('Error logging DOM info:', error);
}`;

export const defaultAutoRefresh = true;
export const defaultShowDevTools = false;
export const defaultAllowScriptExecution = false;
