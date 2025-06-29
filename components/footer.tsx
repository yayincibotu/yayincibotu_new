import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "HİZMETLERİMİZ",
    links: [
      { name: "Twitch", href: "/twitch" },
      { name: "Kick", href: "/kick" },
      { name: "Instagram", href: "/instagram" },
      { name: "Youtube", href: "/youtube" },
      { name: "Tiktok", href: "/tiktok" },
      { name: "Facebook", href: "/facebook" },
      { name: "Discord", href: "/discord" },
      { name: "Spotify", href: "/spotify" },
      { name: "(X) Twitter", href: "/twitter" },
    ],
  },
  {
    title: "ÇOK SATANLAR",
    links: [
      { name: "Twitch Takipçi", href: "/twitch/takipci" },
      { name: "Instagram Reel İzlenme", href: "/instagram/reel-izlenme" },
      { name: "Tiktok Video İzlenme", href: "/tiktok/video-izlenme" },
      { name: "Facebook Canlı İzleyici", href: "/facebook/canli-izleyici" },
      { name: "Discord Üyesi", href: "/discord/uyesi" },
      { name: "Instagram Beğeni", href: "/instagram/begeni" },
      { name: "Instagram Takipçi", href: "/instagram/takipci" },
      { name: "Tiktok Takipçi", href: "/tiktok/takipci" },
    ],
  },
  {
    title: "POPÜLER SERVİSLER",
    links: [
      { name: "Kick İzleyici Botu", href: "/kick/izleyici-botu" },
      { name: "Twitch İzleyici Botu", href: "/twitch/izleyici-botu" },
      { name: "Twitch Hazır İştirak Hesap", href: "/twitch/hazir-istirak-hesap" },
      { name: "Twitch Prime Abone", href: "/twitch/prime-abone" },
      { name: "Twitch Takipçi", href: "/twitch/takipci" },
      { name: "Youtube Abone", href: "/youtube/abone" },
      { name: "Youtube Beğeni", href: "/youtube/begeni" },
      { name: "Youtube Video İzlenme", href: "/youtube/video-izlenme" },
    ],
  },
  {
    title: "KURUMSAL",
    links: [
      { name: "Hakkımızda", href: "/hakkimizda" },
      { name: "Bize Ulaşın", href: "/iletisim" },
      { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
      { name: "Hizmet Koşulları", href: "/hizmet-kosullari" },
    ],
  },
  {
    title: "DESTEK",
    links: [
      { name: "Nasıl Çalışır?", href: "/nasil-calisir" },
      { name: "ViewerApps API", href: "/api" },
      { name: "Yardım Merkezi", href: "/yardim" },
      { name: "Sıkça Sorulan Sorular", href: "/sss" },
    ],
  },
  {
    title: "FAYDALI LİNKLER",
    links: [
      { name: "Bot Kontrol", href: "/bot-kontrol" },
      { name: "Üye Ol", href: "/uye-ol" },
      { name: "Giriş Yap", href: "/giris" },
      { name: "Hesabım", href: "/hesabim" },
      { name: "Kanallarım", href: "/kanallarim" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {services.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-purple-400">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="YayinciBotu Logo"
              width={32}
              height={32}
              className="rounded-full bg-purple-600"
              priority={false}
            />
            <span className="font-bold">YayıncıBotu</span>
          </div>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2019 - {new Date().getFullYear()} YayinciBotu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
