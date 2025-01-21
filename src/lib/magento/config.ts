import { ProductCard } from "@/components/product/product-card";
import { ProductGrid } from "@/components/product/product-grid";
import ProductList from "@/components/product/product-list";
import { Pagination } from "@/components/ui/pagination";
import { Section } from "@/components/ui/section";
import { Hero } from "@/components/ui/hero";

// Map Magento component identifiers to React components
export const componentMap = {
  "product-card": ProductCard,
  "product-grid": ProductGrid,
  "product-list": ProductList,
  pagination: Pagination,
  section: Section,
  hero: Hero,
} as const;

// Type for Magento component identifiers
export type MagentoComponentType = keyof typeof componentMap;

// Interface for Magento component data
export interface MagentoComponent {
  type: MagentoComponentType;
  props: Record<string, any>;
  children?: MagentoComponent[];
}
