import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ücretsiz Deneyin</h2>

            <div className="space-y-6 text-muted-foreground">
              <p>
                Viewerapps olarak Twitch izleyici botu servisimize çok güveniyoruz ve 30 dakikalık ücretsiz deneme
                sunuyoruz. Servisimizin twitch istatistiklerinizi nasıl artırabileceğini ve sıralamanızın yükselmesine
                nasıl yardımcı olabileceğini ilk elden deneyimlemek için bu fırsatı değerlendirin.
              </p>

              <p>
                Yayıncıbotu, her tür içerik oluşturucu, işletme için çalışır ve ayrıca sosyal medya yönetimi için bir
                ajans çözümü olarak ikiye katlanır.
              </p>

              <p className="font-medium">
                Denemenin hiçbir riski yok ve yayınlarınıza kattığımız artı değer konusunda ikna olacağınızdan eminiz.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="gap-2">Twitch İzleyici Ücretsiz</Button>
              <Button variant="outline" className="gap-2">
                Kick İzleyici Ücretsiz
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 rounded-full blur-3xl" />
            <Image
              src="/testimonial-image.png"
              alt="Mutlu Kullanıcı"
              width={600}
              height={600}
              className="relative z-10 w-full h-auto rounded-lg"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
