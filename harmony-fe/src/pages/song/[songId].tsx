import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Song } from '../../models/song'

const SongPage = () => {
  const router = useRouter()
  const { songId } = router.query
  const [songData, setSong] = useState<Song>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const user = useContext(UserContext)

  //Retrieve artist data
  const [getSongData, receivedData, error] = useHttpRequest({
    url: `/topic/song/${songId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (songId) {
      getSongData()
    }
  }, [songId, error])

  useEffect(() => {
    if (receivedData) {
      setSong(receivedData)
    }
  }, [receivedData, songData])

  useEffect(() => {
    if (songData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [songData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/song',
    method: HttpMethod.GET,
    headers: { followingId: songData?.songId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: `/follow/followCount/${songData?.songId}`,
    method: HttpMethod.GET,
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/song',
    method: HttpMethod.POST,
    headers: { followingId: songData?.songId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, songData])

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
  }, [receivedFollowerInfo, songData])

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

export default SongPage
