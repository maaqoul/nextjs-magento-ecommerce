"use client";

import { componentMap, MagentoComponent } from "@/lib/magento/config";

interface ComponentRendererProps {
  component: MagentoComponent;
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  const Component = componentMap[component.type];

  if (!Component) {
    console.warn(`Component type "${component.type}" not found`);
    return null;
  }

  return (
    <Component {...component.props}>
      {component.children?.map((child, index) => (
        <ComponentRenderer key={index} component={child} />
      ))}
    </Component>
  );
}
