import { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, IconButton, Stack } from '@mui/material'

import TabLayout, { TabItem } from '../tab-layout'
import { Post, PostField, PostType } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { DiscussionPostForm } from './discussion-post-form'
import { PollPostForm } from './poll-post-form'
import { DEFAULT_RATING, ReviewPostForm } from './review-post-form'
import { PollOption } from '../../models/pollOption'
import { UserContext } from '../../contexts/userContext'
import CloseIcon from '@mui/icons-material/Close'
import { MobileContext } from '../../contexts/mobileContext'
interface PostModalProps {
  open: boolean
  onClose: () => void
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)

  useEffect(() => {
    setPostData({
      ...postData,
      userId: user?.userId || '',
    })
  }, [user])

  const DEFAULT_POST_STATE = {
    rating: DEFAULT_RATING,
    userId: user?.userId,
  } as Post

  const [postData, setPostData] = useState<Post>(DEFAULT_POST_STATE)

  const onChange = (argName: PostField, argValue: unknown) => {
    setPostData(prevPostData => {
      return {
        ...prevPostData,
        [argName]: argValue,
      }
    })
  }

  const getTabs = (errors: Partial<Post>) => {
    return [
      {
        label: 'Discussion',
        tab: <DiscussionPostForm onChange={onChange} errorFields={errors} />,
      },
      {
        label: 'Poll',
        tab: <PollPostForm onChange={onChange} errorFields={errors} />,
      },
      {
        label: 'Review',
        tab: <ReviewPostForm onChange={onChange} errorFields={errors} />,
      },
    ]
  }

  const [tabs, setTabs] = useState<Array<TabItem>>(getTabs({}))

  const [createPost, createPostResponse, createPostError, createPostLoading] =
    useHttpRequest({
      url: '/post',
      method: HttpMethod.POST,
      body: postData,
    })

  useEffect(() => {
    if (!createPostLoading && createPostResponse) {
      onClose()
    }
  }, [createPostLoading])

  useEffect(() => {
    const errors: Partial<Post> = {}

    if (
      createPostError?.response?.status === 400 &&
      createPostError?.response?.data?.message
    ) {
      const message = createPostError.response.data.message as string

      if (message.includes(PostField.TITLE)) {
        errors[PostField.TITLE] = '1'
      }
      if (message.includes(PostField.BODY)) {
        errors[PostField.BODY] = '1'
      }
      if (message.includes(PostField.POST_TYPE)) {
        errors[PostField.POST_TYPE] = PostType.DISCUSSION
      }
      if (message.includes(PostField.TOPIC_ID)) {
        errors[PostField.TOPIC_ID] = {}
      }
      if (message.includes(PostField.POLL_OPTIONS)) {
        const indexes = (
          message
            .match(/pollOptions\[[\d]+\]/g)
            ?.join(' ')
            .match(/[\d]+/g) || []
        )
          .map(index => {
            return Number(index)
          })
          .filter(index => !Number.isNaN(index))
        errors.pollOptions = []
        for (const index of indexes) {
          errors.pollOptions[index] = {} as PollOption
        }
      }
    }

    setTabs(getTabs(errors))
  }, [createPostError])

  return (
    <Dialog open={open} onClose={onClose} fullScreen={mobile}>
      <Stack
        direction="row"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <DialogTitle>New Post</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <TabLayout
        tabs={tabs}
        variant="fullWidth"
        onTabChange={() => setPostData(DEFAULT_POST_STATE)}
      />
      <Button variant="outlined" onClick={createPost} sx={{ m: 3 }}>
        Create Post
      </Button>
    </Dialog>
  )
}
