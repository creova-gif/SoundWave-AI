'use client'

import { useEffect, useState } from 'react'
import { ReachCounter } from '@/components/dashboard/reach-counter'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { PlatformBreakdown } from '@/components/dashboard/platform-breakdown'
import { EngagementChart } from '@/components/dashboard/engagement-chart'
import { AgentLogs } from '@/components/dashboard/agent-logs'
import { ContentQueuePreview } from '@/components/dashboard/content-queue-preview'
import { store } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Play, Pause, RefreshCw } from 'lucide-react'

export default function DashboardPage() {
  const [campaign] = useState(store.getCampaigns()[0])
  const [analytics] = useState(store.getAnalytics())
  const [platformStats] = useState(store.getPlatformStats())
  const [logs, setLogs] = useState(store.getLogs())
  const [contentQueue] = useState(store.getContentQueue())
  const [agentStatus, setAgentStatus] = useState(store.getAgentStatus())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const daysRemaining = campaign
    ? Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 14

  const stats = {
    postsToday: 8,
    scheduled: contentQueue.filter((c) => c.status === 'pending' || c.status === 'approved').length,
    totalViews: 1938583,
    engagementRate: 6.8,
  }

  // Simulate real-time log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        { agentType: 'content' as const, action: 'Analyzing trends', details: 'Scanning TikTok for trending sounds...' },
        { agentType: 'analytics' as const, action: 'Fetching metrics', details: 'Updated engagement data from all platforms' },
        { agentType: 'posting' as const, action: 'Optimizing schedule', details: 'Adjusted posting time for maximum reach' },
        { agentType: 'orchestrator' as const, action: 'Strategy review', details: 'Campaign performing well, continuing current approach' },
      ]
      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      store.addLog({ ...randomAction, status: 'success' })
      setLogs(store.getLogs())
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleToggleAgents = () => {
    const allRunning = Object.values(agentStatus).every((s) => s === 'running')
    const newStatus = allRunning ? 'paused' : 'running'
    Object.keys(agentStatus).forEach((agent) => {
      store.setAgentStatus(agent, newStatus)
    })
    setAgentStatus(store.getAgentStatus())
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((r) => setTimeout(r, 1000))
    store.simulateEngagement()
    setLogs(store.getLogs())
    setIsRefreshing(false)
  }

  const allAgentsRunning = Object.values(agentStatus).every((s) => s === 'running')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            {campaign?.name || 'No active campaign'} - {daysRemaining} days remaining
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleToggleAgents}
            variant={allAgentsRunning ? 'default' : 'outline'}
          >
            {allAgentsRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause Agents
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Agents
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reach Counter */}
      <ReachCounter
        currentReach={campaign?.currentReach || 0}
        targetReach={campaign?.targetReach || 20000000}
        daysRemaining={daysRemaining}
      />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts and Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <EngagementChart data={analytics} />
        <PlatformBreakdown data={platformStats} />
      </div>

      {/* Content Queue and Agent Logs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ContentQueuePreview items={contentQueue} />
        <AgentLogs logs={logs} />
      </div>
    </div>
  )
}
