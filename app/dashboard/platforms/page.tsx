'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CheckCircle2, XCircle, Link2, ExternalLink, Users, RefreshCw, Settings } from 'lucide-react'
import { store } from '@/lib/store'
import { PlatformIcon } from '@/components/icons/platform-icons'
import type { Platform, PlatformCredential } from '@/lib/types'

const platformConfig: Record<Platform, { label: string; color: string; bgColor: string; description: string }> = {
  tiktok: { 
    label: 'TikTok', 
    color: 'text-[#00f2ea]', 
    bgColor: 'bg-[#00f2ea]/10',
    description: 'Short-form video platform with massive viral potential'
  },
  instagram: { 
    label: 'Instagram', 
    color: 'text-pink-400', 
    bgColor: 'bg-pink-500/10',
    description: 'Visual storytelling through Reels, Stories, and Feed posts'
  },
  youtube: { 
    label: 'YouTube', 
    color: 'text-red-500', 
    bgColor: 'bg-red-500/10',
    description: 'Video platform for Shorts and long-form content'
  },
  twitter: { 
    label: 'X / Twitter', 
    color: 'text-foreground', 
    bgColor: 'bg-foreground/10',
    description: 'Real-time engagement and trending conversations'
  },
  facebook: { 
    label: 'Facebook', 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-500/10',
    description: 'Community building and paid amplification'
  },
  spotify: { 
    label: 'Spotify', 
    color: 'text-green-500', 
    bgColor: 'bg-green-500/10',
    description: 'Music streaming and playlist promotion'
  },
}

export default function PlatformsPage() {
  const [credentials, setCredentials] = useState<PlatformCredential[]>(store.getCredentials())
  const [connectingPlatform, setConnectingPlatform] = useState<Platform | null>(null)
  const [isSyncing, setIsSyncing] = useState<Platform | null>(null)

  const handleConnect = (platform: Platform) => {
    // Simulate OAuth connection
    setConnectingPlatform(platform)
    setTimeout(() => {
      store.updateCredential(platform, { 
        connected: true, 
        username: `@yourartist_${platform}`,
        followers: Math.floor(Math.random() * 100000) + 10000,
        lastSynced: new Date()
      })
      setCredentials([...store.getCredentials()])
      setConnectingPlatform(null)
    }, 1500)
  }

  const handleDisconnect = (platform: Platform) => {
    store.updateCredential(platform, { 
      connected: false, 
      username: undefined,
      followers: undefined,
      lastSynced: undefined
    })
    setCredentials([...store.getCredentials()])
  }

  const handleSync = async (platform: Platform) => {
    setIsSyncing(platform)
    await new Promise((r) => setTimeout(r, 2000))
    store.updateCredential(platform, { lastSynced: new Date() })
    setCredentials([...store.getCredentials()])
    setIsSyncing(null)
  }

  const formatNumber = (num?: number) => {
    if (!num) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatTime = (date?: Date) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const connectedCount = credentials.filter((c) => c.connected).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Platform Connections</h1>
        <p className="text-muted-foreground">{connectedCount} of 6 platforms connected</p>
      </div>

      {/* Connection Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {credentials.map((cred) => {
              const config = platformConfig[cred.platform]
              return (
                <div key={cred.platform} className="flex flex-col items-center gap-2 text-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${config.bgColor}`}>
                    <PlatformIcon platform={cred.platform} size={28} />
                  </div>
                  <span className="text-xs font-medium">{config.label}</span>
                  {cred.connected ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Platform Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {credentials.map((cred) => {
          const config = platformConfig[cred.platform]
          return (
            <Card key={cred.platform} className="relative overflow-hidden">
              <div className={`absolute right-0 top-0 h-24 w-24 ${config.bgColor} rounded-bl-full opacity-50`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor}`}>
                      <PlatformIcon platform={cred.platform} size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{config.label}</CardTitle>
                      <CardDescription className="text-xs">{config.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cred.connected ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Account</span>
                        <span className="font-medium">{cred.username}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Followers</span>
                        <span className="font-medium">{formatNumber(cred.followers)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Synced</span>
                        <span className="text-xs">{formatTime(cred.lastSynced)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleSync(cred.platform)}
                        disabled={isSyncing === cred.platform}
                      >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing === cred.platform ? 'animate-spin' : ''}`} />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive">
                            Disconnect
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Disconnect {config.label}?</DialogTitle>
                            <DialogDescription>
                              This will remove the connection to your {config.label} account. You can reconnect at any time.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive" onClick={() => handleDisconnect(cred.platform)}>
                              Disconnect
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Connect your {config.label} account to enable automated posting and analytics tracking.
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => handleConnect(cred.platform)}
                      disabled={connectingPlatform === cred.platform}
                    >
                      {connectingPlatform === cred.platform ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link2 className="mr-2 h-4 w-4" />
                          Connect {config.label}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage your platform API keys and tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">PostEverywhere API</p>
                <p className="text-sm text-muted-foreground">Unified posting API for all platforms</p>
              </div>
              <Badge variant="outline" className="text-warning border-warning">
                Not Configured
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            For production use, you&apos;ll need to set up API keys in the Settings. The system currently uses mock data for demonstration.
          </p>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View API Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
