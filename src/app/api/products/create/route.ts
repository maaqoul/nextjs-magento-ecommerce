import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const productData = await request.json();

    const response = await fetch(
      process.env.NEXT_PUBLIC_MAGENTO_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Store: "default",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_API_KEY}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateSimpleProduct(
              $sku: String!
              $name: String!
              $price: Float!
              $description: String!
              $shortDescription: String!
              $status: Int!
              $weight: Float!
              $stockData: ProductStockInput!
            ) {
              createSimpleProduct(
                input: {
                  sku: $sku
                  name: $name
                  price: $price
                  description: { html: $description }
                  short_description: { html: $shortDescription }
                  status: $status
                  weight: $weight
                  stock_data: $stockData
                }
              ) {
                product {
                  id
                  sku
                  name
                  price_range {
                    minimum_price {
                      regular_price {
                        value
                        currency
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            sku: productData.sku,
            name: productData.name,
            price: productData.price,
            description: productData.description,
            shortDescription:
              productData.shortDescription || productData.description,
            status: 1, // 1 = Enabled, 2 = Disabled
            weight: productData.weight || 1,
            stockData: {
              qty: productData.quantity || 100,
              is_in_stock: true,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to create product" }] },
      { status: 500 }
    );
  }
}
