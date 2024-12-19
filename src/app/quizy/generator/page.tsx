'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, ImageIcon } from 'lucide-react'

interface Answer {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  answers: Answer[]
  image?: string
}

export default function QuizGenerator() {
  const [quizTitle, setQuizTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([])
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addAnswer = () => {
    if (currentAnswers.length < 4) {
      setCurrentAnswers([...currentAnswers, { text: '', isCorrect: false }])
    }
  }

  const updateAnswer = (index: number, text: string) => {
    const newAnswers = [...currentAnswers]
    newAnswers[index].text = text
    setCurrentAnswers(newAnswers)
  }

  const setCorrectAnswer = (index: number) => {
    const newAnswers = currentAnswers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index
    }))
    setCurrentAnswers(newAnswers)
  }

  const removeAnswer = (index: number) => {
    setCurrentAnswers(currentAnswers.filter((_, i) => i !== index))
  }

  const addQuestion = () => {
    if (currentQuestion && currentAnswers.length >= 2) {
      setQuestions([...questions, { text: currentQuestion, answers: currentAnswers, image: currentImage || undefined }])
      setCurrentQuestion('')
      setCurrentAnswers([])
      setCurrentImage(null)
    }
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const submitQuiz = () => {
    // Here you would typically send the quiz data to your backend for approval
    console.log('Quiz submitted for approval:', { title: quizTitle, questions })
    // Reset the form
    setQuizTitle('')
    setQuestions([])
    setCurrentQuestion('')
    setCurrentAnswers([])
    setCurrentImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Generator Quizów</h1>
        <Card className="bg-zinc-900/50 text-white">
          <CardHeader>
            <CardTitle>Stwórz nowy quiz</CardTitle>
            <CardDescription className="text-zinc-400">Dodaj pytania i odpowiedzi do swojego quizu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quiz-title">Tytuł quizu</Label>
                <Input 
                  id="quiz-title" 
                  value={quizTitle} 
                  onChange={(e) => setQuizTitle(e.target.value)} 
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div>
                <Label htmlFor="question">Pytanie</Label>
                <Textarea 
                  id="question" 
                  value={currentQuestion} 
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div>
                <Label>Odpowiedzi</Label>
                <RadioGroup value={currentAnswers.findIndex(a => a.isCorrect).toString()}>
                  {currentAnswers.map((answer, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`answer-${index}`} 
                        onClick={() => setCorrectAnswer(index)}
                      />
                      <Input 
                        value={answer.text} 
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        className="flex-grow bg-zinc-800 text-white border-zinc-700"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeAnswer(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </RadioGroup>
                {currentAnswers.length < 4 && (
                  <Button 
                    onClick={addAnswer} 
                    className="mt-2 bg-zinc-800 hover:bg-zinc-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Dodaj odpowiedź
                  </Button>
                )}
              </div>
              <div>
                <Label>Zdjęcie (opcjonalne)</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="bg-zinc-800 hover:bg-zinc-700"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" /> Dodaj zdjęcie
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                  {currentImage && (
                    <img src={currentImage} alt="Uploaded" className="h-10 w-10 object-cover rounded" />
                  )}
                </div>
              </div>
              <Button 
                onClick={addQuestion} 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={!currentQuestion || currentAnswers.length < 2}
              >
                Dodaj pytanie
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">Dodane pytania:</h3>
              <ul className="space-y-2">
                {questions.map((q, index) => (
                  <li key={index} className="flex items-center justify-between bg-zinc-800/50 p-2 rounded">
                    <span>{q.text}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              {questions.length > 0 && (
                <Button 
                  onClick={submitQuiz} 
                  className="mt-4 w-full bg-green-600 hover:bg-green-700"
                >
                  Wyślij do zatwierdzenia
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

