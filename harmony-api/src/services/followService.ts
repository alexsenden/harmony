import * as followRepo from '../repos/followRepo'
import { Follow } from '../models/follow'
import { HttpError } from '../models/error/httpError'
import { User } from '../models/user'

export const followUser = async (
  followerUser: User,
  followingId: string
): Promise<Follow> => {
  return followRepo.followUser({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const unFollowUser = async (
  followerUser: User,
  followingId: string
): Promise<Follow> => {
  return followRepo.unFollowUser({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const unFollowArtist = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return followRepo.unFollowArtist({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followArtist = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return followRepo.followArtist({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const unFollowSong = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return followRepo.unFollowSong({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followSong = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return followRepo.followSong({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const unFollowAlbum = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return followRepo.unFollowAlbum({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followAlbum = async (
  followingUser: User,
  followerId: string
): Promise<Follow> => {
  return await followRepo.followAlbum({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const getFollow = async (
  followerUser: User,
  followingId: string
): Promise<boolean> => {
  return followRepo.getFollow({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const getArtistFollow = async (
  followerUser: User,
  followerId: string
): Promise<boolean> => {
  return followRepo.getArtistFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getSongFollow = async (
  followerUser: User,
  followerId: string
): Promise<boolean> => {
  return followRepo.getSongFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getAlbumFollow = async (
  followerUser: User,
  followerId: string
): Promise<boolean> => {
  return followRepo.getAlbumFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getFollowCount = async (userId: string): Promise<number> => {
  return followRepo.getFollowCount(userId)
}

export const getArtistFollowCount = async (
  artistId?: string
): Promise<number> => {
  if (!artistId) {
    throw new HttpError(`artistId ${artistId} must be defined`, 400)
  }

  return await followRepo.getArtistFollowCount(artistId)
}

export const getSongFollowCount = async (songId?: string): Promise<number> => {
  if (!songId) {
    throw new HttpError(`songId ${songId} must be defined`, 400)
  }

  return await followRepo.getSongFollowCount(songId)
}

export const getAlbumFollowCount = async (
  albumId?: string
): Promise<number> => {
  if (!albumId) {
    throw new HttpError(`albumId ${albumId} must be defined`, 400)
  }

  return await followRepo.getAlbumFollowCount(albumId)
}
