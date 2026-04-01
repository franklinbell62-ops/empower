"use client"

import { useState } from "react"
import { Menu, ExternalLink } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 md:px-8 flex items-center h-[90px] lg:h-[100px] bg-transparent border-b border-white/30 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        <div className="lg:hidden w-8"></div>

        
        <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
          <a href="/" className="flex items-center hover:opacity-90 transition-opacity" aria-label="Back to homepage">
            <img src="/empower-logo-dark.svg" alt="Empower" className="h-[40px] lg:h-[48px] w-auto" />
          </a>
        </div>

        
        <div className="hidden lg:flex items-center gap-4 flex-1 text-white border-l border-white/20 pl-6 ml-6">
          <span className="font-normal text-[20px] leading-none">Your Retirement Plan</span>
        </div>

        
        <nav className="flex items-center gap-6 text-white relative">
          <div className="hidden lg:flex items-center gap-6 text-sm text-blue-100">
            <a href="#" className="hover:text-white transition-colors">Fund Information</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Plan Service Center</span>
              <ExternalLink size={14} />
            </a>
          </div>

          
          <div className="lg:hidden relative">
            <button
              className="text-white p-1 border border-white/40 bg-transparent flex items-center justify-center"
              aria-label="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={32} />
            </button>

            
            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 bg-[#767676] text-white z-50 shadow-lg"
                style={{ width: '123px', height: '62px' }}
              >
                <div className="flex flex-col h-full text-[10px] font-medium">
                  <a href="#" className="px-2 py-1.5 border-b border-white/20 hover:bg-white/10 flex items-center h-1/2">
                    Fund Information
                  </a>
                  <a href="#" className="px-2 py-1.5 hover:bg-white/10 flex items-center gap-1 h-1/2">
                    <ExternalLink size={10} />
                    <span className="leading-tight">Plan Service Center</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
