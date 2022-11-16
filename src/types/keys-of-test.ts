import { KeysOf } from './keys-of'
import { Primitive } from './primitive'

interface User {
  id: string
  name?: string
  age?: number
  alias?: string[]
  limits?: number[]
  profile?: UserProfile
}

interface UserProfile {
  bio?: string
}

type NumberKeys = KeysOf<User, number> // "age"
type NumberArrayKeys = KeysOf<User, number[]> // "limits"
type StringKeys = KeysOf<User, string> // "id" | "name"
type StringArrayKeys = KeysOf<User, string[]> // "alias"
type AllPrimitiveTypes = KeysOf<User, Primitive> // "id" | "name" | "age" | "alias" | "limits"
type AllArrayKeys = KeysOf<User, any[]> // "alias" | "limits"
type AllKeys = KeysOf<User> // "id" | "name" | "age" | "alias" | "limits" | "profile"

const x:
  | NumberKeys
  | NumberArrayKeys
  | StringKeys
  | StringArrayKeys
  | AllPrimitiveTypes
  | AllArrayKeys
  | AllKeys
  | undefined = undefined

console.log(x)
