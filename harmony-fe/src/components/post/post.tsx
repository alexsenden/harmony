import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  TextField,
  Collapse,
  InputAdornment,
  IconButton,
  Link,
  Rating,
  Avatar,
} from '@mui/material'
import TextBlock from '../text'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { useContext, useState, useRef, useEffect } from 'react'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { PostType } from '../../models/post'
import { Forum, Poll, RateReview } from '@mui/icons-material'
import { PollOption } from '../../models/pollOption'
import { PollAnswer } from './poll-answer'
import { TopicId } from '../../models/topic'
import { Like } from '../../models/like'
import { CommentWithUser } from '../../models/comment'
import { UserContext } from '../../contexts/user'

interface PostProps {
  title: string
  name: string
  numComments: number
  numLikes: number
  postId: string
  postType: PostType
  body?: string
  pollOptions?: Array<PollOption>
  rating?: number
  topicName: string
  topicId: TopicId
  picture: number
}

const Post = ({
  title,
  name,
  numComments,
  numLikes,
  postId,
  postType,
  body,
  pollOptions,
  rating,
  topicName,
  topicId,
  picture,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [currLikes, setCurrLikes] = useState(numLikes)
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)
  const [currComments, setCurrComments] = useState(numComments)
  const user = useContext(UserContext)

  const commentInputRef = useRef<HTMLInputElement | null>(null)

  const [postLikeRequest] = useHttpRequest({
    url: '/post/like',
    method: HttpMethod.POST,
    body: { postId },
  })

  const [removeLikeRequest] = useHttpRequest({
    url: '/post/like',
    method: HttpMethod.DELETE,
    body: { postId },
  })

  const toggleLike = () => {
    if (!isLiked) {
      postLikeRequest()
      setCurrLikes(currLikes + 1)
      setIsLiked(true)
    } else {
      removeLikeRequest()
      setCurrLikes(currLikes - 1)
      setIsLiked(false)
    }
  }

  const [getLike, like] = useHttpRequest({
    url: 'post/like',
    method: HttpMethod.GET,
    body: { postId },
  })

  useEffect(() => {
    getLike()
  }, [])

  useEffect(() => {
    if (like && like.length > 0) {
      const userLiked = like.some(
        (likeItem: Like) => likeItem.postId === postId
      )
      setIsLiked(userLiked)
    }
  }, [like])

  const [getComments, comments] = useHttpRequest({
    url: `post/comments?postId=${postId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (isCommentSectionOpen) {
      getComments()
    }
  }, [isCommentSectionOpen])

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(prevState => !prevState)
  }

  useEffect(() => {
    if (isCommentSectionOpen) {
      commentInputRef.current?.focus()
    }
  }, [isCommentSectionOpen])

  const [commentInput, setCommentInput] = useState('')

  const [postCommentRequest] = useHttpRequest({
    url: '/post/comment',
    method: HttpMethod.POST,
    body: { postId, commentInput },
  })

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value)
  }

  const handleCommentSubmission = () => {
    if (commentInput.trim() !== '') {
      setCurrComments(currComments + 1)
      comments.unshift({
        commentId: '',
        content: commentInput,
        createdAt: new Date(),
        postId: postId,
        user: { username: user?.username, picture: user?.picture },
        userId: user?.userId,
      })
      postCommentRequest()
      setCommentInput('')
    }
  }

  let topicContext
  if (topicId.artistId) {
    topicContext = '(Artist)'
  } else if (topicId.albumId) {
    topicContext = '(Album)'
  } else if (topicId.songId) {
    topicContext = '(Song)'
  }

  let avatarIcon
  const iconSx = { mt: 1, ml: 1 }
  switch (postType) {
    case PostType.DISCUSSION:
      avatarIcon = <Forum sx={iconSx} fontSize="large" />
      break
    case PostType.POLL:
      avatarIcon = <Poll sx={iconSx} fontSize="large" />
      break
    case PostType.REVIEW:
    default:
      avatarIcon = <RateReview sx={iconSx} fontSize="large" />
      break
  }

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <Stack direction="row">
        <CardContent>{avatarIcon}</CardContent>
        <Box sx={{ width: '100%' }}>
          <CardContent>
            <Link href={`/posts/${postId}`} underline="none">
              <TextBlock gutterBottom variant="h5">
                {title}
              </TextBlock>
            </Link>
            <TextBlock>
              {topicName} {topicContext}
            </TextBlock>
            <Divider sx={{ my: 1 }} />
            {rating && postType === PostType.REVIEW && (
              <Rating
                size="large"
                value={rating}
                precision={0.5}
                readOnly
                sx={{ my: 1, ml: 0.5 }}
              />
            )}
            {body && <TextBlock sx={{ ml: 1 }}>{body}</TextBlock>}
            {pollOptions &&
              pollOptions.map(option => <PollAnswer pollOption={option} />)}
          </CardContent>

          <CardActions>
            <Button size="small" onClick={toggleLike}>
              {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltOutlinedIcon />}
            </Button>

            <Button size="small" onClick={toggleCommentSection}>
              <CommentOutlinedIcon />
            </Button>
          </CardActions>

          <Divider />

          <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button href={`/profile/${name}`}>
              <Avatar
                src={`/images/profilepic/${picture}.png`}
                sx={{ mr: 1, height: 24, width: 24 }}
              ></Avatar>
              {name}
            </Button>
            <Button
              size="small"
              onClick={toggleCommentSection}
              sx={{ ml: 3, mt: 0.5 }}
            >
              {currComments} comments
            </Button>
            <Button size="small" onClick={toggleLike} sx={{ mt: 0.5 }}>
              {currLikes} likes
            </Button>
          </CardActions>

          <Collapse in={isCommentSectionOpen}>
            <CardContent>
              <TextField
                placeholder="Add a comment.."
                fullWidth
                disabled={!user} // either keep this disabled when no user logged in or present a popup to login.
                value={commentInput}
                onChange={handleCommentInputChange}
                inputRef={commentInputRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentSubmission}>
                        <SendRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>

            {comments ? (
              comments.map((comment: CommentWithUser, index: number) => (
                <CardContent key={index}>
                  <TextBlock gutterBottom variant="body1">
                    <Button href={`/profile/${comment.user.username}`}>
                      <Avatar
                        src={`/image/profilepic/${comment.user.picture}.png`}
                        sx={{ mr: 1, height: 24, width: 24 }}
                      ></Avatar>
                      <strong>{comment.user.username}</strong>
                    </Button>
                  </TextBlock>
                  <TextBlock>{comment.content}</TextBlock>
                </CardContent>
              ))
            ) : (
              <p>Loading comments...</p>
            )}
          </Collapse>
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
