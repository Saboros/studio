'use client';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { useApp } from '@/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/zk-dating', label: 'ZK Dating', icon: Sparkles },
  { href: '/verify', label: 'Verification', icon: ShieldCheck },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { walletConnected, userAddress, verificationStatus } = useApp();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <HeartHandshake className="text-primary h-8 w-8" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold font-headline">PweDemeet</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        {walletConnected && (
            <div className="flex items-center gap-3 p-2 rounded-lg">
                <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="abstract geometric" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{userAddress}</span>
                    <Badge variant={verificationStatus === 'Verified' ? "default" : "secondary"} className="w-fit mt-1">{verificationStatus}</Badge>
                </div>
            </div>
        )}
      </SidebarFooter>
    </>
  );
}
