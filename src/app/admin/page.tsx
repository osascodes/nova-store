import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getProducts, deleteProduct } from "@/actions/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AdminProductActions } from "./admin-actions";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="text-zinc-500 mt-1">
            Logged in as {session.name} ({session.email})
          </p>
        </div>
        <Link href="/admin/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="text-left font-medium px-6 py-4">Product</th>
              <th className="text-left font-medium px-6 py-4 hidden sm:table-cell">
                Category
              </th>
              <th className="text-left font-medium px-6 py-4">Price</th>
              <th className="text-left font-medium px-6 py-4 hidden md:table-cell">
                Stock
              </th>
              <th className="text-right font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4 text-zinc-500 hidden sm:table-cell">
                  {p.category}
                </td>
                <td className="px-6 py-4">{formatPrice(p.price)}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className={p.inStock ? "text-emerald-600" : "text-red-500"}>
                    {p.inStock ? "In Stock" : "Out"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <AdminProductActions productId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p className="text-center text-zinc-500 py-12">
          No products yet. Run <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">npm run db:setup</code> to seed.
        </p>
      )}
    </div>
  );
}
