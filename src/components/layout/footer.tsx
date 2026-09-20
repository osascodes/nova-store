import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                <span className="text-white dark:text-zinc-900 font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Nova</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Curated essentials for modern living. Quality products designed with intention.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/products" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Apparel" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Apparel</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Contact</Link>
             </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/faq" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Shipping</Link></li>
              <li><Link href="/faq" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Nova.
          </p>
          <p className="text-xs text-zinc-400">
            Built with Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
