'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/app-context';
import { LogOut, Wallet } from 'lucide-react';

export default function AppHeader() {
    const { walletConnected, connectWallet, disconnectWallet, userAddress } = useApp();
  
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
            </div>
            {walletConnected ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden sm:block font-mono">{userAddress}</span>
                    <Button variant="outline" size="sm" onClick={disconnectWallet}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Disconnect
                    </Button>
                </div>
            ) : (
                <Button onClick={connectWallet}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                </Button>
            )}
      </header>
    );
}
