export type JunkOption = ((x: string) => boolean);

export type OpcodeName = 'insert' | 'delete' | 'replace' | 'equal' | ''

export type OpcodeOperation = [OpcodeName, number, number, number, number]