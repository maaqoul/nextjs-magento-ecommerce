import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

export function Hero({ title, subtitle, image, className = "" }: HeroProps) {
  return (
    <div
      className={`relative h-[400px] overflow-hidden rounded-xl ${className}`}
    >
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-gray-200 sm:text-xl">{subtitle}</p>
      </div>
    </div>
  );
}
