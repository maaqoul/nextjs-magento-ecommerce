import { seedProducts } from "./data/products";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading environment from:", envPath);
dotenv.config({ path: envPath });

// Debug: Check environment variables
console.log("Environment variables loaded:");
console.log(
  "NEXT_PUBLIC_MAGENTO_ADMIN_URL:",
  process.env.NEXT_PUBLIC_MAGENTO_ADMIN_URL
);
console.log(
  "MAGENTO_INTEGRATION_TOKEN:",
  process.env.MAGENTO_INTEGRATION_TOKEN ? "✓ Set" : "✗ Not set"
);

interface SeedResult {
  sku: string;
  success: boolean;
  errors?: Array<{ message: string }>;
}

async function createProducts() {
  try {
    console.log("Starting product seeding...");
    const results = await Promise.all(
      seedProducts.map(async (product) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_MAGENTO_ADMIN_URL}/products`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MAGENTO_INTEGRATION_TOKEN}`,
              },
              body: JSON.stringify({
                product: {
                  sku: product.sku,
                  name: product.name,
                  price: product.price,
                  status: 1, // enabled
                  visibility: 4, // visible in catalog and search
                  type_id: "simple",
                  attribute_set_id: 4,
                  weight: product.weight,
                  custom_attributes: [
                    {
                      attribute_code: "description",
                      value: product.description,
                    },
                    {
                      attribute_code: "short_description",
                      value: product.shortDescription,
                    },
                  ],
                  extension_attributes: {
                    stock_item: {
                      qty: product.quantity,
                      is_in_stock: true,
                      manage_stock: true,
                    },
                  },
                },
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            console.error(
              `Error creating product ${product.sku}:`,
              JSON.stringify(data, null, 2)
            );
            return {
              sku: product.sku,
              success: false,
              errors: [{ message: data.message || "Failed to create product" }],
            };
          }

          return {
            sku: product.sku,
            success: true,
          };
        } catch (error) {
          console.error(`Failed to create product ${product.sku}:`, error);
          return {
            sku: product.sku,
            success: false,
            errors: [
              {
                message:
                  error instanceof Error ? error.message : "Unknown error",
              },
            ],
          };
        }
      })
    );

    console.log("\nSeeding summary:");
    console.log("----------------");
    results.forEach((result) => {
      if (result.success) {
        console.log(`✅ ${result.sku}: Success`);
      } else {
        console.log(`❌ ${result.sku}: Failed`);
        console.log(`   Error: ${JSON.stringify(result.errors, null, 2)}\n`);
      }
    });

    const failures = results.filter((r) => !r.success);
    if (failures.length > 0) {
      console.log(`\n${failures.length} products failed to seed.`);
    } else {
      console.log("\nAll products seeded successfully!");
    }
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

createProducts();
