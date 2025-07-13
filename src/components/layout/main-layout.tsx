'use client';

import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';
import AppHeader from './app-header';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { HeartHandshake, Wallet } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { walletConnected, connectWallet } = useApp();

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">
          {walletConnected ? (
            children
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-md text-center shadow-xl">
                    <CardHeader className="items-center">
                        <div className="p-4 rounded-full bg-primary/10 mb-4">
                           <HeartHandshake className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle>Welcome to PWeDemeet</CardTitle>
                        <CardDescription>A secure and inclusive community for Persons with Disabilities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6 text-muted-foreground">Please connect your wallet to access the platform.</p>
                        <Button onClick={connectWallet} size="lg">
                            <Wallet className="mr-2 h-5 w-5"/>
                            Connect MetaMask
                        </Button>
                    </CardContent>
                </Card>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
