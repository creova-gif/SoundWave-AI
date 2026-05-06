import type {
  Campaign,
  ContentItem,
  Post,
  AgentLog,
  PlatformCredential,
  AnalyticsData,
  Platform,
  Song,
} from './types'

// Mock data for demonstration - replace with Supabase when connected
const generateId = () => Math.random().toString(36).substring(2, 15)

// Sample song
const sampleSong: Song = {
  id: 'song-1',
  title: 'Summer Vibes',
  artist: 'Your Artist Name',
  audioUrl: '/audio/sample.mp3',
  artworkUrl: '/images/album-art.jpg',
  genre: 'Pop',
  duration: 210,
  createdAt: new Date('2024-01-15'),
}

// Sample campaign
const sampleCampaign: Campaign = {
  id: 'campaign-1',
  name: '20M Reach Campaign',
  songId: 'song-1',
  song: sampleSong,
  status: 'active',
  startDate: new Date(),
  endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
  targetReach: 20000000,
  currentReach: 2847293,
  budget: 500,
  platforms: ['tiktok', 'instagram', 'youtube', 'twitter', 'facebook', 'spotify'],
  createdAt: new Date(),
}

// Sample content queue
const sampleContent: ContentItem[] = [
  {
    id: 'content-1',
    campaignId: 'campaign-1',
    type: 'full_post',
    platform: 'tiktok',
    content: 'POV: You found your new summer anthem. This beat hits different at sunset.',
    hashtags: ['#SummerVibes', '#NewMusic', '#TikTokMusic', '#Viral', '#FYP'],
    status: 'approved',
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: 'content-2',
    campaignId: 'campaign-1',
    type: 'full_post',
    platform: 'instagram',
    content: 'New track just dropped. Link in bio.',
    hashtags: ['#NewMusic', '#SummerVibes', '#InstaMusic', '#Explore'],
    status: 'pending',
    scheduledFor: new Date(Date.now() + 4 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: 'content-3',
    campaignId: 'campaign-1',
    type: 'full_post',
    platform: 'twitter',
    content: 'Just dropped something special. RT if you feel it.',
    hashtags: ['#NewMusic', '#NowPlaying'],
    status: 'pending',
    createdAt: new Date(),
  },
]

// Sample posts (already published)
const samplePosts: Post[] = [
  {
    id: 'post-1',
    campaignId: 'campaign-1',
    contentId: 'content-0',
    platform: 'tiktok',
    platformPostId: 'tt-123456',
    status: 'posted',
    postedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    engagement: {
      views: 1247893,
      likes: 89234,
      comments: 4521,
      shares: 12847,
      saves: 34521,
      clicks: 8934,
      reach: 1456789,
    },
  },
  {
    id: 'post-2',
    campaignId: 'campaign-1',
    contentId: 'content-0',
    platform: 'instagram',
    platformPostId: 'ig-789012',
    status: 'posted',
    postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    engagement: {
      views: 456123,
      likes: 34521,
      comments: 1234,
      shares: 5678,
      saves: 12345,
      clicks: 3456,
      reach: 567890,
    },
  },
  {
    id: 'post-3',
    campaignId: 'campaign-1',
    contentId: 'content-0',
    platform: 'youtube',
    platformPostId: 'yt-345678',
    status: 'posted',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    engagement: {
      views: 234567,
      likes: 12345,
      comments: 567,
      shares: 2345,
      saves: 5678,
      clicks: 8901,
      reach: 345678,
    },
  },
]

// Sample agent logs
const sampleLogs: AgentLog[] = [
  {
    id: 'log-1',
    campaignId: 'campaign-1',
    agentType: 'content',
    action: 'Generated new content',
    details: 'Created 5 TikTok captions with viral hooks',
    status: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'log-2',
    campaignId: 'campaign-1',
    agentType: 'posting',
    action: 'Posted to TikTok',
    details: 'Successfully posted content-1 at optimal time (6 PM EST)',
    status: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'log-3',
    campaignId: 'campaign-1',
    agentType: 'analytics',
    action: 'Performance analysis',
    details: 'TikTok post trending! Engagement rate 7.2% above average',
    status: 'success',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: 'log-4',
    campaignId: 'campaign-1',
    agentType: 'orchestrator',
    action: 'Strategy adjustment',
    details: 'Increasing TikTok post frequency based on performance',
    status: 'info',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
]

// Platform credentials
const sampleCredentials: PlatformCredential[] = [
  { platform: 'tiktok', connected: true, username: '@yourartist', followers: 125000, lastSynced: new Date() },
  { platform: 'instagram', connected: true, username: '@yourartist', followers: 89000, lastSynced: new Date() },
  { platform: 'youtube', connected: true, username: 'Your Artist', followers: 45000, lastSynced: new Date() },
  { platform: 'twitter', connected: true, username: '@yourartist', followers: 32000, lastSynced: new Date() },
  { platform: 'facebook', connected: false },
  { platform: 'spotify', connected: true, username: 'Your Artist', followers: 67000, lastSynced: new Date() },
]

// Analytics data for charts (last 14 days)
const generateAnalyticsData = (): AnalyticsData[] => {
  const data: AnalyticsData[] = []
  for (let i = 13; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const baseReach = 100000 + Math.random() * 500000
    data.push({
      date: date.toISOString().split('T')[0],
      reach: Math.floor(baseReach * (1 + (13 - i) * 0.15)), // Growing trend
      engagement: Math.floor(baseReach * 0.065 * (0.8 + Math.random() * 0.4)),
      posts: Math.floor(6 + Math.random() * 8),
    })
  }
  return data
}

// Store state
let campaigns: Campaign[] = [sampleCampaign]
let contentQueue: ContentItem[] = sampleContent
let posts: Post[] = samplePosts
let agentLogs: AgentLog[] = sampleLogs
let credentials: PlatformCredential[] = sampleCredentials
let analyticsData: AnalyticsData[] = generateAnalyticsData()
let agentStatus: { [key: string]: 'running' | 'paused' | 'stopped' } = {
  content: 'running',
  posting: 'running',
  analytics: 'running',
  orchestrator: 'running',
}

// Store functions
export const store = {
  // Campaigns
  getCampaigns: () => campaigns,
  getCampaign: (id: string) => campaigns.find((c) => c.id === id),
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: generateId(),
      createdAt: new Date(),
    }
    campaigns.push(newCampaign)
    return newCampaign
  },
  updateCampaign: (id: string, updates: Partial<Campaign>) => {
    const index = campaigns.findIndex((c) => c.id === id)
    if (index !== -1) {
      campaigns[index] = { ...campaigns[index], ...updates }
      return campaigns[index]
    }
    return null
  },

  // Content
  getContentQueue: (campaignId?: string) =>
    campaignId ? contentQueue.filter((c) => c.campaignId === campaignId) : contentQueue,
  addContent: (content: Omit<ContentItem, 'id' | 'createdAt'>) => {
    const newContent: ContentItem = {
      ...content,
      id: generateId(),
      createdAt: new Date(),
    }
    contentQueue.push(newContent)
    return newContent
  },
  updateContent: (id: string, updates: Partial<ContentItem>) => {
    const index = contentQueue.findIndex((c) => c.id === id)
    if (index !== -1) {
      contentQueue[index] = { ...contentQueue[index], ...updates }
      return contentQueue[index]
    }
    return null
  },
  deleteContent: (id: string) => {
    contentQueue = contentQueue.filter((c) => c.id !== id)
  },

  // Posts
  getPosts: (campaignId?: string) => (campaignId ? posts.filter((p) => p.campaignId === campaignId) : posts),
  addPost: (post: Omit<Post, 'id'>) => {
    const newPost: Post = { ...post, id: generateId() }
    posts.push(newPost)
    return newPost
  },

  // Agent logs
  getLogs: (limit = 50) => agentLogs.slice(-limit).reverse(),
  addLog: (log: Omit<AgentLog, 'id' | 'timestamp'>) => {
    const newLog: AgentLog = {
      ...log,
      id: generateId(),
      timestamp: new Date(),
    }
    agentLogs.push(newLog)
    return newLog
  },

  // Platform credentials
  getCredentials: () => credentials,
  updateCredential: (platform: Platform, updates: Partial<PlatformCredential>) => {
    const index = credentials.findIndex((c) => c.platform === platform)
    if (index !== -1) {
      credentials[index] = { ...credentials[index], ...updates }
      return credentials[index]
    }
    return null
  },

  // Analytics
  getAnalytics: () => analyticsData,
  getTotalReach: () => analyticsData.reduce((sum, d) => sum + d.reach, 0),
  getPlatformStats: (): { platform: Platform; reach: number; percentage: number }[] => {
    const totalReach = 2847293 // From campaign
    const distribution: { platform: Platform; percentage: number }[] = [
      { platform: 'tiktok', percentage: 45 },
      { platform: 'instagram', percentage: 25 },
      { platform: 'youtube', percentage: 15 },
      { platform: 'twitter', percentage: 8 },
      { platform: 'facebook', percentage: 4 },
      { platform: 'spotify', percentage: 3 },
    ]
    return distribution.map((d) => ({
      platform: d.platform,
      reach: Math.floor((totalReach * d.percentage) / 100),
      percentage: d.percentage,
    }))
  },

  // Agent status
  getAgentStatus: () => agentStatus,
  setAgentStatus: (agent: string, status: 'running' | 'paused' | 'stopped') => {
    agentStatus[agent] = status
    store.addLog({
      agentType: agent as AgentLog['agentType'],
      action: `Agent ${status}`,
      details: `${agent} agent is now ${status}`,
      status: status === 'running' ? 'success' : 'info',
    })
  },

  // Simulate real-time updates
  simulateEngagement: () => {
    // Update campaign reach
    const campaign = campaigns[0]
    if (campaign) {
      campaign.currentReach += Math.floor(Math.random() * 10000)
    }

    // Update post engagement
    posts.forEach((post) => {
      post.engagement.views += Math.floor(Math.random() * 1000)
      post.engagement.likes += Math.floor(Math.random() * 100)
      post.engagement.comments += Math.floor(Math.random() * 10)
    })
  },
}

export type Store = typeof store
