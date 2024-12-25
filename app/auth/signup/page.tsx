'use client'

import { motion } from "framer-motion"
import { Eye, EyeOff } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useUser } from "../../context/UserContext"
import { config } from "../../components/config"
import { apiClient } from "../../components/apiClient"

const ROLES = ["Tutor", "Tutee"] as const

export default function SignupPage() {
  const router = useRouter()
  const { setUser } = useUser()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<typeof ROLES[number] | "">("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match.")
      return
    }

    if (!userType) {
      alert("Please select a role.")
      return
    }

    setLoading(true)

    if (config.useMock) {
      console.warn("[MOCK MODE] Simulating signup...")
      setUser({ name, email, userType })
      localStorage.setItem("user", JSON.stringify({ name, email, userType }))
      router.push("/onboarding")
      setLoading(false)
      return
    }

    try {
      const res = await apiClient.post(`${config.BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
        userType: userType.toLowerCase(),
      })

      if (res.status === 201) {
        const data = await res.json()
        setUser({ name, email, userType: userType.toLowerCase() })
        localStorage.setItem("user", JSON.stringify({ name, email, userType }))
        router.push("/onboarding")
      } else {
        alert("Signup failed. Please try again.")
      }
    } catch (error) {
      console.error("Error during signup:", error)
      alert("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff2de]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.png" alt="Logo" width={150} height={75} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-[#4a58b5] text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm font-medium text-[#4a58b5] mb-2">I am signing up as a:</p>
            <div className="flex items-center space-x-4">
              {ROLES.map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={role}
                    checked={userType === role}
                    onChange={() => setUserType(role)}
                    className="form-radio text-[#fabb84] focus:ring-[#fabb84]"
                  />
                  <span className="text-sm text-[#4a58b5]">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4a58b5] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fabb84] text-[#4a58b5]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4a58b5] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fabb84] text-[#4a58b5]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4a58b5] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fabb84] text-[#4a58b5] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4a58b5] mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fabb84] text-[#4a58b5]"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-[#fabb84] hover:bg-[#fc6453] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fabb84] transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Next"}
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-[#4a58b5]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#fc6453] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

