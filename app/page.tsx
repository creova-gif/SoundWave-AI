'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlatformIcon } from '@/components/icons/platform-icons'
import {
  Music,
  Zap,
  TrendingUp,
  Bot,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Globe,
} from 'lucide-react'

const platforms = [
  { name: 'TikTok', platform: 'tiktok' as const },
  { name: 'Instagram', platform: 'instagram' as const },
  { name: 'YouTube', platform: 'youtube' as const },
  { name: 'Twitter/X', platform: 'twitter' as const },
  { name: 'Facebook', platform: 'facebook' as const },
  { name: 'Spotify', platform: 'spotify' as const },
]

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Agents',
    description: 'Autonomous agents generate viral content, schedule posts, and analyze performance 24/7',
  },
  {
    icon: TrendingUp,
    title: 'Trend Detection',
    description: 'Real-time monitoring of trending sounds, hashtags, and formats across all platforms',
  },
  {
    icon: Sparkles,
    title: 'Content Generation',
    description: 'AI creates platform-specific captions, hashtags, and video scripts optimized for engagement',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track reach, engagement, and progress toward your goals in real-time',
  },
  {
    icon: Zap,
    title: 'Automated Posting',
    description: 'Schedule and publish content at optimal times across all platforms simultaneously',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Reach audiences on TikTok, Instagram, YouTube, Twitter, Facebook, and Spotify',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Music className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">SoundWave AI</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <Button asChild>
            <Link href="/dashboard">
              Launch Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">
            <Zap className="mr-1 h-3 w-3 text-primary" />
            AI-Powered Music Marketing
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            Reach{' '}
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              20 Million
            </span>{' '}
            People in 2 Weeks
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
            Autonomous AI agents that generate viral content, post across 6 platforms, and optimize your music marketing campaign 24/7 - without constant involvement.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-5 w-5" />
                Start Your Campaign
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Platform Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
              >
                <PlatformIcon platform={platform.platform} size={18} />
                <span className="text-sm">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary md:text-4xl">24/7</p>
            <p className="mt-1 text-sm text-muted-foreground">Autonomous Operation</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary md:text-4xl">6</p>
            <p className="mt-1 text-sm text-muted-foreground">Platforms Supported</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary md:text-4xl">10-20</p>
            <p className="mt-1 text-sm text-muted-foreground">AI Posts Per Day</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary md:text-4xl">&lt;30min</p>
            <p className="mt-1 text-sm text-muted-foreground">Trend Response Time</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need for Viral Growth
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete agentic system that handles content creation, posting, and analytics automatically
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border bg-card py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              From Setup to Viral in 3 Steps
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Connect Your Platforms',
                description: 'Link your TikTok, Instagram, YouTube, Twitter, Facebook, and Spotify accounts',
              },
              {
                step: '2',
                title: 'Launch Your Campaign',
                description: 'Upload your music, set your goals, and activate the AI agents',
              },
              {
                step: '3',
                title: 'Watch It Grow',
                description: 'Monitor real-time analytics as your agents work autonomously to maximize reach',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-1/10" />
            <CardContent className="relative py-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Go Viral?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Start your autonomous marketing campaign today and let AI agents handle the heavy lifting
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  No credit card required
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Demo mode included
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Connect your own APIs
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Music className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">SoundWave AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with AI SDK, Next.js, and Vercel
          </p>
        </div>
      </footer>
    </div>
  )
}
