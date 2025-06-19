import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";


import { addToCart } from "@/api/cart";
import { addReview, getProductById, getProducts } from "@/api/products";
import ProductDetailScene from "@/app/scene/ProductDetail";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(+id);
  const products = await getProducts();


  if (!product) {
    notFound();
  }

  const addToCartAction = async () => {
    "use server";
    console.log("addToCartAction", +id);
    return await addToCart(+id);
  };

  const addReviewAction = async (text: string, rating: number) => {
    "use server";
    const reviews = await addReview(+id, { text, rating });
    revalidatePath(`/products/${id}`);
    return reviews || [];
  };

  return (
    <ProductDetailScene product={product} id={+id} products={products} addToCartAction={addToCartAction} addReviewAction={addReviewAction} />
  );
}
