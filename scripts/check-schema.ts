import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkSchema() {
  try {
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
          query {
            __schema {
              mutationType {
                fields {
                  name
                  description
                }
              }
            }
          }
        `,
        }),
      }
    );

    const data = await response.json();
    console.log("Available mutations:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error checking schema:", error);
  }
}

checkSchema();
