import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(process.env.NEXT_PUBLIC_MAGENTO_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Store: "default",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
