import Script from 'next/script'
import siteMetadata from '@/data/siteMetadata'

export function UmamiScript() {
  return (
    <Script
      async
      data-website-id={siteMetadata?.analytics?.umamiAnalytics?.umamiWebsiteId}
      src="https://analytics.leohuynh.dev/script.js"
    />
  )
}
