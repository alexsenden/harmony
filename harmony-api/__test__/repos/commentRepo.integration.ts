import prisma from '../../prisma/prisma'
import * as commentRepo from '../../src/repos/commentRepo'

describe('createComment', () => {
  it('creates a comment in the DB and responds with the comment object', async () => {
    const NEW_COMMENT = {
      postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
      userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
      content: 'New test comment',
    }

    const result = await commentRepo.createComment(NEW_COMMENT)

    expect(result).toEqual({
      commentId: expect.any(String),
      userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
      postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
      createdAt: expect.any(Date),
      content: 'New test comment',
    })

    // Cleanup
    await prisma.comment.deleteMany({
      where: {
        postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
        userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
        content: 'New test comment',
      },
    })
  })
})

describe('getComments', () => {
  it('responds with an array of comments on a specific post', async () => {
    const COMMENT_IN_DB = {
      commentId: '0b08c78b-44ee-4465-b4a0-421c207c3e52',
      postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
      userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
      content:
        "Wow, I loved this song in Happy Gilmore too! Did you know he's the only guy to ever take his stake off and try to stab somebody?",
    }

    const result = await commentRepo.getComments(COMMENT_IN_DB.postId)

    expect(result).toEqual([
      {
        ...COMMENT_IN_DB,
        createdAt: expect.any(Date),
        postTitle: 'This song is abolutely fantastic!!',
        user: {
          picture: 0,
          username: 'MrUserGuy',
        },
      },
    ])
  })
})

describe('getCommentsByUserID', () => {
  it('responds with an array of comments written by a specific user', async () => {
    const COMMENT_IN_DB = {
      commentId: '0b08c78b-44ee-4465-b4a0-421c207c3e52',
      postId: 'a706c75a-a076-43d2-b9d2-50d259a063da',
      userId: 'b12c47f8-036c-4bfd-8658-230e8fa4d7cb',
      content:
        "Wow, I loved this song in Happy Gilmore too! Did you know he's the only guy to ever take his stake off and try to stab somebody?",
    }

    const result = await commentRepo.getCommentsByUserID(COMMENT_IN_DB.userId)

    expect(result).toEqual([
      {
        ...COMMENT_IN_DB,
        createdAt: expect.any(Date),
        postTitle: 'This song is abolutely fantastic!!',
        user: {
          picture: 0,
          username: 'MrUserGuy',
        },
      },
    ])
  })
})
