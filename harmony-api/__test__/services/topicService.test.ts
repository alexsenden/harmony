import { TopicId } from '../../src/models/topic'
import * as topicService from '../../src/services/topicService'

describe('validateUserId', () => {
  it('returns an error message if topicId is undefined', async () => {
    const result = topicService.validateTopicId(undefined as unknown as TopicId)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if no Ids are defined', async () => {
    const result = topicService.validateTopicId({})
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an empty array if just artistId is defined', async () => {
    const result = topicService.validateTopicId({ artistId: 1000 })
    expect(result).toStrictEqual([])
  })

  it('returns an empty array if just songId is defined', async () => {
    const result = topicService.validateTopicId({ songId: 2000 })
    expect(result).toStrictEqual([])
  })

  it('returns an empty array if just albumId is defined', async () => {
    const result = topicService.validateTopicId({ albumId: 3000 })
    expect(result).toStrictEqual([])
  })

  it('returns an error message if multiple Ids are defined', async () => {
    const result = topicService.validateTopicId({
      albumId: 3000,
      songId: 2000,
    })
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getTopicByPartialName', () => {
  it('returns empty array if postId is undefined', async () => {
    const result = await topicService.getTopicByPartialName(undefined)
    expect(result).toStrictEqual([])
  })
})

describe('getTopicOrUserByPartialName', () => {
  it('returns empty array if postId is undefined', async () => {
    const result = await topicService.getTopicOrUserByPartialName(undefined)
    expect(result).toStrictEqual([])
  })
})
