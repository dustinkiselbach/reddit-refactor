export interface Props {
  children: React.ReactNode
}

export interface PostData {
  data: {
    author: string
    created_utc: number
    domain: string
    link_flair_text: string
    name: string
    num_comments: number
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
    score: number
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
    author_flair_text: string | null
    body: string
    body_html: string
    children: CommentData[] | string
    created_utc: number
    distinguished: string | null
    is_submitter: boolean
    replies: CommentData | string
    score: number
    score_hidden: boolean
    stickied: boolean
  }
  kind: string
}

export type State = {
  loading?: boolean
  subreddit?: null | string
  sortBy?: string
  posts?: PostData[][]
  post?: PostData | null
  comments?: CommentData[] | null
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
  | ActionInterface<'GET_POST_DETAIL', any>
  | ActionInterface<'SET_SUBREDDIT', string | null>
  | ActionInterface<'SET_LOADING', null>
  | ActionInterface<'CHANGE_SORT_BY', string>
  | ActionInterface<'GET_DEFAULT_SUBREDDITS', DefaultSubreddit[]>
  | ActionInterface<'SET_AFTER', string | null>
  | ActionInterface<'CLEAR_POST_DETAIL', null>
  | ActionInterface<'FILTER_POST_FROM_POSTS', string>
