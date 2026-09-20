"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Explore our
            collection to find something you love.
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-medium hover:underline underline-offset-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {item.product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-8 w-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-l-lg"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-r-lg"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-6">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-emerald-600">
                  {totalPrice() >= 75 ? "Free" : formatPrice(9.99)}
                </span>
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>
                  {formatPrice(
                    totalPrice() + (totalPrice() >= 75 ? 0 : 9.99)
                  )}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full gap-2">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="/products"
              className="block text-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
