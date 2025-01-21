"use client";

import { MagentoComponent } from "@/types/magento";
import { Hero } from "@/components/ui/hero";
import { ProductGrid } from "@/components/ui/product-grid";
import { Section } from "@/components/ui/section";

const componentMap = {
  section: Section,
  hero: Hero,
  "product-grid": ProductGrid,
} as const;

interface ComponentRendererProps {
  component: MagentoComponent;
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  const Component = componentMap[component.type];

  if (!Component) {
    console.warn(`Component type "${component.type}" not found`);
    return null;
  }

  return <Component {...component.props} children={component.children} />;
}
