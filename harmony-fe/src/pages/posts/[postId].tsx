import { useRouter } from 'next/router'
import { Button, Stack, Divider, Paper, Grid } from '@mui/material'
import TextBlock from '../../components/text'

export default function PostDetail() {
  const router = useRouter()
  const postID = router.query.postId

  return (
    <>
      <div style={{ padding: 14 }}>
        <Paper style={{ padding: '40px 20px' }}>
          <TextBlock variant="h1">Title of the post {postID}</TextBlock>
          <TextBlock>By: Username</TextBlock>
          <TextBlock>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            impedit optio expedita quia sint esse quo deserunt ea fuga quod?
            Ducimus quasi veritatis tempora. Labore quos quod quae molestiae
            eligendi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem impedit optio expedita quia sint esse quo deserunt ea fuga
            quod? Ducimus quasi veritatis tempora. Labore quos quod quae
            molestiae eligendi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Autem impedit optio expedita quia sint esse quo
            deserunt ea fuga quod? Ducimus quasi veritatis tempora. Labore quos
            quod quae molestiae eligendi?
          </TextBlock>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" size="small">
              Like
            </Button>
            <Button variant="outlined" size="small">
              Follow
            </Button>
          </Stack>
        </Paper>

        <TextBlock variant="h2">Comments</TextBlock>
        <Paper style={{ padding: '40px 20px' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <TextBlock variant="h4" style={{ margin: 0, textAlign: 'left' }}>
                Michel Michel
              </TextBlock>
              <TextBlock style={{ textAlign: 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{' '}
              </TextBlock>
              <TextBlock style={{ textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </TextBlock>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <TextBlock variant="h4" style={{ margin: 0, textAlign: 'left' }}>
                Michel Michel
              </TextBlock>
              <TextBlock style={{ textAlign: 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{' '}
              </TextBlock>
              <TextBlock style={{ textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </TextBlock>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <TextBlock variant="h4" style={{ margin: 0, textAlign: 'left' }}>
                Michel Michel
              </TextBlock>
              <TextBlock style={{ textAlign: 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{' '}
              </TextBlock>
              <TextBlock style={{ textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </TextBlock>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <TextBlock variant="h4" style={{ margin: 0, textAlign: 'left' }}>
                Michel Michel
              </TextBlock>
              <TextBlock style={{ textAlign: 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{' '}
              </TextBlock>
              <TextBlock style={{ textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </TextBlock>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <TextBlock variant="h4" style={{ margin: 0, textAlign: 'left' }}>
                Michel Michel
              </TextBlock>
              <TextBlock style={{ textAlign: 'left' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{' '}
              </TextBlock>
              <TextBlock style={{ textAlign: 'left', color: 'gray' }}>
                posted 1 minute ago
              </TextBlock>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}
