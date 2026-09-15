'use client';

import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="flex flex-col items-center text-center mx-auto max-w-4xl">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background fixed top-0 left-0 right-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center">
          <Icons.logo className="h-6 w-6 gradient-text" />
          <span className="ml-2 text-lg font-semibold font-headline gradient-text">𝓦𝓻𝓲𝓽𝓮𝓢𝓹𝓱𝓮𝓻𝓮</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
            <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">Features</Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">About</Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">Contact</Link>
          <Button variant="ghost" asChild>
            <Link href="/login" className='btn-grad'>Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup" className='btn-grad'>Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 pt-14">{children}</main>
      <footer id="footer" className="border-t">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4 md:col-span-2">
              <Link href="/" className="flex items-center">
                <Icons.logo className="h-7 w-7 gradient-text" />
                <span className="ml-2 text-xl font-bold font-headline gradient-text">𝓦𝓻𝓲𝓽𝓮𝓢𝓹𝓱𝓮𝓻𝓮</span>
              </Link>
              <p className="max-w-xs text-muted-foreground text-sm">
                Your intelligent writing companion. Generate outlines, create drafts, check grammar, and improve your writing style with AI-powered assistance.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className='text-muted-foreground hover:text-foreground'>
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className='text-muted-foreground hover:text-foreground'>
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold tracking-wide">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground">Playground</Link></li>
                <li><Link href="/draft" className="text-sm text-muted-foreground hover:text-foreground">Drafts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wide">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WriteSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}