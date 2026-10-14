"use server";

import { getMyToken } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type CartProduct = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  quantity: number;
  brand?: {
    name: string;
  };
};

export type CartItem = {
  count: number;
  product: CartProduct;
};

function getMessage(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }
  return fallback;
}


function getCartItems(payload: unknown): CartItem[] {
  if (typeof payload !== "object" || payload === null || !("data" in payload)) {
    throw new Error("The cart response was not in the expected format.");
  }

  const data = payload.data;
  const cart =
    typeof data === "object" && data !== null && "cart" in data
      ? data.cart
      : data;
  const products =
    typeof cart === "object" && cart !== null && "products" in cart
      ? cart.products
      : cart;

  if (!Array.isArray(products)) {
    throw new Error("The cart response did not contain a product list.");
  }

  return products.map((item): CartItem => {
    const product = item.product;
    const count = item.count
    const price = product.price

    if (!Number.isInteger(count) || count < 1) {
      throw new Error("The cart response contained an invalid item quantity.");
    }
    if (price < 0) {
      throw new Error("The cart response contained an invalid product price.");
    }

    return {
      count,
      product: {
        _id: product._id,
        title: product.title,
        imageCover: product.imageCover,
        price,
        quantity: product.quantity,
        brand:
          "brand" in product &&
          typeof product.brand === "object" &&
          product.brand !== null &&
          "name" in product.brand &&
          typeof product.brand.name === "string"
            ? { name: product.brand.name }
            : undefined,
      },
    };
  });
}

async function getAuthenticatedHeaders() {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  const token = await getMyToken();
  if (!token) {
    throw new Error("Please sign in to view your cart.");
  }

  return { token, "Content-Type": "application/json" };
}

export async function getCart(): Promise<CartItem[]> {
  const headers = await getAuthenticatedHeaders();
  const response = await fetch(`${BASE_URL}/api/v1/cart`, {
    headers,
    cache: "no-store",
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      getMessage(payload, `Could not load your cart (HTTP ${response.status}).`),
    );
  }

  return getCartItems(payload);
}

async function mutateCart(
  productId: string,
  method: "PUT" | "DELETE",
  count?: number,
) {
  const headers = await getAuthenticatedHeaders();
  const response = await fetch(`${BASE_URL}/api/v1/cart/${productId}`, {
    method,
    headers,
    ...(count === undefined
      ? {}
      : { body: JSON.stringify({ count }) }),
  });

  if (!response.ok) {
    const payload: unknown = await response.json();
    throw new Error(
      getMessage(
        payload,
        `Could not ${method === "PUT" ? "update" : "remove"} the cart item (HTTP ${response.status}).`,
      ),
    );
  }
}

export async function updateCartItem(productId: string, count: number) {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Cart quantity must be a positive whole number.");
  }
  await mutateCart(productId, "PUT", count);
}

export async function removeCartItem(productId: string) {
  await mutateCart(productId, "DELETE");
}
