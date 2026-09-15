'use client';

import { type ReactNode } from 'react';

interface FormState {
  message: string;
  [key: string]: any;
}

interface GenerationResultProps<T extends FormState> {
  state: T;
  render: (result: string) => ReactNode;
  initialIcon: ReactNode;
  initialMessage: string;
}

export function GenerationResult<T extends FormState>({
  state,
  render,
  initialIcon,
  initialMessage,
}: GenerationResultProps<T>) {
  const resultKey = Object.keys(state).find(
    (key) => key !== 'message' && key !== 'fields' && key !== 'issues'
  );
  const result = resultKey ? state[resultKey] : undefined;

  if (result) {
    return <>{render(result)}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      {initialIcon}
      <p className="mt-4 text-muted-foreground">{initialMessage}</p>
    </div>
  );
}
