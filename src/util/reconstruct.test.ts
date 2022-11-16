import { reconstruct } from './reconstruct'
describe('reconstruct', () => {
  it('should reconstruct an object from flattened form', () => {
    expect(
      reconstruct({
        a: 'a',
        'b.c': 'c',
        'b.d': 'd',
      }),
    ).toEqual({ a: 'a', b: { c: 'c', d: 'd' } })
  })
  it('should reconstruct a flattened an array', () => {
    const result = reconstruct({ a: 'a', 'b.d': 'd', 'b.c.0': 1, 'b.c.1': 2, 'b.c.2': 3 })
    expect(result).toEqual({
      a: 'a',
      b: { c: [1, 2, 3], d: 'd' },
    })
  })
  it('should reconstruct a flattened null value', () => {
    expect(
      reconstruct({
        a: 'a',
        'b.d': 'd',
        'b.z': null,
      }),
    ).toEqual({ a: 'a', b: { d: 'd', z: null } })
  })
})
