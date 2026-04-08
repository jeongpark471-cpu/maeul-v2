// ── 유저 ──
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  region_code?: string
  region_name?: string
  role: 'user' | 'admin'
  level: number
  xp: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  weekly_xp: number
  onboarding_completed: boolean
  created_at: string
}

// ── 게시글 ──
export interface Post {
  id: string
  user_id: string
  content: string
  title: string
  category: string
  like_count: number
  comment_count: number
  view_count: number
  created_at: string
  users?: Pick<User, 'id' | 'full_name' | 'avatar_url' | 'level' | 'tier'>
}

// ── 댓글 ──
export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  users?: Pick<User, 'id' | 'full_name' | 'avatar_url' | 'level' | 'tier'>
}

// ── 알림 ──
export interface Notification {
  id: string
  user_id: string
  type: 'levelup' | 'tier_change' | 'comment' | 'like' | 'announcement' | 'campaign'
  title: string
  message: string
  is_read: boolean
  post_id?: string
  created_at: string
}

// ── 지역 ──
export interface Region {
  code: string
  display_name: string
  full_name: string
  sido: string
  sigungu: string
  dong: string
}

// ── 캠페인 ──
export interface Campaign {
  id: string
  title: string
  description: string
  reward_description: string
  max_participants: number
  current_participants: number
  status: 'recruiting' | 'closed' | 'completed'
  created_at: string
}

// ── XP ──
export type XpActionType =
  | 'daily_checkin'
  | 'weather_check'
  | 'content_read'
  | 'post_feed'
  | 'comment'
  | 'answer'
  | 'campaign_apply'
  | 'submission_approved'

export const XP_AMOUNTS: Record<XpActionType, number> = {
  daily_checkin: 5,
  weather_check: 3,
  content_read: 2,
  post_feed: 20,
  comment: 5,
  answer: 10,
  campaign_apply: 15,
  submission_approved: 150,
}

export const XP_DAILY_LIMITS: Record<XpActionType, number> = {
  daily_checkin: 1,
  weather_check: 1,
  content_read: 5,
  post_feed: 3,
  comment: 10,
  answer: 5,
  campaign_apply: 3,
  submission_approved: 999,
}

// ── 레벨/티어 ──
export interface UserLevel {
  level: number
  name: string
  min_xp: number
  can_post: boolean
  can_apply: boolean
  can_open_room: boolean
  can_recommend: boolean
  can_notice: boolean
}

export const USER_LEVELS: UserLevel[] = [
  { level: 1, name: '나그네', min_xp: 0, can_post: false, can_apply: false, can_open_room: false, can_recommend: false, can_notice: false },
  { level: 2, name: '새내기', min_xp: 200, can_post: true, can_apply: false, can_open_room: false, can_recommend: false, can_notice: false },
  { level: 3, name: '주민', min_xp: 500, can_post: true, can_apply: true, can_open_room: false, can_recommend: false, can_notice: false },
  { level: 4, name: '이웃사촌', min_xp: 1000, can_post: true, can_apply: true, can_open_room: false, can_recommend: false, can_notice: false },
  { level: 5, name: '토박이', min_xp: 1800, can_post: true, can_apply: true, can_open_room: true, can_recommend: false, can_notice: false },
  { level: 6, name: '터줏대감', min_xp: 2800, can_post: true, can_apply: true, can_open_room: true, can_recommend: false, can_notice: false },
  { level: 7, name: '마을 어른', min_xp: 4000, can_post: true, can_apply: true, can_open_room: true, can_recommend: true, can_notice: false },
  { level: 8, name: '이장', min_xp: 6000, can_post: true, can_apply: true, can_open_room: true, can_recommend: true, can_notice: false },
  { level: 9, name: '촌장', min_xp: 8000, can_post: true, can_apply: true, can_open_room: true, can_recommend: true, can_notice: true },
  { level: 10, name: '군수', min_xp: 10000, can_post: true, can_apply: true, can_open_room: true, can_recommend: true, can_notice: true },
  { level: 11, name: '마을 수호자', min_xp: 100000, can_post: true, can_apply: true, can_open_room: true, can_recommend: true, can_notice: true },
]

export function getLevelInfo(xp: number): UserLevel {
  for (let i = USER_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= USER_LEVELS[i].min_xp) return USER_LEVELS[i]
  }
  return USER_LEVELS[0]
}

export function getNextLevel(level: number): UserLevel | null {
  return USER_LEVELS.find(l => l.level === level + 1) ?? null
}
