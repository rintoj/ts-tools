export function flatten<Entity extends Record<string, any>>(
  entity: Entity,
  prefix?: string,
): Record<string, any> {
  return Object.keys(entity).reduce((obj, key) => {
    const value = entity[key]
    const nextPrefix = [prefix, key].filter(i => !!i).join('.')
    if (value !== null && typeof value === 'object') {
      return { ...obj, ...flatten(value, nextPrefix) }
    }
    return { ...obj, [nextPrefix]: value }
  }, {}) as any
}
