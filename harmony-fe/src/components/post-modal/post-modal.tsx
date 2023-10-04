import { useState } from 'react'
import { Autocomplete, Dialog, DialogTitle } from '@mui/material'

import TabLayout, { TabItem } from '../tab-layout'
import { Post } from '../../models/post'
import { CommonPostData } from './common-post-data'

interface PostModalProps {
  open: boolean
  onClose: () => void
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
  const [postData, setPostData] = useState<Post>({} as Post)

  const tabs: Array<TabItem> = [
    {
      label: 'Discussion',
      tab: <CommonPostData />,
    },
    {
      label: 'Poll',
      tab: <CommonPostData />,
    },
    {
      label: 'Review',
      tab: <CommonPostData />,
    },
  ]

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Post</DialogTitle>
      <TabLayout tabs={tabs} variant="fullWidth" />
    </Dialog>
  )
}
