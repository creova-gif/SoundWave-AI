import { createAnalyticsAgent } from '@/lib/agents/analytics-agent'
import { createAgentUIStreamResponse } from 'ai'

export async function POST(req: Request) {
  const { messages, action, platform, timeRange } = await req.json()

  const agent = createAnalyticsAgent()

  // Handle specific analytics actions
  if (action === 'report') {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Generate a comprehensive campaign performance report. Include total reach, engagement metrics, top performing content, and strategy recommendations.`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  if (action === 'trends' && platform) {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Detect current trends on ${platform} that we can capitalize on for our music marketing campaign.`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  if (action === 'stats' && platform) {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Fetch current engagement stats from ${platform} for the ${timeRange || '24h'} time range. Provide insights on performance.`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  // Default: use provided messages
  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
  })
}
