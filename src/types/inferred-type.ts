import { AllRequired } from './all-required'

export type InferredType<
  Entity,
  Key extends keyof AllRequired<Entity>,
> = AllRequired<Entity>[Key] extends (infer U)[] ? U : AllRequired<Entity>[Key]
