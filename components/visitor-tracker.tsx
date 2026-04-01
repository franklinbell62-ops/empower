'use client'

import { useEffect, useState } from 'react'
import { trackVisitor } from '@/lib/actions'

export function VisitorTracker() {
  const [tracked, setTracked] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true)
    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
    }
  }, [])

  useEffect(() => {
    
    if (tracked || !hasInteracted) return

    const collectVisitorData = async () => {
      try {
        
        let ip = 'Unknown'
        let location = 'Unknown'
        let timezone = 'Unknown'
        let isp = 'Unknown'

        try {
          
          const ipResponse = await fetch('https://ipapi.co/json/')
          if (ipResponse.ok) {
            const ipData = await ipResponse.json()
            ip = ipData.ip || 'Unknown'
            location = [
              ipData.city,
              ipData.region,
              ipData.country_name
            ].filter(Boolean).join(', ') || 'Unknown'
            timezone = ipData.timezone || 'Unknown'
            isp = ipData.org || 'Unknown'
          }
        } catch (error) {
          console.warn('Failed to fetch IP data:', error)
        }

        
        const device = navigator.userAgent || 'Unknown'
        const screen = `${window.screen.width}x${window.screen.height}`
        const language = navigator.language || 'Unknown'
        const referrer = document.referrer || 'Direct'
        const url = window.location.href

        
        const now = new Date()
        const localTime = now.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
        const utcTime = now.toUTCString().replace('GMT', 'UTC')

        
        await trackVisitor({
          location,
          ip,
          timezone,
          isp,
          device,
          screen,
          language,
          referrer,
          url,
          localTime,
          utcTime,
        })

        setTracked(true)
      } catch (error) {
        console.error('Error in visitor tracking:', error)
      }
    }

    collectVisitorData()
  }, [tracked, hasInteracted])

  
  return null
}
