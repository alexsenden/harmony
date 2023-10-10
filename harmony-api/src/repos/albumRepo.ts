import prisma from '../../prisma/prisma'
import { Topic } from '../models/topic'

export const getAlbumTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const albums = await prisma.album.findMany({
    where: {
      albumName: {
        contains: partialName,
        mode: 'insensitive',
      },
    },
  })

  return albums.map(album => {
    return {
      topicId: {
        albumId: album.albumId,
      },
      name: album.albumName,
    }
  })
}
