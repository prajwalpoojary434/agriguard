import {
  CloudSun,
  IndianRupee,
  LayoutDashboard,
  MessageCircle,
  ScanLine,
  Sprout,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  description: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dashboard', description: 'Overview of your farm', icon: LayoutDashboard },
  { href: '/disease', label: 'Disease Detection', description: 'Scan a leaf photo', icon: ScanLine },
  { href: '/weather', label: 'Weather', description: '7-day forecast', icon: CloudSun },
  { href: '/recommend', label: 'Crop Advisor', description: 'Best crops for your soil', icon: Sprout },
  { href: '/market', label: 'Market Prices', description: "Today's mandi rates", icon: IndianRupee },
  { href: '/assistant', label: 'Farming Assistant', description: 'Ask any farming question', icon: MessageCircle },
]
