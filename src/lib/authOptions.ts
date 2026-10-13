import signIn from '@/services/login.services';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions={

    pages:{
        signIn:'/login'
    },

    providers:[
        Credentials({
            
                name:'credentials',
                credentials:{email:{},password:{}},
                authorize:async (credentials)=>{
                 
                     if(!credentials) return 
                    const resp =await signIn(credentials)
                    
                    if(resp.message=='success'){
                        return resp
                    }
                   else {
                    throw new Error(resp.message || 'Invalid email or password')
                  }
                
            }
        })
        
    ],
    callbacks:{
        jwt({token,user}){
            if(user){
                token.user=user.user,
            token.token=user.token
            }
            return token
        },
         session({session,token}){
        if(session){
            session.user=token.user
        }
        return session
    }
    }
   
}