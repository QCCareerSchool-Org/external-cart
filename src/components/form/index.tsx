'use client';

import type { FC, PropsWithChildren, SubmitEventHandler } from 'react';
import { useActionState } from 'react';

import { action } from './action';
import { initialState } from './state';
import { useCartState } from '../cartState';

interface Props {
  countryCode: string;
}

const handleReset: SubmitEventHandler<HTMLFormElement> = e => {
  e.preventDefault();
};

export const Form: FC<PropsWithChildren<Props>> = ({ countryCode, children }) => {
  const [ cartState ] = useCartState();
  const [ state, dispatch, isPending ] = useActionState(action, initialState);

  return (
    <form action={dispatch} onReset={handleReset} className="space-y-6">
      <input type="hidden" name="countryCode" value={countryCode} />
      {children}
      <div className="rounded-[1.75rem] border border-[#d8c4a5] bg-[#fffaf1]/90 p-4 shadow-[0_16px_50px_rgba(69,43,24,0.10)] sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a84d2a]">Ready?</p>
          <p className="mt-1 text-sm font-semibold text-[#7a6249]">
            {cartState.selected.length === 0
              ? 'Select at least one course to continue.'
              : `${cartState.selected.length} course${cartState.selected.length === 1 ? '' : 's'} selected.`}
          </p>
          {state.error && (
            <p className="mt-3 rounded-2xl bg-[#e36537]/15 px-3 py-2 text-sm font-semibold text-[#9d3218]">
              {state.error}
            </p>
          )}
        </div>
        <button
          className="mt-4 w-full rounded-full bg-[#e36537] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(227,101,55,0.30)] transition hover:-translate-y-0.5 hover:bg-[#c84f28] disabled:cursor-not-allowed disabled:bg-[#c9ad87] disabled:shadow-none sm:mt-0 sm:w-auto"
          type="submit"
          disabled={cartState.selected.length === 0 || isPending}
        >
          {isPending ? 'Creating checkout' : 'Checkout'}
        </button>
      </div>
    </form>
  );
};
