import { About } from '@/components/home/About'
import React from 'react'

export default async function page() {
  return (
    <div className="flex flex-col">
      <About/>
    </div>
  )
}