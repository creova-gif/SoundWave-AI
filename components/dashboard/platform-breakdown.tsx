'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Platform } from '@/lib/types'

interface PlatformBreakdownProps {
  data: { platform: Platform; reach: number; percentage: number }[]
}

const platformConfig: Record<Platform, { label: string; color: string; icon: string }> = {
  tiktok: { label: 'TikTok', color: 'bg-[#00f2ea]', icon: '🎵' },
  instagram: { label: 'Instagram', color: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]', icon: '📸' },
  youtube: { label: 'YouTube', color: 'bg-[#ff0000]', icon: '▶️' },
  twitter: { label: 'X / Twitter', color: 'bg-foreground', icon: '𝕏' },
  facebook: { label: 'Facebook', color: 'bg-[#1877f2]', icon: '📘' },
  spotify: { label: 'Spotify', color: 'bg-[#1db954]', icon: '🎧' },
}

export function PlatformBreakdown({ data }: PlatformBreakdownProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Platform Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item) => {
          const config = platformConfig[item.platform]
          return (
            <div key={item.platform} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span className="font-medium">{config.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{formatNumber(item.reach)}</span>
                  <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className={`h-full rounded-full ${config.color}`} style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
