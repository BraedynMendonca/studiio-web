# Adding New Widgets

This guide explains how to create a new widget for the Studiio application.

## 1. Create a New Widget Component

First, create a new `.tsx` file in the `components/` directory. The file should be named after your widget, for example, `myNewWidget.tsx`.

The widget component should be a standard React functional component. You can use any of the existing widgets as a template. For example, you can copy the code from `components/widgetTemplate.tsx` to get started.

Here's a basic template for a new widget:

```tsx
import React from 'react';

export function MyNewWidget() {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-full">
      <h2 className="text-lg font-bold mb-2">My New Widget</h2>
      <p>This is a new widget.</p>
    </div>
  );
}
```

## 2. Style Your Widget

You can use Tailwind CSS classes to style your widget. The root element of your widget should have the `h-full` class to ensure it fills the entire grid item.

## 3. Export Your Widget

Make sure to export your widget component from the file.

```tsx
export function MyNewWidget() {
  // ...
}
```
