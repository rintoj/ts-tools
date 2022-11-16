# tsds-tools

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A set of tools to help development using TypeScript

## Install

### Yarn

```sh
yarn add tsds-tools
```

### NPM

```sh
npm install tsds-tools
```

## Types

### AllRequired<T>

```ts
import { AllRequired } from 'tsds-tools'

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
import { ById } from 'tsds-tools'

type UsersById = ById<User>

/* Will produce the following type
 * interface UsersById {
 *   [id: string]: User
 * }
 */
```

### ClassType<T>

```ts
import { ClassType } from 'tsds-tools'

function someFunction(var1: ClassType<Repository>) {
  // var1 will only accept classes that extends from "Repository" class
}
```

### Flatten<T>

```ts
import { Flatten } from 'tsds-tools'

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

### InferredType<Entity, Key>

```ts
import { InferredType } from 'tsds-tools'

interface User {
  id: string
  roles?: number[]
  tags?: string[]
}

type Type1 = InferredType<User, 'id'> // string
type Type2 = InferredType<User, 'roles'> // number
type Type3 = InferredType<User, 'tags'> // string
```

### KeysOf<Entity, Type = any>

Returns keyof Entity of type Type if provided

```ts
import { KeysOf, Primitive } from 'tsds-tools'

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
```

### KeysOfNonPrimitives<Entity, Type = any>

Returns keyof Entity of non primitive type

```ts
import { KeysOfNonPrimitives } from 'tsds-tools'

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

type Keys = KeysOfNonPrimitives<User> // "profile"
type NumberArrayKeys = KeysOf<User, number[]> // "limits"
type StringKeys = KeysOf<User, string> // "id" | "name"
type StringArrayKeys = KeysOf<User, string[]> // "alias"
type AllPrimitiveTypes = KeysOf<User, Primitive> // "id" | "name" | "age" | "alias" | "limits"
type AllArrayKeys = KeysOf<User, any[]> // "alias" | "limits"
type AllKeys = KeysOf<User> // "id" | "name" | "age" | "alias" | "limits" | "profile"
```

### TypeOf<Entity, Key>

```ts
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
import { flatten } from 'tsds-tools'

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
import { getProperty } from 'tsds-tools'

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
import { isDefined } from 'tsds-tools'

const result = [1, 2, 'x', null, undefined, 0].filter(isDefined)
// result = [1, 2, 'x', 0]
```

### reconstruct<E>(record: Flatten<E>): E

```ts
import { reconstruct } from 'tsds-tools'

const result = reconstruct({ a: 'a', 'b.d': 'd', 'b.c.0': 1, 'b.c.1': 2, 'b.c.2': 3 })
// result = { a: 'a', b: { c: [1, 2, 3], d: 'd' } }
```

### setProperty(key: any, value: any, entity: Object)

```ts
import { setProperty } from 'tsds-tools'

setProperty('a.b', 'B') // { a: { b: 'B' }
setProperty('a.b', 'B', { a: { c: 'C' }, z: 1 }) // { a: { b: 'B', c: 'C' }, z: 1 }
```

### toByProperty<T>(array: T[], property: keyof T = 'id' as any)

```ts
import { toByProperty } from 'tsds-tools'

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
import { toNonNullArray } from 'tsds-tools'

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
