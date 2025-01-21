import { Metadata } from "next";
import { ProductListClient } from "@/components/product/product-list-client";

export const metadata: Metadata = {
  title: "Home | Magento Store",
  description: "Welcome to our Magento Store - Browse our latest products",
};

export default function HomePage() {
  return (
    <div className="bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Latest Products
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Check out our newest arrivals
          </p>
        </div>
        <ProductListClient />
      </main>
    </div>
  );
}
