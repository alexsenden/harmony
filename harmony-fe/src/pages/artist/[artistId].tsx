import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'

const ArtistPage = () => {
  const router = useRouter()
  const artistId = router.query.artistId

  return (
    <TextBlock
      sx={{ m: 5 }}
    >{`This is a temporary page for the artist with artistId=${artistId}.`}</TextBlock>
  )
}

export default ArtistPage
