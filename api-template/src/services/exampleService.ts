import * as exampleRepo from '../repos/exampleRepo'
import { Example } from '../models/example'

export const getExample = async (echo?: string): Promise<Example> => {
  return exampleRepo.getExample(echo)
}
