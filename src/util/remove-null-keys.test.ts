import { removeNullKeys } from './remove-null-keys'

describe('removeNullKeys', () => {
  test('should remove all the keys that has null or undefined', () => {
    const output = removeNullKeys({
      id: '1',
      value: 0,
      key1: null,
      key2: undefined,
      other: 'other',
    })
    expect(output).toEqual({
      id: '1',
      value: 0,
      other: 'other',
    })
  })

  test('should remove all the keys that has null or undefined recursively', () => {
    const output = removeNullKeys({
      id: '1',
      value: 0,
      key1: {
        key1: null,
        key2: 'key2',
      },
      key2: undefined,
      other: 'other',
    })
    expect(output).toEqual({
      id: '1',
      value: 0,
      key1: {
        key2: 'key2',
      },
      other: 'other',
    })
  })

  test('should remove all the keys that has null or undefined with in array', () => {
    const output = removeNullKeys({
      id: '1',
      value: 0,
      key1: [1, 2, 0, null, 3],
      key2: undefined,
      other: 'other',
    })
    expect(output).toEqual({
      id: '1',
      value: 0,
      key1: [1, 2, 0, undefined, 3],
      other: 'other',
    })
  })

  test('should remove all the keys that has null or undefined with in array recursively', () => {
    const output = removeNullKeys({
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
    expect(output).toEqual({
      id: '1',
      value: 0,
      key1: [{ key1: 'key1' }, { key2: 'key2' }],
      other: 'other',
    })
  })
})
