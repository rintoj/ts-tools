export type AllRequired<Entity> = { [Key in keyof Entity]-?: Entity[Key] }
