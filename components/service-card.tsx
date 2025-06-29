import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  image: string
  title: string
  priceRange: string
  href: string
}

export default function ServiceCard({ image, title, priceRange, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors">{title}</h3>
          <p className="text-sm text-purple-500">{priceRange}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
