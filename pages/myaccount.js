import React from 'react'
import { useRouter, useEffect } from "next/router";

const MyAccount = () => {
const router = useRouter()
    useEffect(() => {
        if(!localStorage.getItem('token')){
          router.push('/')
        }
      }, [])
    
  return (
    <div>MyAccount</div>
  )
}

export default MyAccount