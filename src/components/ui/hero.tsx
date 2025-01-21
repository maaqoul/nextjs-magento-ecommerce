"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
    label?: string;
  };
  className?: string;
}

export function Hero({ title, subtitle, image, className }: HeroProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.url}
        alt={image.label || title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
