import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'

const SongPage = () => {
  const router = useRouter()
  const songId = router.query.songId

  return (
    <TextBlock
      sx={{ m: 5 }}
    >{`This is a temporary page for the song with songId=${songId}.`}</TextBlock>
  )
}

export default SongPage
