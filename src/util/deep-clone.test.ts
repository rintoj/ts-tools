import { deepClone } from './deep-clone'

describe('deepClone', () => {
  it('should clone', () => {
    const input = { a: 'a', b: { c: 'c', d: 'd' } }
    const output = JSON.parse(JSON.stringify(input))
    const result = deepClone(input)
    expect(result).toEqual(output)
    expect(input).not.toBe(result)
  })
})
