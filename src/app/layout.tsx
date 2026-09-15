import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FirebaseClientProvider, AppStateProvider } from "@/firebase";
import { ThemeProvider } from "@/components/theme-provider";
import AppContent from "./app-content";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>WriteSphere</title>
        <meta name="description" content="Your AI-Powered Writing Companion" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z%22/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Source+Code+Pro:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AppStateProvider>
            <FirebaseClientProvider>
              <SidebarProvider>
                <AppContent>{children}</AppContent>
              </SidebarProvider>
            </FirebaseClientProvider>
          </AppStateProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
