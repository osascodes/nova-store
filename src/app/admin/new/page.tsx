"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/actions/products";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createProduct(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/admin" className="text-sm text-zinc-500 hover:underline mb-6 inline-block">
        ← Back to Admin
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Add Product</h1>

      <form action={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">{error}</div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input name="name" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="flex w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input name="price" type="number" step="0.01" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Original Price (optional)</label>
            <Input name="originalPrice" type="number" step="0.01" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input name="category" placeholder="Apparel, Electronics..." required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <Input name="image" type="url" placeholder="https://..." required />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="inStock" defaultChecked className="rounded" />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" className="rounded" />
            Featured
          </label>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
