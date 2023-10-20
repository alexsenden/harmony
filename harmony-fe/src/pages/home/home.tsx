import { Container } from '@mui/material'
import HarmonyAppBar from '../../components/appBar'
import PostContainer from '../../components/postContainer/postContainer'
import { useState } from 'react'
import FilterPostButtons from '../../components/filterPostButtons'
import PostFeed from '../../components/postFeed'

export enum FeedMode {
  FOLLOWING = 'following',
  TRENDING = 'trending',
}

const TRENDING_FEED_URL = `/post`
const FOLLOWING_FEED_URL = `/post`

const HomePage = () => {
  const [feedMode, setFeedMode] = useState<FeedMode>(FeedMode.TRENDING)

  const handleButtonClick = (mode: FeedMode) => {
    setFeedMode(mode)
  }

  const feedUrl =
    feedMode === FeedMode.TRENDING ? TRENDING_FEED_URL : FOLLOWING_FEED_URL

  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <FilterPostButtons
          activeButton={feedMode}
          handleButtonClick={handleButtonClick}
        />
        <PostFeed url={feedUrl} />
      </Container>
    </>
  )
}

export default HomePage
