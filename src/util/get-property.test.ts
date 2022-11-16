import { getProperty } from './get-property'

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

describe('getProperty', () => {
  it('should return a value by key', () => {
    expect(getProperty('a', object)).toEqual('A')
  })
  it('should return an inner value by key', () => {
    expect(getProperty('c.d.e', object)).toEqual('E')
  })
  it('should return an inner array by key', () => {
    expect(getProperty('c.d.h', object)).toEqual([1, 2])
  })
  it('should return value from an array', () => {
    expect(getProperty('3.2.1', [0, 1, 2, [1, 2, [4, 5, 6]], 4] as const)).toEqual(5)
  })
  it('should return undefined if not found', () => {
    expect(getProperty('c.d.h1' as any, object)).toBeUndefined()
  })
  it('should return undefined if object is undefined', () => {
    expect(getProperty('c.d.h', undefined as any)).toBeUndefined()
  })
  it('should return undefined if object is null', () => {
    expect(getProperty('c.d.h', null as any)).toBeUndefined()
  })
  it('should return undefined if object is an array', () => {
    expect(getProperty('c.d.h', [] as any)).toBeUndefined()
  })
})
