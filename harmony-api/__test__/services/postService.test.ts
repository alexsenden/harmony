import { HttpError } from '../../src/models/error/httpError'
import { Post } from '../../src/models/post'
import {
  validateBody,
  validatePollOptions,
  validatePost,
  validateRating,
  validateTitle,
  validateUserId,
} from '../../src/services/postService'
import { FAKE_POST } from '../testUtils/testData'

describe('validatePost', () => {
  it('returns an error message if postType is undefined', async () => {
    expect(() => {
      validatePost({
        ...FAKE_POST,
        postType: undefined,
      } as unknown as Post)
    }).toThrow(HttpError)
  })

  it('returns an error message if some fields are missing', async () => {
    expect(() => {
      validatePost({
        ...FAKE_POST,
        title: undefined,
        body: undefined,
      } as unknown as Post)
    }).toThrow(HttpError)
  })

  it('returns an an empty array if truthy', async () => {
    const result = validateUserId({ userId: 'test-user-id' } as Post)
    expect(result).toStrictEqual([])
  })
})

describe('validateUserId', () => {
  it('returns an error message if falsy', async () => {
    const result = validateUserId({ ...FAKE_POST, userId: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = validateUserId(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateTitle', () => {
  it('returns an error message if falsy', async () => {
    const result = validateTitle({ ...FAKE_POST, title: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = validateTitle(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateBody', () => {
  it('returns an error message if falsy', async () => {
    const result = validateBody({ ...FAKE_POST, body: '' })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = validateBody(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})

describe('validateRating', () => {
  it('returns an error message if not present', async () => {
    const result = validateRating({ ...FAKE_POST, rating: undefined })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if a number', async () => {
    const result = validateRating(FAKE_POST)
    expect(result).toStrictEqual([])
  })

  it('returns an an empty array if 0', async () => {
    const result = validateRating({ ...FAKE_POST, rating: 0 })
    expect(result).toStrictEqual([])
  })
})

describe('validatePollOptions', () => {
  it('returns an error message if falsy', async () => {
    const result = validatePollOptions({ ...FAKE_POST, pollOptions: undefined })
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an an empty array if truthy', async () => {
    const result = validatePollOptions(FAKE_POST)
    expect(result).toStrictEqual([])
  })
})
