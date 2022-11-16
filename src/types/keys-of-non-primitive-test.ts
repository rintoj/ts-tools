import { KeysOfNonPrimitives } from './keys-of-non-primitive'

interface User {
  id: string
  name?: string
  age?: number
  alias?: string[]
  limits?: number[]
  profile?: UserProfile
  otherProfiles?: UserProfile[]
}

interface UserProfile {
  bio?: string
}

type Keys = KeysOfNonPrimitives<User> //  "profile" | "otherProfiles"

const x: Keys | undefined = undefined
console.log(x)
