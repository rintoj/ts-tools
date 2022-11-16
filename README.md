# ts-tools

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A set of tools to help development using TypeScript

## Install

### Yarn

```sh
yarn add @rintoj/ts-tools
```

### NPM

```sh
npm install @rintoj/ts-tools
```

## Types

### AllRequired<T>

```ts
import { AllRequired } from '@rintoj/ts-tools'

interface User {
  id: string
  name?: string
  age?: number
}

type UserRecord = AllRequired<User>

/* Will produce the following type
 * interface UserRecord {
 *   id: string
 *   name: string
 *   age: number
 * }
 */
```

### ById<T>

```ts
import { ById } from '@rintoj/ts-tools'

type UsersById = ById<User>

/* Will produce the following type
 * interface UsersById {
 *   [id: string]: User
 * }
 */
```

### ClassType<T>

```ts
import { ClassType } from '@rintoj/ts-tools'

function someFunction(var1: ClassType<Repository>) {
  // var1 will only accept classes that extends from "Repository" class
}
```

### Flatten<T>

```ts
import { Flatten } from '@rintoj/ts-tools'

interface User {
  id: string
  name?: string
  profile?: UserProfile
}

interface UserProfile {
  bio?: string
  age?: number
  picture?: URL
}

interface URL {
  url?: string
}

type FlattenedUser = Flatten<User>

/*
 * Will result in the following type
 *
 * interface FlattenedUser {
 *   id: string
 *   name?: string
 *   'profile.bio': string
 *   'profile.age': number
 *   'profile.picture.url': string
 * }
 */
```

### KeysOf<Entity, KeyType> & TypeOf<Entity, Key>

```ts
import { KeysOf, TypeOf } from '@rintoj/ts-tools'

interface User {
  id: string
  name?: string
  age?: number
  alias?: string[]
  roles?: UserRole[]
  limits?: number[]
  profile?: UserProfile
  login: { id: string; username: string }
}

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

interface UserProfile {
  bio?: string
  sampleRate?: number
  pictureURL?: { id?: string; depth?: number; sizes: number[]; url?: string }
}

const keyOf = <Key extends KeysOf<User>, Type extends TypeOf<User, Key>>(a: Key, b: Type) =>
  console.log(a, b)

keyOf('name', 'string') // correct
keyOf('name', 1) // incorrect
keyOf('name1', 'string') // incorrect

keyOf('profile.bio', 'string') // correct
keyOf('profile.bio', 1) // incorrect
keyOf('profile.bio1', 'string') // incorrect

keyOf('profile.sampleRate', 1) // correct
keyOf('profile.sampleRate', 'string') // incorrect
keyOf('profile.sampleRate1', 1) // incorrect

keyOf('profile.pictureURL.id', 'string') // correct
keyOf('profile.pictureURL.id', 1) // incorrect
keyOf('profile.pictureURL.id1', 'string') // incorrect

keyOf('profile.pictureURL.depth', 1) // correct
keyOf('profile.pictureURL.depth', 'string') // incorrect
keyOf('profile.pictureURL.depth1', 1) // incorrect

keyOf('profile.pictureURL.sizes', [1]) // correct
keyOf('profile.pictureURL.sizes', 1) // incorrect
keyOf('profile.pictureURL.sizes', ['string']) // incorrect
keyOf('profile.pictureURL.sizes1', [1]) // incorrect
```

### Primitive

```ts
type NonArrayPrimitive = boolean | number | string | Date | null

type ArrayPrimitive = Array<NonArrayPrimitive>

type Primitive = NonArrayPrimitive | ArrayPrimitive
```

## Utils

### deepClone(value: Array | Object)

Clone an array or object

### flatten(value: Array | Object)

```ts
import { flatten } from '@rintoj/ts-tools'

const result = flatten({ a: 'a', b: { c: [1, 2, 3], d: 'd' } })

/*
 * "result" will be :
 *
 * {
 *   'a': 'a',
 *   'b.d': 'd',
 *   'b.c.0': 1,
 *   'b.c.1': 2,
 *   'b.c.2': 3,
 * }
 *
 */
```

### getProperty(key: string, entity: Object)

```ts
import { getProperty } from '@rintoj/ts-tools'

const object = {
  a: 'A',
  b: 1,
  c: {
    d: {
      e: 'E',
      f: 2,
      h: [1, 2],
    },
    g: 'G',
  },
}

getProperty('c.d.e', object) // will return 'E'
getProperty('c.d.h', object) // will return [1, 2]
getProperty('3.2.1', [0, 1, 2, [1, 2, [4, 5, 6]], 4] as const) // will return 5
```

### isDefined<T>(value: T | null | undefined)

```ts
import { isDefined } from '@rintoj/ts-tools'

const result = [1, 2, 'x', null, undefined, 0].filter(isDefined)
// result = [1, 2, 'x', 0]
```

### reconstruct<E>(record: Flatten<E>): E

```ts
import { reconstruct } from '@rintoj/ts-tools'

const result = reconstruct({ a: 'a', 'b.d': 'd', 'b.c.0': 1, 'b.c.1': 2, 'b.c.2': 3 })
// result = { a: 'a', b: { c: [1, 2, 3], d: 'd' } }
```

### setProperty(key: any, value: any, entity: Object)

```ts
import { setProperty } from '@rintoj/ts-tools'

setProperty('a.b', 'B') // { a: { b: 'B' }
setProperty('a.b', 'B', { a: { c: 'C' }, z: 1 }) // { a: { b: 'B', c: 'C' }, z: 1 }
```

### toByProperty<T>(array: T[], property: keyof T = 'id' as any)

```ts
import { toByProperty } from '@rintoj/ts-tools'

const array = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
]

toByProperty(array)
// {
//   1: { id: 1, name: 'User 1' },
//   2: { id: 2, name: 'User 2' },
//   3: { id: 3, name: 'User 3' },
// })

toByProperty(array, 'name')
// {
//   'User 1': { id: 1, name: 'User 1' },
//   'User 2': { id: 2, name: 'User 2' },
//   'User 3': { id: 3, name: 'User 3' },
// }
```

### toNonNullArray<T>(array: Array<T | undefined | null>): T[]

```ts
import { toNonNullArray } from '@rintoj/ts-tools'

toNonNullArray([1, 2, 'x', null, undefined, 0]) // [1, 2, 'x', 0]
```

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
