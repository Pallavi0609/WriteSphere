
import { BrainCircuit, Zap, Eye, Target, CheckCircle2, PencilRuler, Bot, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const howItWorks = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Analysis',
    description: 'Our AI analyzes your topic, tone, and purpose to generate contextually relevant content that matches your requirements.',
  },
  {
    icon: Zap,
    title: 'Real-Time Generation',
    description: 'Get instant results with our real-time AI processing. No waiting, no delays - just immediate, high-quality suggestions.',
  },
  {
    icon: Eye,
    title: 'Contextual Understanding',
    description: 'Our AI understands context, tone, and writing style to provide suggestions that fit your specific needs and audience.',
  },
]

const usageSteps = [
    {
      step: 1,
      icon: PencilRuler,
      title: 'Enter Your Topic',
      description: 'Start by entering your essay or article topic. Specify your tone, purpose, and any requirements.',
    },
    {
      step: 2,
      icon: Bot,
      title: 'AI Generates Content',
      description: 'Our AI analyzes your requirements and generates outlines, drafts, or improvements in real-time.',
    },
    {
      step: 3,
      icon: FileCheck,
      title: 'Refine & Export',
      description: "Edit your content, save drafts, and export to PDF or Word when you're ready to submit.",
    },
  ];

const missionPoints = [
    'Empower users to articulate their thoughts clearly and effectively.',
    'Reduce the time and effort required to produce high-quality written content.',
    'Provide a seamless and intuitive writing experience.',
    'Continuously innovate and improve our AI to meet evolving user needs.',
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                About WriteSphere
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                WriteSphere is an intelligent writing assistant powered by advanced AI technology. We help writers, students, and professionals create better content faster by providing real-time suggestions, grammar checking, and style improvements.
              </p>
            </div>
          </div>
        </section>
        
        <section id="how-to-use" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  How to Use WriteSphere
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple, powerful workflow to transform your writing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:grid-cols-3 lg:gap-12 mt-12">
              {usageSteps.map((step) => (
                <div key={step.step} className="grid gap-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-16 w-16">
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-headline">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  How WriteSphere Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform uses advanced natural language processing to understand your writing needs and provide intelligent assistance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              {howItWorks.map((feature, index) => (
                <div key={index} className="grid gap-4 p-6 rounded-lg border bg-card">
                    <div className='bg-primary/10 text-primary rounded-lg p-3 w-fit'>
                        <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="our-mission" className="w-full py-20 md:py-28 lg:py-32">
              <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Our Mission</h2>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We are dedicated to building tools that not only improve writing but also empower creativity and confidence.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-2xl">
                   <ul className="grid gap-4 text-left">
                    {missionPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
        </section>

        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Ready to Get Started?
              </h2>
              <p className="mt-4 max-w-xl mx-auto">
                Experience the future of writing. Sign up today and let WriteSphere elevate your content.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">Start for Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
