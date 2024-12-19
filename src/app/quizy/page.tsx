'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for user rankings
const mockRankings = [
  { id: 1, name: 'Klasyka kina', users: [
    { name: 'Anna K.', score: 95 },
    { name: 'Tomasz W.', score: 90 },
    { name: 'Magda L.', score: 85 },
  ]},
  { id: 2, name: 'Komedie romantyczne', users: [
    { name: 'Piotr N.', score: 88 },
    { name: 'Ewa S.', score: 85 },
    { name: 'Marek O.', score: 82 },
  ]},
  { id: 3, name: 'Filmy akcji', users: [
    { name: 'Kasia R.', score: 92 },
    { name: 'Adam M.', score: 89 },
    { name: 'Zofia P.', score: 87 },
  ]},
]

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(mockRankings[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Quizy filmowe</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-zinc-900/50 text-white">
            <CardHeader>
              <CardTitle>Wybierz akcję</CardTitle>
              <CardDescription className="text-zinc-400">Generuj nowy quiz lub weź udział w istniejącym</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/quizy/generator">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Generuj nowy quiz
                </Button>
              </Link>
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white">
                Weź udział w quizie
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 text-white">
            <CardHeader>
              <CardTitle>Ranking użytkowników</CardTitle>
              <CardDescription className="text-zinc-400">Najlepsi gracze w poszczególnych quizach</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={selectedQuiz.id.toString()} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {mockRankings.map((quiz) => (
                    <TabsTrigger 
                      key={quiz.id} 
                      value={quiz.id.toString()}
                      onClick={() => setSelectedQuiz(quiz)}
                    >
                      {quiz.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={selectedQuiz.id.toString()}>
                  <ul className="space-y-2 mt-4">
                    {selectedQuiz.users.map((user, index) => (
                      <li key={index} className="flex justify-between items-center bg-zinc-800/50 p-2 rounded">
                        <span>{user.name}</span>
                        <span className="font-bold">{user.score} pkt</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

