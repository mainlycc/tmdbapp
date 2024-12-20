'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    language: 'pl',
    quality: 'hd',
    subtitles: 'pl',
    region: 'PL'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl relative">
        <h1 className="text-4xl font-bold text-white mb-8">Ustawienia</h1>

        <Card className="bg-zinc-900/50 text-white backdrop-blur-sm p-6">
          <div className="space-y-6">
            {/* Język */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Język i region</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Język interfejsu</Label>
                  <Input
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    name="region"
                    value={settings.region}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>
            </div>

            {/* Odtwarzanie */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Odtwarzanie</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quality">Jakość odtwarzania</Label>
                  <Input
                    id="quality"
                    name="quality"
                    value={settings.quality}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitles">Język napisów</Label>
                  <Input
                    id="subtitles"
                    name="subtitles"
                    value={settings.subtitles}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>
            </div>

            {/* Przyciski akcji */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" className="border-zinc-200/80 hover:bg-zinc-50/10">
                Anuluj
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Zapisz zmiany
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}