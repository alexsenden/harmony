import * as followRepo from '../repos/followRepo'
import * as userRepo from '../repos/userRepo'
import { Follow } from '../models/follow'

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

export const getFollowCount = async (userId: string): Promise<number> => {
  return await followRepo.getFollowCount(userId)
}
