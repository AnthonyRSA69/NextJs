"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { PaymentsList } from "@/components/payments-list"
import { SiteHeader } from "@/components/site-header"
import { InvoicesTable } from "@/components/invoices-table"
import { useState, useCallback } from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
  
import data from "./data.json"

export default function Page() {

  const [invoicesRefreshKey, setInvoicesRefreshKey] = useState(0);
  const refreshInvoices = useCallback(() => setInvoicesRefreshKey((k) => k + 1), []);

  return (
    <div className="dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-svh">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <PaymentsList onInvoiceGenerated={refreshInvoices} />
                  <InvoicesTable refreshKey={invoicesRefreshKey} />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
