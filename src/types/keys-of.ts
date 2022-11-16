import { AllRequired } from './all-required'

export type KeysOf<Entity, Type = any> = {
  [Key in keyof Entity]-?: AllRequired<Entity>[Key] extends Type
    ? Key extends string
      ? Key
      : never
    : never
}[keyof Entity]
