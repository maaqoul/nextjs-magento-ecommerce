import { NextResponse } from "next/server";
import { Product } from "@/types/magento";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = Number(searchParams.get("pageSize")) || 12;
    const currentPage = Number(searchParams.get("currentPage")) || 1;
    const search = searchParams.get("search");

    const url = new URL(
      "/rest/V1/products",
      process.env.NEXT_PUBLIC_MAGENTO_URL
    );
    url.searchParams.append("searchCriteria[pageSize]", pageSize.toString());
    url.searchParams.append(
      "searchCriteria[currentPage]",
      currentPage.toString()
    );

    if (search) {
      url.searchParams.append(
        "searchCriteria[filterGroups][0][filters][0][field]",
        "name"
      );
      url.searchParams.append(
        "searchCriteria[filterGroups][0][filters][0][value]",
        `%${search}%`
      );
      url.searchParams.append(
        "searchCriteria[filterGroups][0][filters][0][conditionType]",
        "like"
      );
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Store: "default",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products from Magento");
    }

    const data = await response.json();

    // Transform Magento data to match our Product type
    const products: Product[] = data.items.map((item: any) => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      price: item.price,
      currency: "USD", // You might want to get this from Magento store config
      image: item.media_gallery_entries?.[0]
        ? {
            url: item.media_gallery_entries[0].file,
            label: item.media_gallery_entries[0].label || item.name,
          }
        : undefined,
    }));

    return NextResponse.json({
      data: {
        products: {
          items: products,
          total_count: data.total_count,
          page_info: {
            page_size: pageSize,
            current_page: currentPage,
            total_pages: Math.ceil(data.total_count / pageSize),
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        errors: [{ message: "Failed to fetch products" }],
      },
      { status: 500 }
    );
  }
}
