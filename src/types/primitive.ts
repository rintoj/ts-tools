export type NonArrayPrimitive = boolean | number | string | Date | null

export type ArrayPrimitive = Array<NonArrayPrimitive>

export type Primitive = NonArrayPrimitive | ArrayPrimitive
