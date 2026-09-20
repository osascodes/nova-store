import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/actions/products";
import { ProductDetailClient } from "./product-detail-client";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const related = (await getProducts({ category: product.category }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
