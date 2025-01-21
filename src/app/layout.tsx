import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Magento Store",
  description: "A modern e-commerce store built with Next.js and Magento",
  keywords: ["e-commerce", "magento", "next.js", "react"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
