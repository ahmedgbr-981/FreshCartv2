import * as z from 'zod'

export const registerSchema=z.object({
    name:z.string().nonempty('Name is requaird').min(3,'Name must be a teast 3 char'),
    email:z.email('Invaild email').nonempty('Name is requaird'),
    password:z.string().nonempty('Password is requaird').min(6,'Minimum 6 char'),
    rePassword:z.string().nonempty('Confirm your password'),
    phone:z.string().nonempty('Phone is requaird').regex(/^01[0125][0-9]{8}$/,'invalid egy number'),

}).refine((obj)=>obj.password==obj.rePassword,{
    path:['rePassword'],
    error:'RePassword must match password'
})

export type registerSchemaType = z.infer<typeof registerSchema>
