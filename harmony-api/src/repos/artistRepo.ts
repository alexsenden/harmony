import prisma from '../../prisma/prisma'

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
