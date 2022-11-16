import { InferredType } from './inferred-type'
import { Primitive } from './primitive'

export type KeysOfNonPrimitives<Entity> = {
  [Key in keyof Entity]-?: InferredType<Entity, Key> extends Primitive
    ? never
    : Key extends string
    ? Key
    : never
}[keyof Entity]
