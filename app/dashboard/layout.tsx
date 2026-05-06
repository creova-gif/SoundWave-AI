import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { Zap } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Demo Mode Banner */}
      <div className="flex items-center justify-center gap-2 bg-warning/10 border-b border-warning/20 px-4 py-2 text-xs text-warning">
        <Zap className="h-3 w-3 flex-shrink-0" />
        <span>
          <strong>Demo Mode</strong> — Running with mock data. Add your API keys in Settings to connect real platforms.
        </span>
      </div>

      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
