"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Orders are typically processed within 1–2 business days. Delivery takes 3–7 business days depending on your location. Orders over $75 qualify for free shipping.",
  },
  {
    q: "What is your return policy?",
    a: "You can return unused items within 30 days of delivery. Items must be in original condition with tags attached. Refunds are processed within 5–7 business days after we receive the return.",
  },
  {
    q: "How do I track my order?",
    a: "After checkout, sign in and go to My Orders. You'll see your order status there. In a live store, a tracking number would also be sent to your email.",
  },
  {
    q: "What payment methods do you accept?",
    a: "This is a demo store, so no real payment is processed. In production, Nova would accept cards, bank transfer, and other local payment options.",
  },
  {
    q: "Do you ship internationally?",
    a: "For this demo, shipping is treated as local. A production version could include international shipping with calculated rates at checkout.",
  },
  {
    q: "Can I change or cancel an order?",
    a: "If the order has not been processed yet, contact us through the Contact page and we'll help. Once an order is marked as shipped, changes may no longer be possible.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Support
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Frequently asked questions
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Quick answers about shipping, returns, orders, and payments.
        </p>
      </motion.div>

      <div>
        {faqs.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}