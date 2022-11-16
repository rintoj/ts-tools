import { setProperty } from './set-property'

export function reconstruct<E>(record: Record<string, any>): E {
  return Object.keys(record).reduce((e: any, key: any) => {
    return setProperty(key, (record as any)[key], e)
  }, {}) as any
}
