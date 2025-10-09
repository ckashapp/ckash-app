


export type MAKEPAYMENT ={
  "transaction_hash":string,
 "type"?: PaymentType,
 "shortcode"?: string,
 account_number?:string,
 "amount": string,
 "mobile_network": MobileNetwork,
 country_code?:string
 account_name?: string,
 bank_name?: string,
  bank_code?: string,
  callback_url?: string,
 userAddress: string
 
}

export type REFUND = {
transaction_code: string,
country_code?:CountryCodes
}
export type ACCOUNTVALIDATION = {
 type?: string,
 shortcode?: string,
 mobile_network?: MobileNetwork ,
 account_number?: string,
 bank_code?: string,
 country_code?:string
}
export type PaymentType = 'MOBILE' | 'PAYBILL' | 'BUY_GOODS'

export type MobileNetwork = 'Safaricom' | 'MTN' | 'AirtelTigo' | 'Telcel'  | 'Airtel'

export type CountryCodes = 'KES' | 'GHS' | 'UGX' | 'NGN' 

export type nigeriaBanks = Record<string, string>

export const NigeriaBanks: nigeriaBanks = {
 "Moniepoint": "090405",
 "Palmpay": "100033",
 "Opay": "100004",    
};


//ALL SERVICES USES baseurl/v1/pay



/********
* KENYA SERVICES
* 1. Send money
*  *******************
* BODY:{
* transaction_hash:string, i.e "0x75674743763476734677567"
* type:"MOBILE",
* shortcode:string , i.e "0701707772"
* amount:string  , i.e "5000"
* mobile_network:"Safaricom"  
* }* 
* 
* ***************************** 
* 2. PAYBILL
* ******************
*BODY:{
* transaction_hash:string, i.e "0x75674743763476734677567"
* type:"PAYBILL",
* shortcode:string , i.e "247247"
* account_number:string, i.e "0701707772"
* amount:string  , i.e "5000"
* 
* }* 
* *******************
* 3. BUY GOODS
* ******************
* BODY:{
* transaction_hash:string, i.e "0x75674743763476734677567"
* type:"BUY_GOODS",
* shortcode:string , i.e "456839"
* amount:string  , i.e "5000"
*   
* }* 
* **********
* 
* 
* UGANDA
* 
* 1."SEND MONEY"
* BODY:{
* transaction_hash:string, i.e "0x75674743763476734677567"
* type:"MOBILE",
* shortcode:string , i.e "0701707772"
* amount:string  , i.e "5000"
* mobile_network:"MTN"  either MTN | Airtel 
* }* 
* 
* 
* 
* *****************************
* GHANA
* 
* 1. SEND MONEY
* BODY:{
* transaction_hash:string, i.e "0x75674743763476734677567"
* type:"MOBILE",
* shortcode:string , i.e "0701707772"
* amount:string  , i.e "5000"
* mobile_network:"MTN"   either MTN | AirtelTigo | Telcel
* }* 
* 
* 
*/

// Zendesk Support Ticket Types
export type ZendeskTicket = {
subject: string
description: string
requester_id?: string
submitter_id?: string
priority?: 'urgent' | 'high' | 'normal' | 'low'
tags?: string[]
custom_fields?: Record<string, any>
}

export type ZendeskUser = {
name: string
email: string
phone?: string
organization_id?: number
tags?: string[]
user_fields?: Record<string, any>
}

export type ZendeskTicketResponse = {
ticket: {
 id: number
 url: string
 status: string
 priority: string
 subject: string
 description: string
 created_at: string
 updated_at: string
}
}

export type ZendeskUserResponse = {
user: {
 id: number
 name: string
 email: string
 created_at: string
 updated_at: string
}
}


//offchain transactions
export interface OffchainTransaction {
  id: string;
  status: string; // e.g. "COMPLETE"
  transactionCode: string;
  receiptNumber: string;
  publicName: string;
  mobileNetwork: string,
  amount:string,
  message: string;
  userAddress: `0x${string}`;
  createdAt: string; 
  updatedAt: string; 
}
