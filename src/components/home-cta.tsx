"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl h-[380px] sm:h-[420px] lg:h-[460px] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1600&q=80')",
          }}
        >
          <div className="relative z-10 h-full flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-16">
            <div className="max-w-lg text-center lg:text-left text-white space-y-4">
              <p className="text-sm uppercase tracking-widest text-white/70">
                New season edit
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Find your next everyday piece
              </h2>
              <p className="text-white/80">
                Shop a tighter selection of essentials made to use, not just
                display.
              </p>
             <div className="pt-2 flex justify-center lg:justify-start">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-white text-zinc-900 hover:bg-zinc-100"
                  >
                    Shop now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}