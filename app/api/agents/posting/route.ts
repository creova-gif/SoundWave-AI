import { createPostingAgent } from '@/lib/agents/posting-agent'
import { createAgentUIStreamResponse } from 'ai'

export async function POST(req: Request) {
  const { messages, action, content, platform } = await req.json()

  const agent = createPostingAgent()

  // Handle specific posting actions
  if (action === 'schedule' && content && platform) {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Find the optimal time to post on ${platform} and schedule this content: "${content}"`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  if (action === 'post' && content && platform) {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Post the following content to ${platform}: "${content}". First check rate limits, then post if allowed.`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  if (action === 'optimal-times') {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Calculate the optimal posting times for all platforms (TikTok, Instagram, YouTube, Twitter, Facebook) based on our audience engagement data.`,
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
