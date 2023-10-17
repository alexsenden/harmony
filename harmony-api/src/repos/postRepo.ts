import prisma from '../../prisma/prisma'
import { PostType as PrismaPostType } from '@prisma/client'
import { Post, PostType } from '../models/post'

export const createPost = async (postData: Post): Promise<Post> => {
  const postResult = await prisma.post.create({
    data: {
      userId: postData.userId,
      postType: PrismaPostType[postData.postType],
      title: postData.title,
      content: postData.body,
      rating: postData.rating,
      artistId: postData.topicId.artistId,
      albumId: postData.topicId.albumId,
      songId: postData.topicId.songId,
    },
  })

  return {
    userId: postResult.userId,
    postId: postResult.postId,
    postType: PostType[postResult.postType],
    title: postResult.title,
    body: postResult.content || '',
    rating: Number(postResult.rating) || undefined,
    topicId: {
      artistId: postResult.artistId || undefined,
      albumId: postResult.albumId || undefined,
      songId: postResult.songId || undefined,
    },
  }
}

export const getPostByUserId = async (
  userID: string
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        contains: userID,
        mode: 'insensitive',
      },
    },
  })

  return posts.map(post => {
    return {
      postId: post.postId,
      userId: post.userId,
      title: post.title,
      topicId: {
        artistId: post.artistId || undefined,
        albumId: post.albumId || undefined,
        songId: post.songId || undefined,
      },
      postType: PostType[post.postType],
    }
  })

}