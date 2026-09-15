
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  PenSquare,
  SpellCheck,
  WandSparkles,
  Lightbulb,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { writingPrompts } from '@/lib/prompts';

const quickActions = [
  {
    title: 'Playground',
    description: 'A unified space for all your writing tasks.',
    href: '/playground',
    icon: WandSparkles,
  },
  {
    title: 'New Outline',
    description: 'Generate a structured outline for your essay or article.',
    href: '/outline',
    icon: FileText,
  },
  {
    title: 'New Draft',
    description: 'Create a complete draft based on your topic and tone.',
    href: '/draft',
    icon: PenSquare,
  },
  {
    title: 'Grammar Check',
    description: 'Proofread and enhance your existing text.',
    href: '/grammar-check',
    icon: SpellCheck,
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // Select a random prompt on the client side to avoid hydration mismatch
    setPrompt(writingPrompts[Math.floor(Math.random() * writingPrompts.length)]);
  }, []);
  
  const getFirstName = () => {
    if (!user?.displayName) return 'there';
    return user.displayName.split(' ')[0];
  }


  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Welcome back, {getFirstName()}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Ready to craft your next masterpiece? Let's get writing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className="group hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium font-headline">
                {action.title}
              </CardTitle>
              <action.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
              <Button asChild className="mt-4 btn-grad">
                <Link href={action.href}>
                  Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary"/>
                Writing Prompt of the Day
            </CardTitle>
            <CardDescription>
                Use this prompt to spark your creativity.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {prompt ? (
              <>
                <blockquote className="border-l-2 pl-6 italic text-lg">
                  &quot;{prompt}&quot;
                </blockquote>
                <Button asChild className="mt-4 btn-grad">
                  <Link href={`/playground?prompt=${encodeURIComponent(prompt)}`}>
                    Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <div className="h-10 animate-pulse bg-muted rounded-md" />
            )}
        </CardContent>
      </Card>
    </div>
  );
}
