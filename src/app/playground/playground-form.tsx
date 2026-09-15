'use client';
import { playgroundAction } from './actions';
import { useActionState, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  PenSquare,
  SpellCheck,
  WandSparkles,
  Save,
  Download,
  Loader2,
  FileDown,
  ArrowLeft,
  CheckCheck,
} from 'lucide-react';
import { TONES, PURPOSES } from '@/lib/constants';
import { useUser, useFirestore, useAppState } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { LoadingIndicator } from '@/components/loading-indicator';
import { SubmitButton } from '@/components/submit-button';
import { Document, Packer, Paragraph } from 'docx';
import PptxGenJS from 'pptxgenjs';
import ReactMarkdown from 'react-markdown';

const initialState: {
  message: string;
  result?: string;
  fields?: Record<string, string>;
  issues?: string[];
  action?: string;
} = {
  message: '',
  result: '',
  fields: {},
  issues: [],
  action: '',
};

function ActionForm({
  action,
  handleAction,
  children,
  isDisabled,
}: {
  action: string;
  handleAction: (formData: FormData) => void;
  children: React.ReactNode;
  isDisabled: boolean;
}) {
  return (
    <form action={handleAction} className="flex">
      <input type="hidden" name="action" value={action} />
      <SubmitButton disabled={isDisabled} className="btn-grad">
        {children}
      </SubmitButton>
    </form>
  );
}

export default function PlaygroundForm() {
  const [state, formAction] = useActionState(playgroundAction, initialState);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [originalContent, setOriginalContent] = useState('');

  const { language } = useAppState();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [purpose, setPurpose] = useState('essay');
  const [content, setContent] = useState('');

  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (state.action) { // An action has completed
      if (state.message === 'success' && state.result) {
        setContent(state.result);
        toast({
          title: 'Success!',
          description: `Content has been ${state.action}ed.`,
        });
      } else if (state.message && state.message !== 'success') {
        const description = state.issues?.length
          ? state.issues.join(', ')
          : state.message;
        toast({
          variant: 'destructive',
          title: 'Error',
          description,
        });
        // If there was an error, revert the diff view
        setShowDiff(false);
      }
      setPendingAction(null); // Clear pending state
    }
  }, [state, toast]);

  const handleFormAction = (formData: FormData) => {
    const action = formData.get('action') as string;
    if (action === 'style' || action === 'correct-grammar') {
      setOriginalContent(content);
      setShowDiff(true);
    } else {
      setShowDiff(false);
    }

    setPendingAction(action);

    // Append all necessary fields to the form data
    formData.set('topic', topic);
    formData.set('tone', tone);
    formData.set('purpose', purpose);
    formData.set('content', content);
    formData.set('language', language);

    formAction(formData);
  };

  const handleSave = async () => {
    if (!content) {
      toast({ variant: 'destructive', title: 'Nothing to save' });
      return;
    }
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in to save' });
      return;
    }
    setIsSaving(true);
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'draftHistories'), {
        topic: topic || 'Untitled Playground Draft',
        content,
        language,
        type: 'Playground',
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: 'Success', description: 'Draft saved successfully.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error saving', description: String(error) });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async (format: 'txt' | 'pdf' | 'docx' | 'pptx') => {
    if (!content) {
      toast({ variant: 'destructive', title: 'Nothing to export' });
      return;
    }
    
    const fileName = topic || 'playground';

    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({ text: content }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'pptx') {
      const pptx = new PptxGenJS();
      const slide = pptx.addSlide();
      slide.addText(content, { x: 1, y: 1, w: '80%', h: '80%' });
      const blob = await pptx.write('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`<html><head><title>${fileName}</title></head><body><pre>${content}</pre></body></html>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const getLoadingMessage = (action: string | null) => {
    switch (action) {
      case 'outline': return 'Generating Outline...';
      case 'draft': return 'Creating Draft...';
      case 'grammar': return 'Checking Grammar...';
      case 'style': return 'Improving Style...';
      case 'correct-grammar': return 'Correcting Grammar...';
      default: return 'Generating Content...';
    }
  };

  const anyActionPending = pendingAction !== null;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-card">
        <div className="flex-1 min-w-[200px] space-y-1">
          <label htmlFor="topic" className="text-sm font-medium">Topic</label>
          <Input id="topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter your topic..." disabled={anyActionPending} />
        </div>
        <div className="space-y-1">
          <label htmlFor="tone" className="text-sm font-medium">Tone</label>
          <Select name="tone" value={tone} onValueChange={setTone} disabled={anyActionPending}>
            <SelectTrigger id="tone" className="w-[180px]"><SelectValue placeholder="Select tone" /></SelectTrigger>
            <SelectContent>{TONES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="purpose" className="text-sm font-medium">Purpose</label>
          <Select name="purpose" value={purpose} onValueChange={setPurpose} disabled={anyActionPending}>
            <SelectTrigger id="purpose" className="w-[180px]"><SelectValue placeholder="Select purpose" /></SelectTrigger>
            <SelectContent>{PURPOSES.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {showDiff ? (
          <Button onClick={() => setShowDiff(false)} disabled={anyActionPending} className="btn-grad">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
          </Button>
        ) : (
          <>
            <ActionForm action="outline" handleAction={handleFormAction} isDisabled={anyActionPending}>
              <FileText className="mr-2 h-4 w-4" /> Generate Outline
            </ActionForm>
            <ActionForm action="draft" handleAction={handleFormAction} isDisabled={anyActionPending}>
              <PenSquare className="mr-2 h-4 w-4" /> Create Draft
            </ActionForm>
            <ActionForm action="grammar" handleAction={handleFormAction} isDisabled={anyActionPending}>
              <SpellCheck className="mr-2 h-4 w-4" /> Check Grammar
            </ActionForm>
             <ActionForm action="correct-grammar" handleAction={handleFormAction} isDisabled={anyActionPending}>
              <CheckCheck className="mr-2 h-4 w-4" /> Correct Grammar
            </ActionForm>
            <ActionForm action="style" handleAction={handleFormAction} isDisabled={anyActionPending}>
              <WandSparkles className="mr-2 h-4 w-4" /> Improve Style
            </ActionForm>
          </>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          <Button type="button" onClick={handleSave} disabled={anyActionPending || isSaving} className="btn-grad">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={anyActionPending || isSaving} className="btn-grad">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('txt')}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as .txt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as .pdf
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as .docx
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pptx')}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as .pptx
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        {anyActionPending && <LoadingIndicator text={getLoadingMessage(pendingAction)} />}
        {showDiff ? (
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">Before</h3>
              <Textarea
                value={originalContent}
                readOnly
                className="flex-1 w-full h-full text-base resize-none bg-card"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">After</h3>
              {state.action === 'style' ? (
                <div className="prose dark:prose-invert flex-1 w-full h-full text-base resize-none rounded-md border p-4 bg-card">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <Textarea
                  value={content}
                  readOnly
                  className="flex-1 w-full h-full text-base resize-none bg-card"
                />
              )}
            </div>
          </div>
        ) : (
          <Textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your content here, or use the AI tools above to generate an outline or draft..."
            className={`flex-1 w-full h-full text-base resize-none ${anyActionPending ? 'filter blur-sm' : ''}`}
            disabled={anyActionPending}
          />
        )}
        <div className="text-sm text-muted-foreground p-2 text-right">
          {content.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
    </div>
  );
}
