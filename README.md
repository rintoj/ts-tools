# tsds-tools

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**tsds-tools** is a collection of TypeScript tools designed to enhance the development process.

## Installation

### Yarn

```sh
yarn add tsds-tools
```

### NPM

```sh
npm install tsds-tools
```

## Types

### AllRequired\<T>

Ensures all optional properties in a type are required.

```typescript
import { AllRequired } from 'tsds-tools'

interface User {
  id: string
  name?: string
  age?: number
}

type UserRecord = AllRequired<User>
/* Produces:
 * interface UserRecord {
 *   id: string;
 *   name: string;
 *   age: number;
 * }
 */
```

### ById\<T>

Creates a type where keys are IDs and values are objects of type T.

```typescript
import { ById } from 'tsds-tools'

type UsersById = ById<User>
/* Produces:
 * interface UsersById {
 *   [id: string]: User;
 * }
 */
```

### ClassType\<T>

Specifies that a variable only accepts classes that extend from the specified class.

```typescript
import { ClassType } from 'tsds-tools'

function someFunction(var1: ClassType<Repository>) {
  // var1 only accepts classes that extend from the "Repository" class
}
```

### Flatten\<T>

Flattens a nested type structure by converting nested properties into flat, dotted notation.

```typescript
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
/* Produces:
 * interface FlattenedUser {
 *   id: string;
 *   name?: string;
 *   'profile.bio': string;
 *   'profile.age': number;
 *   'profile.picture.url': string;
 * }
 */
```

### InferredType\<Entity, Key>

Infers the type of a specific property within an entity.

```typescript
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

### KeysOf\<Entity, Type = any>

Returns keys of an entity based on the specified type.

```typescript
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

### KeysOfNonPrimitives\<Entity, Type = any>

Returns keys of an entity that have non-primitive types.

```typescript
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

### TypeOf\<Entity, Key>

Extracts the type of a specific property within an entity.

```typescript
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

Defines types that are either non-array primitives or array primitives.

```typescript
type NonArrayPrimitive = boolean | number | string | Date | null

type ArrayPrimitive = Array<NonArrayPrimitive>

type Primitive = NonArrayPrimitive | ArrayPrimitive
```

## Utils

### deepClone(value: Array | Object)

Creates a deep clone of an array or object.

### flatten(value: Array | Object)

Flattens an array or object into a one-dimensional object with dotted notation keys.

```typescript
import { flatten } from 'tsds-tools'

const result = flatten({ a: 'a', b: { c: [1, 2, 3], d: 'd' } })
/*
 * "result" will be :
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

### filterAsync(items: T[], callback: (item: T, index: number) => Promise<boolean>)

Asynchronously filters an array based on a provided callback function.

```typescript
import { filterAsync } from 'tsds-tools';

const result = await filterAsync(array, async callback(i) => true);
```

### mapAsync(items: T[], callback: (item: T, index: number) => Promise<T>)

Asynchronously maps an array based on a provided callback function.

```typescript
import { mapAsync } from 'tsds-tools';

const result = await mapAsync(array, async callback(i) => Promise.resolve(/* value */));
```

### flatMapAsync(items: T[], callback: (item: T, index: number) => Promise<T>)

Asynchronously performs a flatMap operation on an array based on a provided callback function.

```typescript
import { flatMapAsync } from 'tsds-tools';

const result = await flatMapAsync(array, async callback(i) => Promise.resolve(/* value */));
```

### reduceAsync(items: T[], callback: (accumulator: O, item: T, index: number) => Promise<O>)

Asynchronously reduces an array based on a provided callback function.

```typescript
import { reduceAsync } from 'tsds-tools';

const reducedValue = await reduceAsync(array, async callback(accumulator, i) => Promise.resolve(accumulator + i));
```

### getProperty(key: string, entity: Object)

Retrieves a nested property value from an object using a dot-separated key.

```typescript
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

getProperty('c.d.e', object) // returns 'E'
getProperty('c.d.h', object) // returns [1, 2]
getProperty('3.2.1', [0, 1, 2, [1, 2, [4, 5, 6]], 4] as const) // returns 5
```

### isDefined\<T>(value: T | null | undefined)

Filters out null and undefined values from an array.

```typescript
import { isDefined } from 'tsds-tools'

const result = [1, 2, 'x', null, undefined, 0].filter(isDefined)
// result = [1, 2, 'x', 0]
```

### reconstruct\<E>(record: Flatten<E>)

Reconstructs an object from its flattened representation.

```typescript
import { reconstruct } from 'tsds-tools'

const result = reconstruct({ a: 'a', 'b.d': 'd', 'b.c.0': 1, 'b.c.1': 2, 'b.c.2': 3 })
// result = { a: 'a', b: { c: [1, 2, 3], d: 'd' } }
```

### removeNullKeys\<E, O>(record: Flatten<E>, prefix?: string)

Removes keys with null values from a flattened object.

```typescript
import { removeNullKeys } from 'tsds-tools'

const result = removeNullKeys({
  id: '1',
  value: 0,
  key1: [
    {
      key1: 'key1',
      key2: undefined,
    },
    {
      key1: null,
      key2: 'key2',
    },
  ],
  key2: undefined,
  other: 'other',
})
// result = {
//   id: '1',
//   value: 0,
//   key1: [{ key1: 'key1' }, { key2: 'key2' }],
//   other: 'other',
// }
```

### setProperty(key: any, value: any, entity: Object)

Sets a nested property value in an object using a dot-separated key.

```typescript
import { setProperty } from 'tsds-tools'

setProperty('a.b', 'B') // returns { a: { b: 'B' } }
setProperty('a.b', 'B', { a: { c: 'C' }, z: 1 }) // returns { a: { b: 'B', c: 'C' }, z: 1 }
```

### toByProperty\<T>(array: T[], property: keyof T = 'id' as any)

Converts an array of objects into an object where keys are values of a specified property.

```typescript
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
```

### toArrayByProperty\<T>(array: T[], property: keyof T = 'id' as any)

Converts an array of objects into an object where keys are values of a specified property, and
values are arrays of objects.

```typescript
import { toArrayByProperty } from 'tsds-tools'

const array = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 1' },
  { id: 3, name: 'User 3' },
]

toArrayByProperty(array, 'name')
// {
//   'User 1': [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 1' }],
//   'User 3': [{ id: 3, name: 'User 3' }],
// }
```

### toNonNullArray\<T>(array: Array<T | undefined | null>)

Filters out null and undefined values from an array.

```typescript
import { toNonNullArray } from 'tsds-tools'

toNonNullArray([1, 2, 'x', null, undefined, 0]) // returns [1, 2, 'x', 0]
```

## Automatic Release

The table below shows the release types based on commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
