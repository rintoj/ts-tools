import { TypeOf } from './type-of'

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

type Type1 = TypeOf<User, 'age'> // number
type Type2 = TypeOf<User, 'name'> // string
type Type3 = TypeOf<User, 'alias'> // string[]
type Type4 = TypeOf<User, 'profile'> // UserProfile

console.log('' as Type1 | Type2 | Type3 | Type4)
