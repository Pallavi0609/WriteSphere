'use client';

import { Loader2 } from 'lucide-react';

export function LoadingIndicator({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-card p-6 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg font-semibold text-card-foreground">
          {text}
        </span>
      </div>
    </div>
  );
}
