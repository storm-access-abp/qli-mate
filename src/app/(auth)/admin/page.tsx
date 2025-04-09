import { Register } from '@/components/admin/Register'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import ListUsers from '@/components/admin/ListUsers'

export default async function Page() {

  const session = await auth.api.getSession({ headers: await headers() })
  if(session?.user.role !== 'admin') return redirect('/')

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-16">
        <Register />
        <ListUsers/>
      </div>
    </div>
  )
}