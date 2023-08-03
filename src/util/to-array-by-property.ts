import { AllRequired, ById } from '../types'

export function toByProperty<T>(array: T[], property: keyof AllRequired<T> = 'id' as any) {
  return array?.reduce((a, value) => {
    a[value[property] as any] = value
    return a
  }, {} as ById<T>)
}

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
