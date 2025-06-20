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

  const getProductByIdAction = async (id: number) => {
    "use server";
    const product = await getProductById(id);
    if (!product) {
      notFound();
    }
    return product;
  };

  const getProductsAction = async () => {
    "use server";
    const products = await getProducts();
    return products || [];
  };

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
    <ProductDetailScene
      id={+id}
      addToCartAction={addToCartAction}
      addReviewAction={addReviewAction}
      getProductByIdAction={getProductByIdAction}
      getProductsAction={getProductsAction}
    />
  );
}
