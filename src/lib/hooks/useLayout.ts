"use client";

import { useEffect, useState } from "react";
import { MagentoComponent } from "../magento/config";

interface UseLayoutProps {
  type?: string;
  identifier?: string;
}

interface LayoutResponse {
  layout: MagentoComponent;
}

export function useLayout({ type = "home", identifier }: UseLayoutProps = {}) {
  const [layout, setLayout] = useState<MagentoComponent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLayout() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({ type });
        if (identifier) {
          params.append("identifier", identifier);
        }

        const response = await fetch(`/api/layout?${params}`);
        const result = await response.json();

        if (!result.layout) {
          throw new Error("No layout data received");
        }

        setLayout(result.layout);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch layout");
        setLayout(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLayout();
  }, [type, identifier]);

  return { layout, isLoading, error };
}
