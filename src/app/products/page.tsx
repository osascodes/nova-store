import { Suspense } from "react";
import { getProducts, getCategories } from "@/actions/products";
import { ProductsClient } from "./products-client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "All";
  const query = params.q || "";

  const [allProducts, categories] = await Promise.all([
    getProducts(category !== "All" ? { category } : undefined),
    getCategories(),
  ]);

  const products = query
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Suspense
        fallback={
          <div className="py-20 text-center text-zinc-500">Loading...</div>
        }
      >
        <ProductsClient
          initialProducts={products}
          categories={categories}
          initialCategory={category}
        />
      </Suspense>
    </div>
  );
}