import { Flatten } from '../types/flatten'
import { setProperty } from './set-property'

export function reconstruct<E>(record: Flatten<E>): E {
  return Object.keys(record).reduce((e: any, key: any) => {
    return setProperty(key, (record as any)[key], e)
  }, {}) as any
}
