import prisma from '../../prisma/prisma'
import { Topic } from '../models/topic'

export const getSongTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const songs = await prisma.song.findMany({
    where: {
      songName: {
        contains: partialName,
        mode: 'insensitive',
      },
    },
  })

  return songs.map(song => {
    return {
      topicId: {
        albumId: song.songId,
      },
      name: song.songName,
    }
  })
}
