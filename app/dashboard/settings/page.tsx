'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Bot, Bell, Shield, Palette, Zap, Save, Key, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Agent Settings
    autoApproveContent: false,
    maxPostsPerDay: 12,
    minTimeBetweenPosts: 2,
    enableTrendResponder: true,
    agentModel: 'gpt-4o',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    notifyOnViral: true,
    notifyOnError: true,
    dailyDigest: true,
    
    // Content Settings
    contentGuidelines: 'Keep content positive and engaging. Avoid controversial topics. Focus on the music and the vibe.',
    bannedWords: '',
    requireApproval: true,
    
    // API Keys (masked)
    openaiKey: '',
    postEverywhereKey: '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">Configure your marketing automation system</p>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents" className="gap-2">
            <Bot className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <Shield className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Agent Settings */}
        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Agent Configuration
              </CardTitle>
              <CardDescription>Control how your AI agents behave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-approve Content</p>
                  <p className="text-sm text-muted-foreground">Automatically approve AI-generated content for posting</p>
                </div>
                <Switch
                  checked={settings.autoApproveContent}
                  onCheckedChange={(v) => setSettings({ ...settings, autoApproveContent: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Trend Responder</p>
                  <p className="text-sm text-muted-foreground">Auto-generate content when trends are detected</p>
                </div>
                <Switch
                  checked={settings.enableTrendResponder}
                  onCheckedChange={(v) => setSettings({ ...settings, enableTrendResponder: v })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Max Posts Per Day</label>
                <Select
                  value={settings.maxPostsPerDay.toString()}
                  onValueChange={(v) => setSettings({ ...settings, maxPostsPerDay: parseInt(v) })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 posts/day</SelectItem>
                    <SelectItem value="12">12 posts/day</SelectItem>
                    <SelectItem value="18">18 posts/day</SelectItem>
                    <SelectItem value="24">24 posts/day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Minimum Time Between Posts (hours)</label>
                <Select
                  value={settings.minTimeBetweenPosts.toString()}
                  onValueChange={(v) => setSettings({ ...settings, minTimeBetweenPosts: parseInt(v) })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">AI Model</label>
                <Select
                  value={settings.agentModel}
                  onValueChange={(v) => setSettings({ ...settings, agentModel: v })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini (Faster)</SelectItem>
                    <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(v) => setSettings({ ...settings, pushNotifications: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Viral Content Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when content goes viral</p>
                </div>
                <Switch
                  checked={settings.notifyOnViral}
                  onCheckedChange={(v) => setSettings({ ...settings, notifyOnViral: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Error Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when agents encounter errors</p>
                </div>
                <Switch
                  checked={settings.notifyOnError}
                  onCheckedChange={(v) => setSettings({ ...settings, notifyOnError: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Digest</p>
                  <p className="text-sm text-muted-foreground">Receive a daily performance summary</p>
                </div>
                <Switch
                  checked={settings.dailyDigest}
                  onCheckedChange={(v) => setSettings({ ...settings, dailyDigest: v })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Content Guidelines
              </CardTitle>
              <CardDescription>Set rules for AI-generated content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Manual Approval</p>
                  <p className="text-sm text-muted-foreground">Review all content before posting</p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(v) => setSettings({ ...settings, requireApproval: v })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Content Guidelines</label>
                <Textarea
                  placeholder="Enter guidelines for content generation..."
                  value={settings.contentGuidelines}
                  onChange={(e) => setSettings({ ...settings, contentGuidelines: e.target.value })}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  These guidelines will be used by AI agents when generating content
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Banned Words (comma-separated)</label>
                <Input
                  placeholder="word1, word2, word3"
                  value={settings.bannedWords}
                  onChange={(e) => setSettings({ ...settings, bannedWords: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Content containing these words will be flagged for review
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Manage your API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-warning/50 bg-warning/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium text-warning">Demo Mode</p>
                    <p className="text-sm text-muted-foreground">
                      This dashboard is running with mock data. To connect to real platforms, add your API keys below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">OpenAI API Key</label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={settings.openaiKey}
                  onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Required for AI content generation. Uses Vercel AI Gateway by default.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-medium">PostEverywhere API Key</label>
                <Input
                  type="password"
                  placeholder="pe_..."
                  value={settings.postEverywhereKey}
                  onChange={(e) => setSettings({ ...settings, postEverywhereKey: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  For unified cross-platform posting. Alternatively, connect platforms individually.
                </p>
              </div>

              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm">
                  <strong>Tip:</strong> For production use, set API keys as environment variables in your Vercel project settings instead of entering them here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
