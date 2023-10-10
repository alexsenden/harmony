import {
  Card,
  CardActions,
  CardContent,
  Button,
  Avatar,
  Stack,
  Box,
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import TextBlock from '../text'

interface PostProps {
  title: string
  name: string
  numComments: number
  numLikes: number
}

const Post = ({ title, name, numComments, numLikes }: PostProps) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <Stack direction="row">
        <CardContent>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>poll</Avatar>
        </CardContent>
        <Box>
          <CardContent>
            <TextBlock gutterBottom variant="h5">
              {title}
            </TextBlock>
          </CardContent>

          <CardActions>
            <TextBlock>By: {name} </TextBlock>
            <Button size="small">{numComments} comments</Button>
            <Button size="small"> {numLikes} likes</Button>
          </CardActions>
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
