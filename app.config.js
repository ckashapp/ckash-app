export default ({ config }) => ({
    ...config,
    extra: {
        ...config.extra,
        API_KEY:process.env.API_KEY,
        BASE_URL:process.env.BASE_URL,
      
      ZENDESK_SUBDOMAIN:process.env.ZENDESK_SUBDOMAIN,
      ZENDESK_API_TOKEN:process.env.ZENDESK_API_TOKEN,
      ZENDESK_EMAIL:process.env.ZENDESK_EMAIL,
      ZENDESK_BASE_URL: process.env.ZENDESK_BASE_URL,
      REFERRAL_KEY: process.env.REFERRAL_KEY,
      REFERRAL_BASE_URL: process.env.REFERRAL_BASE_URL,      
      SEGMENT_API:process.env.SEGMENT_API
      

    }
})