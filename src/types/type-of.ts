import { AllRequired } from './all-required'
import { KeysOf } from './keys-of'

export type TypeOf<Entity, Key extends KeysOf<Entity>> = {
  [InnerKey in KeysOf<Entity>]-?: InnerKey extends keyof Entity
    ? AllRequired<Entity>[InnerKey]
    : InnerKey extends `${infer Prefix}.${infer Suffix}`
    ? Prefix extends keyof AllRequired<Entity>
      ? Suffix extends KeysOf<AllRequired<Entity>[Prefix]>
        ? TypeOf<AllRequired<Entity>[Prefix], Suffix>
        : never
      : never
    : never
}[Key]
