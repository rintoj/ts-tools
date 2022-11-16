import { deepClone } from './deep-clone'

export function setProperty<Entity extends Record<string, any>>(
  key: any,
  value: any,
  entity: Entity = {} as any,
) {
  const keys = key.split('.')
  const clone = deepClone(entity)
  keys.reduce((object: any, key: any, index: number) => {
    const nextKey = isNaN(parseInt(keys[index + 1])) ? keys[index + 1] : parseInt(keys[index + 1])
    if (index === keys.length - 1) object[key] = value
    else if (object[key] === null || typeof object[key] !== 'object') {
      object[key] = typeof nextKey === 'number' ? [] : {}
    }
    return object[key]
  }, clone)
  return clone
}
