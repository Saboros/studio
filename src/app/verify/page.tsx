'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/app-context";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Users, ShieldQuestion, CheckCircle2, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function VerifyPage() {
    const { verificationStatus, setVerificationStatus } = useApp();
    const router = useRouter();
    const { toast } = useToast();
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0) {
            toast({ variant: "destructive", title: "No file selected", description: "Please upload your PWD card or supporting document."});
            return;
        }
        
        toast({ title: "Uploading Documents...", description: "Your documents are being encrypted and uploaded securely to IPFS."});

        setTimeout(() => {
            setVerificationStatus('Pending');
            toast({ title: "Submission successful!", description: "Your documents are pending review. You will be redirected to the dashboard."});
            router.push('/');
        }, 2000);
    };

    if (verificationStatus === 'Verified') {
        return (
            <div className="flex items-center justify-center h-full py-12">
                <Card className="w-full max-w-md text-center">
                    <CardHeader className="items-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                        <CardTitle>You Are Verified!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Your identity has been successfully verified. You can now access all platform features and mint your Identity SBT from the dashboard.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push('/')}>Back to Dashboard</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    
    if (verificationStatus === 'Pending') {
         return (
            <div className="flex items-center justify-center h-full py-12">
                <Card className="w-full max-w-md text-center">
                     <CardHeader className="items-center">
                        <Hourglass className="h-12 w-12 text-yellow-500 mb-4 animate-spin" />
                        <CardTitle>Verification Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Your documents have been submitted and are currently under review. We'll notify you once the process is complete.</p>
                    </CardContent>
                     <CardFooter>
                        <Button className="w-full" onClick={() => router.push('/')}>Back to Dashboard</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Secure PWD Verification</CardTitle>
                        <CardDescription>Upload your documents to get verified and unlock full platform access.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="pwd-card">PWD Card / Supporting Document</Label>
                                <Input id="pwd-card" type="file" onChange={(e) => setFiles(e.target.files)} />
                                <p className="text-xs text-muted-foreground">Your documents are encrypted on your device before being uploaded to a decentralized storage (IPFS).</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">
                                <FileUp className="mr-2 h-4 w-4" />
                                Submit for Verification
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold font-headline">How Verification Works</h3>
                <p className="text-muted-foreground">We use a decentralized and privacy-preserving process to verify your status.</p>
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card border">
                        <Users className="h-8 w-8 text-primary mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold">Peer-Review DAO</h4>
                            <p className="text-sm text-muted-foreground">Trusted community members can review and approve verification requests. Reviewers are rewarded with PWDToken for their contribution.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-card border">
                        <ShieldQuestion className="h-8 w-8 text-primary mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold">Partner Verification</h4>
                            <p className="text-sm text-muted-foreground">Alternatively, designated partners like NGOs or government bodies can securely review your documents and approve your status.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
