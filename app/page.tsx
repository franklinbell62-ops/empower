"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear()
      
      localStorage.removeItem('loginAttempts')
      localStorage.removeItem('selectedOption')
    }
  }, [])

  return (
    <main className="min-h-screen bg-white flex flex-col">
      
      <div
        style={{
          backgroundImage: 'url(/empower-background-dark-white-flag.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top'
        }}
      >
        <Header />
        
        <div className="lg:hidden pt-8 pb-12 px-1 flex justify-center">
          <LoginForm />
        </div>
        <HeroSection />
      </div>

      
      <FeatureCards />

      
      <Footer />
    </main>
  )
}
