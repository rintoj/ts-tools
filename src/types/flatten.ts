import { KeysOf } from './keys-of'
import { TypeOf } from './type-of'

export type Flatten<Entity> = {
  [K in KeysOf<Entity>]: TypeOf<Entity, K>
}
