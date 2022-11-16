import { Flatten } from '../types/flatten'
export function flatten<Entity extends Record<string, any>>(
  entity: Entity,
  prefix?: string,
): Flatten<Entity> {
  return Object.keys(entity).reduce((obj, key) => {
    const value = entity[key]
    const nextPrefix = [prefix, key].filter(i => !!i).join('.')
    if (value !== null && typeof value === 'object') {
      return { ...obj, ...flatten(value, nextPrefix) }
    }
    return { ...obj, [nextPrefix]: value }
  }, {}) as any
}
