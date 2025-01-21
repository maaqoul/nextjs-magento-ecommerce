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
            query {
              __schema {
                mutationType {
                  fields {
                    name
                    description
                    args {
                      name
                      type {
                        name
                        kind
                        ofType {
                          name
                          kind
                        }
                      }
                    }
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
    console.error("Error fetching schema:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to fetch schema" }] },
      { status: 500 }
    );
  }
}
