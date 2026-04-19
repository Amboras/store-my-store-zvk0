'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Scissors, Sparkles, Award, Star } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

/** Reveal elements when they scroll into view */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [scrollY, setScrollY] = useState(0)

  // Parallax for hero
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const philosophyRef = useReveal<HTMLDivElement>()
  const servicesRef = useReveal<HTMLDivElement>()
  const testimonialsRef = useReveal<HTMLDivElement>()
  const ctaRef = useReveal<HTMLDivElement>()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
  }

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-foreground text-background noise-overlay">
        {/* Background image with slow zoom + parallax */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute inset-0 animate-slow-zoom">
            <Image
              src={HERO_PLACEHOLDER}
              alt="TMStyles"
              fill
              sizes="100vw"
              className="object-cover opacity-60 grayscale"
              priority
            />
          </div>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          {/* Vertical vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Vertical side label */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <p className="text-[10px] uppercase tracking-[0.6em] text-white/60 [writing-mode:vertical-rl] rotate-180 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Est. 2024 — Premium Hairstyling
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-10 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <span className="h-16 w-px bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">01 / 04</span>
          <span className="h-16 w-px bg-white/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-white/70 mb-6 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            — TMStyles —
          </p>

          <h1 className="font-heading font-light leading-[0.95] text-[15vw] sm:text-[11vw] lg:text-[9rem] text-balance max-w-5xl">
            <span className="block overflow-hidden">
              <span className="block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                Style is
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block italic text-gradient-silver font-extralight animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
                everything.
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-md text-sm sm:text-base text-white/75 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '1s' }}
          >
            Premium Haarstyling, das deinen Auftritt definiert.
            Handverlesene Produkte für kompromisslose Qualität.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '1.2s' }}
          >
            <Link
              href="/products"
              className="btn-press shine-on-hover group relative inline-flex items-center gap-3 bg-white text-black px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em]"
              prefetch
            >
              Jetzt entdecken
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="btn-press inline-flex items-center gap-3 border border-white/50 text-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
              prefetch
            >
              Unsere Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <span className="relative block h-10 w-px bg-white/30 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-4 bg-white animate-[marquee_2s_linear_infinite]" style={{ animation: 'float 2s ease-in-out infinite' }} />
          </span>
        </div>
      </section>

      {/* ─────────── MARQUEE BAND ─────────── */}
      <section className="border-y border-border bg-background py-6 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-8 flex-shrink-0">
                {['Präzision', '✦', 'Eleganz', '✦', 'Handgefertigt', '✦', 'Premium', '✦', 'Zeitlos', '✦', 'Kraftvoll', '✦', 'Modern', '✦'].map((word, idx) => (
                  <span
                    key={`${i}-${idx}`}
                    className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.1em] uppercase whitespace-nowrap text-foreground/80"
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── PHILOSOPHY (split layout) ─────────── */}
      <section className="py-section lg:py-32 bg-background">
        <div ref={philosophyRef} className="container-custom grid lg:grid-cols-12 gap-12 lg:gap-20 items-center reveal-up">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-10 bg-foreground/40" />
              <span>Unsere Philosophie</span>
            </div>
            <h2 className="text-h1 lg:text-display font-heading font-light leading-[1.05] text-balance">
              Jeder Strich.
              <br />
              <span className="italic text-muted-foreground">Jede Welle.</span>
              <br />
              Perfektion.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Bei TMStyles glauben wir, dass Haarstyling eine Kunstform ist.
              Unsere Produkte werden mit der Hingabe eines Handwerkers und der Präzision
              eines Designers entwickelt — damit dein Look jeden Tag eine Aussage ist.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { num: '15+', label: 'Jahre Erfahrung' },
                { num: '100%', label: 'Vegan' },
                { num: '50k+', label: 'Kund:innen' },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <p className="font-heading text-3xl lg:text-4xl font-light transition-transform duration-500 group-hover:-translate-y-1">
                    {stat.num}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="img-zoom relative aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src={LIFESTYLE_PLACEHOLDER}
                alt="TMStyles Philosophie"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover grayscale"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-5 py-4 flex items-center gap-3 float-slow">
                <Award className="h-5 w-5" strokeWidth={1.3} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Awarded</p>
                  <p className="text-sm font-semibold text-black">Best Styling 2024</p>
                </div>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="hidden lg:block absolute -top-6 -right-6 w-24 h-24 border border-foreground/20" />
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 border border-foreground/20" />
          </div>
        </div>
      </section>

      {/* ─────────── SERVICES / PILLARS ─────────── */}
      <section className="py-section bg-foreground text-background noise-overlay">
        <div ref={servicesRef} className="container-custom reveal-up">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">Was uns ausmacht</p>
            <h2 className="text-h1 lg:text-display font-heading font-light text-balance">
              Styling auf höchstem <span className="italic">Niveau</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                icon: Scissors,
                title: 'Präzisions-Tools',
                desc: 'Professionelles Equipment — vom Salon inspiriert, für zuhause perfektioniert.',
                num: '01',
              },
              {
                icon: Sparkles,
                title: 'Premium Pflege',
                desc: 'Luxuriöse Formulierungen mit natürlichen Inhaltsstoffen, die wirklich wirken.',
                num: '02',
              },
              {
                icon: Star,
                title: 'Zeitloses Design',
                desc: 'Minimalistisch, funktional, ikonisch. Jedes Produkt ein Statement.',
                num: '03',
              },
            ].map(({ icon: Icon, title, desc, num }, i) => (
              <div
                key={i}
                className="group relative bg-foreground p-10 lg:p-12 overflow-hidden transition-colors duration-500 hover:bg-white/5"
              >
                <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.3em] text-white/30">
                  / {num}
                </span>
                <Icon className="h-10 w-10 mb-8 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-6deg]" strokeWidth={1.2} />
                <h3 className="font-heading text-2xl font-light mb-4">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-[28ch]">{desc}</p>
                {/* Hover line */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── COLLECTIONS ─────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─────────── TESTIMONIALS ─────────── */}
      <section className="py-section bg-muted/40">
        <div ref={testimonialsRef} className="container-custom reveal-up">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Stimmen</p>
            <h2 className="text-h1 font-heading font-light text-balance">
              Geliebt von <span className="italic">Profis</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'TMStyles hat meine Morgenroutine verändert. Die Qualität ist unübertroffen.',
                author: 'Lena K.',
                role: 'Stylistin, Berlin',
              },
              {
                quote: 'Endlich Produkte, die halten was sie versprechen. Reduziert, aber kraftvoll.',
                author: 'Marco T.',
                role: 'Barber, München',
              },
              {
                quote: 'Das Design ist genauso präzise wie die Wirkung. Absolutes Must-have.',
                author: 'Sophia R.',
                role: 'Model, Hamburg',
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="group bg-background border border-border p-8 lg:p-10 flex flex-col gap-6 transition-all duration-500 hover:border-foreground hover:-translate-y-1"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex gap-1 text-foreground">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 transition-transform duration-500 group-hover:scale-110"
                      fill="currentColor"
                      style={{ transitionDelay: `${idx * 40}ms` }}
                    />
                  ))}
                </div>
                <blockquote className="font-heading text-xl lg:text-2xl font-light leading-snug text-balance">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-6 border-t border-border">
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── TRUST BAR ─────────── */}
      <section className="py-section-sm border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {[
              { icon: Truck, title: 'Kostenloser Versand', sub: 'Ab 75 € Bestellwert' },
              { icon: RotateCcw, title: 'Einfache Retoure', sub: '30 Tage Rückgabe' },
              { icon: Shield, title: 'Sicher bezahlen', sub: '256-bit SSL Verschlüsselung' },
            ].map(({ icon: Icon, title, sub }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 justify-center md:justify-start group"
              >
                <Icon
                  className="h-6 w-6 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  strokeWidth={1.3}
                />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── NEWSLETTER CTA ─────────── */}
      <section className="relative py-section lg:py-32 bg-foreground text-background overflow-hidden noise-overlay">
        {/* Oversized background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading text-[28vw] lg:text-[16rem] font-extralight tracking-tighter text-white/[0.04] whitespace-nowrap">
            TMStyles
          </span>
        </div>

        <div ref={ctaRef} className="relative container-custom max-w-2xl text-center reveal-up">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
            Stay in the loop
          </p>
          <h2 className="text-h1 lg:text-display font-heading font-light text-balance">
            Werde Teil von <span className="italic text-gradient-silver">TMStyles</span>.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-md mx-auto">
            Exklusive Einblicke, frühe Zugänge zu neuen Drops und Styling-Tipps — direkt in dein Postfach.
          </p>
          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="deine@email.com"
              className="flex-1 border-b border-white/30 bg-transparent px-1 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="btn-press shine-on-hover bg-white text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
            >
              Abonnieren
            </button>
          </form>
          <p className="mt-6 text-xs text-white/40">
            Kein Spam. Jederzeit abbestellbar.
          </p>
        </div>
      </section>
    </>
  )
}
