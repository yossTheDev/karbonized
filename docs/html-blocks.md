# HTML Blocks Documentation

## Overview

HTML Blocks in Karbonized allow you to create custom interactive components using HTML, CSS, and JavaScript. These blocks run in a secure iframe sandbox and provide powerful features like CSS variable controls and custom actions.

## Features

- **Secure iframe sandbox** execution
- **Live HTML/CSS/JavaScript editing** with syntax highlighting
- **Automatic CSS variable controls** generation
- **Custom action buttons** for interactive functionality
- **Real-time preview** with auto-refresh
- **Responsive design** with resize capabilities

## Getting Started

1. Click the **HTML** button (globe icon) in the left panel
2. The HTML Block will be added to your workspace
3. Use the control panel to edit your content

## CSS Variables System

The HTML Block automatically detects CSS variables and creates corresponding controls in the panel.

### Variable Naming Conventions

| Pattern | Type | Control | Example |
|---------|------|---------|---------|
| `*color*` | Color | Color Picker | `--primary-color: #3b82f6` |
| `*size*`, `*width*`, `*height*`, `*spacing*` | Number | Slider | `--text-size: 16px` |
| `*show*`, `*enable*`, `*visible*` | Boolean | Switch | `--show-border: true` |
| Hex values | Color | Color Picker | `--accent: #ff5733` |
| Numbers | Number | Slider | `--padding: 20` |

### CSS Variable Example

```css
:root {
  --primary-color: #3b82f6;
  --text-size: 16px;
  --show-border: true;
  --spacing: 20px;
  --border-radius: 8px;
}

.container {
  padding: var(--spacing);
  border: var(--show-border) ? 2px solid var(--primary-color) : none;
  border-radius: var(--border-radius);
}

.title {
  color: var(--primary-color);
  font-size: var(--text-size);
}
```

This will automatically generate:
- Color picker for `--primary-color`
- Slider for `--text-size` and `--spacing`
- Switch for `--show-border`
- Slider for `--border-radius`

## Custom Actions

Create interactive buttons by defining actions in your JavaScript code using the special comment syntax.

### Action Syntax

```javascript
// @action:Button Name
// JavaScript code to execute when button is clicked
```

### Action Example

```javascript
// @action:Change Background Color
document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);

// @action:Show Alert
alert('Hello from HTML Block!');

// @action:Fetch Data
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log('Data fetched:', data);
    document.getElementById('result').textContent = JSON.stringify(data);
  })
  .catch(error => console.error('Error:', error));

// @action:Reset Form
document.getElementById('myForm').reset();
```

## Complete Examples

### Example 1: Interactive Card Component

```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">Interactive Card</h2>
  </div>
  <div class="card-body">
    <p class="card-text">This is an interactive card component.</p>
    <button class="card-button" onclick="this.classList.toggle('active')">
      Toggle Active
    </button>
  </div>
</div>
```

```css
:root {
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --border-radius: 12px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --show-shadow: true;
}

.card {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: var(--border-radius);
  box-shadow: var(--show-shadow) ? var(--shadow) : none;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  background: var(--primary-color);
  color: white;
  padding: 1rem;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
}

.card-body {
  padding: 1.5rem;
}

.card-text {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.card-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-button:hover {
  opacity: 0.9;
}

.card-button.active {
  background: var(--text-color);
}
```

```javascript
// @action:Randomize Colors
const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
document.documentElement.style.setProperty('--primary-color', randomColor);

// @action:Toggle Shadow
const currentShadow = getComputedStyle(document.documentElement).getPropertyValue('--show-shadow').trim();
document.documentElement.style.setProperty('--show-shadow', currentShadow === 'true' ? 'false' : 'true');

// @action:Animate Card
document.querySelector('.card').style.transform = 'scale(1.05)';
setTimeout(() => {
  document.querySelector('.card').style.transform = 'scale(1)';
}, 300);
```

### Example 2: Data Dashboard Widget

```html
<div class="dashboard">
  <div class="dashboard-header">
    <h3>Live Dashboard</h3>
    <div class="metric" id="metric1">0</div>
  </div>
  <div class="dashboard-content">
    <div class="chart-container">
      <div class="chart-bar" style="height: 20%"></div>
      <div class="chart-bar" style="height: 40%"></div>
      <div class="chart-bar" style="height: 60%"></div>
      <div class="chart-bar" style="height: 80%"></div>
      <div class="chart-bar" style="height: 100%"></div>
    </div>
  </div>
</div>
```

```css
:root {
  --dashboard-bg: #f8fafc;
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --border-radius: 8px;
  --chart-color: #3b82f6;
  --animation-speed: 2s;
  --show-grid: true;
}

.dashboard {
  background: var(--dashboard-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  font-family: Arial, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.dashboard-header h3 {
  margin: 0;
  color: var(--secondary-color);
}

.metric {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

.chart-container {
  display: flex;
  align-items: end;
  height: 100px;
  gap: 8px;
  border: var(--show-grid) ? 1px dashed #e5e7eb : none;
  padding: 1rem;
}

.chart-bar {
  background: var(--chart-color);
  flex: 1;
  border-radius: 4px 4px 0 0;
  transition: height var(--animation-speed) ease;
}
```

```javascript
let counter = 0;
setInterval(() => {
  counter++;
  document.getElementById('metric1').textContent = counter;
}, 1000);

// @action:Randomize Chart
const bars = document.querySelectorAll('.chart-bar');
bars.forEach(bar => {
  const randomHeight = Math.floor(Math.random() * 80) + 20;
  bar.style.height = randomHeight + '%';
});

// @action:Change Chart Color
const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
document.documentElement.style.setProperty('--chart-color', randomColor);

// @action:Reset Counter
counter = 0;
document.getElementById('metric1').textContent = counter;

// @action:Toggle Grid
const currentGrid = getComputedStyle(document.documentElement).getPropertyValue('--show-grid').trim();
document.documentElement.style.setProperty('--show-grid', currentGrid === 'true' ? 'false' : 'true');
```

### Example 3: Form Component

```html
<div class="form-container">
  <form id="contactForm">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4"></textarea>
    </div>
    <button type="submit" class="submit-btn">Send Message</button>
  </form>
  <div id="formResult" class="form-result"></div>
</div>
```

```css
:root {
  --form-bg: #ffffff;
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --border-color: #d1d5db;
  --success-color: #10b981;
  --error-color: #ef4444;
  --border-radius: 8px;
  --form-padding: 2rem;
}

.form-container {
  background: var(--form-bg);
  border-radius: var(--border-radius);
  padding: var(--form-padding);
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.submit-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.submit-btn:hover {
  opacity: 0.9;
}

.form-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  display: none;
}

.form-result.success {
  background: var(--success-color);
  color: white;
  display: block;
}

.form-result.error {
  background: var(--error-color);
  color: white;
  display: block;
}
```

```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  const resultDiv = document.getElementById('formResult');
  resultDiv.textContent = `Form submitted! Name: ${data.name}, Email: ${data.email}`;
  resultDiv.className = 'form-result success';
  
  setTimeout(() => {
    resultDiv.className = 'form-result';
  }, 3000);
});

// @action:Fill Sample Data
document.getElementById('name').value = 'John Doe';
document.getElementById('email').value = 'john@example.com';
document.getElementById('message').value = 'This is a sample message.';

// @action:Clear Form
document.getElementById('contactForm').reset();
document.getElementById('formResult').className = 'form-result';

// @action:Validate Form
const form = document.getElementById('contactForm');
if (form.checkValidity()) {
  alert('Form is valid!');
} else {
  alert('Please fill in all required fields.');
}
```

## Security Considerations

- HTML Blocks run in a secure iframe sandbox
- By default, only `allow-scripts`, `allow-same-origin`, and `allow-forms` are permitted
- External resource loading may be restricted depending on sandbox settings
- Always validate user inputs in your JavaScript code

## Best Practices

1. **Use semantic HTML5** for better structure and accessibility
2. **Organize CSS variables** with clear naming conventions
3. **Add comments** to explain complex JavaScript logic
4. **Test actions thoroughly** before using them in production
5. **Use responsive design** principles for better mobile experience
6. **Optimize performance** by avoiding heavy computations in actions

## Troubleshooting

### Common Issues

1. **Variables not appearing in controls**
   - Ensure variables are defined in `:root` selector
   - Check variable naming follows conventions
   - Verify CSS syntax is correct

2. **Actions not working**
   - Check JavaScript syntax for errors
   - Ensure action comment format is correct: `// @action:Name`
   - Check browser console for error messages

3. **Styling not applying**
   - Verify CSS syntax is valid
   - Check if variables are properly referenced
   - Ensure CSS specificity is correct

4. **Iframe not loading**
   - Check if sandbox mode is enabled/disabled appropriately
   - Verify HTML syntax is valid
   - Check browser console for security restrictions

## API Reference

### HTML Block API

The HTML Block provides a global API object `window.htmlBlockAPI` for advanced functionality:

```javascript
// Log messages to parent console
window.htmlBlockAPI.log('Debug message');

// Request refresh from parent
window.htmlBlockAPI.refresh();
```

### CSS Variable Types

| Type | Input Range | Default Range |
|------|-------------|---------------|
| Color | Any valid CSS color | N/A |
| Number | Any numeric value | 0-1000 (configurable) |
| Boolean | true/false | N/A |
| String | Any text | N/A |

## Conclusion

HTML Blocks provide a powerful way to create custom interactive components in Karbonized. By leveraging CSS variables and custom actions, you can build sophisticated user interfaces with real-time editing capabilities.

For more examples and advanced usage patterns, refer to the example blocks included in the documentation or explore the community templates.
