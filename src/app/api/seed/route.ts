import { NextResponse } from "next/server";
import { seedProducts } from "../../../../scripts/data/products";

export async function POST() {
  try {
    const results = await Promise.all(
      seedProducts.map(async (product) => {
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
                mutation CreateProduct(
                  $sku: String!
                  $name: String!
                  $price: Float!
                  $description: String!
                  $shortDescription: String!
                  $weight: Float!
                  $quantity: Int!
                ) {
                  createSimpleProduct(
                    input: {
                      sku: $sku
                      name: $name
                      price: $price
                      status: 1
                      visibility: 4
                      type_id: "simple"
                      weight: $weight
                      description: { html: $description }
                      short_description: { html: $shortDescription }
                      attribute_set_id: 4
                      stock_data: {
                        qty: $quantity
                        is_in_stock: true
                        manage_stock: true
                      }
                    }
                  ) {
                    product {
                      id
                      sku
                      name
                    }
                  }
                }
              `,
              variables: {
                sku: product.sku,
                name: product.name,
                price: product.price,
                description: product.description,
                shortDescription: product.shortDescription,
                weight: product.weight,
                quantity: product.quantity,
              },
            }),
          }
        );

        const data = await response.json();
        return {
          sku: product.sku,
          success: !data.errors,
          errors: data.errors,
        };
      })
    );

    return NextResponse.json({
      message: "Seed completed",
      results,
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to seed products" }] },
      { status: 500 }
    );
  }
}
