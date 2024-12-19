'use client'

import { useState } from 'react'
import { NavMenu } from '@/components/nav-menu'
import { CommentSection } from '@/components/comment-section'
import { Heart, Share2, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Meme {
  id: number
  imageUrl: string
  author: string
  likes: number
  comments: Comment[]
}

interface Comment {
  id: number
  author: string
  content: string
}

const initialMemes: Meme[] = [
  { id: 1, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User1', likes: 10, comments: [
    { id: 1, author: 'Commenter1', content: 'Great meme!' },
    { id: 2, author: 'Commenter2', content: 'LOL' }
  ] },
  { id: 2, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User2', likes: 15, comments: [
    { id: 3, author: 'Commenter3', content: 'This is hilarious!' }
  ] },
  { id: 3, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User3', likes: 8, comments: [] },
  { id: 4, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User4', likes: 20, comments: [
    { id: 4, author: 'Commenter4', content: 'I can relate to this' },
    { id: 5, author: 'Commenter5', content: 'So true!' }
  ] },
  { id: 5, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User5', likes: 12, comments: [] },
  { id: 6, imageUrl: '/placeholder.svg?height=300&width=300', author: 'User6', likes: 18, comments: [
    { id: 6, author: 'Commenter6', content: 'This made my day' }
  ] },
]

export default function ScianaZMemami() {
  const [memes, setMemes] = useState<Meme[]>(initialMemes)

  const handleLike = (id: number) => {
    setMemes(memes.map(meme => 
      meme.id === id ? { ...meme, likes: meme.likes + 1 } : meme
    ))
  }

  const handleShare = (id: number) => {
    // Implement sharing functionality here
    console.log(`Sharing meme with id: ${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950">
      <NavMenu />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Ściana z memami</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memes.map(meme => (
            <div key={meme.id} className="bg-zinc-900/50 rounded-lg overflow-hidden shadow-lg">
              <img src={meme.imageUrl} alt={`Meme by ${meme.author}`} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-white text-sm mb-2">Autor: {meme.author}</p>
                <div className="flex justify-between items-center mb-4">
                  <Button variant="ghost" className="text-red-500" onClick={() => handleLike(meme.id)}>
                    <Heart className="mr-2 h-4 w-4" /> {meme.likes}
                  </Button>
                  <Button variant="ghost" className="text-blue-500" onClick={() => handleShare(meme.id)}>
                    <Share2 className="mr-2 h-4 w-4" /> Udostępnij
                  </Button>
                  <Button variant="ghost" className="text-green-500">
                    <MessageCircle className="mr-2 h-4 w-4" /> {meme.comments.length}
                  </Button>
                </div>
                <CommentSection memeId={meme.id} initialComments={meme.comments} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

