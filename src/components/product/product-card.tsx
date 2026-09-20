"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ProductDTO } from "@/actions/products";

type Props = {
  product: ProductDTO;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Map DTO to the shape cart expects
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice ?? undefined,
      category: product.category,
      image: product.image,
      images: product.images,
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
      featured: product.featured,
      tags: product.tags,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-zinc-900 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <Button
            size="icon"
            onClick={handleAdd}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50 group-hover:underline underline-offset-4 decoration-zinc-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {added && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-emerald-600 font-medium"
            >
              Added to cart
            </motion.p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
