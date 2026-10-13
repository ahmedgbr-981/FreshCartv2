import { getMyToken } from '@/lib/auth'
import React from 'react'

export default async function Cart() {

  const x=await getMyToken()
  console.log('tokkken',x)
  return (
    <div>Cart</div>
  )
}
