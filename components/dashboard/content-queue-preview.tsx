'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, Edit, Trash2 } from 'lucide-react'
import type { ContentItem, Platform } from '@/lib/types'
import Link from 'next/link'

interface ContentQueuePreviewProps {
  items: ContentItem[]
}

const platformColors: Record<Platform, string> = {
  tiktok: 'bg-[#00f2ea]/20 text-[#00f2ea]',
  instagram: 'bg-pink-500/20 text-pink-400',
  youtube: 'bg-red-500/20 text-red-400',
  twitter: 'bg-foreground/20 text-foreground',
  facebook: 'bg-blue-500/20 text-blue-400',
  spotify: 'bg-green-500/20 text-green-400',
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-warning/20 text-warning' },
  approved: { label: 'Approved', color: 'bg-success/20 text-success' },
  posted: { label: 'Posted', color: 'bg-primary/20 text-primary' },
  failed: { label: 'Failed', color: 'bg-destructive/20 text-destructive' },
}

export function ContentQueuePreview({ items }: ContentQueuePreviewProps) {
  const formatTime = (date?: Date) => {
    if (!date) return 'Not scheduled'
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Content Queue</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/content">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <Badge className={platformColors[item.platform]} variant="secondary">
                {item.platform}
              </Badge>
              <Badge className={statusConfig[item.status].color} variant="secondary">
                {statusConfig[item.status].label}
              </Badge>
            </div>
            <p className="mb-3 line-clamp-2 text-sm text-foreground">{item.content}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.hashtags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-primary">
                  {tag}
                </span>
              ))}
              {item.hashtags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{item.hashtags.length - 3}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatTime(item.scheduledFor)}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Edit className="h-3 w-3" />
                </Button>
                {item.status === 'pending' && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-success">
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p>No content in queue</p>
            <Button variant="link" className="mt-2">
              Generate Content with AI
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
