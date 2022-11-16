import { isDefined } from './is-defined'

export function toNonNullArray<T>(array: Array<T | undefined | null>): T[] {
  return array.filter(isDefined) as T[]
}
