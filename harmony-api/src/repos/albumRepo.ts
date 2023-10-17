import prisma from '../../prisma/prisma'

import { Topic } from '../models/topic'

type TPartialNameAlbum = {
  album_name: string
  album_id: number
}

export const getAlbumTopicByPartialName = async (
  partialName: string
): Promise<Array<Topic>> => {
  const albums = await prisma.$queryRaw<Array<TPartialNameAlbum>>`
    select album_name, album_id 
    from album 
    where album_name like ${`${partialName}%`}
    limit 5;
  `

  console.log(albums)

  return albums.map(album => {
    return {
      topicId: {
        albumId: album.album_id,
      },
      name: album.album_name,
    }
  })
}
