# DESIGN.md

## Design System & Guidelines

This document outlines the design patterns, conventions, and rules used in the Karbonized visual editor project.

## Core Design Principles

### Theme-Aware Design
- **Always use theme-aware colors** instead of hardcoded values
- Use `bg-background` instead of `bg-white` or `bg-black`
- Use `border-border` for borders that adapt to light/dark mode
- Use `text-foreground` for primary text
- Use `text-muted-foreground` for secondary text
- Use `bg-muted` for subtle background variations

### Visibility & Contrast
- Add `border border-border` to panels for better visibility against backgrounds
- Use `shadow-md` for floating panels to create depth
- Use `rounded-lg` for consistent rounded corners on panels
- Ensure separators are visible with proper spacing (`my-2`, `w-8`)

### Spacing & Layout
- Consistent gap: `gap-2` for most layouts
- Consistent padding: `p-2` for panels, `px-6 py-3` for controls
- Responsive breakpoints: Use `md:` prefix for desktop-specific styles
- Mobile-first approach: Base styles for mobile, override for larger screens

## Component Patterns

### Floating Panels
Floating panels (LeftPanel, RightPanel) should follow this pattern:
```tsx
<div className='bg-background shadow-md rounded-lg border border-border p-2'>
  {/* Content */}
</div>
```

### Tool Buttons
Tool buttons in docks should include:
- Hover effects: `hover:scale-110`
- Smooth transitions: `transition-all duration-200`
- Icon scaling: `scale-125` on hover
- Active state: `variant={isActive ? 'default' : 'ghost'}`

### Keyboard Shortcuts
- Display shortcuts in tooltips: `message={`${label} (${shortcut})`}`
- Show shortcut badges on buttons for main tools
- Badge styling: `absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded bg-primary text-[8px] font-bold text-primary-foreground`

### Separators
- Use `Separator` component from `@/components/ui/separator`
- Horizontal: `orientation='horizontal' className='my-2 w-8'`
- Vertical: `orientation='vertical'`
- Note: Horizontal separators have fixed height (1px), custom height classes are overridden

## Color System

### Theme Tokens
- `background`: Primary background color
- `foreground`: Primary text color
- `border`: Border color
- `muted`: Muted background
- `muted-foreground`: Muted text
- `primary`: Primary accent color
- `primary-foreground`: Text on primary background

### Usage Examples
```tsx
// Panel background
className='bg-background'

// Panel border
className='border border-border'

// Primary text
className='text-foreground'

// Secondary text
className='text-muted-foreground'

// Accent elements
className='bg-primary text-primary-foreground'
```

## Typography

### Font Sizes
- Labels: `text-lg font-semibold`
- Body text: `text-sm`
- Tooltips: `text-sm`
- Shortcut badges: `text-[8px] font-bold`

### Font Weights
- Bold: `font-bold`
- Semibold: `font-semibold`
- Normal: default

## Icon System

### Icon Library
- **Primary**: `lucide-react` (current standard)
- **Legacy**: `@tabler/icons-react` (being phased out)
- Use consistent icon sizes: `size={16}` for buttons, `size={20}` for settings

### Icon Usage
```tsx
import { IconName } from 'lucide-react';

<IconName size={16} className='text-foreground' />
```

## UI Components

### Component Sources
- **shadcn/ui**: `@/components/ui/` (Button, Separator, ScrollArea, etc.)
- **Radix UI**: Underlying primitive components
- **Custom**: `@/components/CustomControls/` (Tooltip, etc.)

### Common Components
- `Button`: Use `variant='default'` for active, `variant='ghost'` for inactive
- `Tooltip`: Custom component in CustomControls
- `Separator`: From shadcn/ui, handles orientation automatically
- `ScrollArea`: For scrollable content areas
- `DropdownMenu`: For overflow menus and actions

## Layout Patterns

### LeftPanel (Tool Dock)
- Vertical layout with tool buttons
- Overflow handling with dropdown menu
- macOS Dock-like magnification on hover
- Separator after main tools (first 4 items)
- Settings button at bottom

### RightPanel (Properties Panel)
- Tabbed interface (Control, Workspace, Hierarchy)
- Collapsible panel with toggle button
- Scrollable content areas
- Consistent spacing between sections

### Status Bar
- Fixed at bottom
- Displays current mode, zoom, workspace info
- Minimal height, full width

## Animation & Transitions

### Common Transitions
- Hover effects: `transition-all duration-200`
- Icon scaling: `transition-transform duration-200`
- Panel transitions: `transition-all`

### Animation Values
- Scale: `scale-110` on hover, `scale-125` for dock magnification
- Duration: `duration-200` for most interactions
- Timing: Default (ease-in-out)

## Responsive Design

### Breakpoints
- Mobile: Default (no prefix)
- Tablet/Desktop: `md:` prefix
- Use `md:w-fit md:max-w-40` for panel width constraints

### Mobile Considerations
- Full-width panels on mobile
- Collapsible panels
- Touch-friendly button sizes
- Simplified layouts for small screens

## State Management Patterns

### Store Usage
- Global state: `useStoreState` from Easy Peasy
- Actions: `useStoreActions` from Easy Peasy
- Local state: `useState` for component-specific state

### Common State Patterns
```tsx
// Reading state
const editing = useStoreState((state) => state.editing);

// Dispatching actions
const setEditing = useStoreActions((state) => state.setEditing);
```

## Accessibility

### Keyboard Navigation
- All interactive elements should be keyboard accessible
- Use semantic HTML elements
- Provide keyboard shortcuts for common actions
- Display shortcuts in tooltips

### Focus States
- Buttons should have visible focus states
- Use `variant` prop for active/inactive states
- Ensure sufficient color contrast

## File Structure

### Component Organization
```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── CustomControls/  # Custom UI components
│   ├── Panels/          # Left/Right panels
│   ├── Blocks/          # Canvas block components
│   └── Base/            # Base components (StatusBar, etc.)
├── pages/               # Main screens
├── stores/              # State management
└── utils/               # Utility functions
```

## Code Conventions

### Import Order
1. React and hooks
2. Third-party libraries
3. Internal components (absolute imports with `@/`)
4. Utilities and helpers
5. Types and interfaces

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: PascalCase for components, kebab-case for utilities

### Component Structure
```tsx
export const ComponentName: React.FC = () => {
  // 1. Hooks (useState, useEffect, etc.)
  // 2. Store state/actions
  // 3. Refs
  // 4. Derived values (useMemo, useCallback)
  // 5. Event handlers
  // 6. Effects
  // 7. Render

  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## Performance Considerations

### Memoization
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed to children
- Memoize tool arrays to prevent unnecessary re-renders

### Lazy Loading
- Use React.lazy for route components
- Lazy load heavy components when possible

### Render Optimization
- Avoid inline object creation in render
- Use stable keys in lists
- Minimize state updates in effects

## Platform Considerations

### Web vs Desktop
- The app supports web, Electron, and Tauri
- Use platform-specific APIs conditionally
- Test on all target platforms
- Handle platform-specific features (file dialogs, native menus)

### Electron Integration
- Main process: `src-electron/main.ts`
- Preload scripts for IPC
- Extension loading from `%APPDATA%/karbonized/extensions`

## Common Pitfalls

### Styling Issues
- Don't use hardcoded colors (bg-white, bg-black)
- Don't forget borders on floating panels
- Don't override Separator component's orientation-specific styles
- Don't use px values when Tailwind classes suffice

### State Management
- Don't mix local and global state unnecessarily
- Don't forget to update both controls list and properties
- Don't assume commented code is dead (features in transition)

### Component Structure
- Don't create circular dependencies
- Don't mix relative and absolute imports inconsistently
- Don't assume both Electron paths are equally active

## Future Improvements

### Design System
- Consider creating a design tokens file
- Standardize animation durations and easing
- Create a component storybook for visual testing
- Add automated accessibility testing

### Code Quality
- Add automated test suite
- Improve type coverage
- Standardize error handling
- Add performance monitoring

## Resources

### Documentation
- AGENTS.md: Project organization and conventions
- docs/plugin_system.md: Extension system documentation
- README.md: Project overview and setup

### External Resources
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://www.radix-ui.com
- Lucide Icons: https://lucide.dev
