import { Container } from '@mui/material'
import { useContext, useState } from 'react'
import FilterPostButtons from '../../components/filterPostButtons'
import PostFeed from '../../components/postFeed'
import { UserContext } from '../../contexts/user'
import Head from 'next/head'

export enum FeedMode {
  FOLLOWING = 'following',
  TRENDING = 'trending',
}

const HomePage = () => {
  const user = useContext(UserContext)

  const trendingFeedUrl = '/post/trending'
  const followingFeedUrl = `/post/following?userId=${user?.userId}`

  const handleButtonClick = (mode: FeedMode) => {
    setFeedMode(mode)
  }
  const [feedMode, setFeedMode] = useState<FeedMode>(FeedMode.TRENDING)

  const feedUrl =
    feedMode === FeedMode.TRENDING ? trendingFeedUrl : followingFeedUrl

  const noResultsText =
    feedMode === FeedMode.TRENDING || user
      ? undefined
      : 'Log in to view posts by people you follow!'

  return (
    <>
      <Head>
        <title>Harmony - a place to discuss music</title>
      </Head>
      <Container maxWidth="xl">
        <FilterPostButtons
          activeButton={feedMode}
          handleButtonClick={handleButtonClick}
        />
        <PostFeed url={feedUrl} noResultsText={noResultsText} />
      </Container>
    </>
  )
}

export default HomePage
