// types of posts are self:text general:link, video:link
// video: hosted or image

interface PostData {
  author: string
  created_utc: number
  domain: string
  link_flair_text: string
  num_comments: number
  preview: {
    images: {
      source: {
        url: string
      }
    }[]
    reddit_video_preview: any
  }
  post_hint?: string
  score: number
  selftext: string
  secure_media?: any
  subreddit: string
  stickied: boolean
  thumbnail: string
  title: string
  url: string
}

export const getPostType = (postData: PostData): string => {
  const { post_hint, preview, selftext, secure_media, url } = postData

  // self post
  if (selftext.length > 0) {
    return 'self'
    // link with no image
  } else if (!preview && selftext.length === 0) {
    return 'link'
    // link with an image
  } else if (post_hint === 'link' && !preview.reddit_video_preview) {
    return 'link:preview'
    // gifycat,imgur, or redgif link
  } else if (preview.reddit_video_preview) {
    return 'video:outside'
    // reddit hosted video
  } else if (secure_media) {
    if (post_hint === 'rich:video') {
      return 'link:video'
    } else {
      return 'video:hosted'
    }
  } else if (url.split('.').slice(-1)[0] === 'gif') {
    return 'video:native'
  } else return 'image'
}

export const getMedia = (postData: PostData, type: string) => {
  if (type === 'self' || type === 'link') {
    return null
  } else if (
    type === 'image' ||
    type === 'link:video' ||
    type === 'link:preview'
  ) {
    return postData.preview.images[0].source.url
  } else if (type === 'video:native') {
    return postData.url
  } else if (type === 'video:hosted') {
    return postData.secure_media.reddit_video.fallback_url
  } else if (type === 'video:outside') {
    return postData.preview.reddit_video_preview.fallback_url
  }
}
