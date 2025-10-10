import { CkashReferral, Pretium } from '../api/api'
import MpesaIcon from '../assets/icons/sendmoney-icon.svg'
import AirtimeIcon from '../assets/icons/airtime-icon.svg'
import DataIcon from '../assets/icons/network-icon.svg'
import PaybillIcon from '../assets/icons/paybills-icon.svg'
import AirtelTigoIcon from '../assets/icons/airteltigo-icon.svg'
import SendMoneyIcon from '../assets/icons/opay-icon.svg'
import MTNIcon from '../assets/icons/mtn-icon.svg'
import TelecelIcon from '../assets/icons/telecel-icon.svg'
import BuyGoodsIcon from '../assets/icons/buygoods-icon.svg'
import Constants from 'expo-constants';

const { BASE_URL,
  API_KEY,
  ZENDESK_SUBDOMAIN,
  ZENDESK_API_TOKEN,
  ZENDESK_EMAIL,
  ZENDESK_BASE_URL,
  REFERRAL_KEY,
  REFERRAL_BASE_URL,  
  SEGMENT_API

 } = Constants.expoConfig?.extra || {};




export const CHAIN_ID = 42220
export const PRETIUM_ADDRESS = '0x8005ee53E57aB11E11eAA4EFe07Ee3835Dc02F98'
export const CHAIN = 'celo'

//divvi campaigns providers 
export const USDT_CAMPAIGN = "0xB575210cdF52B18000aE24Be4981e9ABC7716F98"

export const cKASH_DIVVI_ID = "0x93F40b8720943B941e1663331d8752d49C0D0544"
// Network configurations
export const NETWORK_CONFIG = {
  chainId: CHAIN_ID,
  name: CHAIN,
  pretiumAddress: PRETIUM_ADDRESS,
} as const

export type Service = {
  name: string
  icon: any
  navigate: string | any
}

export const services: Record<string, Service[]> = {
  Kenya: [
    {
      name: 'Send Money',
      icon: MpesaIcon,
      navigate: 'KenyaSendMoney',
    },
    // {
    //   name: 'Air-time',
    //   icon: DataIcon,
    //   navigate: 'KenyaBuyAirtime', // Temporarily point to an existing screen until KenyaAirtime is implemented
    // },
    {
      name: 'Buy Goods',
      icon: BuyGoodsIcon,
      navigate: 'KenyaBuyGoods', // Temporarily point to an existing screen until KenyaData is implemented
    },
    {
      name: 'Paybill',
      icon: PaybillIcon,
      navigate: 'KenyaPayBills', // Temporarily point to an existing screen until KenyaPaybill is implemented
    },
  ],
  Uganda: [
    {
      name: 'Send Money',
      icon: MpesaIcon,
      navigate: 'UgandaSendMoney',
    },
    // {
    //   name: 'Air-time',
    //   icon: DataIcon,
    //   navigate: 'UgandaAirtime',
    // },
  ],
  Nigeria: [
    {
      name: 'Send Money',
      icon: MpesaIcon,
      navigate: 'NigeriaSendMoney',
    },
    // {
    //   name: 'Air-time',
    //   icon: AirtimeIcon,
    //   navigate: 'NigeriaAirtime',
    // },
  ],
  Ghana: [
    {
      name: 'Send Money',
      icon: MpesaIcon,
      navigate: 'GhanaSendMoney', // Temporarily point to an existing screen until GhanaMTN is implemented
    },
  ],
}

// API configuration with fallback values
// Use fallback values if environment variables are not set
//const API_KEY = process.env.API_KEY || 'development_api_key'
//const BASE_URL = process.env.BASE_URL || 'https://api-dev.example.com'

// Zendesk Configuration
export const ZENDESK_CONFIG = {
  subdomain: ZENDESK_SUBDOMAIN as string ,
  apiToken:ZENDESK_API_TOKEN as string ,
  email: ZENDESK_EMAIL as string,
  baseUrl: ZENDESK_BASE_URL as string ,
} as const

if (!API_KEY || !BASE_URL) {
  console.warn(
    'API_KEY and BASE_URL environment variables are not set. Using fallback values for development.',
  )
}

const Pretium_api = new Pretium(API_KEY, BASE_URL)
const CkashReferral_api = new CkashReferral(REFERRAL_KEY,REFERRAL_BASE_URL)

export { Pretium_api,CkashReferral_api,REFERRAL_BASE_URL,REFERRAL_KEY,SEGMENT_API }
