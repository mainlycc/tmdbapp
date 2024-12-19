import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black/80 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cytaty z filmów</h3>
            <p className="text-sm text-gray-400">Twoje źródło inspiracji filmowej</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-red-500 transition-colors">Strona główna</Link></li>
              <li><Link href="/sciana-z-memami" className="text-sm hover:text-red-500 transition-colors">Ściana z memami</Link></li>
              <li><Link href="/quizy" className="text-sm hover:text-red-500 transition-colors">Quizy</Link></li>
              <li><Link href="/kontakt" className="text-sm hover:text-red-500 transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Informacje prawne</h4>
            <ul className="space-y-2">
              <li><Link href="/polityka-prywatnosci" className="text-sm hover:text-red-500 transition-colors">Polityka prywatności</Link></li>
              <li><Link href="/warunki-uzytkowania" className="text-sm hover:text-red-500 transition-colors">Warunki użytkowania</Link></li>
              <li><Link href="/cookie-policy" className="text-sm hover:text-red-500 transition-colors">Polityka cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Śledź nas</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cytaty z filmów. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}

