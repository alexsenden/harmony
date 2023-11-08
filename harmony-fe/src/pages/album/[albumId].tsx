import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Album } from '../../models/album'

const AlbumPage = () => {
  const router = useRouter()
  const { albumId } = router.query
  const [albumData, setArtist] = useState<Album>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const user = useContext(UserContext)

  //Retrieve artist data
  const [getAlbumData, receivedData, error] = useHttpRequest({
    url: `/topic/album/${albumId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (albumId) {
      getAlbumData()
    }
  }, [albumId, error])

  useEffect(() => {
    if (receivedData) {
      setArtist(receivedData)
    }
  }, [receivedData, albumData])

  useEffect(() => {
    if (albumData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [albumData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/album',
    method: HttpMethod.GET,
    headers: { followingId: albumData?.albumId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: '/follow/followCount/album',
    method: HttpMethod.GET,
    headers: { userId: albumData?.albumId },
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/album',
    method: HttpMethod.POST,
    headers: { followingId: albumData?.albumId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, albumData])

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
  }, [receivedFollowerInfo, albumData])

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

export default AlbumPage
