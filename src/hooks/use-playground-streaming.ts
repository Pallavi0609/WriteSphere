import {useState} from 'react';
import {z} from 'zod';
import {playgroundFormSchema} from '@/lib/schemas';

export function usePlaygroundStreaming() {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (values: z.infer<typeof playgroundFormSchema>) => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const response = await fetch('/api/playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const {done, value} = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        setOutput(prev => prev + chunk);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {output, isLoading, error, generate};
}
