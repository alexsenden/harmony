import { Box } from '@mui/material'
import TextBlock from '../../components/text-block'
import Head from 'next/head'

const Error404 = () => {
  return (
    <>
      <Head>
        <title>{'404 - Page Not Found'}</title>
      </Head>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <TextBlock variant="h3">404 - Page Not Found</TextBlock>
      </Box>
    </>
  )
}

export default Error404
