import { TopicId } from '../../src/models/topic'
import { validateTopicId } from '../../src/services/topicService'

describe('validateUserId', () => {
  it('returns an error message if topicId is undefined', async () => {
    const result = validateTopicId(undefined as unknown as TopicId)
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an error message if no Ids are defined', async () => {
    const result = validateTopicId({})
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns an empty array if just artistId is defined', async () => {
    const result = validateTopicId({ artistId: 'fake-artist-id' })
    expect(result).toStrictEqual([])
  })

  it('returns an empty array if just songId is defined', async () => {
    const result = validateTopicId({ songId: 'fake-song-id' })
    expect(result).toStrictEqual([])
  })

  it('returns an empty array if just albumId is defined', async () => {
    const result = validateTopicId({ albumId: 'fake-album-id' })
    expect(result).toStrictEqual([])
  })

  it('returns an error message if multiple Ids are defined', async () => {
    const result = validateTopicId({
      albumId: 'fake-album-id',
      songId: 'fake-song-id',
    })
    expect(result.length).toBeGreaterThan(0)
  })
})
