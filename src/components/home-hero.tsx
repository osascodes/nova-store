"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-zinc-950" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IMAGE */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] sm:aspect-square max-w-md mx-auto"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                  alt="Nova essentials"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, 50vw"
                />
              </motion.div>

              {/* Floating product card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="absolute bottom-3 left-3 sm:-bottom-2 sm:-left-2 bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border border-zinc-100 dark:border-zinc-800 flex items-center gap-3 z-10"
              >
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"
                    alt="Minimalist Watch"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mb-0.5">
                    Featured
                  </p>
                  <p className="font-medium text-sm sm:text-base leading-tight text-zinc-900 dark:text-zinc-50">
                    Minimalist Watch
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500">$189</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* TEXT */}
          <div className="space-y-5 lg:space-y-8 order-2 lg:order-1 text-white">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Editor&apos;s Pick · Drop 01
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.08]"
            >
              Less noise.
              <br />
              <span className="text-zinc-400">Better essentials.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed"
            >
              Curated products for people who care about quality over quantity.
              Designed to be used every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-zinc-900 hover:bg-zinc-100"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-4 pt-1"
            >
              <div className="flex -space-x-2">
  {[
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  ].map((src) => (
    <img
      key={src}
      src={src}
      alt=""
      className="h-8 w-8 rounded-full border-2 border-zinc-950 object-cover"
    />
  ))}
</div>
              <div className="text-sm">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Trusted by 2,400+ customers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}