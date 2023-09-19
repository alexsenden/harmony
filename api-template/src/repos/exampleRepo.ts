import { Example } from '../models/example'

export const getExample = async (echo?: string): Promise<Example> => {
  return { echo }
}
