import prisma from '../../prisma/prisma'
import {
  FAKE_ALBUM,
  FAKE_ARTIST,
  FAKE_LIKE,
  FAKE_POLL_OPTION,
  FAKE_POST,
  FAKE_SONG,
  FAKE_USER_1,
} from '../testUtils/testData'
import * as postRepo from '../../src/repos/postRepo'

describe('createPost', () => {
  it('Returns empty string or undefined for null fields', async () => {
    jest.spyOn(prisma.post, 'create').mockResolvedValueOnce({
      ...FAKE_POST,
      content: null,
      rating: null,
      artistId: null,
      albumId: null,
      songId: null,
    })

    const result = await postRepo.createPost(FAKE_POST)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pollOptions, ...expected } = FAKE_POST
    expect(result).toStrictEqual({
      ...expected,
      body: '',
      rating: undefined,
      topicId: {
        artistId: undefined,
        albumId: undefined,
        songId: undefined,
      },
    })
  })
})

describe('mapPrismaPostToPost', () => {
  it('Returns empty string or undefined for null fields', async () => {
    const result = postRepo.mapPrismaPostToPost({
      ...FAKE_POST,
      content: null,
      song: null,
      songId: null,
      album: null,
      albumId: null,
      artist: null,
      artistId: null,
      user: FAKE_USER_1,
      likes: [FAKE_LIKE],
      _count: {
        comments: 0,
        likes: 0,
      },
      rating: null,
    })

    expect(result).toStrictEqual({
      body: undefined,
      createdAt: FAKE_POST.createdAt,
      isLiked: true,
      isVoted: false,
      numComments: 0,
      numLikes: 0,
      numVotes: 0,
      pollOptions: [
        {
          entryNumber: 0,
          option: FAKE_POLL_OPTION.option,
          pollOptionId: FAKE_POLL_OPTION.pollOptionId,
          postId: FAKE_POLL_OPTION.postId,
          votedOn: false,
          votes: 0,
        },
      ],
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: undefined,
      title: FAKE_POST.title,
      topicId: {
        albumId: undefined,
        artistId: undefined,
        songId: undefined,
      },
      topicName: undefined,
      user: {
        active: true,
        bio: FAKE_USER_1.bio,
        createdAt: FAKE_USER_1.createdAt,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        password: FAKE_USER_1.password,
        picture: FAKE_USER_1.picture,
        userId: FAKE_USER_1.userId,
        username: FAKE_USER_1.username,
      },
      userId: FAKE_POST.userId,
    })
  })

  it('Returns empty string or undefined for null fields with a song', async () => {
    const result = postRepo.mapPrismaPostToPost({
      ...FAKE_POST,
      content: null,
      song: FAKE_SONG,
      songId: null,
      album: null,
      albumId: null,
      artist: null,
      artistId: null,
      user: FAKE_USER_1,
      likes: [FAKE_LIKE],
      _count: {
        comments: 0,
        likes: 0,
      },
      rating: null,
    })

    expect(result).toStrictEqual({
      body: undefined,
      createdAt: FAKE_POST.createdAt,
      isLiked: true,
      isVoted: false,
      numComments: 0,
      numLikes: 0,
      numVotes: 0,
      pollOptions: [
        {
          entryNumber: 0,
          option: FAKE_POLL_OPTION.option,
          pollOptionId: FAKE_POLL_OPTION.pollOptionId,
          postId: FAKE_POLL_OPTION.postId,
          votedOn: false,
          votes: 0,
        },
      ],
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: undefined,
      title: FAKE_POST.title,
      topicId: {
        albumId: undefined,
        artistId: undefined,
        songId: undefined,
      },
      topicName: FAKE_SONG.songName,
      user: {
        active: true,
        bio: FAKE_USER_1.bio,
        createdAt: FAKE_USER_1.createdAt,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        password: FAKE_USER_1.password,
        picture: FAKE_USER_1.picture,
        userId: FAKE_USER_1.userId,
        username: FAKE_USER_1.username,
      },
      userId: FAKE_POST.userId,
    })
  })

  it('Returns empty string or undefined for null fields with an album', async () => {
    const result = postRepo.mapPrismaPostToPost({
      ...FAKE_POST,
      content: null,
      song: null,
      songId: null,
      album: FAKE_ALBUM,
      albumId: null,
      artist: null,
      artistId: null,
      user: FAKE_USER_1,
      likes: [FAKE_LIKE],
      _count: {
        comments: 0,
        likes: 0,
      },
      rating: null,
    })

    expect(result).toStrictEqual({
      body: undefined,
      createdAt: FAKE_POST.createdAt,
      isLiked: true,
      isVoted: false,
      numComments: 0,
      numLikes: 0,
      numVotes: 0,
      pollOptions: [
        {
          entryNumber: 0,
          option: FAKE_POLL_OPTION.option,
          pollOptionId: FAKE_POLL_OPTION.pollOptionId,
          postId: FAKE_POLL_OPTION.postId,
          votedOn: false,
          votes: 0,
        },
      ],
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: undefined,
      title: FAKE_POST.title,
      topicId: {
        albumId: undefined,
        artistId: undefined,
        songId: undefined,
      },
      topicName: FAKE_ALBUM.albumName,
      user: {
        active: true,
        bio: FAKE_USER_1.bio,
        createdAt: FAKE_USER_1.createdAt,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        password: FAKE_USER_1.password,
        picture: FAKE_USER_1.picture,
        userId: FAKE_USER_1.userId,
        username: FAKE_USER_1.username,
      },
      userId: FAKE_POST.userId,
    })
  })

  it('Returns empty string or undefined for null fields with an artist', async () => {
    const result = postRepo.mapPrismaPostToPost({
      ...FAKE_POST,
      content: null,
      song: null,
      songId: null,
      album: null,
      albumId: null,
      artist: FAKE_ARTIST,
      artistId: null,
      user: FAKE_USER_1,
      likes: [FAKE_LIKE],
      _count: {
        comments: 0,
        likes: 0,
      },
      rating: null,
    })

    expect(result).toStrictEqual({
      body: undefined,
      createdAt: FAKE_POST.createdAt,
      isLiked: true,
      isVoted: false,
      numComments: 0,
      numLikes: 0,
      numVotes: 0,
      pollOptions: [
        {
          entryNumber: 0,
          option: FAKE_POLL_OPTION.option,
          pollOptionId: FAKE_POLL_OPTION.pollOptionId,
          postId: FAKE_POLL_OPTION.postId,
          votedOn: false,
          votes: 0,
        },
      ],
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: undefined,
      title: FAKE_POST.title,
      topicId: {
        albumId: undefined,
        artistId: undefined,
        songId: undefined,
      },
      topicName: FAKE_ARTIST.artistName,
      user: {
        active: true,
        bio: FAKE_USER_1.bio,
        createdAt: FAKE_USER_1.createdAt,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        password: FAKE_USER_1.password,
        picture: FAKE_USER_1.picture,
        userId: FAKE_USER_1.userId,
        username: FAKE_USER_1.username,
      },
      userId: FAKE_POST.userId,
    })
  })
})

describe('sumPollVotes', () => {
  it('Sums the number of poll votes', async () => {
    const result = postRepo.sumPollVotes([
      {
        pollOptionId: FAKE_POLL_OPTION.pollOptionId,
        option: FAKE_POLL_OPTION.option,
        entryNumber: FAKE_POLL_OPTION.entryNumber,
        postId: FAKE_POLL_OPTION.postId,
        _count: {
          pollVotes: 1,
        },
      },
    ])

    expect(result).toBe(1)
  })

  it('Sums the number of poll votes', async () => {
    const result = postRepo.sumPollVotes([
      {
        pollOptionId: FAKE_POLL_OPTION.pollOptionId,
        option: FAKE_POLL_OPTION.option,
        entryNumber: FAKE_POLL_OPTION.entryNumber,
        postId: FAKE_POLL_OPTION.postId,
      },
    ])

    expect(result).toBe(0)
  })
})
