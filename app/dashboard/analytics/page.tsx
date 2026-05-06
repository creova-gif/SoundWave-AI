'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share2, Target, ArrowUpRight } from 'lucide-react'
import { store } from '@/lib/store'
import type { Platform } from '@/lib/types'

const platformConfig: Record<Platform, { label: string; color: string }> = {
  tiktok: { label: 'TikTok', color: '#00f2ea' },
  instagram: { label: 'Instagram', color: '#e1306c' },
  youtube: { label: 'YouTube', color: '#ff0000' },
  twitter: { label: 'X / Twitter', color: '#ffffff' },
  facebook: { label: 'Facebook', color: '#1877f2' },
  spotify: { label: 'Spotify', color: '#1db954' },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('14d')
  const analytics = store.getAnalytics()
  const platformStats = store.getPlatformStats()
  const campaign = store.getCampaigns()[0]

  const totalReach = campaign?.currentReach || 0
  const targetReach = campaign?.targetReach || 20000000
  const progress = (totalReach / targetReach) * 100

  const pieData = platformStats.map((stat) => ({
    name: platformConfig[stat.platform].label,
    value: stat.reach,
    color: platformConfig[stat.platform].color,
  }))

  const engagementData = [
    { name: 'Views', value: 1938583, change: 18.2, icon: Eye },
    { name: 'Likes', value: 142345, change: 12.5, icon: Heart },
    { name: 'Comments', value: 8521, change: -3.2, icon: MessageCircle },
    { name: 'Shares', value: 24567, change: 28.9, icon: Share2 },
  ]

  const hourlyEngagementValues = [480, 320, 260, 230, 250, 380, 640, 870, 940, 810, 730, 690, 760, 830, 910, 990, 1120, 1270, 1190, 1090, 960, 790, 630, 510]
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    engagement: hourlyEngagementValues[i],
  }))

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Analytics</h1>
          <p className="text-muted-foreground">Track your campaign performance across all platforms</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Goal Progress */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Campaign Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-baseline gap-4">
            <span className="text-4xl font-bold">{formatNumber(totalReach)}</span>
            <span className="text-muted-foreground">/ {formatNumber(targetReach)} reach goal</span>
            <Badge variant="outline" className="ml-auto">
              {progress.toFixed(1)}%
            </Badge>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-chart-1 transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Average</p>
              <p className="text-lg font-semibold">{formatNumber(Math.floor(totalReach / 14))}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Required Daily</p>
              <p className="text-lg font-semibold">{formatNumber(Math.ceil((targetReach - totalReach) / 12))}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days Remaining</p>
              <p className="text-lg font-semibold">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">On Track</p>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                Behind
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {engagementData.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className={`flex items-center text-xs ${stat.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {stat.change >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                {Math.abs(stat.change)}% from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reach Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Reach Over Time</CardTitle>
            <CardDescription>Daily reach across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="reachGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatDate} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={formatNumber} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={50} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                            <p className="mb-2 text-sm font-medium">{formatDate(label)}</p>
                            <p className="text-sm">Reach: <span className="font-medium">{formatNumber(payload[0].value as number)}</span></p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area type="monotone" dataKey="reach" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#reachGradient2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Reach breakdown by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                            <p className="text-sm font-medium">{payload[0].name}</p>
                            <p className="text-sm text-muted-foreground">{formatNumber(payload[0].value as number)}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Engagement */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hourly Engagement Pattern</CardTitle>
            <CardDescription>Best times to post based on engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} interval={2} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                            <p className="text-sm font-medium">{label}</p>
                            <p className="text-sm text-muted-foreground">Engagement: {payload[0].value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Peak hours: <span className="font-medium text-foreground">7 PM - 9 PM EST</span></span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Your best posts this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                  #{i}
                </div>
                <div className="flex-1">
                  <p className="font-medium">POV: You found your new summer anthem...</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="bg-[#00f2ea]/20 text-[#00f2ea]">TikTok</Badge>
                    <span>{formatNumber(1247893 - i * 200000)} views</span>
                    <span>6.8% engagement</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
