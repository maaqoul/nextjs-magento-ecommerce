import { NextResponse } from "next/server";
import { MagentoComponent } from "@/lib/magento/config";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get("type") || "home";
    const identifier = searchParams.get("identifier");

    const url = new URL(
      `/rest/V1/cmsPage/layout`,
      process.env.NEXT_PUBLIC_MAGENTO_URL
    );
    url.searchParams.append("type", pageType);
    if (identifier) {
      url.searchParams.append("identifier", identifier);
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Store: process.env.NEXT_PUBLIC_STORE_CODE || "default",
        Authorization: `Bearer ${process.env.MAGENTO_INTEGRATION_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch layout from Magento");
    }

    const data = await response.json();

    // Transform Magento layout data to our component structure
    const layout: MagentoComponent = {
      type: "product-grid",
      props: {
        products: data.products || [],
      },
    };

    return NextResponse.json({ layout });
  } catch (error) {
    console.error("Error fetching layout:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to fetch layout" }] },
      { status: 500 }
    );
  }
}
