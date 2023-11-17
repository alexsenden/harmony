import * as artistRepo from '../../src/repos/artistRepo'

describe('getArtistTopicByPartialName', () => {
  it('responds with an array of artists whose names are prefixed by a certain string', async () => {
    const ARTIST_PARTIAL_NAME = 'Ta'
    const ARTIST_FULL_NAME = 'Taylor Swift'
    const ARTIST_ID = 3

    const result =
      await artistRepo.getArtistTopicByPartialName(ARTIST_PARTIAL_NAME)

    expect(result).toEqual([
      {
        topicId: {
          artistId: ARTIST_ID,
        },
        name: ARTIST_FULL_NAME,
      },
    ])
  })
})

describe('getAlbumById', () => {
  it('responds with the artist with the specified albumId', async () => {
    const ARTIST_ID = 3

    const result = await artistRepo.getArtistById(ARTIST_ID)

    expect(result).toEqual({
      artistId: ARTIST_ID,
      artistName: 'Taylor Swift',
      beginYear: null,
      end: null,
      artistDescription: null,
    })
  })
})
