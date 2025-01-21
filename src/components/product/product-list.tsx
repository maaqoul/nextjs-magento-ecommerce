"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Pagination } from "../ui/pagination";
import { ProductSkeleton } from "../ui/skeletons";

interface ProductListProps {
  initialPage?: number;
  pageSize?: number;
  categoryId?: string;
  sort?: {
    field: string;
    direction: "ASC" | "DESC";
  };
}

export default function ProductList({
  initialPage = 1,
  pageSize = 12,
  categoryId,
  sort = { field: "position", direction: "ASC" },
}: ProductListProps) {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { products, totalCount, pageInfo, isLoading, error } = useProducts({
    currentPage,
    pageSize,
    sort,
    filter: categoryId ? { category_id: categoryId } : undefined,
  });

  if (!mounted) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <h3 className="font-semibold">Error loading products</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading || !mounted ? (
          <ProductSkeleton />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {totalCount > pageSize && mounted && (
        <Pagination
          currentPage={pageInfo.currentPage}
          totalPages={pageInfo.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
