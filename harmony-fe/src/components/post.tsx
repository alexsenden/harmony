import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { deepOrange, deepPurple } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

export default function Post({ title, name, comments, likes }) {
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
            <Button size="small">{comments} comments</Button>
            <Button size="small"> {likes} likes</Button>
          </CardActions>
        </Box>
      </Stack>
    </Card>
  )
}
