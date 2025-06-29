import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PlatformCardProps {
  icon: string
  title: string
  description: string
  links: {
    label: string
    href: string
  }[]
}

export default function PlatformCard({ icon, title, description, links }: PlatformCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Image
                src={icon || "/placeholder.svg"}
                alt={title}
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                priority={false}
              />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <ul className="space-y-2 mt-auto">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center text-sm hover:text-purple-500 transition-colors",
                    index === 0 && "text-purple-500 font-medium",
                  )}
                >
                  <span className="mr-2 text-xs">{index === 0 ? "★" : "•"}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
