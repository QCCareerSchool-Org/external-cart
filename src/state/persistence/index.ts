import type { CartState } from '..';

export interface CartStatePersistence {
  load: () => CartState | null;
  save: (state: CartState) => void;
}
