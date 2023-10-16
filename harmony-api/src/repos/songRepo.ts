import prisma from '../../prisma/prisma'

import { Topic } from '../models/topic'

type TPartialNameSong = {
  song_name: string
  song_id: number
}

export const getSongTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const songs = await prisma.$queryRaw<Array<TPartialNameSong>>`
    select song_name, song_id 
    from song 
    where song_name like ${`${partialName}%`}
    limit 5;
  `

  return songs.map(song => {
    return {
      topicId: {
        songId: song.song_id,
      },
      name: song.song_name,
    }
  })
}
