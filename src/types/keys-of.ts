import { AllRequired } from './all-required'
import { Primitive } from './primitive'

export type KeysOfPrimitives<Entity, Type> = {
  [Key in keyof Entity]-?: AllRequired<Entity>[Key] extends Type
    ? AllRequired<Entity>[Key] extends Primitive
      ? Key extends string
        ? Key
        : never
      : never
    : never
}[keyof Entity]

export type KeysOfNonPrimitives<Entity, Type> = {
  [Key in keyof Entity]-?: AllRequired<Entity>[Key] extends Primitive
    ? never
    : Key extends string
    ? `${Key}.${KeysOf<AllRequired<Entity>[Key], Type>}`
    : never
}[keyof Entity]

export type KeysOf<Entity, Type = any> =
  | KeysOfPrimitives<Entity, Type>
  | KeysOfNonPrimitives<Entity, Type>
