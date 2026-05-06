'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Sparkles, Send, BarChart3, Play, Pause, RefreshCw, Zap } from 'lucide-react'
import { store } from '@/lib/store'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

const agents = [
  {
    id: 'content',
    name: 'Content Agent',
    description: 'Generates viral captions, hashtags, and video scripts',
    icon: Sparkles,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
    endpoint: '/api/agents/content',
  },
  {
    id: 'posting',
    name: 'Posting Agent',
    description: 'Schedules and publishes content across platforms',
    icon: Send,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
    endpoint: '/api/agents/posting',
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    description: 'Monitors performance and provides insights',
    icon: BarChart3,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    endpoint: '/api/agents/analytics',
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    description: 'Coordinates all agents and makes strategic decisions',
    icon: Bot,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    endpoint: '/api/agents/analytics', // Uses analytics for orchestration
  },
]

export default function AgentsPage() {
  const [agentStatus, setAgentStatus] = useState(store.getAgentStatus())
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: selectedAgent ? agents.find((a) => a.id === selectedAgent)?.endpoint || '/api/agents/content' : '/api/agents/content',
    }),
  })

  const toggleAgent = (agentId: string) => {
    const currentStatus = agentStatus[agentId]
    const newStatus = currentStatus === 'running' ? 'paused' : 'running'
    store.setAgentStatus(agentId, newStatus)
    setAgentStatus({ ...agentStatus, [agentId]: newStatus })
  }

  const handleRunAgent = async (agentId: string) => {
    setSelectedAgent(agentId)
    const agent = agents.find((a) => a.id === agentId)
    if (!agent) return

    const prompts: Record<string, string> = {
      content: 'Analyze current TikTok trends and generate 3 viral caption ideas for our summer track.',
      posting: 'Calculate the optimal posting times for all platforms today.',
      analytics: 'Generate a quick performance report for the last 24 hours.',
      orchestrator: 'Review campaign progress and recommend the next best actions.',
    }

    sendMessage({ text: customPrompt || prompts[agentId] })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-success'
      case 'paused':
        return 'bg-warning'
      case 'stopped':
        return 'bg-destructive'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Agents</h1>
        <p className="text-muted-foreground">Manage and monitor your autonomous marketing agents</p>
      </div>

      {/* Agent Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => {
          const isRunning = agentStatus[agent.id] === 'running'
          return (
            <Card key={agent.id} className="relative overflow-hidden">
              <div className={`absolute right-0 top-0 h-32 w-32 ${agent.bgColor} rounded-bl-full opacity-50`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${agent.bgColor}`}>
                      <agent.icon className={`h-5 w-5 ${agent.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(agentStatus[agent.id])} ${isRunning ? 'animate-pulse' : ''}`} />
                    <Switch checked={isRunning} onCheckedChange={() => toggleAgent(agent.id)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRunAgent(agent.id)}
                    disabled={status === 'streaming'}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Run Now
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Agent Console */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Agent Console
          </CardTitle>
          <CardDescription>Send commands to agents and view responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Enter a custom command for the agents..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => (
              <Button
                key={agent.id}
                variant="outline"
                size="sm"
                onClick={() => handleRunAgent(agent.id)}
                disabled={status === 'streaming'}
              >
                <agent.icon className={`mr-2 h-4 w-4 ${agent.color}`} />
                Run {agent.name}
              </Button>
            ))}
          </div>

          {/* Response Area */}
          <ScrollArea className="h-[300px] rounded-lg border border-border bg-secondary/30 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>Agent responses will appear here...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-lg p-3 ${
                      message.role === 'user' ? 'bg-primary/10 ml-auto max-w-[80%]' : 'bg-card max-w-[90%]'
                    }`}
                  >
                    <div className="mb-1 text-xs font-medium text-muted-foreground">
                      {message.role === 'user' ? 'You' : 'Agent'}
                    </div>
                    <div className="text-sm">
                      {message.parts?.map((part, i) => {
                        if (part.type === 'text') {
                          return <span key={i}>{part.text}</span>
                        }
                        if (part.type === 'tool-invocation') {
                          return (
                            <Badge key={i} variant="outline" className="mr-1">
                              {part.toolInvocation.toolName}
                            </Badge>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}
                {status === 'streaming' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Agent is thinking...
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start" onClick={() => { setCustomPrompt('Generate 5 viral TikTok captions for our track'); handleRunAgent('content'); }}>
              <Sparkles className="mr-2 h-4 w-4 text-chart-1" />
              Generate Content
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => { setCustomPrompt('Find optimal posting times for today'); handleRunAgent('posting'); }}>
              <Send className="mr-2 h-4 w-4 text-chart-2" />
              Optimize Schedule
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => { setCustomPrompt('Generate a campaign performance report'); handleRunAgent('analytics'); }}>
              <BarChart3 className="mr-2 h-4 w-4 text-chart-3" />
              Get Report
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => { setCustomPrompt('Detect trending topics on TikTok right now'); handleRunAgent('analytics'); }}>
              <Zap className="mr-2 h-4 w-4 text-warning" />
              Find Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
