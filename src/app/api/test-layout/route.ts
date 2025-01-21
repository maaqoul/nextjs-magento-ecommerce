import { NextResponse } from "next/server";
import { MagentoComponent } from "@/lib/magento/config";

// Mock product data
const mockProducts = [
  {
    id: 1,
    sku: "test-product-1",
    name: "Test Product 1",
    price: 99.99,
    currency: "USD",
    image: {
      url: "https://picsum.photos/400/400",
      label: "Test Product 1",
    },
  },
  {
    id: 2,
    sku: "test-product-2",
    name: "Test Product 2",
    price: 149.99,
    currency: "USD",
    image: {
      url: "https://picsum.photos/400/400",
      label: "Test Product 2",
    },
  },
];

// Mock layout data
const mockLayout: MagentoComponent = {
  type: "section",
  props: {
    className: "space-y-8",
  },
  children: [
    {
      type: "hero",
      props: {
        title: "Welcome to Our Store",
        subtitle: "Discover amazing products",
        image: "https://picsum.photos/1200/400",
        className: "mb-8",
      },
    },
    {
      type: "product-grid",
      props: {
        title: "Featured Products",
        subtitle: "Check out our selection",
        products: mockProducts,
      },
      children: [
        {
          type: "pagination",
          props: {
            currentPage: 1,
            totalPages: 5,
          },
        },
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json({ layout: mockLayout });
}
