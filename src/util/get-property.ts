export function getProperty<Entity extends Record<string, any>>(key: string, entity: Entity) {
  return key.split('.').reduce((value, key) => value?.[key], entity ?? {})
}
