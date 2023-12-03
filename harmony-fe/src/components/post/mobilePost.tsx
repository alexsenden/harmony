import { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  Link,
  Avatar,
} from '@mui/material'
import { Forum, Poll, RateReview, CommentOutlined } from '@mui/icons-material'

import TextBlock from '../text-block'
import { Post, PostType } from '../../models/post'
import { getTopicContext } from '../../utils/additionalContext'
import { ReviewContent } from './review-content'
import { PollContent } from './poll-content'
import { DiscussionContent } from './discussion-content'
import CommentSection from './comment-section'
import LikeButton from './like-button'
import LikeModal from './like-modal'
import moment from 'moment'

interface PostProps {
  post: Post
  commentOpen?: boolean
}

const MobilePost = ({ post, commentOpen = false }: PostProps) => {
  const [numComments, setNumComments] = useState(post.numComments || 0)
  const [numLikes, setNumLikes] = useState(post.numLikes || 0)
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isVoted, setIsVoted] = useState(post.isVoted || false)
  const [likeModalOpen, setLikeModalOpen] = useState(false)
  const [commentSectionOpen, setCommentSectionOpen] = useState(commentOpen)

  const handleLike = () => {
    if (isLiked) {
      setNumLikes(prevState => prevState - 1)
      setIsLiked(false)
    } else {
      setNumLikes(prevState => prevState + 1)
      setIsLiked(true)
    }
  }

  const openLikeModal = () => {
    setLikeModalOpen(true)
  }

  const closeLikeModal = () => {
    setLikeModalOpen(false)
  }

  let avatarIcon
  let postContent
  const iconSx = { mt: 1, ml: 1 }
  switch (post.postType) {
    case PostType.REVIEW:
      avatarIcon = <RateReview sx={iconSx} fontSize="large" />
      postContent = <ReviewContent post={post} />
      break
    case PostType.POLL:
      avatarIcon = <Poll sx={iconSx} fontSize="large" />
      postContent = (
        <PollContent post={post} voted={isVoted} voteAction={setIsVoted} />
      )
      break
    case PostType.DISCUSSION:
    default:
      avatarIcon = <Forum sx={iconSx} fontSize="large" />
      postContent = <DiscussionContent post={post} />
      break
  }

  const topicContext = getTopicContext(post.topicId)

  const getTopicUrl = function () {
    let url = '/'
    if (post.topicId.albumId !== undefined) {
      url = url + 'album/' + post.topicId.albumId
    } else if (post.topicId.songId !== undefined) {
      url = url + 'song/' + post.topicId.songId
    } else {
      url = url + 'artist/' + post.topicId.artistId
    }
    return url
  }

  return (
    <>
      <Card variant="outlined" sx={{ mb: 1 }}>
        <Stack direction="row">
          <Box sx={{ width: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Link
                  href={`/posts/${post.postId}`}
                  underline="none"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  <TextBlock gutterBottom variant="h6">
                    {post.title}
                  </TextBlock>
                </Link>
                <TextBlock>{moment(post.createdAt).fromNow()}</TextBlock>
              </Box>

              <Link href={getTopicUrl()} underline="none">
                {post.topicName} {topicContext}
              </Link>
              <Divider sx={{ my: 1 }} />
              {postContent}
            </CardContent>

            <CardActions>
              <LikeButton
                isLiked={isLiked}
                post={post}
                handleLike={handleLike}
              />

              <Button
                size="small"
                onClick={() => setCommentSectionOpen(prevState => !prevState)}
              >
                <CommentOutlined />
              </Button>
            </CardActions>

            <Divider sx={{ mx: 2 }} />

            <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
              <Button
                size="small"
                onClick={() => setCommentSectionOpen(prevState => !prevState)}
                sx={{ ml: 3, mt: 0.5 }}
              >
                {`${numComments} comment${numComments !== 1 ? 's' : ''}`}
              </Button>
              <Button
                size="small"
                onClick={openLikeModal}
                sx={{ mt: 0.5 }}
                disabled={numLikes === 0}
              >
                {`${numLikes} like${numLikes !== 1 ? 's' : ''}`}
              </Button>
            </CardActions>
            <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
              <CardContent>{avatarIcon}</CardContent>
              <Button href={`/profile/${post.user?.username}`}>
                <Avatar
                  src={`/images/profilepic/${post.user?.picture}.png`}
                  sx={{ mr: 1, height: 24, width: 24 }}
                ></Avatar>
                {post.user?.username}
              </Button>
            </CardActions>

            <CommentSection
              commentSectionOpen={commentSectionOpen}
              post={post}
              setNumComments={setNumComments}
            />
          </Box>
        </Stack>
      </Card>
      <LikeModal
        likeModalOpen={likeModalOpen}
        onClose={closeLikeModal}
        post={post}
      ></LikeModal>
    </>
  )
}

export default MobilePost
