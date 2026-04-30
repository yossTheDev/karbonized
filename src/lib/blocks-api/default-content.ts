/**
 * Default content for HTML Block component
 * Contains example HTML, CSS, and JavaScript to demonstrate functionality
 */

export const defaultHTMLContent = `<div class="container">
  <h1>Hello World!</h1>
  <p id="counter-display">Counter: 0</p>
  <p>Edit this content in the HTML tab</p>
  <p>Use CSS variables in the :root selector to create dynamic controls.</p>
  <p>Add custom actions using // @action:Name syntax in JavaScript.</p>
  <p>Define JS variables using // @var name:type = value syntax.</p>
</div>`;

export const defaultCSSContent = `:root {
  --text-size: 16px;
  --show-border: true;
  --spacing: 20px;
}

.container {
  padding: var(--spacing);
  border: var(--show-border) ? 2px solid var(--js-accent-color) : none;
  text-align: center;
  background-color: #f8f9fa;
}

h1 {
  color: var(--js-accent-color);
  font-size: var(--text-size);
}

p {
  margin-bottom: var(--spacing);
}`;

export const defaultJSContent = `// JavaScript Variables Demo
// Define variables using // @var syntax: // @var name:type = value

// @var message:string = "Hello from JS Variables!"
// @var counter:number = 0
// @var isEnabled:boolean = true
// @var accentColor:color = #ff6b6b
// @var bgGradient:gradient = linear-gradient(45deg, #667eea, #764ba2)
// @var imageUrl:url = https://picsum.photos/200
// @var config:object = {"theme": "dark", "animations": true}
// @var tags:array = ["react", "javascript", "html"]

// Set CSS custom property from JS variable
function updateCSSFromJS() {
  const rootElement = document.documentElement || host;
  rootElement.style.setProperty('--js-accent-color', accentColor);
}

// Example function that uses JS variables
function updateDisplay() {
  const container = htmlBlockAPI.safeDOM.querySelector('.container');
  if (container) {
    // Update CSS custom property first
    updateCSSFromJS();
    
    // Use the message variable
    const h1 = htmlBlockAPI.safeDOM.querySelector('h1');
    if (h1) {
      h1.textContent = message;
    }
    
    // Update counter display
    const counterDisplay = htmlBlockAPI.safeDOM.querySelector('#counter-display');
    if (counterDisplay) {
      counterDisplay.textContent = 'Counter: ' + counter;
    }
    
    // Apply gradient background if enabled
    if (isEnabled) {
      container.style.background = bgGradient;
      container.style.color = 'white';
    } else {
      container.style.background = '#f8f9fa';
      container.style.color = 'black';
    }
    
    log('Display updated with JS variables');
  }
}

// Function to demonstrate array usage
function displayTags() {
  const container = htmlBlockAPI.safeDOM.querySelector('.container');
  if (container && tags.length > 0) {
    // Remove existing tags
    const existingTags = htmlBlockAPI.safeDOM.querySelectorAll('.tag');
    existingTags.forEach(tag => tag.remove());
    
    // Add new tags
    tags.forEach(tagText => {
      const tagElement = htmlBlockAPI.safeDOM.createElement('span');
      tagElement.textContent = tagText;
      tagElement.className = 'tag';
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'display', 'inline-block');
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'padding', '4px 8px');
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'margin', '2px');
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'background', accentColor);
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'color', 'white');
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'border-radius', '4px');
      htmlBlockAPI.safeDOM.setStyle(tagElement, 'font-size', '12px');
      htmlBlockAPI.safeDOM.appendChild(container, tagElement);
    });
    
    log('Tags displayed: ' + tags.join(', '));
  }
}

// Initialize display on load
updateCSSFromJS();
updateDisplay();
displayTags();

// @action:Increment Counter
counter += 1;
updateDisplay();
log('Counter incremented to: ' + counter);

// @action:Toggle Enable State
isEnabled = !isEnabled;
updateDisplay();
log('Enable state toggled to: ' + isEnabled);

// @action:Random Color
accentColor = '#' + Math.floor(Math.random()*16777215).toString(16);
updateCSSFromJS();
updateDisplay();
displayTags();
log('Color changed to: ' + accentColor);

// @action:Add Tag
const newTag = 'tag' + (tags.length + 1);
tags.push(newTag);
displayTags();
log('Added tag: ' + newTag);

// @action:Reset Counter
counter = 0;
updateDisplay();
log('Counter reset to: ' + counter);

// @action:Update Message
message = "Updated at " + new Date().toLocaleTimeString();
updateDisplay();
log('Message updated: ' + message);

// @action:Log All Variables
log('=== JS Variables Status ===');
log('Message: ' + message);
log('Counter: ' + counter);
log('Enabled: ' + isEnabled);
log('Color: ' + accentColor);
log('Gradient: ' + bgGradient);
log('Image URL: ' + imageUrl);
log('Config: ' + JSON.stringify(config));
log('Tags: ' + JSON.stringify(tags));
log('==========================');`;

export const defaultAutoRefresh = true;
export const defaultShowDevTools = false;
export const defaultAllowScriptExecution = false;
