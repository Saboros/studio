'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";
import Link from "next/link";
import { CheckCircle2, CircleOff, Hourglass, Bot, Coins, Users, Award, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { verificationStatus, sbtStatus, setSbtStatus, setVerificationStatus } = useApp();
  const { toast } = useToast();

  const handleMintSBT = () => {
    toast({ title: "Minting SBT...", description: "Please approve the transaction in your wallet." });
    setTimeout(() => {
      setSbtStatus('Minted');
      toast({ title: "Success!", description: "Your Soulbound Token has been minted." });
    }, 2000);
  };
  
  const handleClaimRewards = () => {
    toast({ title: "Rewards Claimed", description: "150 PWDToken added to your wallet." });
  };
  
  // Mock function to simulate verification approval by an admin/partner
  const handleMockVerify = () => {
    setVerificationStatus('Verified');
    toast({ title: 'Profile Verified!', description: 'You can now mint your Identity SBT.' });
  };

  const VerificationIcon = {
    'Unverified': <CircleOff className="h-6 w-6 text-destructive" />,
    'Pending': <Hourglass className="h-6 w-6 text-yellow-500 animate-spin" />,
    'Verified': <CheckCircle2 className="h-6 w-6 text-green-500" />,
  }[verificationStatus];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Profile Status</CardTitle>
          <CardDescription>Your identity verification and token status.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                    {VerificationIcon}
                    <div>
                        <p className="font-semibold">Verification Status</p>
                        <p className="text-sm text-muted-foreground">{verificationStatus}</p>
                    </div>
                </div>
                {verificationStatus === 'Unverified' && <Button asChild><Link href="/verify">Verify Now</Link></Button>}
                {verificationStatus === 'Pending' && <Button onClick={handleMockVerify} variant="secondary">Mock Admin Verify</Button>}
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                    <Bot className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">Identity SBT</p>
                        <p className="text-sm text-muted-foreground">{sbtStatus}</p>
                    </div>
                </div>
                {verificationStatus === 'Verified' && sbtStatus === 'Not Minted' && <Button onClick={handleMintSBT}>Mint Identity SBT</Button>}
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wallet & Rewards</CardTitle>
          <CardDescription>Your token balance and earnings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground">PWDToken Balance</span>
                <span className="font-bold text-lg">1,250 PWD</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Earned</span>
                <span className="font-bold text-lg">5,780 PWD</span>
            </div>
            <Progress value={45} className="h-2" />
            <Button className="w-full" onClick={handleClaimRewards}>
                <Award className="mr-2 h-4 w-4" />
                Claim 150 PWD Rewards
            </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col h-24" asChild>
                <Link href="/verify"><ShieldCheck className="h-8 w-8 mb-2" /><span>Verify Profile</span></Link>
            </Button>
            <Button variant="outline" className="flex flex-col h-24" asChild>
                <Link href="/community"><Users className="h-8 w-8 mb-2" /><span>Community Feed</span></Link>
            </Button>
            <Button variant="outline" className="flex flex-col h-24" asChild>
                <Link href="/zk-dating"><Sparkles className="h-8 w-8 mb-2" /><span>ZK Dating</span></Link>
            </Button>
            <Button variant="outline" className="flex flex-col h-24" onClick={handleClaimRewards}>
                <Coins className="h-8 w-8 mb-2" /><span>Claim Rewards</span>
            </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Community Highlights</CardTitle>
          <CardDescription>Recent activity from the community.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <Image src="https://placehold.co/40x40.png" data-ai-hint="person happy" alt="User avatar" width={40} height={40} className="rounded-full" />
                    <div>
                        <p className="font-semibold">Jane Doe</p>
                        <p className="text-sm">Just attended a great webinar on accessible tech. So many cool innovations happening!</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Image src="https://placehold.co/40x40.png" data-ai-hint="person outside" alt="User avatar" width={40} height={40} className="rounded-full" />
                    <div>
                        <p className="font-semibold">John Smith</p>
                        <p className="text-sm">Looking for recommendations for wheelchair accessible cafes in the downtown area. Anyone have suggestions?</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
