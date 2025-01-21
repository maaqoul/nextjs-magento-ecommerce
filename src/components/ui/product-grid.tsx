"use client";

import { Product } from "@/types/magento";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  className?: string;
}

export function ProductGrid({
  title,
  subtitle,
  products,
  className,
}: ProductGridProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {(title || subtitle) && (
        <div className="text-center space-y-2">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover object-center group-hover:opacity-75 transition"
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-lg font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: product.currency,
                }).format(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
