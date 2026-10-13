'use server'

import { getMyToken } from "@/lib/auth"

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

export default async function addToCart(id:string) {
    if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
    }

    const token = await getMyToken();
    if (!token) {
        throw new Error("Please sign in to add products to your cart.");
    }

    const resp= await fetch(`${BASE_URL}/api/v1/cart`,{
        method:'POST',
        headers:{
            token,
            "Content-type":'application/json',
        },
        body: JSON.stringify({productId: id})
    })

    const payload: unknown = await resp.json();

    const message =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
            ? payload.message
            : `Could not add product to cart (HTTP ${resp.status}).`;
    const apiStatus =
        typeof payload === "object" && payload !== null && "status" in payload
            ? payload.status
            : undefined;

    if (!resp.ok || apiStatus === "error" || apiStatus === "fail") {
        throw new Error(message);
    }

    return payload
    
}
