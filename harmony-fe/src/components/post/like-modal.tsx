import { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
} from '@mui/material'
import { Post } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { LikeWithUser } from '../../models/like'
import TextBlock from '../text-block'
import { UserContext } from '../../contexts/userContext'

interface LikeModalProps {
  likeModalOpen: boolean
  userLiked: boolean
  onClose: () => void
  post: Post
}

const LikeModal = ({
  likeModalOpen,
  userLiked,
  onClose,
  post,
}: LikeModalProps) => {
  const [likes, setLikes] = useState<LikeWithUser[] | undefined>(undefined)
  const user = useContext(UserContext)

  const [getLikes, likesResponse, likesLoading] = useHttpRequest({
    url: `post/${post.postId}/like`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (!likes && likeModalOpen) {
      getLikes()
    }
  }, [likeModalOpen, likes])

  useEffect(() => {
    setLikes(likesResponse)
  }, [likesResponse])

  useEffect(() => {
    if (user && likes) {
      let userIndex = -1
      for (const [index, like] of likes.entries()) {
        if (like.userId === user.userId) {
          userIndex = index
          break
        }
      }
      if (userIndex < 0 && userLiked) {
        const fakeLike = {
          userId: user.userId,
          postId: '',
          user: { username: user.username, picture: user.picture },
        } as LikeWithUser
        likes.unshift(fakeLike)
      } else if (userIndex >= 0 && !userLiked) {
        likes.splice(userIndex, 1)
      }
    }
  }, [userLiked])

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '50%',
          maxHeight: 300,
        },
      }}
      open={likeModalOpen}
      onClose={onClose}
    >
      <DialogTitle>Likes</DialogTitle>
      <Divider />
      <List>
        {likeModalOpen &&
          (!likesLoading ? (
            likes?.map((like: LikeWithUser, index: number) => (
              <ListItem key={index}>
                <Button
                  key={index}
                  href={`/profile/${like.user.username}`}
                  sx={{ mx: 3 }}
                >
                  <Avatar
                    src={`/images/profilepic/${like.user.picture}.png`}
                    sx={{ mr: 1, height: 24, width: 24 }}
                  ></Avatar>
                  <strong>{like.user.username}</strong>
                </Button>
              </ListItem>
            ))
          ) : (
            <TextBlock>Loading likes...</TextBlock>
          ))}
      </List>
    </Dialog>
  )
}
export default LikeModal
