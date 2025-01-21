import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const testLayouts = [
  {
    identifier: "home",
    title: "Home Page Layout",
    layout_data: {
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
            products: [], // Will be populated by Magento
          },
        },
      ],
    },
  },
];

async function seedLayouts() {
  try {
    console.log("🌱 Seeding layouts...");
    console.log("Using Magento URL:", process.env.NEXT_PUBLIC_MAGENTO_URL);

    for (const layout of testLayouts) {
      const url = `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/cmsPage/layouts`;
      console.log("Sending request to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MAGENTO_INTEGRATION_TOKEN}`,
          Store: process.env.NEXT_PUBLIC_STORE_CODE || "default",
        },
        body: JSON.stringify(layout),
      });

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (!response.ok) {
        throw new Error(
          `Failed to create layout: ${response.status} ${response.statusText}\nResponse: ${responseText}`
        );
      }

      console.log(`✅ Created layout: ${layout.identifier}`);
    }

    console.log("✨ Layouts seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding layouts:");
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

// Add error handler for unhandled rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

seedLayouts();
