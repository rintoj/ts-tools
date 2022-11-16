import { AllRequired, ById } from '../types'

export function toByProperty<T>(array: T[], property: keyof AllRequired<T> = 'id' as any) {
  return array?.reduce((a, value) => {
    a[value[property] as any] = value
    return a
  }, {} as ById<T>)
}
