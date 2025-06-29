import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, Clock, Package, CreditCard, Gift } from "lucide-react"
import ServiceCard from "@/components/service-card"
import HowItWorks from "@/components/how-it-works"
import TestimonialSection from "@/components/testimonial-section"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-background">
        {/* Abstract background elements */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "12s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "10s" }}
          />

          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500/20 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-blue-500/20 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-purple-500/20 rounded-full" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,_87,_255,_0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(120,_87,_255,_0.03)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative mb-4">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium">
                  <span className="relative z-10">Gerçek ve Organik İzleyiciler</span>
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 animate-pulse"
                    style={{ animationDuration: "3s" }}
                  ></div>
                </div>
              </div>

              <h1 className="relative">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Yayıncılar için
                  </span>
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  Twitch İzleyici Botu
                </span>
                <div className="absolute -bottom-4 left-0 w-24 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full lg:block hidden"></div>
              </h1>

              <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
                <span className="font-semibold text-foreground">Bot Yok! Fake Hesaplar Yok!</span> Gerçek ve organik
                izleyiciler ile kitlenizi genişletin. Tamamen otomatik yazılımız ile siparişleriniz 7 gün 24 saat hızlı
                ve sorunsuz şekilde tamamlanmaktadır.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Button size="lg" className="text-base relative group overflow-hidden">
                  <span className="relative z-10">Ücretsiz Deneme Fırsatı</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base gap-2 relative group overflow-hidden border-purple-500/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="20" height="20" className="text-purple-500">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google ile Üye Ol
                  </span>
                  <div className="absolute inset-0 bg-purple-50 dark:bg-purple-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>7/24 Aktif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>%100 Güvenli</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <span>Anında Teslimat</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Abstract 3D-like element instead of an image */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-md"></div>

                {/* Circular elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 rounded-full border border-purple-500/20 animate-[spin_30s_linear_infinite]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/5 h-3/5 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite_reverse]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/5 h-2/5 rounded-full border border-purple-500/30 animate-[spin_15s_linear_infinite]"></div>
                </div>

                {/* Central element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-1/4 h-1/4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-sm animate-pulse"
                    style={{ animationDuration: "4s" }}
                  ></div>
                  <div className="absolute w-1/4 h-1/4 bg-gradient-to-br from-purple-500/80 to-blue-500/80 rounded-full"></div>
                </div>

                {/* Orbiting elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_10s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_15s_linear_infinite_reverse]">
                    <div className="absolute top-1/4 right-0 w-6 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_20s_linear_infinite]">
                    <div className="absolute bottom-1/4 left-0 w-5 h-5 bg-purple-400 rounded-full"></div>
                  </div>
                </div>

                {/* Stats floating elements */}
                <div className="absolute top-1/4 right-1/4 bg-background/80 backdrop-blur-sm border border-purple-500/20 rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-sm font-medium">İzleyici Artışı</div>
                  <div className="text-xl font-bold text-purple-500">+248%</div>
                </div>
                <div className="absolute bottom-1/4 left-1/4 bg-background/80 backdrop-blur-sm border border-blue-500/20 rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-sm font-medium">Etkileşim</div>
                  <div className="text-xl font-bold text-blue-500">+187%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="flex flex-col items-center text-center p-4">
                <Search className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-semibold">Ücretsiz Deneme</h3>
                <p className="text-xs text-muted-foreground">Twitch ve Kick İzleyici Botu</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="flex flex-col items-center text-center p-4">
                <Package className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-semibold">Günlük İndirimler</h3>
                <p className="text-xs text-muted-foreground">%70'e kadar indirimli</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="flex flex-col items-center text-center p-4">
                <Clock className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-semibold">Anında Teslimat</h3>
                <p className="text-xs text-muted-foreground">Tüm dijital ürünler ve servisler</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="flex flex-col items-center text-center p-4">
                <CreditCard className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-semibold">Güvenli Ödeme</h3>
                <p className="text-xs text-muted-foreground">Kredi Kartı, EFT, Bitcoin</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="flex flex-col items-center text-center p-4">
                <Gift className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-semibold">Günlük Hediyeler</h3>
                <p className="text-xs text-muted-foreground">Günlük binlerce abone ve takipçi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Platforms Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(120,_87,_255,_0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(120,_87,_255,_0.02)_1px,_transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-4">
              <span className="relative z-10">Tüm Sosyal Medya Platformları</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              YayıncıBotun'da Tüm Platformlar için{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Premium Hizmetler
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sosyal medya varlığınızı güçlendirmek için ihtiyacınız olan tüm hizmetleri tek bir platformda sunuyoruz.
              Gerçek ve organik etkileşimlerle hesaplarınızı büyütün.
            </p>
          </div>

          {/* Ana servisler - 4 column */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Twitch Card - Öne çıkarılmış */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/0 rounded-xl transition-all duration-300 group-hover:from-purple-500/20 group-hover:to-purple-500/10"></div>

              {/* Card content */}
              <div className="relative p-6 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/10 h-full flex flex-col">
                {/* Featured badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  En Popüler
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path
                        fill="currentColor"
                        d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors duration-300">
                  Twitch
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gerçek ve Organik Twitch izleyici satın alın. %100 özelleştirilebilir ve kolay kontrol paneli ile.
                </p>

                {/* Links */}
                <ul className="space-y-2 mb-4">
                  <li>
                    <a
                      href="/twitch/izleyici"
                      className="flex items-center text-sm text-purple-500 font-medium hover:text-purple-600 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Twitch İzleyici
                    </a>
                  </li>
                  <li>
                    <a
                      href="/twitch/takipci"
                      className="flex items-center text-sm hover:text-purple-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Twitch Takipçi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/twitch/abone-prime"
                      className="flex items-center text-sm hover:text-purple-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Twitch Abone & Prime
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="default"
                  size="sm"
                  className="w-full mt-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
                >
                  Tüm Twitch Hizmetleri
                </Button>
              </div>
            </div>

            {/* Kick Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/0 rounded-xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-green-500/5"></div>

              {/* Card content */}
              <div className="relative p-6 backdrop-blur-sm border border-green-500/10 rounded-xl transition-all duration-300 group-hover:border-green-500/20 group-hover:shadow-lg group-hover:shadow-green-500/5">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path
                        fill="currentColor"
                        d="M14.47 13.77c.4.2.74.5 1 .86V10h2v10h-2v-.86c-.26.36-.6.66-1 .86-1.3.64-2.87.12-3.5-1.18-.28-.57-.28-1.23 0-1.8.63-1.3 2.2-1.82 3.5-1.18m-1.94.87c-.19.38-.19.83 0 1.21.32.65 1.1.92 1.75.6.32-.16.54-.45.64-.79v-.83c-.1-.34-.32-.63-.64-.79-.65-.32-1.43-.05-1.75.6M10 10v6a2 2 0 0 1-2 2H4v-2h4v-6H4v-2h4a2 2 0 0 1 2 2m10-6H4v2h16z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors duration-300">
                  Kick
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  YayıncıBotu üzerinden Kick izleyici veya Kick takipçi satın alabilirsiniz. Hızlı ve güvenli teslimat.
                </p>

                {/* Links */}
                <ul className="space-y-2 mb-4">
                  <li>
                    <a
                      href="/kick/izleyici"
                      className="flex items-center text-sm text-green-500 font-medium hover:text-green-600 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Kick İzleyici
                    </a>
                  </li>
                  <li>
                    <a
                      href="/kick/takipci"
                      className="flex items-center text-sm hover:text-green-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Kick Takipçi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/kick/canli-izleyici"
                      className="flex items-center text-sm hover:text-green-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Kick Canlı İzleyici
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-green-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Kick Hizmetleri
                </Button>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/0 rounded-xl transition-all duration-300 group-hover:from-pink-500/10 group-hover:to-orange-500/5"></div>

              {/* Card content */}
              <div className="relative p-6 backdrop-blur-sm border border-pink-500/10 rounded-xl transition-all duration-300 group-hover:border-pink-500/20 group-hover:shadow-lg group-hover:shadow-pink-500/5">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-600 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path
                        fill="currentColor"
                        d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  Instagram
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Anında teslimatlı Instagram ürünleri ve servisleri satın alın. Etkileşimlerinizi hızla artırın.
                </p>

                {/* Links */}
                <ul className="space-y-2 mb-4">
                  <li>
                    <a
                      href="/instagram/takipci"
                      className="flex items-center text-sm text-pink-500 font-medium hover:text-pink-600 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Instagram Takipçi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/instagram/begeni"
                      className="flex items-center text-sm hover:text-pink-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Instagram Beğeni
                    </a>
                  </li>
                  <li>
                    <a
                      href="/instagram/video-reel-izlenme"
                      className="flex items-center text-sm hover:text-pink-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Instagram Reel İzlenme
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Instagram Hizmetleri
                </Button>
              </div>
            </div>

            {/* YouTube Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-500/0 rounded-xl transition-all duration-300 group-hover:from-red-500/10 group-hover:to-red-500/5"></div>

              {/* Card content */}
              <div className="relative p-6 backdrop-blur-sm border border-red-500/10 rounded-xl transition-all duration-300 group-hover:border-red-500/20 group-hover:shadow-lg group-hover:shadow-red-500/5">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-red-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                      <path
                        fill="currentColor"
                        d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  YouTube
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Coğrafi hedefleme ile Youtube servisleri. Anında teslimat avantajı ile kanalınızı büyütün.
                </p>

                {/* Links */}
                <ul className="space-y-2 mb-4">
                  <li>
                    <a
                      href="/youtube/video-izlenme"
                      className="flex items-center text-sm text-red-500 font-medium hover:text-red-600 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      YouTube Video İzlenme
                    </a>
                  </li>
                  <li>
                    <a href="/youtube/abone" className="flex items-center text-sm hover:text-red-500 transition-colors">
                      <span className="mr-2">•</span>
                      YouTube Abone
                    </a>
                  </li>
                  <li>
                    <a
                      href="/youtube/begeni"
                      className="flex items-center text-sm hover:text-red-500 transition-colors"
                    >
                      <span className="mr-2">•</span>
                      YouTube Beğeni
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-red-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm YouTube Hizmetleri
                </Button>
              </div>
            </div>
          </div>

          {/* Diğer servisler - 5 column */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* TikTok Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-teal-500/0 rounded-xl transition-all duration-300 group-hover:from-black/10 group-hover:to-teal-500/5"></div>

              {/* Card content */}
              <div className="relative p-5 backdrop-blur-sm border border-teal-500/10 rounded-xl transition-all duration-300 group-hover:border-teal-500/20 group-hover:shadow-lg group-hover:shadow-teal-500/5">
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-3 bg-gradient-to-r from-black/10 to-teal-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-black rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                      <path
                        fill="currentColor"
                        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-teal-500 transition-colors duration-300">
                  TikTok
                </h3>
                <p className="text-xs text-muted-foreground mb-3">TikTok'da fenomen olmaya hazır mısınız?</p>

                {/* Links */}
                <ul className="space-y-1 mb-3">
                  <li>
                    <a
                      href="/tiktok/video-izlenme"
                      className="flex items-center text-xs text-teal-500 font-medium hover:text-teal-600 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      TikTok Video İzlenme
                    </a>
                  </li>
                  <li>
                    <a
                      href="/tiktok/takipci"
                      className="flex items-center text-xs hover:text-teal-500 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      TikTok Takipçi
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-teal-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Hizmetler
                </Button>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/0 rounded-xl transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-blue-500/5"></div>

              {/* Card content */}
              <div className="relative p-5 backdrop-blur-sm border border-blue-500/10 rounded-xl transition-all duration-300 group-hover:border-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/5">
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                      <path
                        fill="currentColor"
                        d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  Facebook
                </h3>
                <p className="text-xs text-muted-foreground mb-3">Facebook sayfanız için beğeni satın alın.</p>

                {/* Links */}
                <ul className="space-y-1 mb-3">
                  <li>
                    <a
                      href="/facebook/sayfa-begeni"
                      className="flex items-center text-xs text-blue-500 font-medium hover:text-blue-600 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Facebook Sayfa Beğeni
                    </a>
                  </li>
                  <li>
                    <a
                      href="/facebook/takipci"
                      className="flex items-center text-xs hover:text-blue-500 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Facebook Takipçi
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Hizmetler
                </Button>
              </div>
            </div>

            {/* Discord Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-indigo-500/0 rounded-xl transition-all duration-300 group-hover:from-indigo-500/10 group-hover:to-indigo-500/5"></div>

              {/* Card content */}
              <div className="relative p-5 backdrop-blur-sm border border-indigo-500/10 rounded-xl transition-all duration-300 group-hover:border-indigo-500/20 group-hover:shadow-lg group-hover:shadow-indigo-500/5">
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-3 bg-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                      <path
                        fill="currentColor"
                        d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors duration-300">
                  Discord
                </h3>
                <p className="text-xs text-muted-foreground mb-3">Discord kanalınızı ön plana çıkarın.</p>

                {/* Links */}
                <ul className="space-y-1 mb-3">
                  <li>
                    <a
                      href="/discord/uyesi"
                      className="flex items-center text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Discord Üyesi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/discord/server-uyesi"
                      className="flex items-center text-xs hover:text-indigo-500 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Discord Server Üyesi
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Hizmetler
                </Button>
              </div>
            </div>

            {/* Twitter Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-sky-500/0 rounded-xl transition-all duration-300 group-hover:from-sky-500/10 group-hover:to-sky-500/5"></div>

              {/* Card content */}
              <div className="relative p-5 backdrop-blur-sm border border-sky-500/10 rounded-xl transition-all duration-300 group-hover:border-sky-500/20 group-hover:shadow-lg group-hover:shadow-sky-500/5">
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-3 bg-sky-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                      <path
                        fill="currentColor"
                        d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-sky-500 transition-colors duration-300">
                  Twitter (X)
                </h3>
                <p className="text-xs text-muted-foreground mb-3">Twitter'da fenomen olmaya hazır mısınız?</p>

                {/* Links */}
                <ul className="space-y-1 mb-3">
                  <li>
                    <a
                      href="/twitter/takipci"
                      className="flex items-center text-xs text-sky-500 font-medium hover:text-sky-600 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Twitter Takipçi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/twitter/begeni"
                      className="flex items-center text-xs hover:text-sky-500 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Twitter Beğeni
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs group-hover:bg-sky-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Hizmetler
                </Button>
              </div>
            </div>

            {/* Spotify Card */}
            <div className="group relative">
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/0 rounded-xl transition-all duration-300 group-hover:from-green-500/10 group-hover:to-green-500/5"></div>

              {/* Card content */}
              <div className="relative p-5 backdrop-blur-sm border border-green-500/10 rounded-xl transition-all duration-300 group-hover:border-green-500/20 group-hover:shadow-lg group-hover:shadow-green-500/5">
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-3 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                      <path
                        fill="currentColor"
                        d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-green-500 transition-colors duration-300">
                  Spotify
                </h3>
                <p className="text-xs text-muted-foreground mb-3">Spotify %100 Türk, Gerçek Dinlenme Fırsatı.</p>

                {/* Links */}
                <ul className="space-y-1 mb-3">
                  <li>
                    <a
                      href="/spotify/dinlenme"
                      className="flex items-center text-xs text-green-500 font-medium hover:text-green-600 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Spotify Dinlenme
                    </a>
                  </li>
                  <li>
                    <a
                      href="/spotify/playlist-dinlenme"
                      className="flex items-center text-xs hover:text-green-500 transition-colors"
                    >
                      <span className="mr-1">•</span>
                      Spotify Playlist Dinlenme
                    </a>
                  </li>
                </ul>

                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs group-hover:bg-green-500 group-hover:text-white transition-all duration-300"
                >
                  Tüm Hizmetler
                </Button>
              </div>
            </div>
          </div>

          {/* More platforms button */}
          <div className="flex justify-center mt-12">
            <Button className="px-8 py-6 h-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20">
              <span className="text-base">Tüm Platformları Keşfedin</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the page content remains unchanged */}
      <HowItWorks />
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Çok Satanlar</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              image="/youtube-video-izlenme.png"
              title="Youtube Video İzlenme"
              priceRange="₺18,00 – ₺720,00"
              href="/youtube/video-izlenme"
            />

            <ServiceCard
              image="/instagram-reel-izlenme.png"
              title="Instagram Reel İzlenme"
              priceRange="₺18,00 – ₺800,00"
              href="/instagram/reel-izlenme"
            />

            <ServiceCard
              image="/instagram-takipci.png"
              title="Instagram Takipçi"
              priceRange="₺18,00 – ₺350,00"
              href="/instagram/takipci"
            />

            <ServiceCard
              image="/tiktok-video-izlenme.png"
              title="Tiktok Video İzlenme"
              priceRange="₺18,00 – ₺180,00"
              href="/tiktok/video-izlenme"
            />
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Badge variant="secondary" className="w-2 h-2 rounded-full bg-purple-600" />
              <Badge variant="outline" className="w-2 h-2 rounded-full" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/mobile-app-preview.png"
                alt="YayinciBotu Mobile App"
                className="w-full h-auto"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Kimler YayıncıBotu'nu Kullanıyor?</h2>

              <div className="space-y-6 text-muted-foreground">
                <p>
                  Yayıncılar, içerik üreticiler, sosyal medya yöneticileri ve ajansların hepsi YayıncıBotu'nu seviyor
                  çünkü veriyoruz. Bir twitch kanalına abone olmamıza veya köşedeki yeni mağaza olmamıza bakılmaksızın.
                  Yayıncıbotu ile daha fazla takipçi, beğeni ve etkileşim elde etmek mümkündür.
                </p>

                <p>
                  Yayıncıbotu, her tür içerik oluşturucu, işletme için çalışır ve ayrıca sosyal medya yönetimi için bir
                  ajans çözümü olarak ikiye katlanır.
                </p>

                <p className="font-medium">
                  İster bir içerik oluşturucu, ister işletme, ister sosyal medya yöneticisi veya bir ajans olun -
                  YayıncıBotu aradığınız sonuçları size sağlayacaktır.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button className="gap-2">
                  <span className="text-purple-300">•</span> Yayıncılar için Paketler
                </Button>
                <Button variant="outline" className="gap-2">
                  <span className="text-purple-300">•</span> Influencerlar için Paketler
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection />
    </>
  )
}
