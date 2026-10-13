"use client";

import addToCart from "@/services/addTocart.services";
import { Button } from "@base-ui/react";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddToCartBtn({ id }: { id: string }) {
  const [isAdding, setIsAdding] = useState(false);

  async function addProduct() {
    setIsAdding(true);
    try {
      await addToCart(id);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add product to cart.",
      );
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Button
      onClick={addProduct}
      disabled={isAdding}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-primary p-2 text-xl text-white hover:bg-green-500"
    >
      {isAdding ? "Adding..." : "Add to cart"}
      <ShoppingBag />
    </Button>
  );
}
