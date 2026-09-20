"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    tag: "Limited Time",
    title: "Up to 50% Off",
    description: "Premium watches and accessories at half the price.",
    button: "Shop the Sale",
    href: "/products?category=Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
    gradient: "from-zinc-900/95 via-zinc-900/80 to-transparent",
  },
  {
    id: 2,
    tag: "New Arrival",
    title: "Summer Essentials",
    description: "Light, clean apparel for the season.",
    button: "Explore Apparel",
    href: "/products?category=Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    gradient: "from-emerald-950/95 via-emerald-900/75 to-transparent",
  },
  {
    id: 3,
    tag: "Tech Deals",
    title: "Sound That Moves You",
    description: "Noise-canceling headphones from $299.",
    button: "View Electronics",
    href: "/products?category=Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
    gradient: "from-blue-950/95 via-indigo-900/75 to-transparent",
  },
];

export function PromoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl h-[320px] sm:h-[380px] lg:h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Product Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />

              {/* Dark gradient overlay for text readability */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-8 sm:px-12 lg:px-16">
                <div className="max-w-md space-y-4 text-white text-center lg:text-left mx-auto lg:mx-0">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/70">
                    {slide.tag}
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base">
                    {slide.description}
                  </p>
                  <div className="pt-2">
                    <Link href={slide.href}>
                      <Button
                        size="lg"
                        className="gap-2 bg-white text-zinc-900 hover:bg-zinc-100"
                      >
                        {slide.button}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}