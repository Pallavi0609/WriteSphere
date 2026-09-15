
'use client';

import { useActionState, useEffect } from 'react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';
import { Terminal, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from './actions';

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const initialState: FormState = {
  message: '',
};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
        if (state.message === 'success') {
            toast({
                title: 'Message Sent!',
                description: 'Thanks for reaching out. We\'ll get back to you soon.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }
  }, [state, toast]);


  return (
    <form action={formAction} className="grid gap-6">
        {state.issues && (
            <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5">
                {state.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                ))}
                </ul>
            </AlertDescription>
            </Alert>
        )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Enter the subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[150px]" required />
      </div>
      <SubmitButton className="btn-grad">
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </SubmitButton>
    </form>
  );
}
