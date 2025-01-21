"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import { ProductGrid } from "./product-grid";

export function ProductListClient() {
  const { products, isLoading, error } = useProducts({
    pageSize: 12,
    currentPage: 1,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>;
  }

  if (!products.length) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
        No products found
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
