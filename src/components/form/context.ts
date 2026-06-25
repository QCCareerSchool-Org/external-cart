'use client';

import { createContext, useContext } from 'react';

import type { State } from './state';

interface FormContext {
  isPending: boolean;
  state: State;
}

const formContext = createContext<FormContext | undefined>(undefined);

export const FormContextProvider = formContext.Provider;

export const useFormContext = (): FormContext => {
  const context = useContext(formContext);
  if (!context) {
    throw Error('useFormContext must be used within Form');
  }

  return context;
};
