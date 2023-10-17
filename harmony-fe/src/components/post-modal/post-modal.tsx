import { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'

import TabLayout, { TabItem } from '../tab-layout'
import { Post, PostField } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { DiscussionPostForm } from './discussion-post-form'
import { PollPostForm } from './poll-post-form'
import { ReviewPostForm } from './review-post-form'

interface PostModalProps {
  open: boolean
  onClose: () => void
}

const DEFAULT_POST_STATE = {
  userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
} as Post

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const onChange = (argName: PostField, argValue: unknown) => {
    setPostData(prevPostData => {
      return {
        ...prevPostData,
        [argName]: argValue,
      }
    })
  }

  const [postData, setPostData] = useState<Post>(DEFAULT_POST_STATE)

  const [tabs] = useState<Array<TabItem>>([
    {
      label: 'Discussion',
      tab: <DiscussionPostForm onChange={onChange} />,
    },
    {
      label: 'Poll',
      tab: <PollPostForm onChange={onChange} />,
    },
    {
      label: 'Review',
      tab: <ReviewPostForm onChange={onChange} />,
    },
  ])

  const [createPost, createPostResponse, createPostError, createPostLoading] =
    useHttpRequest({
      url: '/post',
      method: HttpMethod.POST,
      body: postData,
    })

  useEffect(() => {
    if (!createPostLoading) {
      if (createPostError) {
        // createPost returned an error
        // Needs better error handling in the future
        console.log(createPostError)
      }
      if (createPostResponse) {
        // createPost returned sucessfully
        // Needs some way to show the post was successfully created in the future
        console.log(createPostResponse)
        setPostData(DEFAULT_POST_STATE)
        onClose()
      }
    }
  }, [createPostLoading])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Post</DialogTitle>
      <TabLayout tabs={tabs} variant="fullWidth" />
      <Button variant="outlined" onClick={createPost} sx={{ m: 3 }}>
        Create Post
      </Button>
    </Dialog>
  )
}
