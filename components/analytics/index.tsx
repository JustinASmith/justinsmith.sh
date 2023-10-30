import { siteMetadata } from '@/data/siteMetadata'
import { UmamiScript } from './Umami'

let isProduction = process.env.NODE_ENV === 'production'

export function Analytics() {
  if (isProduction) {
    let { analytics } = siteMetadata
    let { umamiWebsiteId } = analytics
    return <>{umamiWebsiteId && <UmamiScript />}</>
  }
  return null
}
