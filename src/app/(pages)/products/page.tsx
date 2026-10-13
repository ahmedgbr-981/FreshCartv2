import getAllProducts from "@/services/getProducts.services";
import type { AllProducts } from "@/types/allProducts.types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "@/app/cart/addToCartBtn";

export default async function Products() {
  const resp = await getAllProducts();
  const products: AllProducts[] = resp.data;

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl border-s-2 border-primary ps-2">
          All <span className="text-primary">Products</span>
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card className="mx-auto mt-5 w-full max-w-sm pt-0" key={p._id}>
              <Link href={`/products/${p.id}`}>
                <Image
                  unoptimized
                  src={p.imageCover}
                  alt={p.title}
                  className="aspect-square w-full object-cover dark:brightness-40"
                  height={640}
                  width={640}
                />
              </Link>
              <CardHeader>
                <CardTitle>
                  <Link href={`/products/${p.id}`}>
                    {p.title.split(" ").slice(0, 2).join(" ")}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {p.description.split(" ").slice(0, 1).join(" ")}
                </CardDescription>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-lg text-primary">
                    {p.price.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-xl">{p.ratingsAverage}</span>
                  <div className="flex">
                    {[0, 1, 2, 3, 4].map((star) =>
                       Math.floor(p.ratingsAverage) ? (
                        <StarIcon key={star} fill="yellow" />
                      ) : (
                        <Star key={star} />
                      ),
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <AddToCartBtn id={p.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
