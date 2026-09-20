import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-14">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
          About Nova
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          Built for everyday living
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Nova is a modern essentials store focused on simple, well-made products
          for daily life. We believe the things you use most should feel better —
          not louder.
        </p>
      </div>

      <div className="space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Our story
          </h2>
          <p>
            Nova started with a simple idea: most people don’t need more products.
            They need better ones. Fewer choices, cleaner design, and quality that
            lasts beyond a season.
          </p>
          <p>
            We carefully select essentials across apparel, accessories, home, and
            electronics — items that fit into real routines without adding clutter.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            What we stand for
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">Quality over quantity</span> — every product earns its place.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">Timeless design</span> — clean, useful, and made to stay relevant.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">Honest pricing</span> — fair value without unnecessary markups.
            </li>
            <li>
              <span className="text-zinc-900 dark:text-zinc-50 font-medium">Simple shopping</span> — clear product details, smooth checkout, no noise.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            How we work
          </h2>
          <p>
            We focus on a curated selection rather than endless catalogs. That means
            fewer products, stronger standards, and a shopping experience that feels
            calm and intentional.
          </p>
          <p>
            From packaging to support, our goal is the same: make everyday buying
            feel easier and more thoughtful.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Get in touch
          </h2>
          <p>
            Have a question about an order, product, or partnership? Visit our{" "}
            <a href="/contact" className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4">
              Contact
            </a>{" "}
            page — we’re happy to help.
          </p>
        </section>
      </div>
    </div>
  );
}