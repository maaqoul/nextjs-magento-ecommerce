"use client";

import { formatPrice } from "@/lib/utils/format";
import { Product } from "@/types/magento";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.sku}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.label || product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-gray-900">
          {formatPrice(product.price, product.currency || "USD")}
        </p>
      </div>
    </Link>
  );
}
