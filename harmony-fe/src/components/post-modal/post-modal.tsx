import { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'

import TabLayout, { TabItem } from '../tab-layout'
import { Post, PostField, PostType } from '../../models/post'
import { CommonPostData } from './common-post-data'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

interface PostModalProps {
  open: boolean
  onClose: () => void
}

const DEFAULT_POST_STATE = { userId: '1' } as Post

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
      tab: (
        <CommonPostData onChange={onChange} postType={PostType.DISCUSSION} />
      ),
    },
    {
      label: 'Poll',
      tab: <CommonPostData onChange={onChange} postType={PostType.POLL} />,
    },
    {
      label: 'Review',
      tab: <CommonPostData onChange={onChange} postType={PostType.REVIEW} />,
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
