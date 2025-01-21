"use client";

import { ComponentRenderer } from "@/components/magento/component-renderer";
import { useEffect, useState } from "react";
import { MagentoComponent } from "@/lib/magento/config";

export default function TestPage() {
  const [layout, setLayout] = useState<MagentoComponent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLayout() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/test-layout");
        const data = await response.json();

        if (!data.layout) {
          throw new Error("No layout data received");
        }

        setLayout(data.layout);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch layout");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLayout();
  }, []);

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
