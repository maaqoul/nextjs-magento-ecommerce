import { useState } from "react";

interface CreateProductInput {
  sku: string;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  weight?: number;
  quantity?: number;
}

interface CreateProductResponse {
  data?: {
    createSimpleProduct: {
      product: {
        id: string;
        sku: string;
        name: string;
        price_range: {
          minimum_price: {
            regular_price: {
              value: number;
              currency: string;
            };
          };
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: CreateProductInput) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result: CreateProductResponse = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (!result.data?.createSimpleProduct) {
        throw new Error("Failed to create product");
      }

      return result.data.createSimpleProduct.product;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create product";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    isLoading,
    error,
  };
}
