'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app.sidebar"
import { BreadcrumbCustom } from "@/components/breadcrumb.custom";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <AppSidebar /> {/* should be fixed width or controlled */}
        <main className="flex-1 w-full">
          <div className="flex gap-4 items-center p-4">
            <SidebarTrigger />
            <BreadcrumbCustom />
          </div>
          <div className="px-4 pb-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}