export interface Props {
  children: React.ReactNode
}

export interface PostData {
  data: {
    author: string
    created_utc: string
    domain: string
    link_flair_text: string
    name: string
    num_comments: string
    preview: {
      images: {
        source: {
          url: string
        }
      }[]
      reddit_video_preview: any
    }
    permalink: string
    post_hint: string
    score: string
    selftext: string
    secure_media: any
    subreddit: string
    stickied: string
    thumbnail: string
    title: string
    url: string
  }
}

export interface CommentData {
  data: {
    author: string
    body: string
    created_utc: string
    replies: CommentData | string
    score: string
  }
}

export type State = {
  loading?: boolean
  subreddit?: null | string
  sortBy?: string
  posts?: PostData[][]
  post?: { info: PostData; comments: CommentData[] } | null
  defaultSubreddits?: null | DefaultSubreddit[]
  after?: string | null
  clearPostDetail?: () => void
  tryTest?: () => void
  getPosts?: () => Promise<any>
  getPostDetail?: (permalink: string, name: string) => void
  setSubreddit?: (subreddit: string | null) => void
  changeSortBy?: (sortBy: string) => void
  setLoading?: () => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type DefaultSubreddit = { name: string; icon: string }

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'GET_POSTS', []>
  | ActionInterface<'GET_POST_DETAIL', { name: string; comments: any }>
  | ActionInterface<'SET_SUBREDDIT', string | null>
  | ActionInterface<'SET_LOADING', null>
  | ActionInterface<'CHANGE_SORT_BY', string>
  | ActionInterface<'GET_DEFAULT_SUBREDDITS', DefaultSubreddit[]>
  | ActionInterface<'SET_AFTER', string | null>
  | ActionInterface<'CLEAR_POST_DETAIL', null>
