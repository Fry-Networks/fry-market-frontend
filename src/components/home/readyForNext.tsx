import { useWallet } from '@txnlab/use-wallet'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import readyDropIcon from '../../assets/home/images/homeImages/readyDropBtn.webp'
import Input from '../shared/input'
const baseUrl = import.meta.env.VITE_API_BASE_URL

const ReadyForNext = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { activeAccount } = useWallet()
  const saveEmail = async () => {
    // Prevent multiple submissions
    if (isSubmitting) return

    // Input validation
    if (!email?.trim()) {
      toast.error('Please enter your email address', {
        position: 'top-center',
        autoClose: 4000,
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.toLowerCase())) {
      toast.error('Please enter a valid email address (e.g., user@example.com)', {
        position: 'top-center',
        autoClose: 4000,
      })
      return
    }

    setIsSubmitting(true)

    // Try different wallet address values in case of failure
    const walletAddressFallbacks = activeAccount?.address ? [activeAccount.address.toString()] : ['', 'null', '0', null] // Different fallback values to try

    let lastError: any = null
    let success = false

    for (let i = 0; i < walletAddressFallbacks.length && !success; i++) {
      try {
        const walletValue = walletAddressFallbacks[i]

        // Prepare request data
        const requestData: Record<string, string> = {
          email: email.trim(),
        }

        // Add wallet address if it's not null
        if (walletValue !== null) {
          requestData.wallet_address = walletValue
        }

        console.log(`Newsletter attempt ${i + 1}:`, {
          hasWallet: !!activeAccount?.address,
          email: email.trim(),
          wallet_address: walletValue,
          includingWalletField: walletValue !== null,
        })

        const response = await axios({
          method: 'post',
          url: `${baseUrl}/store-email`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          data: new URLSearchParams(requestData).toString(),
          timeout: 10000,
        })

        // Success handling
        if (response.status === 201 || response.status === 200) {
          const successMessage = activeAccount?.address
            ? "🎉 Email registered successfully! You'll receive priority access to drops."
            : "✅ Email registered successfully! You'll receive newsletter updates."

          toast.success(successMessage, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          setEmail('') // Clear the input on success
          setIsSuccess(true) // Show success state
          // Reset success state after 3 seconds
          setTimeout(() => setIsSuccess(false), 3000)
          success = true
          console.log(`Newsletter subscription successful on attempt ${i + 1}`)
          break
        }
      } catch (error: any) {
        lastError = error
        console.warn(`Newsletter attempt ${i + 1} failed:`, error?.response?.status, error?.response?.data)

        // If it's not a wallet-related error, don't try other fallbacks
        if (
          error.response?.status === 409 || // Already registered
          error.response?.status === 400 || // Bad request (probably email issue)
          (error.response?.status === 422 && activeAccount?.address)
        ) {
          // Validation error when wallet is connected
          break
        }
      }
    }

    // Handle final error if all attempts failed
    if (!success && lastError) {
      console.error('All newsletter subscription attempts failed:', lastError)

      if (lastError.response) {
        const status = lastError.response.status
        const errorData = lastError.response.data

        switch (status) {
          case 409:
            toast.error('This email is already registered for updates')
            break
          case 422:
            const errorMessage = errorData?.message || errorData?.error || 'Please check your email format'
            toast.error(`Validation error: ${errorMessage}`)
            break
          case 400:
            toast.error('Invalid request. Please check your email and try again.')
            break
          case 500:
            toast.error('Server error. Please try again later.')
            break
          default:
            toast.error(`Registration failed (${status}). Please try again.`)
        }
      } else if (lastError.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please check your connection and try again.')
      } else if (lastError.request) {
        toast.error('Network error. Please check your connection and try again.')
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    }

    setIsSubmitting(false)
  }

  const placeholderStyle = {
    color: 'red',
  }
  return (
    <>
      <div className="nextNftWrapper">
        <div className="container mb-10">
          <h2 className="font-bold font-Oxanium capitalize darkBlack mb-10 text-center">
            Ready<span className="lowercase"> for the</span> Next NFT Drop?
          </h2>

          {/* Optional wallet connection info */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              {activeAccount?.address
                ? "🎉 Wallet connected! You'll receive priority access to drops."
                : 'Subscribe to our newsletter for updates. Connect wallet for priority access!'}
            </p>
          </div>

          <div style={{ width: '680px', height: '96px', margin: '0 auto' }} className="relative nftDropInput ">
            <Input
              wrapperClass="flex items-center justify-center mx-auto z-10"
              placeholder="Enter your email address"
              inputClass="ex-large font-normal font-Roboto primary mx-auto flex items-center justify-center custom-placeholder"
              width={680}
              height={96}
              minHeight={96}
              type="email"
              className="m-auto nftdropInput"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' && !isSubmitting) {
                  saveEmail()
                }
              }}
            />

            <img
              className={`absolute top-[17px] right-8 object-cover cursor-pointer emailBtn transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : isSuccess ? 'opacity-100 scale-110' : 'hover:opacity-80 hover:scale-105'
                }`}
              style={{ width: '88px', height: '76px' }}
              src={readyDropIcon}
              alt={isSuccess ? 'Successfully subscribed!' : isSubmitting ? 'Submitting...' : 'Subscribe to newsletter'}
              onClick={isSubmitting ? undefined : saveEmail}
            />
          </div>

          {/* Success message */}
          {isSuccess && (
            <div className="text-center mt-4">
              <p className="text-green-600 font-medium text-lg animate-pulse">
                ✅ Successfully subscribed! Check your email for confirmation.
              </p>
            </div>
          )}

          {/* Loading message */}
          {isSubmitting && (
            <div className="text-center mt-4">
              <p className="text-blue-600 font-medium text-lg animate-pulse">🔄 Subscribing to newsletter...</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReadyForNext
