// import { useCallback, useMemo } from "react"
// import { CkashReferral } from "../api/api"
// import { CkashReferral_api, REFERRAL_BASE_URL, REFERRAL_KEY } from "../constants/constant"
// import { useWalletClient } from '@divvi/mobile'

// const useCkashReferral = () => {
//   //const { data: walletClient } = useWalletClient({ networkId: "celo-mainnet" })

//   // ✅ Memoize the API instance
//   const referralApi = useMemo(() => {
//     return new CkashReferral(REFERRAL_KEY, REFERRAL_BASE_URL)
//   }, [])

//   // ✅ Only create callbacks when walletClient changes
//   const createReferralCode = useCallback(async (address:`0x${string}`) => {
   
//     return referralApi.createReferralCode(address)
//   }, [ referralApi])

//   const getUserReferralCode = useCallback(async (address:`0x${string}`) => {
   
//     return referralApi.getUserReferralCode(address)
//   }, [referralApi])

//   const claimReferralCode = useCallback(async (address:`0x${string}`,code: string) => {
    
//     return referralApi.claimReferralCode(address, code)
//   }, [referralApi])

//   return {
//     createReferralCode,
//     getUserReferralCode,
//     claimReferralCode,
//   }
// }

// export { useCkashReferral } 
import { useCallback, useMemo, useState } from "react"
import { CkashReferral } from "../api/api"
import { REFERRAL_BASE_URL, REFERRAL_KEY } from "../constants/constant"
import { useWalletClient } from "@divvi/mobile"

const useCkashReferral = () => {
  //const { data: walletClient } = useWalletClient({ networkId: "celo-mainnet" })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // ✅ Memoize the API instance
  const referralApi = useMemo(() => {
    return new CkashReferral(REFERRAL_KEY, REFERRAL_BASE_URL)
  }, [])

  // ✅ Create Referral Code
  const createReferralCode = useCallback(async (address: `0x${string}`) => {
    setError(null)
    setLoading(true)
    try {
      return await referralApi.createReferralCode(address)
    } catch (err: any) {
      setError(err?.message || "Failed to create referral code")
      throw err
    } finally {
      setLoading(false)
    }
  }, [referralApi])

  // ✅ Get User Referral Code
  const getUserReferralCode = useCallback(async (address: `0x${string}`) => {
    setError(null)
    setLoading(true)
    try {
      return await referralApi.getUserReferralCode(address)
    } catch (err: any) {
      setError(err?.message || "Failed to fetch referral code")
      throw err
    } finally {
      setLoading(false)
    }
  }, [referralApi])

  // ✅ Claim Referral Code
  const claimReferralCode = useCallback(async (address: `0x${string}`, code: string) => {
    setError(null)
    setLoading(true)
    try {
      return await referralApi.claimReferralCode(address, code)
    } catch (err: any) {
      setError(err?.message || "Failed to claim referral code")
      throw err
    } finally {
      setLoading(false)
    }
  }, [referralApi])


  //offchain Transactions

  const userOffchainTransactions = useCallback(async (address: `0x${string}`) => {
    setError(null)
    setLoading(true)
    try {
      return await referralApi.offchainTransactions(address)
    } catch (err: any) {
      setError(err?.message || "Failed to get transactions")
      throw err
    } finally {
      setLoading(false)
    }
  }, [referralApi])

  return {
    createReferralCode,
    getUserReferralCode,
    claimReferralCode,
    userOffchainTransactions,
    error,
    loading,
    clearError: () => setError(null)
  }
}

export { useCkashReferral }
