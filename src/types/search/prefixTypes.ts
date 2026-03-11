export type Prefix =
  | 'duck'
  | 'brave'
  | 'g'
  | 'r'
  | 'y'
  | 'gi'
  | 'bi'
  | 'gh'
  | 'wol'
  | 'npkg'
  | 'nop';

export type PrefixHandlerFn = (query: string) => string | undefined;

export type PrefixHandlerMap = Record<Prefix, PrefixHandlerFn>;