import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  Stack,
  Box,
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'

interface PostProps {
  title: string
  name: string
  numComments: number
  numLikes: number
}

export default function Post({
  title,
  name,
  numComments,
  numLikes,
}: PostProps) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <Stack direction="row">
        <CardContent>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>poll</Avatar>
        </CardContent>
        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>

          <CardActions>
            <p>By: {name} </p>
            <Button size="small">{numComments} comments</Button>
            <Button size="small"> {numLikes} likes</Button>
          </CardActions>
        </Box>
      </Stack>
    </Card>
  )
}
