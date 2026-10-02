import type { LucideIcon } from 'lucide-react'

export function PageHeader({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-pretty text-base text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
