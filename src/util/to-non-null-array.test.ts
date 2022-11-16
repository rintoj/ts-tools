import { toNonNullArray } from './to-non-null-array'
describe('toNonNullArray', () => {
  it('should return a non null array', () => {
    expect(toNonNullArray([1, 2, 'x', null, undefined, 0])).toEqual([1, 2, 'x', 0])
  })
})
