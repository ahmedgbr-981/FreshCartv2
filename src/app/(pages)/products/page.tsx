import getAllProducts from "@/services/getProducts.services";
import { AllProducts } from "@/types/allProducts.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, Carton, CartonIcon, LucideStars, ShoppingBag, Star, StarIcon, Stars, StarsIcon } from "lucide-react";
import Link from "next/link";

export default async function Preducts() {
  const resp = await getAllProducts();
  const products: AllProducts[] = resp.data;

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl border-s-2 border-primary ps-2">
          All <span className="text-primary">Products</span>
        </h1>
        <div className="grid  grid-cols-12 gap-3">
          {products.map((p) => (
            <div className="col-span-3 pt-5" key={p._id}>
              <Link href={`/products/${p.id}`}>
              <Card className="relative mx-auto w-full max-w-sm pt-0">
                <div className="absolute inset-0 z-30 " />
                <img
                  src={p.imageCover}
                  alt="Event cover"
                  className="relative z-20 aspect-auto w-full object-cover  dark:brightness-40"
                />
                <CardHeader>
                  <CardAction>
                    
                  </CardAction>
                  <CardTitle>{p.title.split(' ').slice(0, 2).join(' ')}</CardTitle>
                  <CardDescription>
                  {p.description.split(' ').slice(0, 1).join(' ')}
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-primary text-lg ">{p.price.toLocaleString()} EGP</span>
                     </div>
                    <div className="flex justify-between pt-3">
                      <span className="text-xl">{p.ratingsAverage}</span> 
                      <div className="flex">
                        {
                        [0,1,2,3,4].map((s)=>{
                          const filled=s<Math.floor(p.ratingsAverage)
                          if(filled){
                            return <StarIcon fill="yellow"/>
                          }
                          else{
                            return <Star/>
                          }
                        })
                      }
                      </div>
                    </div>
                 
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">Add to cart<ShoppingBag/></Button>
                </CardFooter>
              </Card></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
