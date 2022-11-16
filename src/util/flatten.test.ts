import { flatten } from './flatten'

describe('flatten', () => {
  it('should flatten an object', () => {
    expect(flatten({ a: 'a', b: { c: 'c', d: 'd' } })).toEqual({
      a: 'a',
      'b.c': 'c',
      'b.d': 'd',
    })
  })
  it('should flatten an array', () => {
    expect(flatten({ a: 'a', b: { c: [1, 2, 3], d: 'd' } })).toEqual({
      a: 'a',
      'b.d': 'd',
      'b.c.0': 1,
      'b.c.1': 2,
      'b.c.2': 3,
    })
  })
  it('should flatten null value', () => {
    const result = flatten({ a: 'a', b: { d: 'd', z: null } })
    expect(result).toEqual({
      a: 'a',
      'b.d': 'd',
      'b.z': null,
    })
  })
})
