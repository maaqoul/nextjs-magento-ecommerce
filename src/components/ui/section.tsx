"use client";

import { ComponentRenderer } from "@/components/magento/component-renderer";
import { MagentoComponent } from "@/types/magento";
import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children?: MagentoComponent[];
}

export function Section({ className, children }: SectionProps) {
  return (
    <section className={cn(className)}>
      {children?.map((child, index) => (
        <ComponentRenderer key={index} component={child} />
      ))}
    </section>
  );
}
