import { IndianRupee, TrendingDown, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'
import { DemoNotice } from '@/components/demo-mode-badge'
import { formatPrice, PriceTrendBadge, Sparkline } from '@/components/market/price-trend'
import { PageHeader } from '@/components/page-header'
import { getMarketPrices, getPriceChange } from '@/lib/services/market'

export const metadata: Metadata = { title: 'Market Prices', description: "Today's mandi prices with weekly trends." }

export default async function MarketPage() {
  const prices = await getMarketPrices()
  const sorted = [...prices].sort((a, b) => getPriceChange(b).percent - getPriceChange(a).percent)
  const topGainer = sorted[0]
  const topLoser = sorted.at(-1)!

  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={IndianRupee} title="Market Prices" description="Today's mandi rates and how they moved over the last 7 days." />
      <DemoNotice>Simulated prices. Connect Agmarknet or another source in lib/services/market.ts.</DemoNotice>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
          <span className="flex size-12 items-center justify-center rounded-xl bg-success/15 text-success">
            <TrendingUp className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Biggest rise today</p>
            <p className="text-lg font-bold">
              {topGainer.crop} <span className="text-success">+{getPriceChange(topGainer).percent.toFixed(1)}%</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
          <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <TrendingDown className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Biggest fall today</p>
            <p className="text-lg font-bold">
              {topLoser.crop} <span className="text-destructive">{getPriceChange(topLoser).percent.toFixed(1)}%</span>
            </p>
          </div>
        </div>
      </div>

      <ul className="grid gap-3 md:hidden">
        {prices.map((item) => (
          <li key={item.crop} className="rounded-2xl border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{item.crop}</p>
                <p className="text-sm text-muted-foreground">
                  {item.variety} · {item.market}
                </p>
              </div>
              <PriceTrendBadge item={item} />
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p>
                <span className="text-2xl font-bold tabular-nums">{formatPrice(item.price)}</span>
                <span className="ml-1 text-sm text-muted-foreground">/ {item.unit}</span>
              </p>
              <Sparkline values={item.history} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <table className="w-full text-left">
          <caption className="sr-only">Crop market prices</caption>
          <thead className="bg-muted text-sm text-muted-foreground">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Crop</th>
              <th scope="col" className="px-5 py-3 font-medium">Market</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Price</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Yesterday</th>
              <th scope="col" className="px-5 py-3 font-medium">Change</th>
              <th scope="col" className="px-5 py-3 font-medium">7-day trend</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {prices.map((item) => (
              <tr key={item.crop}>
                <th scope="row" className="px-5 py-4 font-normal">
                  <span className="block text-base font-semibold">{item.crop}</span>
                  <span className="text-sm text-muted-foreground">{item.variety}</span>
                </th>
                <td className="px-5 py-4 text-sm">{item.market}</td>
                <td className="px-5 py-4 text-right">
                  <span className="block text-lg font-bold tabular-nums">{formatPrice(item.price)}</span>
                  <span className="text-xs text-muted-foreground">per {item.unit}</span>
                </td>
                <td className="px-5 py-4 text-right text-muted-foreground tabular-nums">{formatPrice(item.previousPrice)}</td>
                <td className="px-5 py-4">
                  <PriceTrendBadge item={item} />
                </td>
                <td className="px-5 py-4">
                  <Sparkline values={item.history} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
