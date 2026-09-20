import { HomeCta } from "@/components/home-cta";
import { PromoBanner } from "@/components/promo-banner";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { HomeHero } from "@/components/home-hero";
import { CategoriesSection } from "@/components/categories-section";
import { BestSellers } from "@/components/best-sellers";

export default async function HomePage() {
  const allProducts = await getProducts();
  const featured = allProducts.filter((p) => p.featured).slice(0, 4);

  // Best sellers = highest rating
  const bestSellers = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="overflow-hidden">
      <HomeHero />

      {/* Trust features */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $75" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day guarantee" },
            ].map((item) => (
            <div key={item.title} className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoriesSection />

      {/* Promo Banner */}
         <PromoBanner />

      {/* Featured */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Curated
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-500 py-12">
              No featured products yet.
            </p>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <BestSellers products={bestSellers} />

     <HomeCta />
    </div>
  );
}