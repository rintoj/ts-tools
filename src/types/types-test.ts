// import { KeysOf } from './keys-of'
// import { TypeOf } from './type-of'

// interface User {
//   id: string
//   name?: string
//   age?: number
//   alias?: string[]
//   roles?: UserRole[]
//   limits?: number[]
//   profile?: UserProfile
//   login: { id: string; username: string }
// }

// enum UserRole {
//   USER = 'USER',
//   ADMIN = 'ADMIN',
// }

// interface UserProfile {
//   bio?: string
//   sampleRate?: number
//   pictureURL?: { id?: string; depth?: number; sizes: number[]; url?: string }
// }

// const keyOf = <Key extends KeysOf<User>, Type extends TypeOf<User, Key>>(a: Key, b: Type) =>
//   console.log(a, b)

// keyOf('name', 'string') // correct
// keyOf('name', 1) // incorrect
// keyOf('name1', 'string') // incorrect

// keyOf('profile.bio', 'string') // correct
// keyOf('profile.bio', 1) // incorrect
// keyOf('profile.bio1', 'string') // incorrect

// keyOf('profile.sampleRate', 1) // correct
// keyOf('profile.sampleRate', 'string') // incorrect
// keyOf('profile.sampleRate1', 1) // incorrect

// keyOf('profile.pictureURL.id', 'string') // correct
// keyOf('profile.pictureURL.id', 1) // incorrect
// keyOf('profile.pictureURL.id1', 'string') // incorrect

// keyOf('profile.pictureURL.depth', 1) // correct
// keyOf('profile.pictureURL.depth', 'string') // incorrect
// keyOf('profile.pictureURL.depth1', 1) // incorrect

// keyOf('profile.pictureURL.sizes', [1]) // correct
// keyOf('profile.pictureURL.sizes', 1) // incorrect
// keyOf('profile.pictureURL.sizes', ['string']) // incorrect
// keyOf('profile.pictureURL.sizes1', [1]) // incorrect
