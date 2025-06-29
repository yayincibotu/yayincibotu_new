'use client'

import { useState } from 'react'
import { useRequireAuth } from '@/hooks/use-auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, ShoppingCart, ExternalLink, Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const mockFavorites = [
  {
    id: '1',
    name: 'Twitch İzleyici',
    platform: 'Twitch',
    category: 'İzleyici',
    price: '₺25.00',
    originalPrice: '₺30.00',
    rating: 4.8,
    addedDate: '2024-01-15',
    isAvailable: true,
    image: '/platforms/twitch.png'
  },
  {
    id: '2',
    name: 'Instagram Takipçi',
    platform: 'Instagram',
    category: 'Takipçi',
    price: '₺15.00',
    originalPrice: '₺20.00',
    rating: 4.9,
    addedDate: '2024-01-10',
    isAvailable: true,
    image: '/platforms/instagram.png'
  },
  {
    id: '3',
    name: 'YouTube Video İzlenme',
    platform: 'YouTube',
    category: 'İzlenme',
    price: '₺35.00',
    originalPrice: null,
    rating: 4.7,
    addedDate: '2024-01-08',
    isAvailable: false,
    image: '/platforms/youtube.png'
  }
]

export default function FavoritesPage() {
  const { loading, authorized } = useRequireAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  const filteredFavorites = mockFavorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const platforms = [...new Set(mockFavorites.map(item => item.platform))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Favorilerim
          </h1>
          <p className="text-gray-600 mt-1">
            Favori hizmetlerinizi buradan yönetebilirsiniz
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {mockFavorites.length} favori hizmet
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Hizmet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Tüm Platformlar</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      {filteredFavorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || selectedPlatform !== 'all' ? 'Sonuç bulunamadı' : 'Henüz favori eklenmemiş'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedPlatform !== 'all' 
                ? 'Arama kriterlerinize uygun favori bulunamadı'
                : 'Beğendiğiniz hizmetleri favorilerinize ekleyerek buradan kolayca erişebilirsiniz'
              }
            </p>
            {(!searchQuery && selectedPlatform === 'all') && (
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Hizmetleri Keşfet
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((item) => (
            <Card key={item.id} className={`relative ${!item.isAvailable ? 'opacity-75' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">
                        {item.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {item.platform} • {item.category}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.addedDate).toLocaleDateString('tr-TR')} tarihinde eklendi
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>
                  {!item.isAvailable && (
                    <Badge variant="destructive" className="text-xs">
                      Stokta Yok
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    disabled={!item.isAvailable}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Sepete Ekle
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 