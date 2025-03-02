import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/app/dashboard/components/app-sidebar'
import NavBar from './components/nav-bar'

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden">
      <SidebarProvider>
        <AppSidebar  /> {/* Adjust the width here */}
        <div className='flex flex-col w-full'>
          <header>
            <NavBar />
          </header>
          <main className='flex-1 overflow-y-auto bg-foreground'>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
