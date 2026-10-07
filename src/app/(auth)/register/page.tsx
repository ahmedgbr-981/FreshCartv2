"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { registerSchema, registerSchemaType } from "@/lib/schema/auth.schema";
import signUp from "@/services/register.services";
import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, FormState, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default  function Register() {
  
  const router=useRouter()
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver:zodResolver(registerSchema),
    mode:'all'
  });

  interface Inputs{
    name:"name"|"email"|"password"|"rePassword"|"phone",
    placeholder:string,
    type:string,
    lab:string
  }

  const inputs:Inputs[]=[
    {name:'name',placeholder:'Enter your name',type:'text',lab:'Name'},
    {name:'email',placeholder:'Enter your email',type:'email',lab:'Email'},
    {name:'password',placeholder:'Enter your password',type:'password',lab:'Password'},
    {name:'rePassword',placeholder:'Enter your rePassword',type:'password',lab:'RePassword'},
    {name:'phone',placeholder:'Enter your phone',type:'text',lab:'Phone'},
  ]

  
  async function handleSignUp(values:registerSchemaType) {

   try {
     const resp =await signUp(values)
      form.reset()
     console.log(resp)
     if(resp.message=='success'){
     toast.success('Account created')
     router.push('/login')

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
        <form onSubmit={form.handleSubmit(handleSignUp)} className="w-full p-2">
          <div className="text-center text-lg ">Sign up</div>
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
         
          <Button type="submit" className='my-2 w-full'>{form.formState.isSubmitting? <Loader className="animate-spin"/>:'Sign up'}</Button>
          
        </form>
      </div>
    </>
  );
}
