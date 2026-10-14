"use client";

import { Button } from "@/components/ui/button";
import { removeCartItem, updateCartItem } from "@/services/cart.services";
import type { CartItem } from "@/services/cart.services";
import {
  ArrowRight,
  Check,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type CartContentProps = {
  items: CartItem[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartContent({ items }: CartContentProps) {
  const router = useRouter();
  const [busyProductId, setBusyProductId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;
  const itemCount = items.reduce((count, item) => count + item.count, 0);

  async function changeQuantity(item: CartItem, count: number) {
    if (count < 1 || count > item.product.quantity) return;

    setBusyProductId(item.product._id);
    try {
      await updateCartItem(item.product._id, count);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update your cart.",
      );
    } finally {
      setBusyProductId(null);
    }
  }

  async function deleteItem(item: CartItem) {
    setBusyProductId(item.product._id);
    try {
      await removeCartItem(item.product._id);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not remove this item.",
      );
    } finally {
      setBusyProductId(null);
    }
  }

  function applyPromoCode() {
    if (!promoCode.trim()) {
      toast.error("Enter a promo code first.");
      return;
    }
    toast.info("Promo codes can be applied during checkout.");
  }

  if (!items.length) {
    return (
      <section className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag aria-hidden="true" className="size-8" />
        </div>
        <h2 className="mt-5 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Find something you love and it will appear here.
        </p>
        <Button
          className="mt-6"
          render={<Link href="/products" />}
          nativeButton={false}
        >
          Continue shopping <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      <section aria-label="Cart items" className="min-w-0 space-y-3 lg:col-span-2">
        {items.map((item) => {
          const isBusy = busyProductId === item.product._id;

          return (
            <article
              className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card p-3 shadow-sm sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:gap-4 sm:p-4"
              key={item.product._id}
            >
              <Link
                aria-label={`View ${item.product.title}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
                href={`/products/${item.product._id}`}
              >
                <Image
                  alt={item.product.title}
                  className="object-contain p-2"
                  fill
                  sizes="88px"
                  src={item.product.imageCover}
                />
              </Link>

              <div className="min-w-0 self-stretch py-1">
                {item.product.brand?.name && (
                  <p className="text-xs text-muted-foreground">
                    {item.product.brand.name}
                  </p>
                )}
                <Link
                  className="mt-1 line-clamp-2 text-sm font-semibold leading-5 transition-colors hover:text-primary sm:text-base"
                  href={`/products/${item.product._id}`}
                >
                  {item.product.title}
                </Link>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {formatPrice(item.product.price)}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    aria-label={`Quantity: ${item.count}`}
                    className="inline-flex items-center rounded-lg border"
                  >
                    <button
                      aria-label={`Decrease quantity of ${item.product.title}`}
                      className="grid size-8 place-items-center text-muted-foreground transition-colors hover:text-primary disabled:opacity-40"
                      disabled={isBusy || item.count <= 1}
                      onClick={() => changeQuantity(item, item.count - 1)}
                      type="button"
                    >
                      <Minus aria-hidden="true" className="size-3.5" />
                    </button>
                    <span className="min-w-7 text-center text-sm font-medium">
                      {item.count}
                    </span>
                    <button
                      aria-label={`Increase quantity of ${item.product.title}`}
                      className="grid size-8 place-items-center text-primary transition-colors hover:bg-primary/5 disabled:opacity-40"
                      disabled={isBusy || item.count >= item.product.quantity}
                      onClick={() => changeQuantity(item, item.count + 1)}
                      type="button"
                    >
                      <Plus aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                  <button
                    aria-label={`Remove ${item.product.title}`}
                    className="grid size-8 place-items-center rounded-lg text-rose-500 transition-colors hover:bg-rose-50 disabled:opacity-40"
                    disabled={isBusy}
                    onClick={() => deleteItem(item)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="hidden min-w-16 text-right sm:block">
                <p className="text-[11px] text-muted-foreground">Total</p>
                <p className="mt-1 font-semibold">
                  {formatPrice(item.product.price * item.count)}
                </p>
              </div>
            </article>
          );
        })}

        <div className="flex items-center justify-between px-1 pt-2 text-xs text-muted-foreground">
          <Link className="text-primary transition-colors hover:text-primary/80" href="/products">
            ← Continue Shopping
          </Link>
          <span>{itemCount} items</span>
        </div>
      </section>

      <aside className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="bg-primary px-5 py-4 text-primary-foreground">
          <h2 className="font-semibold">Order Summary</h2>
          <p className="mt-0.5 text-xs text-primary-foreground/80">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Truck aria-hidden="true" className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">Free Shipping</p>
              <p className="text-xs text-muted-foreground">
                Your goods are free for delivery
              </p>
            </div>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium text-primary">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <dt className="font-semibold">Total</dt>
                <dd className="text-lg font-bold">{formatPrice(total)}</dd>
              </div>
              <p className="mt-1 text-right text-[11px] text-muted-foreground">
                Inclusive of all taxes
              </p>
            </div>
          </dl>

          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              applyPromoCode();
            }}
          >
            <input
              aria-label="Promo code"
              className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="Apply Promo Code"
              value={promoCode}
            />
            <Button className="h-10 px-3" type="submit" variant="outline">
              Apply
            </Button>
          </form>

          <Button
            className="w-full gap-2"
            render={<Link href="/checkout" />}
            nativeButton={false}
          >
              <ShieldCheck aria-hidden="true" className="size-4" />
              Secure Checkout
          </Button>

          <div className="flex items-center justify-center gap-5 border-t pt-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3.5 text-primary" />
              Secure Payment
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard aria-hidden="true" className="size-3.5 text-primary" />
              Fast Delivery
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
