import { KeysOf } from '../types/keys-of'

export function getProperty<Entity extends Record<string, any>, Type>(
  key: KeysOf<Entity, Type>,
  entity: Entity,
) {
  return key.split('.').reduce((value, key) => value?.[key], entity ?? {})
}
