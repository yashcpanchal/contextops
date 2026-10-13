import './globals.css';
import { Suspense, type ReactNode } from 'react';
import { getState } from '@/lib/store';
import { Header, Sidebar } from '@/components/Shell';
import { ToastProvider } from '@/components/Toast';

export const metadata = { title: 'ContextOps', description: 'AI coding FinOps agent: unified spend, outcomes and approval-gated savings.' };
export const dynamic = 'force-dynamic';

const themeInit = `try{var t=localStorage.getItem('contextops-theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const s = getState();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ToastProvider>
          <div className="flex min-h-screen">
            <Suspense fallback={<aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block" />}>
              <Sidebar />
            </Suspense>
            <div className="min-w-0 flex-1">
              <Suspense fallback={<header className="h-14 border-b border-slate-200 dark:border-slate-800" />}>
                <Header orgName={s.org.name} asOf={s.asOf} engineers={s.org.engineers} />
              </Suspense>
              <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
