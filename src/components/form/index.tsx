'use client';

import type { FC, PropsWithChildren, SyntheticEvent } from 'react';
import { useActionState } from 'react';

import { Card } from '../card';
import { action } from './action';
import { initialState } from './state';
import { useCartState } from '../cartState';
import { SectionEyebrow } from '../sectionEyebrow';

interface Props {
  countryCode: string;
}

const handleReset = (e: SyntheticEvent<HTMLFormElement>): void => {
  e.preventDefault();
};

export const Form: FC<PropsWithChildren<Props>> = ({ countryCode, children }) => {
  const [ cartState ] = useCartState();
  const [ state, dispatch, isPending ] = useActionState(action, initialState);

  return (
    <form action={dispatch} onReset={handleReset} className="flex flex-col gap-6">
      <input type="hidden" name="countryCode" value={countryCode} />
      {children}
      <Card variant="cta" className="sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div>
          <SectionEyebrow tone="light">Ready?</SectionEyebrow>
          <p className="mt-1 text-sm font-semibold text-muted">
            {cartState.selected.length === 0
              ? 'Select at least one course to continue.'
              : `${cartState.selected.length} course${cartState.selected.length === 1 ? '' : 's'} selected.`}
          </p>
          {state.error && (
            <p className="mt-3 rounded-2xl bg-accent-muted px-3 py-2 text-sm font-semibold text-accent">
              {state.error}
            </p>
          )}
        </div>
        <button className="mt-4 w-full rounded-full bg-accent px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-foreground-inverse shadow transition hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:bg-border disabled:shadow-none sm:mt-0 sm:w-auto" type="submit" disabled={cartState.selected.length === 0 || isPending}>
          {isPending ? 'Creating checkout' : 'Checkout'}
        </button>
      </Card>
    </form>
  );
};
