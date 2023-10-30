import siteMetadata from '@/data/siteMetadata'
import { UmamiScript } from './Umami'

const isProduction = process.env.NODE_ENV === 'production'

export function Analytics() {
  if (isProduction) {
    const { analytics } = siteMetadata
    return <>{analytics?.umamiAnalytics?.umamiWebsiteId && <UmamiScript />}</>
  }
  return null
}
