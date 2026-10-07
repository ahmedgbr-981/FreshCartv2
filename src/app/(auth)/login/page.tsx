"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema, loginSchemaType } from "@/lib/schema/login.schema";
import signIn from "@/services/login.services";
import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default  function Login() {
  
  const router=useRouter()
  
  const form = useForm({
    defaultValues: {
      
      email: "",
      password: "",
     
    },
    resolver:zodResolver(loginSchema),
    mode:'all'
  });

  interface Inputs{
    name:"email"|"password",
    placeholder:string,
    type:string,
    lab:string
  }

  const inputs:Inputs[]=[
    {name:'email',placeholder:'Enter your email',type:'email',lab:'Email'},
    {name:'password',placeholder:'Enter your password',type:'password',lab:'Password'},
  ]

  
  async function handleSignIn(values:loginSchemaType) {

   try {
     const resp =await signIn(values)
     console.log(resp)
     if(resp.message=='success'){
     toast.success('Logged in')
     router.push('/')

     }
     else{
     toast.error(resp.message)

     }
   } catch (error) {
    
   }

  }
  return (
    <>
      <div className="flex justify-center items-center p-5  mx-auto">
        <form onSubmit={form.handleSubmit(handleSignIn)} className="w-full p-2">
          <div className="text-center text-lg ">Sign in</div>
         {
          inputs.map((inp)=> <Controller
          key={inp.name}
            name={inp.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}  >
                <FieldLabel htmlFor={field.name} className="pt-3 ps-3">{inp.lab}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={inp.placeholder}
                  autoComplete="off"
                  className='shadow rounded-2xl p-3 w-full'
                  type={inp.type}
                />
                
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          
          />)
         }
         
          <Button type="submit" className='my-2 w-full'>{form.formState.isSubmitting? <Loader className="animate-spin"/>:'Sign in'}</Button>
          
        </form>
      </div>
    </>
  );
}
