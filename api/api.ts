import { CKASH_CAll_BACK, REFERRAL_BASE_URL } from '../constants/constant'
import { ACCOUNTVALIDATION, MAKEPAYMENT, REFUND } from './types'

class Pretium {
  api_key: string
  baseURL: string

  constructor(api_Key: string, baseURL: string) {
    this.api_key = api_Key
    this.baseURL = baseURL
  }

  getHeaders = () => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('x-api-key', this.api_key)
    //console.log('THE REQUEST HEADERS', requestHeaders)
    return requestHeaders
  }

  exchange_rate = async (local_currency_code: string = 'KES') => {
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify({
        currency_code: local_currency_code,
      }),
    }
    const url = `${this.baseURL}v1/exchange-rate`
    try {
      const response = await fetch(url, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Exchange rate fetch failed:', error)
      throw error
    }
  }
    
  account_validation = async (validation:ACCOUNTVALIDATION) => {
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify({
        shortcode: validation.shortcode,
        type: validation.type,
        mobile_network: validation.mobile_network,
        account_number: validation.account_number,
        bank_code:validation.bank_code,
      }),
    }
    const url = validation.country_code ? `${this.baseURL}v1/validation/${validation.country_code}` : `${this.baseURL}v1/validation`
    console.log("THE URL",url)
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data
    } catch (error) {
      //console.error('Error validating account:', error)
     // console.log('THE ERROR IS', error)
      //throw error;
    }
  }

  make_payment = async (makepayment: MAKEPAYMENT) => {
    //     "transaction_hash":"0x325caeb3cbb408faacb438a03e5b30f6f1068f65ec5b7de934f8d4a9ac2717b5",
    // "type": "MOBILE",
    // "shortcode": "0725212418",
    // "amount": "5000",
    // country: "Uganda"
    // Kenya "mobile_network": "Safaricom"
    // Uganda (mobile_network): Airtel,MTN
    // Ghana (mobile_network): Tigo,MTN

    const payload: MAKEPAYMENT = {
      transaction_hash: makepayment.transaction_hash,
      type: makepayment.type,
      shortcode: makepayment.shortcode,
      amount: makepayment.amount,
      mobile_network: makepayment.mobile_network,
      account_number:makepayment.account_number,
      account_name: makepayment.account_name,
      bank_code: makepayment.bank_code,
      bank_name: makepayment.bank_name,
      callback_url: `${REFERRAL_BASE_URL}api/v1/ckash/callback/${makepayment.userAddress}/${makepayment.amount}/${makepayment.mobile_network}`,
      userAddress:makepayment.userAddress
    }
    console.log("THE PAYLOAD",payload)
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    }

    const url = makepayment.country_code? `${this.baseURL}v1/pay/${makepayment.country_code}` : `${this.baseURL}v1/pay`
    console.log("URL",url)
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data
    } catch (error) {
      console.log('ERROR making payment')
    }
  }
  //refund
  refund = async (refund: REFUND) => {
    const payload: REFUND = {
      transaction_code: refund.transaction_code
      
    }
    console.log("THE REFUND IS",refund)
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    }
    const url = `${this.baseURL}v1/refund/${refund.country_code}`
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    return data
    
    
  }

  //banks
}

//Refferall

class CkashReferral{
  api_key: string
  baseURL: string

  constructor(api_Key: string, baseURL: string) {
    this.api_key = api_Key
    this.baseURL = baseURL
  }

  getHeaders = () => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('x-api-key', this.api_key)
    //console.log('THE REQUEST HEADERS', requestHeaders)
    return requestHeaders
  }

  createReferralCode = async (address: `0x${string}`) => {
    const payload = {
      userAddress: address
    }
    console.log("The payload for referral",payload)
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    }
    console.log("The request",requestOptions)
    const url = `${this.baseURL}api/v1/referral/create`
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log("The data",data)
    return data
  }

  getUserReferralCode = async (address: `0x${string}`) => {
    
    const requestOptions = {
      method: 'GET' as const,
      headers: this.getHeaders()
     
    }
    const url = `${this.baseURL}api/v1/referral/referral-code?address=${address}`
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log("The data the result",data)
    return data
    
  }

  claimReferralCode = async (address:`0x${string}`,code:string) => {
    const payload = {
      userAddress: address,
      code:code
    }
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    }
    const url = `${this.baseURL}api/v1/referral/claim`
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    return data
    
  }

  ///transactions?userAddress=0x123&page=1&limit=10

  offchainTransactions= async (address:`0x${string}`) => {
    const payload = {
      userAddress: address      
    }
    const requestOptions = {
      method: 'GET' as const,
      headers: this.getHeaders(),
      // body: JSON.stringify(payload),
    }
    const url = `${this.baseURL}api/v1/ckash/transactions?userAddress=${address}&page=1&limit=10`
    const response = await fetch(url, requestOptions)
    console.log("The Response data",response)
    const data = await response.json()
    return data
    
  }


}

export { Pretium,CkashReferral}
