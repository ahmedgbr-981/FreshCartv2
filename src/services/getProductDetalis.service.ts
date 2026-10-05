const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

export default async function getProductDetails(id:string) {
    const resp= await fetch(`${BASE_URL}/api/v1/products/${id}`)

    const payload=await resp.json()
    return payload
    
}

