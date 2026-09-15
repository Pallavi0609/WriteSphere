import { FileText, PenSquare, SpellCheck, WandSparkles, CheckCircle2, File, History, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FileText,
    title: 'Generate Outlines',
    description:
      'Start your writing with a solid structure. Our AI analyzes your topic and creates comprehensive outlines with main sections, subsections, and key points to cover. Perfect for essays, articles, and research papers.',
    details: [
      'Structured hierarchical outlines',
      'Customizable based on tone and purpose',
      'Instant generation in seconds',
    ],
    example: (
      <div className="bg-background rounded-lg p-6 border">
        <h4 className="font-medium mb-4 text-sm text-foreground">Sample Outline:</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>I. Introduction</li>
          <li className="pl-4">A. Hook and context</li>
          <li className="pl-4">B. Thesis statement</li>
          <li>II. Main Body</li>
          <li className="pl-4">A. First main point</li>
          <li className="pl-8">1. Supporting evidence</li>
          <li className="pl-8">2. Analysis</li>
          <li className="pl-4">B. Second main point</li>
          <li>III. Conclusion</li>
        </ul>
      </div>
    ),
  },
  {
    icon: PenSquare,
    title: 'Create Complete Drafts',
    description:
      'Generate full drafts for your essays and articles in seconds. Our AI understands your topic, tone, and purpose to create well-structured content that you can refine and personalize.',
    details: [
      'Complete introduction, body, and conclusion',
      'Contextually relevant content',
      'Save hours of writing time',
    ],
    example: (
        <div className="bg-background rounded-lg p-6 border">
            <p className='text-sm text-muted-foreground'>Artificial intelligence has revolutionized the way we approach writing. By leveraging advanced natural language processing, AI writing assistants can now generate high-quality content that matches your specific requirements.</p>
            <p className='text-xs text-muted-foreground/80 mt-4 pt-4 border-t'>Generated in 3 seconds</p>
        </div>
    ),
    reverse: true,
  },
  {
    icon: SpellCheck,
    title: 'Advanced Grammar Checking',
    description:
      'Catch grammar mistakes, spelling errors, and punctuation issues with our AI-powered checker. Get detailed explanations and suggestions to improve your writing accuracy.',
    details: [
      'Comprehensive error detection',
      'Contextual corrections',
      'Detailed explanations',
    ],
    example: (
        <div className="bg-background rounded-lg p-6 border space-y-4">
            <div>
                <h4 className="font-medium mb-2 text-sm text-foreground">Before:</h4>
                <div className='bg-red-100/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md text-sm'>
                    Their going to the store to buy there groceries.
                </div>
            </div>
             <div>
                <h4 className="font-medium mb-2 text-sm text-foreground">After:</h4>
                <div className='bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-900/30 text-green-700 dark:text-green-500 p-3 rounded-md text-sm'>
                    They're going to the store to buy their groceries.
                </div>
            </div>
        </div>
    ),
  },
  {
    icon: WandSparkles,
    title: 'Improve Writing Style',
    description:
      'Enhance your writing style, tone, and clarity. Our AI provides suggestions to make your content more engaging, professional, and impactful.',
    details: [
        'Improve clarity and readability',
        'Refine tone and voice',
        'Get suggestions for better word choice'
    ],
    example: (
        <div className="bg-background rounded-lg p-6 border space-y-4">
            <div>
                <h4 className="font-medium mb-2 text-sm text-foreground">Original:</h4>
                <div className='bg-muted/50 p-3 rounded-md text-sm'>
                    The thing is good and works well for what it does.
                </div>
            </div>
             <div>
                <h4 className="font-medium mb-2 text-sm text-foreground">Improved:</h4>
                <div className='bg-muted/50 p-3 rounded-md text-sm'>
                    This product excels in its intended function, delivering reliable and effective performance.
                </div>
            </div>
        </div>
    ),
    reverse: true,
  },
];

const moreFeatures = [
    {
        icon: File,
        title: 'Draft Management',
        description: 'Save, organize, and manage all your drafts in one place. Export to PDF, Word, or copy to clipboard.'
    },
    {
        icon: History,
        title: 'History Tracking',
        description: 'Keep track of all your AI interactions. Review past suggestions and improvements to learn and grow.'
    },
    {
        icon: Download,
        title: 'Easy Export',
        description: 'Export your content in multiple formats including TXT, PDF, and Word. Copy to clipboard with one click.'
    }
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Powerful Features for Better Writing
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Everything you need to create exceptional content, powered by advanced AI technology.
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6 space-y-20 md:space-y-28 lg:space-y-32 pb-20">
          {features.map((feature, index) => (
            <section key={index} id={feature.title.toLowerCase().replace(' ', '-')}>
              <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 items-center ${feature.reverse ? 'lg:grid-flow-row-dense' : ''}`}>
                <div className={`space-y-6 ${feature.reverse ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-primary/10 text-primary rounded-lg p-3 w-fit">
                        <feature.icon className="w-7 h-7" />
                    </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                      {feature.title}
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                  <ul className="grid gap-4">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`flex items-center justify-center ${feature.reverse ? 'lg:col-start-1' : ''}`}>
                    <div className="w-full max-w-md">
                        {feature.example}
                    </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    More Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Additional tools to enhance your writing workflow
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              {moreFeatures.map((feature, index) => (
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

        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-lg bg-background p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Ready to Experience These Features?
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                Start using WriteSphere today and transform your writing process
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link href="/signup">Try It Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
