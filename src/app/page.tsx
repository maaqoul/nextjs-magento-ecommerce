import { Metadata } from "next";
import { ComponentRenderer } from "@/components/magento/component-renderer";
import { useLayout } from "@/lib/hooks/useLayout";

export const metadata: Metadata = {
  title: "Home | Magento Store",
  description: "Welcome to our Magento Store - Browse our latest products",
};

export default function HomePage() {
  const { layout, isLoading, error } = useLayout();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Error loading page: {error}
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
        No content available
      </div>
    );
  }

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ComponentRenderer component={layout} />
      </main>
    </div>
  );
}
