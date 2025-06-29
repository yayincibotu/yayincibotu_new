import HeaderV2 from "@/components/header-v2"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, TrendingUp, Users, Eye, Heart, Zap } from "lucide-react"

export default function TestHeaderPage() {
  // Phase 3: Authentication handled by AuthAvatar component

  const platformStats = [
    { name: "Twitch", icon: "🎮", orders: 1250, growth: "+12%" },
    { name: "Instagram", icon: "📸", orders: 980, growth: "+8%" },
    { name: "YouTube", icon: "📺", orders: 750, growth: "+15%" },
    { name: "TikTok", icon: "🎵", orders: 650, growth: "+22%" },
    { name: "Discord", icon: "💬", orders: 420, growth: "+5%" },
    { name: "Kick", icon: "⚡", orders: 320, growth: "+18%" },
  ]

  const trendingServices = [
    { name: "Twitch İzleyici", price: "₺12.99", popularity: 95 },
    { name: "Instagram Takipçi", price: "₺8.50", popularity: 88 },
    { name: "YouTube İzlenme", price: "₺15.00", popularity: 82 },
    { name: "TikTok Beğeni", price: "₺5.99", popularity: 79 },
  ]

  return (
    <>
      <HeaderV2 />
      
      {/* Test Content */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto py-8 space-y-8">
          
          {/* Phase 3 Features Showcase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Phase 3: User Authentication & Profile System Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Auth Avatar</h3>
                  <p className="text-sm text-muted-foreground">Smart authentication</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">User Menu</h3>
                  <p className="text-sm text-muted-foreground">Profile management</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Personalization</h3>
                  <p className="text-sm text-muted-foreground">Custom preferences</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Online Status</h3>
                  <p className="text-sm text-muted-foreground">Real-time indicator</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {platformStats.map((platform) => (
                  <div key={platform.name} className="text-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <h3 className="font-semibold text-sm">{platform.name}</h3>
                    <p className="text-lg font-bold">{platform.orders}</p>
                    <Badge variant="secondary" className="text-xs">
                      {platform.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingServices.map((service) => (
                  <div key={service.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">{service.name}</h3>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{service.price}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{service.popularity}% popularity</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Authentication Test Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Phase 3 Test Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Authentication Testing</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Test login/register buttons (guest state)</li>
                    <li>• Click avatar to open user menu (logged in)</li>
                    <li>• Check online status indicator</li>
                    <li>• Test profile completion progress</li>
                    <li>• Verify notification badges</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Profile System Testing</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Check user stats display</li>
                    <li>• Test tier benefits section</li>
                    <li>• Verify menu item badges</li>
                    <li>• Check role-based features</li>
                    <li>• Test sign out functionality</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  User menu features: Profile stats, tier benefits, quick actions, sign out
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">User Avatar</Badge>
                  <Badge variant="outline">Profile Menu</Badge>
                  <Badge variant="outline">Online Status</Badge>
                  <Badge variant="outline">Notifications</Badge>
                  <Badge variant="outline">Quick Stats</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scroll Test Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Scroll Test Content</h2>
            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Test Section {i + 1}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Bu içerik scroll test için oluşturuldu. Header'ın scroll davranışını test edin.
                    Yukarı kaydırdığınızda smart search'ü açmayı deneyin.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Search className="h-3 w-3" />
                      Smart Search
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Heart className="h-3 w-3" />
                      Favorites
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 