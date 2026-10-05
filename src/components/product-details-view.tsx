"use client";

import { Button } from "@/components/ui/button";
import { ProductDetailsType } from "@/types/productDetails.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

type ProductDetailsViewProps = {
  product: ProductDetailsType;
};

type ProductTab = "details" | "reviews" | "shipping";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const images = product.images?.length
    ? product.images
    : [product.imageCover];
  const [activeImage, setActiveImage] = useState(product.imageCover);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>("details");
  const rating = Math.max(0, Math.min(5, product.ratingsAverage));

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        <Link className="transition-colors hover:text-primary" href="/">
          Home
        </Link>
        <ChevronRight aria-hidden="true" className="size-4" />
        <Link
          className="transition-colors hover:text-primary"
          href="/categories"
        >
          {product.category.name}
        </Link>
        {product.subcategory[0] && (
          <>
            <ChevronRight aria-hidden="true" className="size-4" />
            <span>{product.subcategory[0].name}</span>
          </>
        )}
        <ChevronRight aria-hidden="true" className="size-4" />
        <span aria-current="page" className="font-medium text-foreground">
          {product.title}
        </span>
      </nav>

      <section className="grid gap-4 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-[#f8f9fa] sm:aspect-[5/4]">
            <Image
              alt={product.title}
              className="object-contain p-5"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={activeImage}
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={activeImage === image}
                className={`relative size-20 shrink-0 overflow-hidden rounded-lg border bg-[#f8f9fa] transition ${
                  activeImage === image
                    ? "border-primary ring-2 ring-primary/15"
                    : "border-border hover:border-primary/50"
                }`}
                key={`${image}-${index}`}
                onClick={() => setActiveImage(image)}
                type="button"
              >
                <Image
                  alt=""
                  className="object-contain p-1"
                  fill
                  sizes="80px"
                  src={image}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col py-1 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {product.category.name}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {product.brand.name}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <div
              aria-label={`${rating.toFixed(1)} out of 5 stars`}
              className="flex items-center gap-0.5 text-amber-400"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  aria-hidden="true"
                  className="size-4"
                  fill={star <= Math.round(rating) ? "currentColor" : "none"}
                  key={star}
                  strokeWidth={1.8}
                />
              ))}
            </div>
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1 border-b pb-6">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="pb-1 text-sm text-muted-foreground">Inclusive of all taxes</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="font-medium">
              Availability:{" "}
              <span
                className={
                  product.quantity > 0 ? "text-primary" : "text-destructive"
                }
              >
                {product.quantity > 0 ? "In stock" : "Out of stock"}
              </span>
            </span>
            {product.quantity > 0 && (
              <span className="text-muted-foreground">
                {product.quantity} available
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex h-12 items-center justify-between rounded-lg border px-2">
              <Button
                aria-label="Decrease quantity"
                className="size-9"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                size="icon"
                variant="ghost"
              >
                <Minus />
              </Button>
              <span aria-live="polite" className="min-w-10 text-center font-semibold">
                {quantity}
              </span>
              <Button
                aria-label="Increase quantity"
                className="size-9"
                disabled={quantity >= product.quantity}
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(product.quantity, current + 1),
                  )
                }
                size="icon"
                variant="ghost"
              >
                <Plus />
              </Button>
            </div>
            <Button
              className="h-12 flex-1 gap-2 rounded-lg text-sm font-semibold"
              disabled={product.quantity <= 0}
            >
              <ShoppingCart aria-hidden="true" />
              Add to Cart
            </Button>
            <Button
              aria-label="Add to wishlist"
              className="h-12 w-12 rounded-lg"
              size="icon"
              variant="outline"
            >
              <Heart aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Free Delivery</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Orders over 500 EGP
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Secure Payment</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  100% protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 border-y">
        <div
          aria-label="Product information"
          className="flex gap-6 overflow-x-auto"
          role="tablist"
        >
          {(
            [
              ["details", "Product Details"],
              ["reviews", `Reviews (${product.ratingsQuantity})`],
              ["shipping", "Shipping & Returns"],
            ] as const
          ).map(([tab, label]) => (
            <button
              aria-selected={activeTab === tab}
              className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="py-7" role="tabpanel">
          {activeTab === "details" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-base font-bold">About this Product</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-5">
                <h2 className="text-base font-bold">Product Information</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="text-right font-medium">
                      {product.category.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Subcategory</dt>
                    <dd className="text-right font-medium">
                      {product.subcategory.map((category) => category.name).join(", ")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Brand</dt>
                    <dd className="text-right font-medium">
                      {product.brand.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Items sold</dt>
                    <dd className="text-right font-medium">
                      {product.sold.toLocaleString()}+ sold
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-base font-bold">Customer Reviews</h2>
              {product.reviews.length > 0 ? (
                <div className="mt-4 divide-y">
                  {product.reviews.slice(0, 5).map((review) => (
                    <article className="py-4" key={review._id}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">{review.user.name}</p>
                        <span className="flex items-center gap-1 text-sm text-amber-500">
                          <Star aria-hidden="true" className="size-4" fill="currentColor" />
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {review.review}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  There are no written reviews for this product yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Free delivery is available on orders over 500 EGP. Delivery
                options and estimated arrival times are shown at checkout.
              </p>
              <p>
                If your order is not right for you, contact our support team
                within 14 days of delivery to arrange a return.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
