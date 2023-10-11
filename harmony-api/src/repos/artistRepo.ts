import prisma from '../../prisma/prisma'
import { Topic } from '../models/topic'

export const getArtistTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const artists = await prisma.artist.findMany({
    where: {
      artistName: {
        contains: partialName,
        mode: 'insensitive',
      },
    },
  })

  return artists.map(artist => {
    return {
      topicId: {
        artistId: artist.artistId,
      },
      name: artist.artistName,
    }
  })
}
