import { ById } from '../types'

export function toArrayByProperty<T extends Record<string, any>>(
  fields: T[],
  property: keyof T = 'id',
): ById<T[]> {
  return fields.reduce(
    (a: ById<T[]>, field) => ({
      ...a,
      [field[property]]: [...(a[field[property]] ?? []), field],
    }),
    {},
  )
}
