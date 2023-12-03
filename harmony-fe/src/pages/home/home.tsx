import { Container } from '@mui/material'
import { useContext, useState } from 'react'
import FilterPostButtons from '../../components/filter-post-buttons'
import PostFeed from '../../components/post-feed/post-feed'
import { UserContext } from '../../contexts/userContext'
import Head from 'next/head'
import FollowFilterPostButtons from '../../components/filter-post-buttons/followFilterPostButtons'

export enum FeedMode {
  FOLLOWING = 'following',
  TRENDING = 'trending',
}

export enum FollowMode {
  ALL = 'all',
  USER = 'user',
  SONG = 'song',
  ARTIST = 'artist',
  ALBUM = 'album',
}

const HomePage = () => {
  const user = useContext(UserContext)

  const handleFeedModeClick = (mode: FeedMode) => {
    setFeedMode(mode)
  }
  const [feedMode, setFeedMode] = useState<FeedMode>(FeedMode.TRENDING)

  const handleFollowModeClick = (mode: FollowMode) => {
    setFollowingMode(mode)
  }
  const [followingMode, setFollowingMode] = useState<FollowMode>(FollowMode.ALL)

  const trendingFeedUrl = '/post/trending'
  const followingFeedUrl = `/post/following/${followingMode}`

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
          handleButtonClick={handleFeedModeClick}
        />
        {feedMode === 'following' && (
          <FollowFilterPostButtons
            activeButton={followingMode}
            handleButtonClick={handleFollowModeClick}
          />
        )}
        <PostFeed url={feedUrl} noResultsText={noResultsText} />
      </Container>
    </>
  )
}

export default HomePage
