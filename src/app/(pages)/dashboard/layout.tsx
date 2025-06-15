import { AppSidebar } from '@/components/dashboard/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
// import { cookies } from 'next/headers'
import { checkAdm, userSession, checkGoogle} from '@/lib/user-session'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'
  const isAdm = await checkAdm()
  const user = await userSession()
  const google = await checkGoogle()

  // defaultOpen={defaultOpen}
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar isAdm={isAdm} user={user} isGoogle={google}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}