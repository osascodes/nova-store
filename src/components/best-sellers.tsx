"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { ProductDTO } from "@/actions/products";

type Props = {
  products: ProductDTO[];
};

export function BestSellers({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Popular
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Best Sellers
            </h2>
          </motion.div>

          <Link href="/products">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}