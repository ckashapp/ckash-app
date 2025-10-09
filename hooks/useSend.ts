import { useState } from 'react'
import { useSendTransactionStable } from './useSendTransactionStable'
import { PRETIUM_ADDRESS, Pretium_api } from '../constants/constant'
import { TokenBalance } from '@divvi/mobile/src/tokens/slice'
import { CountryCodes, PaymentType } from '../api/types'
import { getWalletClient, useWalletClient } from 'src/public'

type MobileNetwork = 'Safaricom' | 'MTN' | 'Airtel' | 'AirtelTigo' | 'Telcel' 

// transaction_hash:string, i.e "0x75674743763476734677567"
//  * type:"PAYBILL",
//  * shortcode:string , i.e "247247"
//  * account_number:string, i.e "0701707772"
//  * amount:string  , i.e "5000"
interface SendMoneyProps {
  shortcode?: string
  rawAmount?: string
  account_number?:string
  country_code?: CountryCodes
  country_code_refund?:CountryCodes
  type?:PaymentType
  account_name?: string
  bank_name?: string
  bank_code?:string
  ratedTokenAmount?: string
  mobileNetwork: MobileNetwork
  tokenBalance: TokenBalance
  from: `0x${string}`
  to: `0x${string}`
  feeCurrency: `0x${string}`
  tokenDecimal?:number
}

export const useSend = () => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendStableToken, error: txError } = useSendTransactionStable()
  

  const sendMoney = async ({
     shortcode,
     type,
    rawAmount,
    account_number,
    country_code,
    country_code_refund,
    ratedTokenAmount,
    bank_code,
    bank_name,
    account_name,
    mobileNetwork,
    tokenBalance,
    from,
    to,
    feeCurrency,
    tokenDecimal
  }: SendMoneyProps) => {
    try {
      setLoading(true)
      setError(null)
      setIsError(false)

      // Send the on-chaintransaction
      const txHash = await sendStableToken({
        from,
        to,
        tokenBalance,
        type: 'cip64',
        recipient: PRETIUM_ADDRESS,
        amount: ratedTokenAmount as string,
        feeCurrency: feeCurrency,
        tokenDecimal:tokenDecimal
      })
      if (txError) {
        setIsError(true);
        setError(txError || 'Transaction error occurred');
        setLoading(false);
        return { txHash: null, response: null };
      }
  
      
      if (!txHash) {
        setIsError(true);
        setError('Transaction failed');
        setLoading(false);
        return { txHash: null, response: null };
      }
      

      // Make the payment prof to Pretium API
      const response = await Pretium_api.make_payment({
        mobile_network: mobileNetwork,
        shortcode: shortcode,
        type: type,//'MOBILE',
        account_number:account_number,
        transaction_hash: txHash,
        amount: rawAmount as string,
        country_code:country_code,
        account_name: account_name,
        bank_code: bank_code,
        bank_name: bank_name,
        userAddress:from as string
      })
      // console.log("THE ACCOUNT Name",account_name)
      // console.log("Country Code", country_code)
      // console.log("PRETIUM RESPONSE RESPONSE RESPONSE",response)
      // console.log("THE RESPONSE CODE", response.data?.transaction_code)
      //const dt = await new Promise(resolve => setTimeout(async () => resolve(await Pretium_api.refund({ transaction_code: response.data?.transaction_code, country_code: country_code_refund })), 6000));

      //console.log("THE REFUND",dt)
       if(response.code.toString() !== "200"){
         setError('Transaction Failed try again')
         setIsError(true)
         setLoading(false)
         
         return { txHash: null, response: null }
         
       }
      

      return { txHash, response }
    } catch (err) {
      console.log("PRETIUM RESPONSE RESPONSE RESPONSE CATCH",err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsError(true)
      throw err
    } finally {
      setLoading(false)
      //setIsError(false)
    }
  }

  return {
    sendMoney,
    loading,
    error,
    isError
  }
}
