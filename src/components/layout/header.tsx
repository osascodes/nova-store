"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, User, Package, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type HeaderUser = {
  id: string;
  email: string;
  name: string;
  role: string;
} | null;

export function Header({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
              <span className="text-white dark:text-zinc-900 font-semibold text-sm">
                N
              </span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Nova</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <AnimatePresence>
  {searchOpen && (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      onSubmit={handleSearch}
      className="fixed left-4 right-4 top-16 z-50 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[220px]"
    >
      <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search products..."
  className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-base text-white placeholder:text-zinc-500 outline-none ring-0 shadow-none appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600"
  autoFocus
/>
    
    </motion.form>
  )}
</AnimatePresence>
            </div>

            <Link href="/orders" className="hidden sm:block">
              <Button variant="ghost" size="icon" title="My Orders">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="fixed right-4 top-16 w-52 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg py-1 z-50"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2.5 text-sm border-b border-zinc-200 dark:border-zinc-800">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-zinc-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/orders"
                          className="block px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        >
                          My Orders
                        </Link>
                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                          >
                            Admin
                          </Link>
                        )}
                        <form action={logoutAction}>
                          <button
                            type="submit"
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                          >
                            Sign Out
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="block px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/register"
                          className="block px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {mounted && totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-xs font-medium flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium",
                    pathname === link.href
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}