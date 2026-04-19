'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const messages = [
  'Kostenloser Versand ab 75 € — Entdecke die neue Kollektion',
  'Premium Haarstyling — Handgefertigt in Deutschland',
  'Neu: TMStyles Signature Line — Jetzt verfügbar',
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-background overflow-hidden">
      <div className="container-custom flex items-center justify-center py-2.5 text-xs sm:text-sm tracking-[0.15em] uppercase">
        <div className="relative h-5 overflow-hidden">
          {messages.map((msg, i) => (
            <p
              key={i}
              className="absolute inset-0 whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateY(${(i - index) * 100}%)`,
                opacity: i === index ? 1 : 0,
              }}
            >
              {msg}
            </p>
          ))}
          {/* Reserve width */}
          <p className="invisible whitespace-nowrap">{messages.reduce((a, b) => (a.length > b.length ? a : b))}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
