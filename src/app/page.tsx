import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Hero } from '@/components/home/Hero'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export default async function page() {

  return (
    <div  className="flex min-h-screen flex-col">
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}