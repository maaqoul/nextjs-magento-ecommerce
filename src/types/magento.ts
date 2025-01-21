export interface Money {
  value: number;
  currency: string;
}

export interface PriceRange {
  minimum_price: {
    regular_price: {
      value: number;
      currency: string;
    };
    final_price: {
      value: number;
      currency: string;
    };
    discount?: {
      amount_off: number;
      percent_off: number;
    };
  };
}

export interface MediaGalleryEntry {
  id: number;
  label: string;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
  url: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  currency: string;
  image: {
    url: string;
    label?: string;
  };
}

export interface ProductsResponse {
  products: {
    items: Product[];
    total_count: number;
    page_info: {
      page_size: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface Category {
  id: string;
  level: number;
  name: string;
  path: string;
  url_path: string;
  url_key: string;
  children_count: number;
  products: ProductsResponse;
}

export interface SearchFilters {
  category_id?: string;
  price?: {
    from?: number;
    to?: number;
  };
  sort?: {
    field: "name" | "price" | "position";
    direction: "ASC" | "DESC";
  };
  pageSize?: number;
  currentPage?: number;
}

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

export interface Layout {
  identifier: string;
  title: string;
  layout_data: MagentoComponent;
}

export interface LayoutsResponse {
  layouts: Layout[];
}
