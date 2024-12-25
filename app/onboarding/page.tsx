'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"
import { config } from "../components/config"
import { apiClient } from "../components/apiClient"


export default function OnboardingPage() {
  
  const router = useRouter()
  const { user, setUser } = useUser()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    school: "",
    level: "",
    subjects: "",
    address: "",
    phoneNumber: "",
    isPhoneVerified: false
  })

  const [verificationCode, setVerificationCode] = useState("")
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    if (!user || !user.name) {
      router.push("/signup") // Redirect if user is not logged in
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleVerifyPhone = (e: React.MouseEvent) => {
    e.preventDefault()
    // Mock verification for now
    setShowVerification(true)
    // In real implementation, would send verification code to phone number
  }

  const handleSubmitVerification = (e: React.MouseEvent) => {
    e.preventDefault()
    // Mock verification check
    if (verificationCode) {
      setFormData(prev => ({ ...prev, isPhoneVerified: true }))
      setShowVerification(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.isPhoneVerified) {
      alert("Please verify your phone number before proceeding.")
      return
    }

    if (config.useMock) {
      console.warn("[MOCK MODE] Simulating onboarding...")
      setUser({ ...user, ...formData })
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }))
      router.push("/dashboard/tutee")
      return
    }

    try {
      const res = await apiClient.post(`${config.BASE_URL}/api/onboarding`, {
        ...user,
        ...formData,
      })

      if (res.status === 200) {
        setUser({ ...user, ...formData })
        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }))
        router.push("/dashboard")
      } else {
        alert("Onboarding failed. Please try again.")
      }
    } catch (error) {
      console.error("Onboarding Error:", error)
      alert("Network error. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#fff2de] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.png" alt="Logo" width={150} height={75} />
        </div>
        <h2 className="text-2xl font-bold mb-8 text-[#4a58b5] text-center">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">Level</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">Subject(s)</label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4a58b5] text-lg mb-2">Phone Number</label>
            <div className="flex space-x-2">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerifyPhone}
                className="px-4 py-2 bg-[#fabb84] text-white rounded-lg hover:bg-[#fc6453] transition-colors duration-200"
                disabled={formData.isPhoneVerified}
              >
                {formData.isPhoneVerified ? "Verified" : "Verify"}
              </motion.button>
            </div>
          </div>

          {showVerification && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <label className="block text-[#4a58b5] text-sm">
                Enter verification code sent to your phone
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fabb84]"
                  placeholder="Enter code"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitVerification}
                  className="px-4 py-2 bg-[#fabb84] text-white rounded-lg hover:bg-[#fc6453] transition-colors duration-200"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-[#fabb84] text-white rounded-lg hover:bg-[#fc6453] transition-colors duration-200 text-lg font-medium mt-8"
          >
            Complete Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

