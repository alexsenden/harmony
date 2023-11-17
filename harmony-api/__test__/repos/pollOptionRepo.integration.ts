import prisma from '../../prisma/prisma'
import {
  createPollOption,
  voteOnPollOption,
} from '../../src/repos/pollOptionRepo'
import { PollOption, PollOptionVote } from '../../src/models/pollOption'
import { HttpError } from '../../src/models/error/httpError'
import { createPost } from '../../src/repos/postRepo'
import { User } from '../../src/models/user'
import { Post, PostType } from '../../src/models/post'

describe('Integration tests for pollOptionRepo functions', () => {
  let testPollOption: PollOption
  let testUser: User
  let testPost: Post

  beforeAll(async () => {
    testUser = {
      userId: '1',
      username: 'testuser',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      active: true,
      createdAt: new Date(),
      picture: 0,
    }

    await prisma.user.create({
      data: testUser,
    })

    const postData = {
      userId: testUser.userId,
      postId: '1',
      createdAt: new Date(),
      postType: PostType.DISCUSSION,
      title: 'Test Artist Post',
      body: 'This is a test post for an artist.',
      topicId: {
        artistId: 1,
      },
      rating: 4.5,
    }

    testPost = await createPost(postData)

    const pollOptionData: PollOption = {
      pollOptionId: '1',
      option: 'Option A',
      entryNumber: 1,
    }

    const postId = testPost.postId

    testPollOption = await createPollOption({
      pollOptionData,
      postId,
      entryNumber: 5,
    })
  })

  afterAll(async () => {
    await prisma.pollVote.deleteMany({
      where: {
        pollOptionId: testPollOption.pollOptionId,
      },
    })

    await prisma.pollOption.deleteMany({
      where: {
        postId: testPost.postId,
      },
    })

    try {
      await prisma.post.deleteMany({
        where: {
          userId: testUser.userId,
        },
      })
    } catch (e) {
      console.log(e)
    }

    try {
      await prisma.user.deleteMany({
        where: {
          userId: testUser.userId,
        },
      })
    } catch (e) {
      console.log(e)
    }
  })

  it('should create a poll option for a post', async () => {
    const pollOptionData: PollOption = {
      pollOptionId: '2',
      option: 'Option B',
      entryNumber: 2,
    }

    const postId = testPost.postId

    const createdPollOption = await createPollOption({
      pollOptionData,
      postId,
      entryNumber: 2,
    })

    expect(createdPollOption).toBeDefined()
    expect(createdPollOption.option).toBe(pollOptionData.option)
    expect(createdPollOption.entryNumber).toBe(2)
  })

  it('should vote on a poll option', async () => {
    const pollVoteData: PollOptionVote = {
      pollOptionId: testPollOption.pollOptionId,
      userId: '1',
    }

    const votedPollOption = await voteOnPollOption(pollVoteData)

    expect(votedPollOption).toBeDefined()
    expect(votedPollOption.pollOptionId).toBe(testPollOption.pollOptionId)
    expect(votedPollOption.userId).toBe('1')
  })

  it('should throw an error if a user votes on the same poll option again', async () => {
    const pollVoteData: PollOptionVote = {
      pollOptionId: testPollOption.pollOptionId,
      userId: '1',
    }

    await expect(voteOnPollOption(pollVoteData)).rejects.toThrow(HttpError)
  })
})
