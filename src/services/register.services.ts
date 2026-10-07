import { registerSchemaType } from "@/lib/schema/auth.schema";

export default async function signUp(data:registerSchemaType) {
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
             "Content-type":'application/json',
        }
    })

     const payload=await resp.json()
    return payload
}