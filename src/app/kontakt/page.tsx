'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tutaj możesz dodać logikę wysyłania emaila
    console.log('Wysłano wiadomość:', formData)
    
    // Pokazujemy powiadomienie o sukcesie

    
    // Czyścimy formularz
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 max-w-2xl relative">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Kontakt z redakcją</h1>
        
        <Card className="bg-zinc-900/50 text-white backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wyślij do nas wiadomość</CardTitle>
            <CardDescription className="text-zinc-400">
              Masz pytanie lub sugestię? Napisz do nas!
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Temat</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Wiadomość</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-zinc-800 text-white border-zinc-700 min-h-[150px]"
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Wyślij wiadomość
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
