import { Facebook, Twitter, Instagram, MessageCircle, Youtube, Linkedin, TicketIcon as TikTok, Menu } from "lucide-react"

export function Footer() {
  return (
    <footer className="text-white px-[64px] py-[32px] md:py-[64px] flex items-center h-auto lg:h-[478px] box-border" style={{ backgroundColor: '#002157' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">


          
          <div className="space-y-6 text-[11px] md:text-sm text-gray-300 leading-relaxed order-2 lg:order-1 lg:border-none">
            <p className="pb-6 border-b border-blue-900 lg:border-none">
              Securities, when presented, are offered and/or distributed by Empower Financial Services, Inc., Member{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200">FINRA/SIPC</a>.
              EFSI is an affiliate of Empower Retirement, LLC; Empower Funds, Inc.; and registered investment adviser,
              Empower Advisory Group, LLC. This material is for informational purposes only and is not intended to provide
              investment, legal or tax recommendations or advice.
            </p>
            <p className="pb-6 border-b border-blue-900 lg:border-none">Investing involves risk, including possible loss of principal.</p>

            <div className="pt-4 lg:pt-0 lg:border-t lg:border-blue-800/50 space-y-4">
              <p className="pb-6 border-b border-blue-900 lg:border-none">
                "EMPOWER" and all associated logos, and product names are trademarks of Empower Annuity Insurance Company of America.
              </p>
              <p className="pb-6 border-b border-blue-900 lg:border-none">
                © 2025 Empower Annuity Insurance Company of America. All rights reserved. RO3943483-0925
              </p>
            </div>

            <p className="font-semibold text-white pt-4">
              Unless otherwise noted, investments are not deposits, insured by the FDIC or any federal government agency,
              or bank guaranteed and may lose value.
            </p>
          </div>

          
          <div className="lg:pl-12 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help?</h2>
            <div className="text-gray-200 text-sm space-y-2 mb-6 text-center lg:text-left">
              <p>
                To speak with a representative regarding your account,{" "}
                <a href="#" className="text-blue-300 hover:text-blue-200 font-semibold underline underline-offset-4">
                  contact us
                </a>
              </p>
              <p>
                Monday - Friday between 6 a.m. - 8 p.m. Mountain time, and Saturdays between 7 a.m. - 3:30 p.m. Mountain time.
              </p>
            </div>

            <p className="text-2xl md:text-3xl font-bold mb-8">1-855-756-4738</p>

            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: MessageCircle, label: "Snapchat" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: TikTok, label: "TikTok" }
              ].map(({ Icon, label }) => (
                <a key={label} href="#" className="text-white hover:text-blue-300 transition-colors" aria-label={label}>
                  <Icon className="w-8 h-8 lg:w-6 lg:h-6" />
                </a>
              ))}
            </div>

            
            <div className="flex justify-center lg:justify-start mb-10 pb-10 border-b border-blue-900 lg:border-none lg:mb-0 lg:pb-0 w-full lg:w-auto">
              <a href="https://brokercheck.finra.org/" target="_blank" rel="noopener noreferrer">
                <img src="/broker-check-color-logo.svg" alt="BrokerCheck" className="h-[48px] lg:h-10 w-auto opacity-90 lg:opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col lg:flex-row flex-wrap gap-y-1 lg:gap-x-4 text-left text-[14px] lg:text-[11px] font-bold text-blue-400 pt-8 lg:border-t lg:border-blue-900 mt-8 mb-12 lg:mb-0 ml-4 lg:ml-0 pl-4 lg:pl-0 border-l lg:border-l-0 border-blue-400/50">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:text-white">Security Center</a>
            <span className="lg:hidden">|</span>
            <a href="#" className="hover:text-white lg:border-r lg:border-blue-800 lg:pr-4">Accessibility</a>
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-1 lg:hidden">
            <a href="#" className="hover:text-white">System Requirements</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-1 lg:hidden">
            <a href="#" className="hover:text-white">Terms</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Business Continuity</a>
          </div>

          <a href="#" className="hover:text-white lg:hidden">FINRA Investor Education</a>
          <a href="#" className="hover:text-white lg:hidden">Market Timing and Excessive Trading</a>
          <a href="#" className="hover:text-white lg:hidden">Do not sell or share my personal information</a>

          
          <div className="hidden lg:flex flex-wrap gap-x-4">
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">System Requirements</a>
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">Privacy</a>
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">Terms</a>
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">Business Continuity</a>
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">FINRA Investor Education</a>
            <a href="#" className="hover:text-white border-r border-blue-800 pr-4">Market Timing and Excessive Trading</a>
            <a href="#" className="hover:text-white">Do not sell or share my personal information</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
