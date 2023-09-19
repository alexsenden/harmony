import { Request, Response } from 'express'

import * as exampleService from '../../services/exampleService'

export const get = async (req: Request, res: Response) => {
  const echo = typeof req.query.echo === 'string' ? req.query.echo : undefined

  res.json(await exampleService.getExample(echo))
}
