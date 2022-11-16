import { setProperty } from './set-property'

describe('setProperty', () => {
  it('should generate a value in an object', () => {
    expect(setProperty('a', 'A')).toEqual({ a: 'A' })
  })
  it('should generate a value in an inner object', () => {
    expect(setProperty('a.b', 'B')).toEqual({ a: { b: 'B' } })
  })
  it('should generate a value without touching other parts of the object', () => {
    expect(setProperty('a.b', 'B', { a: { c: 'C' }, z: 1 })).toEqual({
      a: { b: 'B', c: 'C' },
      z: 1,
    })
  })
  it('should not touch original object', () => {
    const original = { a: { c: 'C' }, z: 1 }
    expect(setProperty('a.b', 'B', original)).toEqual({
      a: { b: 'B', c: 'C' },
      z: 1,
    })
    expect(original).toEqual({ a: { c: 'C' }, z: 1 })
  })
  it('should generate a value by replacing a primitive value', () => {
    expect(setProperty('a.b', 'B', { a: 1, z: 1 })).toEqual({ a: { b: 'B' }, z: 1 })
  })
  it('should generate a value by replacing a null value', () => {
    expect(setProperty('a.b', 'B', { a: null, z: 1 })).toEqual({ a: { b: 'B' }, z: 1 })
  })
  it('should generate a object value', () => {
    expect(setProperty('a.b', { x: 10 }, { a: 1, z: 1 })).toEqual({ a: { b: { x: 10 } }, z: 1 })
  })
})
