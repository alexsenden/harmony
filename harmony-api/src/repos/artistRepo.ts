import { Artist } from '@prisma/client'
import prisma from '../../prisma/prisma'
import { HttpError } from '../models/error/httpError'

import { Topic } from '../models/topic'

type TPartialNameArtist = {
  artist_name: string
  artist_id: number
}

export const getArtistTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const artists = await prisma.$queryRaw<Array<TPartialNameArtist>>`
    select artist_name, artist_id 
    from artist 
    where artist_name ilike ${`${partialName}%`}
    limit 5;
  `

  return artists.map(artist => {
    return {
      topicId: {
        artistId: artist.artist_id,
      },
      name: artist.artist_name,
    }
  })
}

export const getArtistById = async (artistID?: number): Promise<Artist> => {
  try {
    const artistData = await prisma.artist.findUniqueOrThrow({
      where: {
        artistId: artistID,
      },
    })

    return {
      artistId: artistData.artistId,
      artistName: artistData.artistName,
      beginYear: artistData.beginYear,
      end: artistData.end,
      artistDescription: artistData.artistDescription,
    }
  } catch {
    throw new HttpError(`Artist with id ${artistID} not found`, 404)
  }
}
