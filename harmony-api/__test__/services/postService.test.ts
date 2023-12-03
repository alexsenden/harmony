import { HttpError } from '../../src/models/error/httpError'
import { Post, PostType } from '../../src/models/post'
import * as postService from '../../src/services/postService'
import { FAKE_POST } from '../testUtils/testData'

describe('validatePost', () => {
  it('throws an error if post is undefined', async () => {
    expect(() => {
      postService.validatePost(undefined)
    }).toThrow(HttpError)
  })

  it('throws an error if postType is undefined', async () => {
    expect(() => {
      postService.validatePost({
        ...FAKE_POST,
        postType: undefined,
      } as unknown as Post)
    }).toThrow(HttpError)
  })

  it('throws an error if some fields are missing', async () => {
    expect(() => {
      postService.validatePost({
        ...FAKE_POST,
        title: undefined,
        body: undefined,
      } as unknown as Post)
    }).toThrow(HttpError)
  })

  it('validates and returns discussion posts', async () => {
    const result = postService.validatePost({
      ...FAKE_POST,
      postType: PostType.DISCUSSION,
    })

    expect(result).toStrictEqual({
      ...FAKE_POST,
      postType: PostType.DISCUSSION,
    })
  })

  it('validates and returns poll posts', async () => {
    const result = postService.validatePost({
      ...FAKE_POST,
      postType: PostType.POLL,
    })

    expect(result).toStrictEqual({
      ...FAKE_POST,
      postType: PostType.POLL,
    })
  })

  it('validates and returns review posts', async () => {
    const result = postService.validatePost({
      ...FAKE_POST,
      postType: PostType.REVIEW,
    })

    expect(result).toStrictEqual({
      ...FAKE_POST,
      postType: PostType.REVIEW,
    })
  })
})

describe('validateUserId', () => {
  it('returns an error message if falsy', async () => {
    const result = postService.validateUserId({ ...FAKE_POST, userId: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = postService.validateUserId(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateTitle', () => {
  it('returns an error message if falsy', async () => {
    const result = postService.validateTitle({ ...FAKE_POST, title: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if greater than 150 characters', async () => {
    const result = postService.validateTitle({
      ...FAKE_POST,
      title: 'a'.repeat(151),
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = postService.validateTitle(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateBody', () => {
  it('returns an error message if falsy', async () => {
    const result = postService.validateBody({ ...FAKE_POST, body: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if greater than 2000 characters', async () => {
    const result = postService.validateBody({
      ...FAKE_POST,
      body: 'a'.repeat(2001),
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = postService.validateBody(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateRating', () => {
  it('returns an error message if not present', async () => {
    const result = postService.validateRating({
      ...FAKE_POST,
      rating: undefined,
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message rating > 5', async () => {
    const result = postService.validateRating({
      ...FAKE_POST,
      rating: 10,
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message rating < 0', async () => {
    const result = postService.validateRating({
      ...FAKE_POST,
      rating: -10,
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if a number', async () => {
    const result = postService.validateRating(FAKE_POST)
    expect(result).toStrictEqual([])
  })

  it('returns an an empty array if 0', async () => {
    const result = postService.validateRating({ ...FAKE_POST, rating: 0 })
    expect(result).toStrictEqual([])
  })
})

describe('validatePollOptions', () => {
  it('returns an error message if falsy', async () => {
    const result = postService.validatePollOptions({
      ...FAKE_POST,
      pollOptions: undefined,
    })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if option field is empty', async () => {
    const fakePost = {
      ...FAKE_POST,
      pollOptions: [{ ...FAKE_POST.pollOptions[0] }],
    }
    fakePost.pollOptions[0].option = ''

    const result = postService.validatePollOptions(fakePost)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if option field is greater than 100 characters', async () => {
    const fakePost = {
      ...FAKE_POST,
      pollOptions: [{ ...FAKE_POST.pollOptions[0] }],
    }
    fakePost.pollOptions[0].option = 'a'.repeat(101)

    const result = postService.validatePollOptions(fakePost)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = postService.validatePollOptions(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('getPostByUserId', () => {
  it('returns an an empty array if userId is undefined', async () => {
    const result = await postService.getPostsByUserId(0, undefined)
    expect(result).toStrictEqual([])
  })
})

describe('getPostById', () => {
  it('returns an an empty array if postId is undefined', async () => {
    expect(async () => {
      await postService.getPostById(undefined)
    }).rejects.toThrow(HttpError)
  })
})

describe('getPostsByArtistId', () => {
  it('returns an an empty array if artistId is undefined', async () => {
    const result = await postService.getPostsByArtistId(0, undefined)
    expect(result).toStrictEqual([])
  })
})

describe('getPostsByAlbumId', () => {
  it('returns an an empty array if albumId is undefined', async () => {
    const result = await postService.getPostsByAlbumId(0, undefined)
    expect(result).toStrictEqual([])
  })
})

describe('getPostsBySongId', () => {
  it('returns an an empty array if songId is undefined', async () => {
    const result = await postService.getPostsBySongId(0, undefined)
    expect(result).toStrictEqual([])
  })
})
