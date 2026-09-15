'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SubmitButton } from '@/components/submit-button';
import { useToast } from '@/hooks/use-toast';
import { LANGUAGES, TONES, PURPOSES } from '@/lib/constants';
import { generateOutlineAction } from './actions';
import { FileText, Terminal } from 'lucide-react';
import { GenerationResult } from '@/components/generation-result';
import { GenerationActions } from '@/components/generation-actions';
import { useAppState } from '@/firebase';
import { LoadingIndicator } from '@/components/loading-indicator';

export type FormState = {
  message: string;
  outline?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const initialState: FormState = {
  message: '',
};

export function OutlineForm() {
  const [state, formAction] = useActionState(
    generateOutlineAction,
    initialState
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { language: appLanguage } = useAppState();

  const [topic, setTopic] = useState(state.fields?.topic || '');
  const [tone, setTone] = useState(state.fields?.tone || 'academic');
  const [purpose, setPurpose] = useState(state.fields?.purpose || 'essay');
  const [wordLimit, setWordLimit] = useState(
    state.fields?.wordLimit || '2000'
  );
  const [language, setLanguage] = useState(
    state.fields?.language || appLanguage
  );

  const handleFormAction = (formData: FormData) => {
    setLoading(true);
    formAction(formData);
  };

  useEffect(() => {
    setLanguage(appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    if (state.message) {
      setLoading(false);
    }
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    if (state.message === 'success') {
      toast({
        title: 'Success!',
        description: 'Your outline has been generated.',
      });
      if (state.fields) {
        setTopic(state.fields.topic || '');
        setTone(state.fields.tone || 'academic');
        setPurpose(state.fields.purpose || 'essay');
        setWordLimit(state.fields.wordLimit || '2000');
        setLanguage(state.fields.language || appLanguage);
      }
    }
  }, [state, toast, appLanguage]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={handleFormAction}>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Outline Details</CardTitle>
            <CardDescription>
              Provide the requirements for your outline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., The history of the internet"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select name="tone" value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wordLimit">Word Limit</Label>
                <Input
                  id="wordLimit"
                  name="wordLimit"
                  type="number"
                  placeholder="e.g., 2000"
                  value={wordLimit}
                  onChange={(e) => setWordLimit(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select name="purpose" value={purpose} onValueChange={setPurpose}>
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {PURPOSES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                name="language"
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                  <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SubmitButton className="w-full btn-grad">Generate Outline</SubmitButton>
          </CardContent>
        </Card>
      </form>

      <Card className="shadow-sm h-fit relative">
        {loading && <LoadingIndicator />}
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="font-headline">Generated Outline</CardTitle>
            <CardDescription>
              Here is the AI-generated structure for your content.
            </CardDescription>
          </div>
          {state.outline && (
            <GenerationActions
              textToCopy={state.outline}
              fileName={state.fields?.topic || 'outline'}
            />
          )}
        </CardHeader>
        <CardContent className="overflow-auto min-h-[450px]">
          <GenerationResult
            state={state}
            render={(outline) => (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: outline.replace(/\n/g, '<br />'),
                }}
              />
            )}
            initialIcon={
              <FileText className="h-16 w-16 text-muted-foreground/50" />
            }
            initialMessage="Your generated outline will appear here."
          />
        </CardContent>
      </Card>
    </div>
  );
}
