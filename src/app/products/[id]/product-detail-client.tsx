"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import type { ProductDTO } from "@/actions/products";

type Props = {
  product: ProductDTO;
  related: ProductDTO[];
};

export function ProductDetailClient({ product, related }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(
      {
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
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-zinc-900 dark:border-zinc-50"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-zinc-400">·</span>
            <span className="text-sm text-zinc-500">
              {product.reviews} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-11 w-11 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-l-xl transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-11 w-11 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-r-xl transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button size="lg" className="flex-1 gap-2" onClick={handleAdd}>
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
            <Link href="/cart" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">
                View Cart
              </Button>
            </Link>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
            <p>✓ In stock and ready to ship</p>
            <p>✓ Free shipping on orders over $75</p>
            <p>✓ 30-day easy returns</p>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
