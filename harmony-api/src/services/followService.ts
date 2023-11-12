import * as followRepo from '../repos/followRepo'
import * as userRepo from '../repos/userRepo'
import { Follow } from '../models/follow'
import { HttpError } from '../models/error/httpError'

export const followUser = async (
  userCookie: string,
  followingId: string
): Promise<Follow> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.followUser({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const unFollowUser = async (
  userCookie: string,
  followingId: string
): Promise<Follow> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.unFollowUser({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const unFollowArtist = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.unFollowArtist({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followArtist = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.followArtist({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const unFollowSong = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.unFollowSong({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followSong = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.followSong({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const unFollowAlbum = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.unFollowAlbum({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const followAlbum = async (
  userCookie: string,
  followerId: string
): Promise<Follow> => {
  const followingUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.followAlbum({
    followerId: followerId,
    followingId: followingUser.userId,
  })
}

export const getFollow = async (
  userCookie: string,
  followingId: string
): Promise<boolean> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.getFollow({
    followerId: followerUser.userId,
    followingId: followingId,
  })
}

export const getArtistFollow = async (
  userCookie: string,
  followerId: string
): Promise<boolean> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.getArtistFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getSongFollow = async (
  userCookie: string,
  followerId: string
): Promise<boolean> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.getSongFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getAlbumFollow = async (
  userCookie: string,
  followerId: string
): Promise<boolean> => {
  const followerUser = await userRepo.getUserFromCookie(userCookie)
  return await followRepo.getAlbumFollow({
    followerId: followerId,
    followingId: followerUser.userId,
  })
}

export const getFollowCount = async (userId: string): Promise<number> => {
  return await followRepo.getFollowCount(userId)
}

export const getArtistFollowCount = async (
  artistId?: string
): Promise<number> => {
  if (artistId === undefined) {
    throw new HttpError(`Artist ID ${artistId} invalid`, 400)
  }

  return await followRepo.getArtistFollowCount(artistId)
}

export const getSongFollowCount = async (songId?: string): Promise<number> => {
  if (songId === undefined) {
    throw new HttpError(`Song ID ${songId} invalid`, 400)
  }

  return await followRepo.getSongFollowCount(songId)
}

export const getAlbumFollowCount = async (
  albumId?: string
): Promise<number> => {
  if (albumId === undefined) {
    throw new HttpError(`Album ID ${albumId} invalid`, 400)
  }

  return await followRepo.getAlbumFollowCount(albumId)
}
