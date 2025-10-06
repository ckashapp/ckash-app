import { NativeStackScreenProps, StackParamList } from '@divvi/mobile'

type RootStackParamList = StackParamList & {
  Home: undefined
  CustomWallet: undefined
  Service: undefined
  KenyaSendMoney: undefined
  NigeriaSendMoney: undefined
  NigeriaAirtime: undefined
  UgandaSendMoney: undefined  
  KenyaBuyAirtime: undefined
  KenyaBuyGoods: undefined
  KenyaPayBills: undefined
  GhanaSendMoney: undefined
  UgandaAirtime:undefined
  Help: undefined
  Community: undefined
  ContactForm: undefined
  ReferEarn: { code?: string }
  TransactionHistory: undefined
  TransactionDetails: {
    transaction: {
      id: string
      type: 'airtime' | 'send'
      title: string
      recipient?: string
      date: string
      amount: string
      currency: string
      isDebit: boolean
      status: 'success' | 'failed'
    }
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

// This allows type-safe navigation to known and custom screens using the `navigate` function from `@divvi/mobile`
declare global {
  namespace DivviNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
