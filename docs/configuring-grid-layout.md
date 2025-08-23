# Configuring the Grid Layout

This guide explains how to add a new widget to the `react-grid-layout` and configure its position and size.

## 1. Import the New Widget

First, import your new widget component in `app/page.tsx`.

```tsx
import { MyNewWidget } from '@/components/myNewWidget';
```

## 2. Add the Widget to the `widgetList`

In `app/page.tsx`, add your new widget to the `widgetList` array. The order of the widgets in this array determines their `i` value in the layout configuration.

```tsx
const widgetList = [
  CurrentTimeWidget,    // 0
  PomodoroTimer,        // 1
  WeatherWidget,        // 2
  QuickNotesWidget,     // 3
  StudySoundsWidget,    // 4
  SocratesChatbot,      // 5
  BreakTimer,           // 6
  CalculatorWidget,     // 7
  InspirationQuote,     // 8
  ColorPaletteSelector, // 9
  LinksWidget,          // 10
  MyNewWidget,          // 11
];
```

## 3. Configure the Layout

Now, you need to add a new entry to the `layout` array in `app/page.tsx`. This entry will define the initial position, size, and other properties of your new widget.

The `i` property of the new layout item should correspond to the index of your new widget in the `widgetList` array.

```ts
const layout = [
  // ... existing layout items
  { i: '11', x: 0, y: 0, w: 2, h: 2 },
];
```

### Layout Properties

*   `i`: The unique identifier for the widget. This should be the index of the widget in the `widgetList` array, converted to a string.
*   `x`: The initial x position of the widget on the grid.
*   `y`: The initial y position of the widget on the grid.
*   `w`: The initial width of the widget in grid units.
*   `h`: The initial height of the widget in grid units.
*   `minW`: (Optional) The minimum width of the widget.
*   `minH`: (Optional) The minimum height of the widget.

For more information on the available properties, please refer to the [react-grid-layout documentation](https://github.com/react-grid-layout/react-grid-layout).
