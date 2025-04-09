'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-4">
      <div>
        <Link
          href="/"
          className="flex flex-row items-center gap-3 text-2xl font-bold"
        >
          <Sun className="" size={32} color="#ff8040"/>
          <h2 className="font-semibold">Qli-mate</h2>
        </Link>
      </div>
      <div className="flex gap-3">
        <Button className="font-medium">
          <Link href="/login">Acessar</Link>
        </Button>
      </div>
    </header>
  )
}
