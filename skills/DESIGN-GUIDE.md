# Karbonized Design Guide

This document outlines the design system and styling rules used throughout the Karbonized project.

## Color System

### Color Space
- **Primary color space**: OKLCH (perceptually uniform color space)
- **Mixing function**: `color-mix(in oklab, ...)` for transparency and color blending

### Light Mode Colors
- **Background**: `oklch(1 0 0)` (pure white)
- **Foreground**: `oklch(0.145 0 0)` (near black)
- **Card**: `oklch(1 0 0)` (white)
- **Primary**: `oklch(0.205 0 0)` (dark gray)
- **Secondary**: `oklch(0.97 0 0)` (light gray)
- **Muted**: `oklch(0.97 0 0)` (light gray)
- **Accent**: `#F43F5E` (rose/rose-500)
- **Destructive**: `oklch(0.577 0.245 27.325)` (red)
- **Border**: `oklch(0.922 0 0)` (light gray)
- **Input**: `oklch(0.922 0 0)` (light gray)

### Dark Mode Colors
- **Background**: `oklch(0.145 0 0)` (near black)
- **Foreground**: `oklch(0.985 0 0)` (near white)
- **Card**: `oklch(0.205 0 0)` (dark gray)
- **Primary**: `oklch(0.922 0 0)` (light gray)
- **Secondary**: `oklch(0.269 0 0)` (dark gray)
- **Muted**: `oklch(0.269 0 0)` (dark gray)
- **Accent**: `#F43F5E` (rose/rose-500 - unchanged)
- **Destructive**: `oklch(0.704 0.191 22.216)` (lighter red)
- **Border**: `oklch(1 0 0 / 10%)` (white with 10% opacity)
- **Input**: `oklch(1 0 0 / 15%)` (white with 15% opacity)
- **Dark Base 100**: `#212121`
- **Dark Base 200**: `#161618`
- **Dark Base 300**: `#161616`

## Typography

### Font Families
- **Sans font**: `'Noto Sans Variable', sans-serif` (default body text)
- **Heading font**: `'Outfit Variable', sans-serif` (headings and titles)

### Font Sizes
- **Labels**: `text-xs` (12px)
- **Body text**: `text-sm` (14px)
- **Shortcuts**: `text-xs` with `tracking-widest`

## Glassmorphism System

### Glass Surface
Used for general glass surfaces (panels, sidebars, etc.)

**Light mode**:
- Background: `color-mix(in oklab, var(--color-input) 76%, transparent)`
- Backdrop filter: `blur(14px) saturate(118%) contrast(1.01)`
- Border: `1px solid rgb(255 255 255 / 8%)`
- Noise texture: SVG fractal noise with 2.8% opacity
- Inner shadow: `inset 0 1px 0 color-mix(in oklab, white 14%, transparent)`

**Dark mode**:
- Background: `color-mix(in oklab, var(--color-dark-base-200) 82%, transparent)`
- Backdrop filter: `blur(16px) saturate(124%) contrast(1.02)`
- Border: `1px solid rgb(255 255 255 / 7%)`
- Inner shadow: `inset 0 1px 0 color-mix(in oklab, white 11%, transparent)`

### Glass Popover
Used for dropdowns, context menus, and popovers

**Light mode**:
- Background: `color-mix(in oklab, var(--color-popover) 64%, transparent)`
- Backdrop filter: `blur(32px) saturate(155%) contrast(1.06)`
- Border: `1px solid rgb(255 255 255 / 16%)`
- Multi-layer gradient with pink and blue accents
- Complex inner shadows with colored edges

**Dark mode**:
- Background: `color-mix(in oklab, var(--color-dark-base-300) 80%, transparent)`
- Backdrop filter: `blur(38px) saturate(160%) contrast(1.09)`
- Border: `1px solid rgb(255 255 255 / 13%)`
- Enhanced gradient and shadow effects

### Glass Slider Track
Used for slider component backgrounds

**Light mode**:
- Background: `color-mix(in oklab, var(--color-input) 70%, transparent)`
- Backdrop filter: `blur(18px) saturate(125%)`
- Border: `1px solid rgb(255 255 255 / 9%)`

**Dark mode**:
- Background: `color-mix(in oklab, var(--color-dark-base-300) 84%, transparent)`
- Backdrop filter: `blur(22px) saturate(135%)`

### Glass Slider Range
Used for the filled portion of sliders

- Gradient from accent color with white highlight at center
- Inner shadow: `inset 0 1px 0 color-mix(in oklab, white 22%, transparent)`
- Border: `0 0 0 1px color-mix(in oklab, var(--color-accent) 26%, transparent)`
- Transition: `width 180ms ease-out, height 180ms ease-out, background 220ms ease`

### Glass Slider Thumb
Used for slider handles

**Light mode**:
- Background: `color-mix(in oklab, var(--color-accent) 16%, var(--color-background) 84%)`
- Backdrop filter: `blur(10px) saturate(120%)`
- Border: `1px solid color-mix(in oklab, var(--color-accent) 36%, white 18%)`
- Drop shadow: `0 2px 10px color-mix(in oklab, var(--color-accent) 16%, black 84%)`

**Dark mode**:
- Background: `color-mix(in oklab, var(--color-dark-base-200) 78%, var(--color-accent) 22%)`
- Border: `1px solid color-mix(in oklab, var(--color-accent) 42%, white 10%)`
- Drop shadow: `0 2px 12px color-mix(in oklab, var(--color-accent) 20%, black 80%)`

## Border Radius

- **Global default**: `0.625rem` (10px)
- **Containers (popovers, menus)**: `rounded-3xl` (24px)
- **Items (menu items, buttons)**: `rounded-2xl` (16px)
- **Triggers**: `rounded-xl` (12px)

## Spacing

### Padding
- **Menu items**: `px-3 py-2` (12px horizontal, 8px vertical)
- **Menu content**: `p-1.5` (6px)
- **Inset items**: `pl-9.5` (38px left padding for nested items)
- **Labels**: `px-3 py-2.5` or `px-3.5 py-2.5`

### Gaps
- **Item content**: `gap-2.5` (10px)
- **Menu items**: `gap-2.5` (10px)

## Shadows

- **Drop shadows**: `shadow-lg` for popovers and menus
- **Ring borders**: `ring-1 ring-foreground/5` (light mode), `ring-foreground/10` (dark mode)
- **Inner shadows**: Used extensively in glass effects for depth

## Transitions

### Liquid Motion
- **Timing function**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Duration**: `260ms`
- Apply `.liquid-motion` class for smooth, natural animations

### Component Transitions
- **Slider**: `180ms ease-out` for dimensions, `220ms ease` for background
- **Menu animations**: `duration-100` with fade and zoom effects

## Component Patterns

### Buttons

#### Ghost Flat Button
- Background: `transparent`
- Border: `1px solid transparent`
- Box shadow: `none`
- Hover: `color-mix(in oklab, var(--color-muted) 72%, transparent)`
- Active/open: `color-mix(in oklab, var(--color-muted) 78%, transparent)`

### Menu Items

**Default state**:
- Cursor: `cursor-default`
- Select: `select-none`
- Outline: `outline-hidden`
- Padding: `px-3 py-2`
- Font: `text-sm font-medium`
- Border radius: `rounded-2xl`
- Gap: `gap-2.5`

**Focus state**:
- Background: `focus:bg-accent`
- Text: `focus:text-accent-foreground`

**Destructive variant**:
- Text: `text-destructive`
- Focus background: `focus:bg-destructive/10` (light), `focus:bg-destructive/20` (dark)
- Focus text: `focus:text-destructive`

**Disabled state**:
- Pointer events: `none`
- Opacity: `50%`

### Separators
- Height: `h-px` (1px)
- Background: `bg-border/50`
- Margin: `-mx-1.5 my-1.5` (negative horizontal margin to span full width)

### Icons
- Default size: `size-4` (16px)
- Pointer events: `none`
- Shrink: `shrink-0`
- Color inheritance: Icons inherit text color from parent

## Animations

### Accordion
- **Down**: `accordion-down 0.2s ease-out`
- **Up**: `accordion-up 0.2s ease-out`

### Menu/Popover
- **Open**: `animate-in fade-in-0 zoom-in-95`
- **Close**: `animate-out fade-out-0 zoom-out-95`
- **Slide in**: Based on side (top/bottom/left/right) with 2px offset

## Accessibility

- **Focus rings**: All elements use `outline-ring/50` by default
- **Focus states**: Clear visual feedback with background and text color changes
- **Disabled states**: Reduced opacity and no pointer events
- **Keyboard navigation**: Full keyboard support via Radix UI primitives

## Utility Classes

### Common Combinations
- **Glass popover**: Apply `.glass-popover` to menu/dropdown content
- **Ghost button**: Apply `.btn-ghost-flat` for transparent buttons
- **Liquid motion**: Apply `.liquid-motion` for smooth transitions

### Data Attributes
- **Slots**: Use `data-slot` for component identification
- **States**: Use `data-state`, `data-inset`, `data-variant` for state-based styling
- **Radix states**: Use Radix UI data attributes for animation states

## Dark Mode

Dark mode is activated via the `.dark` class on the `html` element. All glass components have specific dark mode variants with:
- Increased blur values
- Adjusted saturation and contrast
- Modified opacity levels
- Enhanced gradient effects
- Dark base colors for backgrounds

## Implementation Notes

- Use `cn()` utility from `@/components/lib/utils` for className merging
- Prefer CSS custom properties (CSS variables) for theme values
- Use `color-mix(in oklab, ...)` for all transparency calculations
- Always include `-webkit-backdrop-filter` for Safari support
- Test glass effects on both light and dark backgrounds
- Ensure text contrast meets WCAG AA standards in both modes
