'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface Comment {
  id: number
  author: string
  content: string
}

interface CommentSectionProps {
  memeId: number
  initialComments: Comment[]
}

export function CommentSection({ memeId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Anonymous', // Replace with actual user name when authentication is implemented
        content: newComment.trim()
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-white text-lg font-semibold mb-2">Komentarze</h3>
      {comments.map(comment => (
        <div key={comment.id} className="bg-zinc-800/50 rounded p-2 mb-2">
          <p className="text-white text-sm"><strong>{comment.author}:</strong> {comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700 text-white"
          placeholder="Dodaj komentarz..."
          rows={3}
        />
        <Button type="submit" className="mt-2 bg-red-500 text-white">Dodaj komentarz</Button>
      </form>
    </div>
  )
}

