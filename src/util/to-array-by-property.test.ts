import { toArrayByProperty } from './to-array-by-property'
describe('toArrayByProperty', () => {
  test('should return an array by id', () => {
    const array = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
    ]
    expect(toArrayByProperty(array)).toEqual({
      1: [{ id: 1, name: 'User 1' }],
      2: [{ id: 2, name: 'User 2' }],
      3: [{ id: 3, name: 'User 3' }],
    })
  })
  test('should return an object by a given property', () => {
    const array = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 1' },
      { id: 3, name: 'User 3' },
    ]
    expect(toArrayByProperty(array, 'name')).toEqual({
      'User 1': [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 1' },
      ],
      'User 3': [{ id: 3, name: 'User 3' }],
    })
  })
})
