import { Register } from '@/components/auth/Register'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Register />
      </div>
    </div>
  )
}