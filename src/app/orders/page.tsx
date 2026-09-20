import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getOrders } from "@/actions/orders";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const orders = await getOrders();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">My Orders</h1>
        <p className="text-zinc-500 mt-1">
          {session.name} · {session.email}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-zinc-500">You haven&apos;t placed any orders yet.</p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => {
            const address = JSON.parse(order.shippingAddress || "{}");
            return (
              <div
                key={order.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Order <span className="font-mono text-zinc-700 dark:text-zinc-300">{order.id.slice(0, 8)}…</span>
                    </p>
                    <p className="text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-2.5 py-1">
                      {order.status}
                    </span>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
                  {order.items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {item.product?.name || "Product"} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {address.city && (
                  <p className="text-xs text-zinc-400 mt-4">
                    Ship to: {address.firstName} {address.lastName}, {address.city}, {address.state}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
