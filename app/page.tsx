"use client"

import { useState, useEffect } from "react"
import { SocratesChatbot } from "@/components/socrates-chatbot"
import { InspirationQuote } from "@/components/inspiration-quote"
import { ColorPaletteSelector } from "@/components/ColorThemePicker"
import { BreakTimer } from "@/components/breakTimer"
import { CalculatorWidget } from "@/components/calculatorWidget"
import { CurrentTimeWidget } from "@/components/currentTimeWidget"
import { LinksWidget } from "@/components/linksWidget"
import { PomodoroTimer } from "@/components/pomodoroTimer"
import { QuickNotesWidget } from "@/components/quickNotesWidget"
import { StudySoundsWidget } from "@/components/studySoundsWidget"
import { WeatherWidget } from "@/components/weatherWidget"
import { Pomodoro } from "@/components/newPomodoroTimer"
import { Sparkles, ArrowUpRight, Instagram, Twitter, Youtube, Mail } from "lucide-react"

export default function StudiioHomepage() {
  const [mounted, setMounted] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading Studiio...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300 pt-6 pb-6">
      <div className="stars" />
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 px-4">
        {/* Header with ProductHunt badge and title */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* ProductHunt Badge - Left */}
          <div className="flex-shrink-0">
            <a
              href="https://www.producthunt.com/products/studiio?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-studiio"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1012236&theme=dark&t=1757179546827"
                alt="Studiio - Personalized Study Dashboard for Students! | Product Hunt"
                className="w-[200px] h-[43px] lg:w-[250px] lg:h-[54px]"
                width="250"
                height="54"
              />
            </a>
          </div>

          {/* Title - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Studiio</h1>
            <p className="text-white-400 text-xs lg:text-sm">studying made simple.</p>
          </div>

          {/* Spacer for balance - Right */}
          <div className="flex-shrink-0 w-[200px] lg:w-[250px]"></div>
        </div>

        {/* Widget Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min mb-8">
          {/* Row 1 */}
          <div className="h-32">
            <CurrentTimeWidget />
          </div>
          <div className="h-48 md:col-span-1 lg:col-span-1">
            <PomodoroTimer />
          </div>
          <div className="h-48">
            <WeatherWidget />
          </div>
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <SocratesChatbot />
          </div>

          {/* Row 2 */}
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <QuickNotesWidget />
          </div>
          <div className="h-48">
            <StudySoundsWidget />
          </div>
          <div className="h-48">
            <BreakTimer />
          </div>
          <div className="h-48">
            <Pomodoro />
          </div>

          {/* Row 3 */}
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <CalculatorWidget />
          </div>
          <div className="h-64">
            <InspirationQuote />
          </div>
          <div className="h-96 flex items-end pb-[100px]">
            <ColorPaletteSelector />
          </div>

          {/* Row 4 */}
          <div className="h-96 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <LinksWidget />
          </div>
        </div>

        {/* Footer */}
        <footer className="glass-footer">
          <div className="glass-footer__content">
            {/* Left: Brand */}
            <div className="glass-footer__brand">
              <div className="glass-footer__logo">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="glass-footer__title">STUDIIO</h3>
                <p className="glass-footer__subtitle">Ambient focus for every study session.</p>
              </div>
            </div>

            {/* Center: Navigation */}
            <nav className="glass-footer__nav">
              <a href="#overview" className="glass-footer__link">
                Overview
              </a>
              <a href="#themes" className="glass-footer__link">
                Themes
              </a>
              <a href="#community" className="glass-footer__link">
                Community
              </a>
            </nav>

            {/* Right: CTA and Social */}
            <div className="glass-footer__actions">
              <a
                href="https://forms.gle/UHfRJfwXpUadfa4f7"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-footer__cta"
              >
                Join the beta
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="glass-footer__social">
                <a
                  href="https://www.instagram.com/studiio_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-footer__social-link"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="studiio.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-footer__social-link"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="studiio.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-footer__social-link"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="mailto:studiioxyz@gmail.com" className="glass-footer__social-link" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom: Copyright and Legal */}
          <div className="glass-footer__bottom">
            <p className="glass-footer__copyright">© {currentYear} studiio.xyz</p>
            <div className="glass-footer__legal">
              <a href="https://studiio.xyz" className="glass-footer__link">
                Privacy
              </a>
              <a href="https://studiio.xyz" className="glass-footer__link">
                Terms
              </a>
              <a href="mailto:studiioxyz@gmail.com" className="glass-footer__link">
                Press
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
