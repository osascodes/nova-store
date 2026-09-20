"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/actions/products";

export function AdminProductActions({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/admin/edit/${productId}`}>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:text-red-600"
        disabled={isPending}
        onClick={() => {
          if (confirm("Delete this product?")) {
            startTransition(async () => {
              await deleteProduct(productId);
            });
          }
        }}
      >
        {isPending ? "..." : "Delete"}
      </Button>
    </div>
  );
}
