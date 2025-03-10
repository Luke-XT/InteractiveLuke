import { CommandMenu } from '@/components/command';
import { CommandMenuProvider } from '@/components/command/command-menu-context';
import InteractiveConfigContextWrapper from '@/components/interactive/ContextWrapper';
import Head from '@/components/idiot/appwrapper/Head';
import { SidebarContentProvider } from '@/components/idiot/appwrapper/SidebarContentManager';
import { SidebarContext } from '@/components/idiot/appwrapper/SidebarContext';
import { SidebarMain } from '@/components/idiot/appwrapper/SidebarMain';
import '@/components/idiot/zod2gql/zod2gql';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import './globals.css';
import { metadata, viewport } from './metadata';
import { SolanaWalletProvider } from '@/components/wais/wallet/wallet-provider';

const inter = Inter({ subsets: ['latin'] });

export { metadata, viewport };

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value ?? process.env.NEXT_PUBLIC_THEME_DEFAULT_MODE;
  const appearance = cookieStore.get('appearance')?.value ?? '';

  return (
    <html lang='en'>
      <Head />
      <body className={cn(inter.className, theme, appearance)}>
        <InteractiveConfigContextWrapper>
          <SolanaWalletProvider>
            <CommandMenuProvider>
              <SidebarContentProvider>
                <SidebarProvider className='flex-1' defaultRightOpen={false}>
                  <SidebarMain side='left' />
                  {children}
                  <Toaster />
                  {/* <ThemeSetter /> */}
                  <CommandMenu />
                  <SidebarContext side='right' />
                </SidebarProvider>
              </SidebarContentProvider>
            </CommandMenuProvider>
          </SolanaWalletProvider>
        </InteractiveConfigContextWrapper>
      </body>
    </html>
  );
}
