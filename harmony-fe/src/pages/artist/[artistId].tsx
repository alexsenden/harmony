import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Artist } from '../../models/artist'

const ArtistPage = () => {
  const router = useRouter()
  const { artistId } = router.query
  const [artistData, setArtist] = useState<Artist>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const user = useContext(UserContext)

  //Retrieve artist data
  const [getArtistData, receivedData, error] = useHttpRequest({
    url: `/topic/artist/${artistId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (artistId) {
      getArtistData()
    }
  }, [artistId, error])

  useEffect(() => {
    if (receivedData) {
      setArtist(receivedData)
    }
  }, [receivedData, artistData])

  useEffect(() => {
    if (artistData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [artistData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/artist',
    method: HttpMethod.GET,
    headers: { followingId: artistData?.artistId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: '/follow/followCount/artist',
    method: HttpMethod.GET,
    headers: { userId: artistData?.artistId },
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/artist',
    method: HttpMethod.POST,
    headers: { followingId: artistData?.artistId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, artistData])

  const followAction = () => {
    setFollowActionData()
    if (following) {
      setNumFollowers(numFollowers - 1)
    } else {
      setNumFollowers(numFollowers + 1)
    }
    setFollowing(!following)
  }
  useEffect(() => {
    if (receivedFollowerInfo) {
      setNumFollowers(receivedFollowerInfo)
    }
  }, [receivedFollowerInfo, artistData])

  return (
    <>
      <FollowingButton variant="outlined" onClick={followAction}>
        {following ? 'Un-Follow' : 'Follow'}
      </FollowingButton>
      <TextBlock>{`${numFollowers} Follower${
        numFollowers === 1 ? '' : 's'
      }`}</TextBlock>
    </>
  )
}

export default ArtistPage
