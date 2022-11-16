import { isDefined } from './is-defined'

describe('isDefined', () => {
  it('should return a non null array', () => {
    expect([1, 2, 'x', null, undefined, 0].filter(isDefined)).toEqual([1, 2, 'x', 0])
  })
})
