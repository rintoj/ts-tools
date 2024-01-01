import { toNonNullArray } from './to-non-null-array'

export async function filterAsync<T extends any | undefined | null>(
  items: T[] | undefined,
  callback: (item: T, index: number) => Promise<boolean | undefined>,
): Promise<T[]> {
  if (!items?.length) return []
  const results: Array<T> = []
  for (let index = 0; index < items.length; index++) {
    if (await callback(items[index], index)) {
      results.push(items[index])
    }
  }
  return toNonNullArray(results)
}

export async function mapAsync<T extends any | undefined | null, O extends any | undefined | null>(
  items: T[] | undefined,
  callback: (item: T, index: number) => Promise<O>,
): Promise<O[]> {
  if (!items?.length) return []
  const results: Array<O> = []
  for (let index = 0; index < items.length; index++) {
    results.push(await callback(items[index], index))
  }
  return toNonNullArray(results)
}

export async function flatMapAsync<
  T extends any | undefined | null,
  O extends any | undefined | null,
>(items: Array<T[]> | undefined, callback: (item: T, index: number) => Promise<O>): Promise<O[]>
export async function flatMapAsync<
  T extends any | undefined | null,
  O extends any | undefined | null,
>(items: Array<T[]> | undefined, callback: (item: T, index: number) => Promise<O>): Promise<O[]> {
  if (!items?.length) return []
  let results: Array<O> = []
  const flatArray = items.flatMap(i => i)
  for (let index = 0; index < flatArray.length; index++) {
    results = results.concat(await callback(flatArray[index], index))
  }
  return toNonNullArray(results)
}

export async function reduceAsync<
  T extends any | undefined | null,
  A extends any | undefined | null,
>(
  items: T[] | undefined,
  callback: (accumulator: A, item: T, index: number) => Promise<A>,
  initialValue?: A,
): Promise<A> {
  if (!items?.length) return initialValue as A
  let accumulator = initialValue ?? (items[0] as any as A)
  for (let index = 0; index < items.length; index++) {
    accumulator = await callback(accumulator, items[index], index)
  }
  return accumulator
}
