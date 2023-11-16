import { Album } from '@prisma/client'
import prisma from '../../prisma/prisma'

import { Topic } from '../models/topic'
import { HttpError } from '../models/error/httpError'

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
    where album_name ilike ${`${partialName}%`}
    limit 5;
  `

  return albums.map(album => {
    return {
      topicId: {
        albumId: album.album_id,
      },
      name: album.album_name,
    }
  })
}

export const getAlbumById = async (albumID?: number): Promise<Album> => {
  const albumData = await prisma.album
    .findUniqueOrThrow({
      where: {
        albumId: albumID,
      },
    })
    .catch(() => {
      throw new HttpError(`Album with id ${albumID} not found`, 404)
    })

  return {
    albumId: albumData.albumId,
    albumName: albumData.albumName,
    albumDescription: albumData.albumDescription,
    releaseGroupType: albumData.releaseGroupType,
    artistCreditId: albumData.artistCreditId,
  }
}
