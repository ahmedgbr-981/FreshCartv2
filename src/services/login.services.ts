import { loginSchemaType } from "@/lib/schema/login.schema"

export default async function signIn(data:loginSchemaType) {
    const resp=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
             "Content-type":'application/json',
        }
    })

     const payload=await resp.json()
    return payload
}