import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MAGENTO_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Store: "default",
        },
        body: JSON.stringify({
          query: `
            mutation {
              createSimpleProduct(
                input: {
                  sku: "test-product-1"
                  name: "Test Product"
                  attributeSetId: 4
                  price: 29.99
                  status: 1
                  visibility: 4
                  typeId: "simple"
                  weight: 1.0
                  quantity: 100
                  description: { html: "Test product description" }
                  shortDescription: { html: "Short description" }
                  categories: [2]
                }
              ) {
                product {
                  id
                  sku
                  name
                  __typename
                  price_range {
                    minimum_price {
                      regular_price {
                        value
                        currency
                      }
                    }
                  }
                  categories {
                    id
                    name
                    url_path
                  }
                }
              }
            }
          `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error testing mutation:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to test mutation" }] },
      { status: 500 }
    );
  }
}
