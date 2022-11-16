import { InferredType } from './inferred-type'

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

type Type1 = InferredType<User, 'profile'> // UserProfile
type Type2 = InferredType<User, 'otherProfiles'> // UserProfile

console.log('' as Type1 | Type2)
