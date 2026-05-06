'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Play, Pause, Target, Calendar, DollarSign, Music, TrendingUp, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { store } from '@/lib/store'
import { PlatformIcon } from '@/components/icons/platform-icons'
import type { Campaign, Platform } from '@/lib/types'

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-muted/60 text-muted-foreground border-muted-foreground/20' },
  active: { label: 'Active', color: 'bg-success/15 text-success border-success/20' },
  paused: { label: 'Paused', color: 'bg-warning/15 text-warning border-warning/20' },
  completed: { label: 'Completed', color: 'bg-primary/15 text-primary border-primary/20' },
}

const platformLabels: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  twitter: 'X / Twitter',
  facebook: 'Facebook',
  spotify: 'Spotify',
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(store.getCampaigns())
  const [isCreating, setIsCreating] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    targetReach: 20000000,
    budget: 500,
    duration: 14,
  })

  const handleCreateCampaign = () => {
    store.addCampaign({
      name: newCampaign.name || 'New Campaign',
      songId: 'song-1',
      status: 'draft',
      startDate: new Date(),
      endDate: new Date(Date.now() + newCampaign.duration * 24 * 60 * 60 * 1000),
      targetReach: newCampaign.targetReach,
      currentReach: 0,
      budget: newCampaign.budget,
      platforms: ['tiktok', 'instagram', 'youtube', 'twitter', 'facebook', 'spotify'],
    })
    setCampaigns([...store.getCampaigns()])
    setIsCreating(false)
    setNewCampaign({ name: '', targetReach: 20000000, budget: 500, duration: 14 })
  }

  const handleToggleStatus = (id: string, currentStatus: Campaign['status']) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    store.updateCampaign(id, { status: newStatus })
    setCampaigns([...store.getCampaigns()])
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getDaysRemaining = (endDate: Date) => {
    const days = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Campaigns</h1>
          <p className="text-muted-foreground">{campaigns.length} campaign(s)</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Set up a new marketing campaign for your music</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Campaign Name</label>
                <Input
                  placeholder="e.g., Summer Track Launch"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Reach</label>
                <Select
                  value={newCampaign.targetReach.toString()}
                  onValueChange={(v) => setNewCampaign({ ...newCampaign, targetReach: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">1 Million</SelectItem>
                    <SelectItem value="5000000">5 Million</SelectItem>
                    <SelectItem value="10000000">10 Million</SelectItem>
                    <SelectItem value="20000000">20 Million</SelectItem>
                    <SelectItem value="50000000">50 Million</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Budget ($)</label>
                <Input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Duration (days)</label>
                <Select
                  value={newCampaign.duration.toString()}
                  onValueChange={(v) => setNewCampaign({ ...newCampaign, duration: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="90">3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-4">
        {campaigns.map((campaign, i) => {
          const progress = Math.min((campaign.currentReach / campaign.targetReach) * 100, 100)
          const daysRemaining = getDaysRemaining(campaign.endDate)
          const status = statusConfig[campaign.status]
          const totalDays = Math.ceil(
            (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24)
          )

          return (
            <motion.div
              key={campaign.id}
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="relative overflow-hidden">
                {campaign.status === 'active' && (
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-success"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                        <Music className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(campaign.startDate)} — {formatDate(campaign.endDate)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`border ${status.color}`}>{status.label}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reach Progress</span>
                      <span className="font-medium tabular-nums">{formatNumber(campaign.currentReach)} / {formatNumber(campaign.targetReach)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted/60">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-chart-4"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(1)}% complete</span>
                      <span>{daysRemaining} days remaining</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: Target, label: 'Target', value: formatNumber(campaign.targetReach) },
                      { icon: TrendingUp, label: 'Current', value: formatNumber(campaign.currentReach) },
                      { icon: DollarSign, label: 'Budget', value: `$${campaign.budget}` },
                      { icon: Calendar, label: 'Duration', value: `${totalDays} days` },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg border border-border bg-card/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <stat.icon className="h-3 w-3" />
                          {stat.label}
                        </div>
                        <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="outline"
                        className="flex items-center gap-1.5 border-border/60 text-muted-foreground"
                      >
                        <PlatformIcon platform={platform as Platform} size={11} />
                        {platformLabels[platform as Platform] || platform}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    {campaign.status !== 'completed' && (
                      <Button
                        variant={campaign.status === 'active' ? 'outline' : 'default'}
                        onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                      >
                        {campaign.status === 'active' ? (
                          <><Pause className="mr-2 h-4 w-4" />Pause Campaign</>
                        ) : (
                          <><Play className="mr-2 h-4 w-4" />Start Campaign</>
                        )}
                      </Button>
                    )}
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {campaigns.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Music className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="mb-4 text-muted-foreground">No campaigns yet</p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
