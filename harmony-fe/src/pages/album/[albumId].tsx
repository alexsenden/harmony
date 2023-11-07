import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'

const AlbumPage = () => {
  const router = useRouter()
  const albumId = router.query.albumId

  return (
    <TextBlock
      sx={{ m: 5 }}
    >{`This is a temporary page for the album with albumId=${albumId}.`}</TextBlock>
  )
}

export default AlbumPage
