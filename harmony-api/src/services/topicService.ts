import * as artistRepo from '../repos/artistRepo'
import * as albumRepo from '../repos/albumRepo'
import * as songRepo from '../repos/songRepo'
import * as userRepo from '../repos/userRepo'
import { Topic, TopicId } from '../models/topic'
import { User } from '../models/user'
import { Album } from '../models/album'
import { Song } from '../models/song'
import { Artist } from '../models/artist'

export const getTopicByPartialName = async (
  partialName?: string
): Promise<Array<Topic>> => {
  if (!partialName) {
    return []
  }

  const artists = artistRepo.getArtistTopicByPartialName(partialName)
  const albums = albumRepo.getAlbumTopicByPartialName(partialName)
  const songs = songRepo.getSongTopicByPartialName(partialName)

  return [...(await artists), ...(await albums), ...(await songs)]
}

export const getTopicOrUserByPartialName = async (
  partialName?: string
): Promise<Array<Topic | Partial<User>>> => {
  if (!partialName) {
    return []
  }

  const artists = artistRepo.getArtistTopicByPartialName(partialName)
  const albums = albumRepo.getAlbumTopicByPartialName(partialName)
  const songs = songRepo.getSongTopicByPartialName(partialName)
  const users = userRepo.getUserByPartialUsername(partialName)

  return [
    ...(await artists),
    ...(await albums),
    ...(await songs),
    ...(await users),
  ]
}

export const getArtistById = async (artistID?: number): Promise<Artist> => {
  return artistRepo.getArtistById(artistID)
}

export const getSongById = async (songID?: number): Promise<Song> => {
  return songRepo.getSongById(songID)
}

export const getAlbumById = async (albumID?: number): Promise<Album> => {
  return albumRepo.getAlbumById(albumID)
}

export const validateTopicId = (topicId?: TopicId): Array<string> => {
  let definedIds = 0

  if (topicId?.albumId) {
    definedIds++
  }
  if (topicId?.artistId) {
    definedIds++
  }
  if (topicId?.songId) {
    definedIds++
  }

  if (definedIds !== 1) {
    return ['Exactly one topicId must be defined']
  }

  return []
}
