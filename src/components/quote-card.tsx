interface QuoteCardProps {
  quote: string
  movie: string
  year: string
}

export function QuoteCard({ quote, movie, year }: QuoteCardProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 shadow-xl transform transition-all hover:scale-105">
      <blockquote className="text-white font-medium text-lg mb-4">"{quote}"</blockquote>
      <div className="flex justify-between items-center text-zinc-400 text-sm">
        <span>{movie}</span>
        <span>{year}</span>
      </div>
    </div>
  )
}

