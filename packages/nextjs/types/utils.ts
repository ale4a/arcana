export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export interface StrategyData {
  name: string;
  protocol: string;
  apy: string;
  amount: string;
}
