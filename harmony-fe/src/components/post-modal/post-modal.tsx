import { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'

import TabLayout, { TabItem } from '../tab-layout'
import { Post, PostField } from '../../models/post'
import { CommonPostData } from './common-post-data'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

interface PostModalProps {
  open: boolean
  onClose: () => void
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const [postData, setPostData] = useState<Post>({} as Post)

  const [createPost, createPostResponse, createPostError, createPostLoading] =
    useHttpRequest({
      url: '/post',
      method: HttpMethod.POST,
      body: postData,
    })

  const onChange = (argName: PostField, argValue: string) => {
    setPostData(prevPostData => {
      return {
        ...prevPostData,
        [argName]: argValue,
      }
    })
  }

  useEffect(() => {
    if (!createPostLoading) {
      if (createPostError) {
        console.log(createPostError)
      }
      if (createPostResponse) {
        console.log(createPostResponse)
        onClose()
      }
    }
  }, [createPostLoading])

  const tabs: Array<TabItem> = [
    {
      label: 'Discussion',
      tab: <CommonPostData onChange={onChange} />,
    },
    {
      label: 'Poll',
      tab: <CommonPostData onChange={onChange} />,
    },
    {
      label: 'Review',
      tab: <CommonPostData onChange={onChange} />,
    },
  ]

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
