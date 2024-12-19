'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ImageIcon } from 'lucide-react'

export default function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [textPosition, setTextPosition] = useState(50)
  const [fontSize, setFontSize] = useState(30)
  const [hashtags, setHashtags] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateMeme = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !image) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = fontSize / 15
      ctx.font = `bold ${fontSize}px Arial`
      ctx.textAlign = 'center'

      const textY = (canvas.height * textPosition) / 100

      ctx.strokeText(text, canvas.width / 2, textY)
      ctx.fillText(text, canvas.width / 2, textY)

      // Add hashtags at the bottom
      if (hashtags) {
        ctx.font = `${fontSize * 0.6}px Arial`
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(hashtags, canvas.width / 2, canvas.height - 20)
      }
    }
    img.src = image
  }, [image, text, textPosition, fontSize, hashtags])

  useEffect(() => {
    generateMeme();
  }, [generateMeme]);

  const handleSubmit = () => {
    console.log('Meme submitted:', { image, text, textPosition, fontSize, hashtags })
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvasRef.current?.toDataURL() || ''
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Generator Memów</h1>
        <Card className="bg-zinc-900/50 text-white backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Stwórz nowy mem</CardTitle>
            <CardDescription className="text-zinc-400">Dodaj zdjęcie, tekst i dostosuj swój mem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Zdjęcie</Label>
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
              </div>
            </div>
            <div>
              <Label htmlFor="meme-text">Tekst mema</Label>
              <Input 
                id="meme-text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="bg-zinc-800 text-white border-zinc-700"
              />
            </div>
            <div>
              <Label htmlFor="text-position">Pozycja tekstu</Label>
              <Slider
                id="text-position"
                min={0}
                max={100}
                step={1}
                value={[textPosition]}
                onValueChange={(value) => setTextPosition(value[0])}
                className="py-4"
              />
            </div>
            <div>
              <Label htmlFor="font-size">Rozmiar czcionki</Label>
              <Slider
                id="font-size"
                min={10}
                max={60}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="py-4"
              />
            </div>
            <div>
              <Label htmlFor="hashtags">Hashtagi</Label>
              <Input 
                id="hashtags" 
                value={hashtags} 
                onChange={(e) => setHashtags(e.target.value)} 
                className="bg-zinc-800 text-white border-zinc-700"
                placeholder="#filmquotes #meme"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="w-full max-w-md mb-4">
              <canvas ref={canvasRef} className="w-full h-auto border border-zinc-700 rounded" />
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={!image || !text}
            >
              Zapisz i udostępnij mem
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

