import { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "Home | Magento Store",
  description: "Welcome to our Magento Store - Browse our latest products",
};

export default function Page() {
  return <HomePage />;
}
