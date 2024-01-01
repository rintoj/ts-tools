import { filterAsync, flatMapAsync, mapAsync, reduceAsync } from './array-async'

describe('array-async-utils', () => {
  test('filterAsync: should filter items using a function that returns a Promise', async () => {
    const array = [1, 2, 3, 4, 5]
    const result = await filterAsync(array, async i => Promise.resolve(i > 3))
    expect(result).toEqual([4, 5])
  })

  test('mapAsync: should map items using a function that returns a Promise', async () => {
    const array = [1, 2, 3, 4, 5]
    const result = await mapAsync(array, async i => Promise.resolve(i * 10))
    expect(result).toEqual([10, 20, 30, 40, 50])
  })

  test('flatMapAsync: should flat map items using a function that returns a Promise', async () => {
    const array = [
      [1, 2, 3],
      [4, 5],
    ]
    const result = await flatMapAsync(array, async i => Promise.resolve(i * 10))
    expect(result).toEqual([10, 20, 30, 40, 50])
  })

  test('reduceAsync: should reduce items using a function that returns a Promise', async () => {
    const array = [1, 2, 3, 4, 5]
    const result = await reduceAsync(array, async (a, i) => Promise.resolve(a + i), 0)
    expect(result).toEqual(15)
  })
})
