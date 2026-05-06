'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Zap, ArrowRight, Eye, EyeOff, Loader2, Radio, BarChart3, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')

  useEffect(() => { setMounted(true) }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'login' ? { email, password } : { email, password, name }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">

      {/* Left panel — warm branded */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden"
        style={{ background: 'oklch(0.09 0.025 40)' }}
      >
        {/* Warm radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 10% 20%, oklch(0.30 0.10 44 / 0.9), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 90% 85%, oklch(0.20 0.07 35 / 0.5), transparent 60%)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Music2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">SoundWave AI</span>
          </div>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={mounted ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">
                Distribution Engine
              </p>
              <h1 className="font-display text-5xl font-black leading-tight mb-6 tracking-tight">
                Turn one song into{' '}
                <span className="text-primary">100+ pieces</span>{' '}
                of viral content
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                AI agents that generate content, schedule posts, and track what actually
                converts — across every platform simultaneously.
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              {[
                { icon: Zap, text: 'AI generates captions, scripts & hashtags in seconds' },
                { icon: Radio, text: 'Auto-schedule across TikTok, Instagram, Telegram & more' },
                { icon: BarChart3, text: 'Viral signal detection triggers amplification' },
                { icon: Globe, text: 'Real-time analytics across all your platforms' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-xs text-muted-foreground/50">© 2026 SoundWave AI</p>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Music2 className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold">SoundWave AI</span>
          </div>

          <motion.div
            key={mode}
            initial={mounted ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="font-display text-3xl font-black mb-2 tracking-tight">
                {mode === 'login' ? 'Welcome back' : 'Get started'}
              </h2>
              <p className="text-muted-foreground">
                {mode === 'login'
                  ? 'Sign in to your marketing command center'
                  : "Create your account — it's free"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence initial={false}>
                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Min 8 characters' : '••••••••'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full h-11 font-bold rounded-xl"
                disabled={loading}
                style={{ background: 'oklch(0.97 0.005 60)', color: 'oklch(0.08 0.022 40)' }}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign in' : 'Create account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                className="text-primary hover:underline font-semibold"
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
