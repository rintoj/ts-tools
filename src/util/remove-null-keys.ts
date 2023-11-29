import { flatten } from './flatten'
import { reconstruct } from './reconstruct'

export function removeNullKeys<
  Input extends Record<string, any>,
  Output extends Record<string, any>,
>(input: Input, prefix?: string): Output {
  const flattened = flatten(input, prefix)
  return reconstruct(
    Object.keys(flattened)
      .filter(key => flattened[key] != null)
      .reduce((a, i) => ({ ...a, [i]: flattened[i] }), {}),
  )
}
