import { Metadata } from "next";
import { ComponentRenderer } from "@/components/magento/component-renderer";
import mockData from "@/data/mock-layouts.json";

export const metadata: Metadata = {
  title: "Home | Magento Store",
  description: "Welcome to our Magento Store - Browse our latest products",
};

export default function HomePage() {
  const homeLayout = mockData.layouts.find(
    (layout) => layout.identifier === "home"
  );

  if (!homeLayout) {
    return <div>No layout found</div>;
  }

  return (
    <main className="min-h-screen">
      <ComponentRenderer component={homeLayout.layout_data} />
    </main>
  );
}
