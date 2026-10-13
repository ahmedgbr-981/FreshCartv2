import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(req:NextRequest) {
    const token =await getToken({req})
    console.log(token)

    const {pathname}=req.nextUrl
    const isAuthPage= pathname =='/login' || pathname=='/register'
    if(token && isAuthPage){
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`)
    }
    if(!token && !isAuthPage){
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
    }
    return NextResponse.next()
}


export const config ={
    matcher:['/cart','/wishlist','/login','/register']
}