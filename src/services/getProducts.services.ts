const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

export default async function getAllProducts() {

    const resp=await fetch(`${BASE_URL}/api/v1/products`)
    const payload =await resp.json()
    return payload
    
}