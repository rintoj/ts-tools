import { AllRequired } from './all-required'
import { KeysOf } from './keys-of'

export type TypeOf<Entity, Key extends KeysOf<Entity>> = {
  [InnerKey in KeysOf<Entity>]-?: AllRequired<Entity>[InnerKey]
}[Key]
