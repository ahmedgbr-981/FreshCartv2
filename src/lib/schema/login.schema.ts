import * as z from 'zod'

export const loginSchema=z.object({
    email:z.email('Invaild email').nonempty('Name is requaird'),
    password:z.string().nonempty('Password is requaird').min(6,'Invaild password'),

})

export type loginSchemaType = z.infer<typeof loginSchema>
