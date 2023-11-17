import { Song } from '@prisma/client'
import prisma from '../../prisma/prisma'

import { Topic } from '../models/topic'
import { HttpError } from '../models/error/httpError'

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
    where song_name ilike ${`${partialName}%`}
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

export const getSongById = async (songID?: number): Promise<Song> => {
  try {
    const songData = await prisma.song.findUniqueOrThrow({
      where: {
        songId: songID,
      },
    })

    return {
      songId: songData.songId,
      artistCreditId: songData.artistCreditId,
      songName: songData.songName,
      length: songData.length,
      songDescription: songData.songDescription,
    }
  } catch {
    throw new HttpError(`Song with id ${songID} not found`, 404)
  }
}
