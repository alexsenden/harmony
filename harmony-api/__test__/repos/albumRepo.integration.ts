import * as albumRepo from '../../src/repos/albumRepo'

describe('getAlbumTopicByPartialName', () => {
  it('responds with an array of albums whose names are prefixed by a certain string', async () => {
    const ALBUM_PARTIAL_NAME = 'Gra'
    const ALBUM_FULL_NAME = 'Graduation'
    const ALBUM_ID = 5

    const result =
      await albumRepo.getAlbumTopicByPartialName(ALBUM_PARTIAL_NAME)

    expect(result).toEqual([
      {
        topicId: {
          albumId: ALBUM_ID,
        },
        name: ALBUM_FULL_NAME,
      },
    ])
  })
})

describe('getAlbumById', () => {
  it('responds with the album with the specified albumId', async () => {
    const ALBUM_ID = 5

    const result = await albumRepo.getAlbumById(ALBUM_ID)

    expect(result).toEqual({
      albumId: ALBUM_ID,
      albumName: 'Graduation',
      albumDescription: null,
      releaseGroupType: null,
      artistCreditId: 1,
    })
  })
})
