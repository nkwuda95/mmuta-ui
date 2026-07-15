import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Landing from '@/pages/landing';
import Dashboard from '@/pages/dashboard';
import Tutor from '@/pages/tutor';
import Lesson from '@/pages/lesson';
import Progress from '@/pages/progress';
import { Navbar, MobileNav } from '@/components/layout';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8">This page doesn't exist.</p>
      <a href="/" className="text-primary hover:underline font-medium">Go Home</a>
    </div>
  );
}

function Router() {
  return (
    <div className="flex min-h-[100dvh] w-full">
      <Navbar />
      <main className="flex-1 w-full bg-background overflow-x-hidden">
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/tutor" component={Tutor} />
          <Route path="/lessons/:id" component={Lesson} />
          <Route path="/progress" component={Progress} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="mmuta-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
