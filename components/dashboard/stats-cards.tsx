'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Send, Eye, Heart } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    postsToday: number
    scheduled: number
    totalViews: number
    engagementRate: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Posts Today',
      value: stats.postsToday.toString(),
      icon: Send,
      change: '+3 from yesterday',
      color: 'text-chart-1',
    },
    {
      title: 'Scheduled',
      value: stats.scheduled.toString(),
      icon: FileText,
      change: 'Next in 2h',
      color: 'text-chart-2',
    },
    {
      title: 'Total Views',
      value: formatNumber(stats.totalViews),
      icon: Eye,
      change: '+18.2% this week',
      color: 'text-chart-3',
    },
    {
      title: 'Engagement',
      value: stats.engagementRate.toFixed(1) + '%',
      icon: Heart,
      change: 'Above average',
      color: 'text-chart-4',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
