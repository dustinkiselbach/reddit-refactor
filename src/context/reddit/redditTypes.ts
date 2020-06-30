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
    selftext_html: string
    secure_media: any
    subreddit: string
    stickied: boolean
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
    depth: number
    distinguished: string | null
    id: string
    is_submitter: boolean
    name: string
    parent_id: string
    replies: CommentData | string
    score: number
    score_hidden: boolean
    stickied: boolean
  }
  kind: 't1'
}

export interface CommentMore {
  data: {
    children: string[]
    count: number
    depth: number
    id: string
    name: string
    parent_id: string
  }
  kind: 'more'
}

export type State = {
  loading?: boolean
  subreddit?: null | string
  subredditInfo?: any
  sortBy?: string
  sortByInterval?: string | null
  sortCommentsBy?: string
  posts?: PostData[][]
  post?: PostData | null
  comments?: CommentData[] | null
  defaultSubreddits?: null | DefaultSubreddit[]
  autocompleteSubreddits?: null | DefaultSubreddit[]
  after?: string | null
  clearPostDetail?: () => void
  tryTest?: () => void
  getPosts?: () => Promise<any>
  clearPosts?: () => void
  getPostDetail?: (permalink: string, name: string) => void
  getMoreComments?: (linkId: string, children: string[]) => Promise<any>
  setSubreddit?: (subreddit: string | null) => void
  getSubredditInfo?: () => void
  subredditAutocomplete?: (query: string) => void
  changeSortBy?: (sortBy: string, sortByInterval?: string) => void
  changeSortCommentsBy?: (sortCommentsBy: string) => void
  setLoading?: () => void
}

type ActionInterface<T extends string, U> = {
  type: T
  payload: U
}

export type DefaultSubreddit = { name: string; icon: string }

export type AllActions =
  | ActionInterface<'TEST_TYPE', null>
  | ActionInterface<'GET_POSTS', PostData[]>
  | ActionInterface<'GET_POST_DETAIL', CommentData[]>
  | ActionInterface<'SET_SUBREDDIT', string | null>
  | ActionInterface<'SET_LOADING', null>
  | ActionInterface<'CHANGE_SORT_BY', string>
  | ActionInterface<'CHANGE_SORT_BY_INTERVAL', string | null>
  | ActionInterface<'CHANGE_SORT_COMMENTS_BY', string>
  | ActionInterface<'GET_DEFAULT_SUBREDDITS', DefaultSubreddit[]>
  | ActionInterface<'GET_SUBREDDIT_INFO', any>
  | ActionInterface<'SET_AFTER', string | null>
  | ActionInterface<'CLEAR_POST_DETAIL', null>
  | ActionInterface<'FILTER_POST_FROM_POSTS', string>
  | ActionInterface<'SUBREDDIT_AUTOCOMPLETE', DefaultSubreddit[] | null>
  | ActionInterface<'CLEAR_POSTS', null>
