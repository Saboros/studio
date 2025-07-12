import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Filter, Image as ImageIcon, Video, Send, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    author: "Elena Rodriguez",
    avatar: "https://placehold.co/40x40.png",
    handle: "@elena_r",
    time: "2h ago",
    content: "Just discovered an amazing screen reader that integrates with VS Code. It's been a game changer for my coding workflow! Happy to share the details if anyone is interested. #AssistiveTech #CodingLife",
    image: "https://placehold.co/600x400.png",
    imageHint: "desk computer",
  },
  {
    author: "Ben Carter",
    avatar: "https://placehold.co/40x40.png",
    handle: "@bencarter",
    time: "5h ago",
    content: "Organizing a virtual meetup for PwD entrepreneurs next month. We'll be discussing funding, marketing, and navigating challenges. Drop a comment if you want an invite!",
    image: null,
  },
  {
    author: "Aisha Khan",
    avatar: "https://placehold.co/40x40.png",
    handle: "@aishak",
    time: "1d ago",
    content: "My new service dog, Leo, is finally here! He's a golden retriever and the goodest boy. The training process was long but so worth it. Feeling blessed!",
    image: "https://placehold.co/600x400.png",
    imageHint: "dog park",
  }
];


export default function CommunityPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="abstract geometric" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <Textarea placeholder="What's on your mind?" className="min-h-[60px] text-base border-none focus-visible:ring-0 p-0" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon"><ImageIcon className="text-muted-foreground" /><span className="sr-only">Add Image</span></Button>
                            <Button variant="ghost" size="icon"><Video className="text-muted-foreground" /><span className="sr-only">Add Video</span></Button>
                        </div>
                        <Button><Send className="mr-2 h-4 w-4" />Post</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={post.avatar} data-ai-hint="person portrait" />
                                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{post.author}</p>
                                            <p className="text-sm text-muted-foreground">{post.handle} · {post.time}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                                {post.image && <Image src={post.image} data-ai-hint={post.imageHint} alt="Post image" width={600} height={400} className="rounded-lg border w-full h-auto object-cover" />}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-6 lg:sticky top-20">
                <Card>
                    <CardHeader>
                        <Input placeholder="Search community..." />
                    </CardHeader>
                    <CardContent>
                         <Button variant="outline" className="w-full justify-start gap-2">
                             <Filter className="h-4 w-4" />
                             Filters
                         </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Community Groups</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm font-medium hover:text-primary cursor-pointer">Tech & Accessibility</p>
                        <p className="text-sm font-medium hover:text-primary cursor-pointer">Entrepreneurs Circle</p>
                        <p className="text-sm font-medium hover:text-primary cursor-pointer">Local Meetups - Bay Area</p>
                        <Separator className="my-3"/>
                        <Button variant="secondary" className="w-full mt-2">Create New Group</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
