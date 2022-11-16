export function deepClone<Entity extends Record<string, any>>(entity: Entity | Array<any>): Entity {
  const record: any = entity
  const isArray = record instanceof Array
  const clone: any = isArray ? [] : {}
  for (const property of Object.keys(record)) {
    const key = isArray ? parseInt(property) : property
    if (record[key] instanceof Array) {
      clone[key] = deepClone(record[key])
    } else if (record[key] !== null && typeof record[key] === 'object') {
      clone[key] = deepClone(record[key])
    } else {
      clone[key] = record[key]
    }
  }
  return clone
}
