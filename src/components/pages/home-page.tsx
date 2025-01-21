"use client";

import { ComponentRenderer } from "@/components/magento/component-renderer";
import mockData from "@/data/mock-layouts.json";
import { useEffect, useState } from "react";
import { LayoutsResponse } from "@/types/magento";

export function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const typedMockData = mockData as LayoutsResponse;
  const homeLayout = typedMockData.layouts.find(
    (layout) => layout.identifier === "home"
  );

  if (!mounted) {
    return null; // or a loading skeleton
  }

  if (!homeLayout) {
    return <div>No layout found</div>;
  }

  return (
    <main className="min-h-screen">
      <ComponentRenderer component={homeLayout.layout_data} />
    </main>
  );
}
