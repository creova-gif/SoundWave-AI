'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Music2, Play, ArrowRight, Bot, TrendingUp, BarChart3, Sparkles,
  Zap, Globe, CheckCircle2, Radio, Mic2,
} from 'lucide-react'
import { PlatformIcon } from '@/components/icons/platform-icons'

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
    description: 'Autonomous agents generate viral content, schedule posts, and analyze performance 24/7 without you lifting a finger.',
  },
  {
    icon: TrendingUp,
    title: 'Trend Detection',
    description: 'Real-time monitoring of trending sounds, hashtags, and formats across every platform before they peak.',
  },
  {
    icon: Sparkles,
    title: 'Content Generation',
    description: 'AI creates platform-specific captions, hashtags, and video scripts optimized for maximum engagement.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track reach, engagement, and campaign progress toward your goals in one unified view.',
  },
  {
    icon: Zap,
    title: 'Automated Posting',
    description: 'Schedule and publish content at optimal times across all platforms simultaneously.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Reach audiences on TikTok, Instagram, YouTube, Twitter, Facebook, and Spotify at once.',
  },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Floating pill navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={mounted ? { opacity: 0, y: -20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-2xl border border-border/60 px-3 py-2 shadow-2xl"
        >
          {/* Logo pill */}
          <div className="flex items-center gap-2 rounded-full bg-background/60 border border-border/50 px-3 py-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
              <Music2 className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold">SoundWave AI</span>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center md:flex">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#pricing' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Launch
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-24 px-4 overflow-hidden">

        {/* Warm radial gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 85% 75% at 15% 0%, oklch(0.28 0.09 44 / 0.85), transparent 58%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 55% 45% at 90% 95%, oklch(0.22 0.07 36 / 0.5), transparent 60%)',
          }}
        />

        {/* Badge */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mb-8 flex items-center gap-2.5 rounded-full bg-card/60 backdrop-blur border border-border/50 px-4 py-2 text-sm"
        >
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">New</span>
          <span className="text-muted-foreground">Your music reaches everywhere, automatically</span>
        </motion.div>

        {/* Giant heading */}
        <motion.h1
          initial={mounted ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center font-display font-black tracking-tight text-balance leading-[1.04] text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] max-w-4xl"
        >
          Reach{' '}
          <span className="text-primary">20 Million</span>
          {' '}people{' '}
          <br className="hidden md:block" />
          in 2 weeks
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={mounted ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="relative z-10 mt-7 max-w-lg text-center text-lg text-muted-foreground leading-relaxed"
        >
          Autonomous AI agents generate viral content, post across 6 platforms,
          and optimize your campaign 24/7 — without constant involvement.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-bold text-background hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Your Campaign
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-full bg-card/60 backdrop-blur border border-border/60 px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-card transition-colors"
          >
            <Play className="h-4 w-4 fill-current text-primary" />
            Watch Demo
          </Link>
        </motion.div>

        {/* Floating preview cards */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 48 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-20 flex items-end justify-center gap-4 w-full max-w-3xl"
        >
          {/* Left card */}
          <div className="hidden sm:flex w-48 flex-col rounded-3xl bg-card/75 backdrop-blur-xl border border-border/50 p-5 shadow-2xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20">
              <Radio className="h-5 w-5 text-primary" />
            </div>
            <div className="text-base font-bold leading-tight">Campaign Live</div>
            <div className="mt-1 text-xs text-muted-foreground">6 platforms · 24/7</div>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">4 agents active</span>
            </div>
          </div>

          {/* Center card — main preview */}
          <div className="flex-1 max-w-xs rounded-3xl bg-card/70 backdrop-blur-xl border border-border/50 p-5 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Today's Reach</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">+18% ↑</span>
            </div>
            <div className="text-3xl font-black font-display">1.94M</div>
            <div className="mt-4 space-y-2.5">
              {[
                { name: 'TikTok', pct: 85 },
                { name: 'Instagram', pct: 72 },
                { name: 'YouTube', pct: 60 },
              ].map((row) => (
                <div key={row.name} className="flex items-center gap-2.5 text-xs">
                  <span className="w-16 text-muted-foreground">{row.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-muted-foreground">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="hidden sm:flex w-48 flex-col rounded-3xl bg-card/75 backdrop-blur-xl border border-border/50 p-5 shadow-2xl">
            <div className="text-xs text-muted-foreground mb-1">Content generated</div>
            <div className="text-3xl font-black font-display">142</div>
            <div className="text-xs text-muted-foreground mt-0.5">posts this week</div>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {[
                { label: 'Viral', pct: 82 },
                { label: 'Posts', pct: 94 },
                { label: 'Reels', pct: 77 },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl bg-primary/15 text-xs font-bold text-primary">
                    {item.pct}%
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border/50 bg-card/30 py-12">
        <div className="container mx-auto grid gap-8 px-6 text-center sm:grid-cols-2 md:grid-cols-4">
          {[
            { value: '24/7', label: 'Autonomous Operation' },
            { value: '6', label: 'Platforms Supported' },
            { value: '10–20', label: 'AI Posts Per Day' },
            { value: '<30 min', label: 'Trend Response Time' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black font-display text-primary">{stat.value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Features
            </div>
            <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
              Everything you need for viral growth
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete agentic system that handles content creation, posting, and analytics automatically
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-y border-border/50 bg-card/30 py-28 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            How It Works
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl mb-16">
            From setup to viral in 3 steps
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Connect Your Platforms',
                description: 'Link your TikTok, Instagram, YouTube, Twitter, Facebook, and Spotify accounts in minutes.',
              },
              {
                step: '2',
                title: 'Launch Your Campaign',
                description: 'Upload your music, set your goals, and activate the AI agents with one click.',
              },
              {
                step: '3',
                title: 'Watch It Grow',
                description: 'Monitor real-time analytics as your agents work autonomously to maximize reach.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-xl font-black text-primary-foreground shadow-lg"
                  style={{ boxShadow: '0 8px 32px oklch(0.70 0.16 46 / 0.35)' }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform pills */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-6 text-sm text-muted-foreground">Works with all major platforms</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-medium"
              >
                <PlatformIcon platform={p.platform} size={16} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-12 text-center">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 50% 110%, oklch(0.28 0.09 44 / 0.55), transparent 65%)',
              }}
            />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Get Started Free
              </div>
              <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
                Ready to go viral?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Start your autonomous marketing campaign today and let AI agents handle the heavy lifting
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full bg-foreground px-9 py-3.5 text-sm font-bold text-background hover:opacity-90 transition-opacity shadow-lg"
                >
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
                {['No credit card required', 'Demo mode included', 'Connect your own APIs'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Music2 className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold">SoundWave AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SoundWave AI. Built with AI SDK & Next.js</p>
        </div>
      </footer>
    </div>
  )
}
