'use client';

import type { FC, PropsWithChildren, SyntheticEvent } from 'react';
import { useActionState } from 'react';

import { action } from './action';
import { FormContextProvider } from './context';
import { initialState } from './state';

interface Props {
  countryCode: string;
}

const handleReset = (e: SyntheticEvent<HTMLFormElement>): void => {
  e.preventDefault();
};

export const Form: FC<PropsWithChildren<Props>> = ({ countryCode, children }) => {
  const [ state, dispatch, isPending ] = useActionState(action, initialState);

  return (
    <form action={dispatch} onReset={handleReset} className="flex flex-col gap-6">
      <input type="hidden" name="countryCode" value={countryCode} />
      <FormContextProvider value={{ isPending, state }}>
        {children}
      </FormContextProvider>
    </form>
  );
};
