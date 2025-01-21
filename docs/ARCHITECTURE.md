# Next.js + Magento Component Rendering Architecture

## Overview

Our application implements a flexible component rendering system that can dynamically render UI components based on layout data received from Magento. This architecture allows for:

1. Dynamic page layouts controlled from Magento
2. Type-safe component rendering
3. Reusable UI components
4. Nested component structures
5. Responsive and performant UI

## Core Components

### 1. Component Types (`src/types/magento.ts`)

```typescript
export type ComponentType =
  | "section"
  | "hero"
  | "product-grid"
  | "product-card"
  | "product-list"
  | "pagination";

export interface MagentoComponent {
  type: ComponentType;
  props: {
    className?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    products?: Product[];
  };
  children?: MagentoComponent[];
}
```

This type system ensures that:

- Only valid component types can be used
- Components receive correct props
- Nested structures are properly typed

### 2. Component Renderer (`src/components/magento/component-renderer.tsx`)

```typescript
const componentMap = {
  section: Section,
  hero: Hero,
  "product-grid": ProductGrid,
} as const;

export function ComponentRenderer({
  component,
}: {
  component: MagentoComponent;
}) {
  const Component = componentMap[component.type];
  return <Component {...component.props} children={component.children} />;
}
```

The ComponentRenderer:

- Maps component types to React components
- Handles prop distribution
- Manages component hierarchy

### 3. Base Components

#### Section Component (`src/components/ui/section.tsx`)

- Handles nested component structures
- Manages layout containers
- Recursively renders child components

#### Hero Component (`src/components/ui/hero.tsx`)

- Handles full-width banners
- Manages responsive images
- Implements text overlays

#### ProductGrid Component (`src/components/ui/product-grid.tsx`)

- Displays product collections
- Handles responsive grid layouts
- Manages product card rendering

## Data Flow

1. Layout Data Structure:

```json
{
  "identifier": "home",
  "title": "Home Page Layout",
  "layout_data": {
    "type": "section",
    "props": { ... },
    "children": [
      {
        "type": "hero",
        "props": { ... }
      },
      {
        "type": "product-grid",
        "props": { ... }
      }
    ]
  }
}
```

2. Rendering Process:
   - Page component receives layout data
   - ComponentRenderer processes the root component
   - Recursively renders nested components
   - Each component handles its specific rendering logic

## Key Features

### 1. Type Safety

- TypeScript interfaces ensure correct data structures
- Component prop validation
- Compile-time checking for component types

### 2. Component Isolation

- Each component is a standalone module
- Components handle their own styling
- Clear separation of concerns

### 3. Responsive Design

- Mobile-first approach
- Tailwind CSS for responsive utilities
- Dynamic image sizing

### 4. Performance

- Next.js Image optimization
- Client-side components marked with "use client"
- Efficient prop distribution

## Integration with Magento

### 1. Layout API

Expected endpoint: `/rest/V1/cmsPage/layouts`
Response format:

```json
{
  "layouts": [
    {
      "identifier": string,
      "title": string,
      "layout_data": MagentoComponent
    }
  ]
}
```

### 2. Component Mapping

Magento components map directly to React components:

```typescript
section → <Section />
hero → <Hero />
product-grid → <ProductGrid />
```

### 3. Data Requirements

Each component type requires specific data:

- Hero: title, subtitle, image
- ProductGrid: products array, optional title/subtitle
- Section: className, optional children

## Best Practices

1. Component Development:

   - Keep components focused and single-purpose
   - Use TypeScript for type safety
   - Implement proper error boundaries
   - Add loading states and fallbacks

2. Layout Structure:

   - Avoid deeply nested structures
   - Use semantic component types
   - Keep props simple and flat
   - Implement proper spacing through className

3. Performance:
   - Optimize images
   - Implement proper loading states
   - Use proper caching strategies
   - Minimize client-side JavaScript

## Testing

1. Component Testing:

   - Test individual components
   - Verify prop handling
   - Check responsive behavior
   - Validate error states

2. Integration Testing:
   - Test component nesting
   - Verify data flow
   - Check layout rendering
   - Validate error boundaries

## Future Improvements

1. Additional Components:

   - Add more component types
   - Implement complex layouts
   - Add interactive components

2. Performance Optimizations:

   - Implement component code splitting
   - Add SSR optimization
   - Improve image loading

3. Developer Experience:
   - Add component playground
   - Improve error messages
   - Add development tools

## Troubleshooting

Common issues and solutions:

1. Type errors: Verify component type definitions
2. Rendering issues: Check component map
3. Styling problems: Verify Tailwind classes
4. Image loading: Check Next.js image configuration
