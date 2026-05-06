import { createContentAgent } from '@/lib/agents/content-agent'
import { createAgentUIStreamResponse, convertToModelMessages } from 'ai'

export async function POST(req: Request) {
  const { messages, songTitle, genre, mood, platform } = await req.json()

  const agent = createContentAgent()

  // If we have a specific task, create a focused prompt
  if (songTitle && platform) {
    const taskMessages = [
      {
        role: 'user' as const,
        content: `Generate viral content for the song "${songTitle}" (${genre || 'pop'}, ${mood || 'upbeat'} mood) for ${platform}. 
        
First analyze current trends on ${platform}, then generate a compelling caption with hashtags. 
Also create 3 variations for A/B testing.`,
      },
    ]

    return createAgentUIStreamResponse({
      agent,
      uiMessages: taskMessages,
    })
  }

  // Otherwise, use the provided messages for a conversational flow
  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
  })
}
