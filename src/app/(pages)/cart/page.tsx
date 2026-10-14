import CartContent from "@/app/cart/cart-content";
import { getCart } from "@/services/cart.services";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Cart() {
  const cart = await getCart();
  const itemCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Link className="transition-colors hover:text-primary" href="/">
          Home
        </Link>
        <ChevronRight aria-hidden="true" className="size-4" />
        <span aria-current="page" className="font-medium text-foreground">
          Shopping Cart
        </span>
      </nav>

      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You have {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <CartContent items={cart} />
    </main>
  );
}
