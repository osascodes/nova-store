"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/actions/orders";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (items.length === 0 && step === "form") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-4">Nothing to checkout</h1>
        <Link href="/products">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await createOrder({
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      address: formData.get("address") as string,
      apartment: (formData.get("apartment") as string) || undefined,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        price: i.product.price,
      })),
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    clearCart();
    setOrderId(result.orderId || null);
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Check className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-semibold">Order Confirmed!</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Thank you for your purchase. Your order has been comfirmed successfully.
            {orderId && (
              <span className="block mt-2 text-sm font-mono">Order ID: {orderId}</span>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const shipping = totalPrice() >= 75 ? 0 : 9.99;
  const total = totalPrice() + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <section className="space-y-4">
            <h2 className="font-semibold text-lg">Contact</h2>
            <Input type="email" name="email" placeholder="Email address" required />
          </section>

          <section className="space-y-4">
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First name" required />
              <Input name="lastName" placeholder="Last name" required />
            </div>
            <Input name="address" placeholder="Address" required />
            <Input name="apartment" placeholder="Apartment, suite, etc. (optional)" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Input name="city" placeholder="City" required />
              <Input name="state" placeholder="State" required />
              <Input name="zip" placeholder="ZIP code" required />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-semibold text-lg">Payment</h2>
            <p className="text-sm text-zinc-500">
              Demo mode — no real card required. Enter any details.
            </p>
            <Input placeholder="Card number" defaultValue="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM / YY" defaultValue="12 / 28" />
              <Input placeholder="CVC" defaultValue="123" />
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
          </Button>
        </form>

        <div className="lg:col-span-2">
          <div className="sticky top-28 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
