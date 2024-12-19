import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ProfileFormProps {
    defaultValues?: {
        name: string;
        username: string;
        avatar: string;
        bio: string;
        location?: string;
        website?: string;
        twitter?: string;
        instagram?: string;
    };
}

export default function ProfileForm({ defaultValues }: ProfileFormProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent" />
            
            <div className="container mx-auto px-4 max-w-2xl relative">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Personalizacja profilu</h1>
                
                <Card className="bg-zinc-900/50 text-white backdrop-blur-sm">
                    <div className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
                        <div className="flex items-center justify-center gap-6">
                            <Avatar className="h-24 w-24 rounded-full border-2 border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
                                <AvatarImage
                                    src={defaultValues?.avatar}
                                    className="rounded-full object-cover"
                                />
                                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900">
                                    SC
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                variant="outline"
                                className="h-24 w-24 rounded-full border-2 border-dashed border-zinc-200/80 dark:border-zinc-800/80 
                                         hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50
                                         transition-colors shadow-sm"
                            >
                                <Sparkles className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </Button>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 w-full text-center text-sm hover:cursor-pointer">
                            Upload / Generate a new avatar
                        </p>

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Display Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Your full name"
                                    defaultValue={defaultValues?.name}
                                    autoComplete="off"
                                    className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                                             focus:border-zinc-300 dark:focus:border-zinc-700
                                             focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                                             placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="username"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    placeholder="@username"
                                    defaultValue={defaultValues?.username}
                                    autoComplete="off"
                                    className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                                             focus:border-zinc-300 dark:focus:border-zinc-700
                                             focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                                             placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="bio"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself"
                                    className="resize-none bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                                             focus:border-zinc-300 dark:focus:border-zinc-700
                                             focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                                             placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                    rows={4}
                                    defaultValue={defaultValues?.bio}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Social Links
                                </h3>
                                <div className="grid gap-4">
                                    {["website", "twitter", "instagram"].map((social) => (
                                        <div key={social} className="grid gap-2">
                                            <Label
                                                htmlFor={social}
                                                className="capitalize text-zinc-700 dark:text-zinc-300"
                                            >
                                                {social}
                                            </Label>
                                            <Input
                                                id={social}
                                                placeholder={
                                                    social === "website"
                                                        ? "https://your-website.com"
                                                        : "@username"
                                                }
                                                defaultValue={
                                                    defaultValues?.[
                                                        social as keyof typeof defaultValues
                                                    ]
                                                }
                                                autoComplete="off"
                                                className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                                                         focus:border-zinc-300 dark:focus:border-zinc-700
                                                         focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                                                         placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="outline"
                                className="border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            >
                                Cancel
                            </Button>
                            <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
