'use client'

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ProfileData {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
}

export default function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        username: '',
        avatar: '',
        bio: '',
        location: '',
        website: '',
        twitter: '',
        instagram: ''
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
            {/* Reszta kodu pozostaje taka sama, ale zamiast defaultValues używamy profileData */}
            {/* Na przykład: */}
            <Input
                id="name"
                placeholder="Your full name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                autoComplete="off"
                className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80"
            />
            {/* ... */}
        </div>
    );
}