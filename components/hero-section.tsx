import { LoginForm } from "@/components/login-form"

export function HeroSection() {
  return (
    <section className="relative py-8 md:py-20 px-4 md:px-8 overflow-hidden lg:min-h-[450px] bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[35px] items-center lg:items-center">

          
          <div className="lg:hidden w-full flex justify-center py-4">
            <div
              className="bg-white p-6 shadow-lg flex flex-col justify-between"
              style={{
                width: '312px',
                height: '327px',
                borderTopRightRadius: '32px',
                borderBottomRightRadius: '32px',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
                boxSizing: 'border-box',
                fontFamily: '"Open Sans", Arial, sans-serif',
              }}
            >
              <div>
                <h2 className="text-[24px] font-bold text-[#003d6b] leading-[1.1] mb-3">
                  Empower your financial freedom today
                </h2>
                <p className="text-[14px] text-[#363636] leading-[1.6] mb-4">
                  Register your account for extra security that helps protect your savings from unauthorized access.
                </p>
              </div>
              <a
                href="#"
                className="inline-block px-6 py-2 border-2 border-[#0074da] rounded-full text-[#0074da] font-bold text-base hover:bg-[#0074da] hover:text-white transition-all text-center w-full"
              >
                Learn how to register
              </a>
            </div>
          </div>

          
          <div className="hidden lg:block">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-gray-200" style={{ width: '850px', height: '302px' }}>
              <img
                src="/banner-empower-financial-freedom.jpg"
                alt="Empower your financial freedom today"
                className="w-full h-full object-cover"
              />
              
              <a
                href="https://www.empower.com/learning_center/stay-on-track.shtml#/"
                target="_blank"
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  marginLeft: '247.5px',
                  width: '412.5px',
                  padding: '24px',
                  color: 'rgb(0, 0, 0)',
                  fontFamily: '"Open Sans", Arial, sans-serif',
                  fontSize: '16.8px',
                  fontWeight: 400,
                  lineHeight: '28.56px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  background: 'none',
                  zIndex: 2,
                  borderBottomRightRadius: '32px',
                  borderTopRightRadius: '32px',
                }}
                title="Link to Empower your financial freedom today page"
                aria-label="Link to Empower your financial freedom today page"
              >
                <h2 className="text-2xl font-bold mb-4">Empower your financial freedom today</h2>
                <span className="block mb-4">Register your account for extra security that helps protect your savings from unauthorized access.</span>
                <span className="font-bold border-2 border-black px-6 py-2 rounded-lg inline-block hover:bg-black hover:text-white transition-colors">Learn how to register</span>
              </a>
            </div>
          </div>

          
          <div className="hidden lg:block">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}
