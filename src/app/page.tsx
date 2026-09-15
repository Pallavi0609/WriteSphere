import Link from 'next/link';
import {
  FileText,
  PenSquare,
  WandSparkles,
  CheckSquare,
  BrainCircuit,
  Zap,
  BookCheck,
  Package,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: FileText,
    title: 'Generate Outlines',
    description:
      'Get structured outlines for your essays and articles instantly. Organize your thoughts before you write.',
  },
  {
    icon: PenSquare,
    title: 'Create Drafts',
    description:
      'Generate complete drafts based on your topic and requirements. Save hours of writing time.',
  },
  {
    icon: CheckSquare,
    title: 'Check Grammar',
    description:
      'Catch grammar mistakes, spelling errors, and punctuation issues with advanced AI checking.',
  },
  {
    icon: WandSparkles,
    title: 'Improve Style',
    description:
      'Enhance your writing style, tone, and clarity. Make your content more engaging and professional.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Enter Your Topic',
    description:
      'Start by entering your essay or article topic. Specify your tone, purpose, and any requirements.',
  },
  {
    step: 2,
    title: 'AI Generates Content',
    description:
      'Our AI analyzes your requirements and generates outlines, drafts, or improvements in real-time.',
  },
  {
    step: 3,
    title: 'Refine & Export',
    description:
      "Edit your content, save drafts, and export to PDF or Word when you're ready to submit.",
  },
];

const whyChooseUs = [
  {
    icon: BrainCircuit,
    title: 'Contextual Intelligence',
    description:
      'Our AI does more than just write—it understands your purpose and tone, ensuring the generated content aligns perfectly with your goals.',
  },
  {
    icon: Link2,
    title: 'Seamless Workflow Integration',
    description:
      'Move from outline to draft to final polish without switching contexts. Our integrated tools support your entire writing process in one place.',
  },
  {
    icon: BookCheck,
    title: 'Focus on Skill-Building',
    description:
      'We provide explanations and suggestions that help you understand the reasoning behind changes, making you a better writer over time.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Badge variant="outline" className="py-1 px-3">
                <WandSparkles className="h-4 w-4 mr-2 gradient-text" />
                Powered by Advanced AI
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Write Better Essays & Articles with WriteSphere
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Generate outlines, create drafts, check grammar, and improve
                your writing style. Your intelligent writing companion that
                understands your tone and purpose.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button asChild size="lg" className="btn-grad">
                  <Link href="/signup">Start Writing Now</Link>
                </Button>
                <Button asChild size="lg" className="btn-grad">
                  <Link href="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  Everything You Need to Write Better
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful AI features designed to enhance your writing process
                  from start to finish.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="flex-row items-center gap-2">
                    <feature.icon className="w-6 h-6 gradient-text" />
                    <CardTitle className="text-lg font-bold font-headline">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, powerful workflow to transform your writing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:grid-cols-3 lg:gap-12 mt-12">
              {howItWorks.map((step) => (
                <div key={step.step} className="grid gap-4 relative">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-12 w-12 text-xl font-bold font-headline">
                      {step.step}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold font-headline">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Why Choose WriteSphere?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    More than just a writing tool - it&apos;s your intelligent
                    companion that understands context, tone, and purpose to
                    help you create exceptional content.
                  </p>
                </div>
                <ul className="grid gap-4">
                  {whyChooseUs.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <item.icon className="h-5 w-5 gradient-text" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-headline">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Zap className="h-8 w-8 gradient-text" />
                  <div>
                    <p className="text-3xl font-bold font-headline">10x</p>
                    <p className="text-muted-foreground">Faster Writing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CheckSquare className="h-8 w-8 gradient-text" />
                  <div>
                    <p className="text-3xl font-bold font-headline">95%</p>
                    <p className="text-muted-foreground">Grammar Accuracy</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 gradient-text" />
                  <div>
                    <p className="text-3xl font-bold font-headline">1000+</p>
                    <p className="text-muted-foreground">Essays Generated</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Ready to Transform Your Writing?
              </h2>
              <p className="mt-4 max-w-xl mx-auto">
                Join thousands of writers using AI to create better content
                faster.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="btn-grad">
                  <Link href="/signup">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
