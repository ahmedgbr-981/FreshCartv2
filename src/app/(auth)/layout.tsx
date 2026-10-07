import React from 'react'

export default function AuthLayout({children}:LayoutProps<'/'>) {
  return (
   <div className="w-[90%] mx-auto pt-3 ">
     <div className='grid grid-flow-row lg:grid-flow-col lg:grid-cols-12 gap-4 '>
        <div className=" lg:col-span-6 text-primary text-2xl">
            Welcome to fresh cart
        </div>
        <div className="lg:col-span-6 ">
            {children}
        </div>
    </div>
   </div>
  )
}
