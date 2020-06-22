interface Ikeys {
  name: string
  icon: string
}

export const defaultSubredditsParser = (subreddits: []) => {
  return subreddits.map(
    (subreddit: any) =>
      <Ikeys>{
        name: subreddit.data.display_name,
        icon: subreddit.data.icon_img
      }
  )
}
