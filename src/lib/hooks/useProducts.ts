"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/magento";

interface UseProductsProps {
  pageSize?: number;
  currentPage?: number;
  sort?: { [key: string]: string };
  filter?: {
    [key: string]: string | number | undefined;
  };
}

interface ProductsResponse {
  data?: {
    products: {
      items: Product[];
      total_count: number;
      page_info: {
        page_size: number;
        current_page: number;
        total_pages: number;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export function useProducts({
  pageSize = 12,
  currentPage = 1,
  filter,
}: UseProductsProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          pageSize: pageSize.toString(),
          currentPage: currentPage.toString(),
        });

        if (filter?.name) {
          params.append("search", filter.name.toString());
        }

        const response = await fetch(`/api/products?${params}`);
        const result: ProductsResponse = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (!result.data?.products) {
          throw new Error("No products data received");
        }

        setProducts(result.data.products.items || []);
        setTotalCount(result.data.products.total_count || 0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
        setProducts([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [pageSize, currentPage, filter?.name]);

  return {
    products,
    totalCount,
    pageInfo: {
      pageSize,
      currentPage,
      totalPages: Math.ceil(totalCount / pageSize),
    },
    isLoading,
    error,
  };
}
