"use client";
import { Cart, Product, Review } from "@/api/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCart from "../components/AddToCart";
import ProductCard from "../components/ProductCard";
import AverageRating from "../products/[id]/components/AverageRating";
import Reviews from "../products/[id]/components/Reviews";

export default function ProductDetailScene({
  id,
  addToCartAction,
  addReviewAction,
  getProductByIdAction,
  getProductsAction,
}: {
  id: number;
  addToCartAction: () => Promise<Cart>;
  addReviewAction: (text: string, rating: number) => Promise<Review[]>;
  getProductByIdAction: (id: number) => Promise<Product | undefined>;
  getProductsAction: () => Promise<Product[]>;
}) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductByIdAction(id);
      setProductData(response || null);
    };
    const fetchProducts = async () => {
      const products = await getProductsAction();
      setProducts(products);
    };
    fetchProduct();
    fetchProducts();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <Image
          className="aspect-[2/2] rounded-md object-cover"
          src={productData.image ?? ""}
          alt={`${productData.name} image`}
          width={1024}
          height={1024}
        />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-3xl font-bold leading-10 text-gray-100">
          {productData.name}
        </h1>
        <div className="my-1 text-md leading-5 text-gray-300">
          {productData.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
        <div className="mt-1 text-sm leading-5 text-gray-300 font-light italic">
          {productData.description}
        </div>
        <AverageRating reviews={productData.reviews} />
        <div className="flex justify-end">
          <AddToCart addToCartAction={addToCartAction} />
        </div>
      </div>
      <div className="w-full">
        <Reviews
          reviews={productData.reviews}
          addReviewAction={addReviewAction}
        />
      </div>
      <div className="flex flex-wrap gap-2 w-full">
        <h1 className="text-2xl font-bold mt-2 -mb-2">Related Products</h1>
        <ul role="list" className="flex flex-row flex-wrap m-2">
          {products
            .filter((p) => p.id !== +id)
            .map((product) => (
              <li key={product.id} className="md:w-1/5">
                <Link href={`/products/${productData.id}`}>
                  <ProductCard {...product} small />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
