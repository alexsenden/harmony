import { Request, Response, NextFunction } from 'express'

import * as topicService from '../../../src/services/topicService'
import * as topicController from '../../../src/controllers/topic/topicController'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('getTopicByPartialName', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest
      .spyOn(topicService, 'getTopicByPartialName')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await topicController.getTopicByPartialName(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getTopicOrUserByPartialName', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest
      .spyOn(topicService, 'getTopicOrUserByPartialName')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await topicController.getTopicOrUserByPartialName(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getArtistById', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(topicService, 'getArtistById').mockImplementationOnce(() => {
      throw new Error()
    })

    await topicController.getArtistById(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getSongById', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(topicService, 'getSongById').mockImplementationOnce(() => {
      throw new Error()
    })

    await topicController.getSongById(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getAlbumById', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(topicService, 'getAlbumById').mockImplementationOnce(() => {
      throw new Error()
    })

    await topicController.getAlbumById(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
