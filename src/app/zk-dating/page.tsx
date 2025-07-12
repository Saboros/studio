'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { findZkMatch } from './actions';
import { useState } from 'react';
import { Loader2, UserCheck, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Find a Match
    </Button>
  );
}

export default function ZkDatingPage() {
    const [state, formAction] = useFormState(findZkMatch, { message: null, result: null });
    const [trustScore, setTrustScore] = useState(75);

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Privacy-Preserving Matchmaking</CardTitle>
                    <CardDescription>
                        Use Zero-Knowledge Proofs to find connections. Your data stays private. You only share what you want, when you want.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div>
                            <Label htmlFor="ageRange">Desired Age Range</Label>
                            <Input id="ageRange" name="ageRange" placeholder="e.g., 25-35" required />
                        </div>
                        <div>
                            <Label htmlFor="locationProximity">Location Proximity</Label>
                            <Input id="locationProximity" name="locationProximity" placeholder="e.g., Within 50 miles" required />
                        </div>
                        <div>
                            <Label htmlFor="sharedInterests">Shared Interests</Label>
                            <Textarea id="sharedInterests" name="sharedInterests" placeholder="e.g., Hiking, assistive technology, board games" required />
                        </div>
                        <div>
                            <Label htmlFor="trustScoreThreshold" className="mb-2 block">Minimum Trust Score: <span className="font-bold text-primary">{trustScore}</span></Label>
                            <Input type="hidden" name="trustScoreThreshold" value={trustScore} />
                            <Slider
                                defaultValue={[trustScore]}
                                max={100}
                                step={1}
                                onValueChange={(value) => setTrustScore(value[0])}
                                aria-label="Minimum Trust Score"
                            />
                            <p className="text-xs text-muted-foreground mt-2">Based on community reputation and positive interactions.</p>
                        </div>

                        <SubmitButton />
                        {state.message && state.result === null && <p className="text-sm text-destructive text-center">{state.message}</p>}
                    </form>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center">
                {state.result ? (
                    <Card className="w-full bg-accent/20 border-accent animate-in fade-in-50">
                        <CardHeader className="items-center text-center">
                             <UserCheck className="w-12 h-12 text-primary" />
                            <CardTitle>Potential Match Found!</CardTitle>
                            <CardDescription>We found someone who meets your criteria.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="text-center italic text-accent-foreground border-l-4 border-primary pl-4 py-2 bg-background rounded-r-md">
                                {state.result.matchDescription}
                            </blockquote>
                            <Button className="w-full mt-6" disabled>Initiate Secure Chat (Coming Soon)</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full flex flex-col items-center justify-center">
                        <Sparkles className="w-12 h-12 mb-4 text-muted-foreground/50"/>
                        <p>Your match description will appear here once you submit the form.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
