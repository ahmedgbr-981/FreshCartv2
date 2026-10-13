import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
 
  interface User {
      user:UserData,
      token:string
    
  }
}

interface UserData{
  name:string,
  role:string,
  email:string,
}

  

declare module "next-auth/jwt" {
  interface JWT {
    user:UserData
  }
}