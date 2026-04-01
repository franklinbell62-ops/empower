import { Facebook, Twitter, Instagram, MessageCircle, Youtube, Linkedin, TicketIcon as TikTok } from "lucide-react"

export function HelpSection() {
  return (
    <div className="text-white px-4 py-12 md:py-16" style={{ backgroundColor: 'rgb(0, 33, 87)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help?</h2>
            <p className="mb-3 text-gray-200 text-sm md:text-base leading-relaxed">
              To speak with a representative regarding your account,{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200 font-semibold">
                contact us
              </a>
            </p>
            <p className="mb-4 text-gray-200 text-sm md:text-base leading-relaxed">
              <span className="font-bold">Monday - Friday</span> between 6 a.m. - 8 p.m. Mountain time, and{" "}
              <span className="font-bold">Saturdays</span> between 7 a.m. - 3:30 p.m. Mountain time.
            </p>
            <p className="text-3xl md:text-4xl font-bold mt-8 mb-8">1-855-756-4738</p>

            
            <div className="flex gap-4 mb-10 flex-wrap">
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="Snapchat">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors" aria-label="TikTok">
                <TikTok className="w-6 h-6" />
              </a>
            </div>

            
            <div className="text-gray-300 text-sm">
              <a href="http://brokercheck.finra.org/firm/13109" target="_blank" rel="noreferrer" aria-label="FINRA's BrokerCheck website (Opens in new tab)">
                <img src="/broker-check-color-logo.svg" alt="FINRA's BrokerCheck logo" className="h-8 w-auto" />
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
