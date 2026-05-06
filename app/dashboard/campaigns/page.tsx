'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Play, Pause, Target, Calendar, DollarSign, Music, TrendingUp, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { store } from '@/lib/store'
import type { Campaign, Platform } from '@/lib/types'

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-muted text-muted-foreground' },
  active: { label: 'Active', color: 'bg-success/20 text-success' },
  paused: { label: 'Paused', color: 'bg-warning/20 text-warning' },
  completed: { label: 'Completed', color: 'bg-primary/20 text-primary' },
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
    const campaign = store.addCampaign({
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
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
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
        {campaigns.map((campaign) => {
          const progress = (campaign.currentReach / campaign.targetReach) * 100
          const daysRemaining = getDaysRemaining(campaign.endDate)
          const status = statusConfig[campaign.status]

          return (
            <Card key={campaign.id} className="relative overflow-hidden">
              {campaign.status === 'active' && (
                <div className="absolute left-0 top-0 h-full w-1 bg-success" />
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{campaign.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={status.color}>{status.label}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
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
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reach Progress</span>
                    <span className="font-medium">{formatNumber(campaign.currentReach)} / {formatNumber(campaign.targetReach)}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>{daysRemaining} days remaining</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" />
                      Target
                    </div>
                    <p className="mt-1 text-lg font-semibold">{formatNumber(campaign.targetReach)}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Current
                    </div>
                    <p className="mt-1 text-lg font-semibold">{formatNumber(campaign.currentReach)}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Budget
                    </div>
                    <p className="mt-1 text-lg font-semibold">${campaign.budget}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Duration
                    </div>
                    <p className="mt-1 text-lg font-semibold">{Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2">
                  {campaign.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="capitalize">
                      {platform}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {campaign.status !== 'completed' && (
                    <Button
                      variant={campaign.status === 'active' ? 'outline' : 'default'}
                      onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                    >
                      {campaign.status === 'active' ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Campaign
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Campaign
                        </>
                      )}
                    </Button>
                  )}
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {campaigns.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Music className="mb-4 h-12 w-12 text-muted-foreground" />
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
