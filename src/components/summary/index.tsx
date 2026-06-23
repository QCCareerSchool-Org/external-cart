'use client';

import { FC } from "react";
import { useCartState } from "../cartState";

export const Summary: FC = () => {
  const cartState = useCartState();

  return (
    <pre>
      {JSON.stringify(cartState, null, ' ')}
    </pre>
  );
}