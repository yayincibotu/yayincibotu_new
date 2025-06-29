import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Üye Ol veya Olma",
      description:
        "YayıncıBotu'na üye olmadan sipariş verebilirsiniz fakat üye olursanız gelecekteki siparişleriniz için indirim alabilir ve geçmiş siparişlerinizi görüntüleyebilirsiniz.",
    },
    {
      number: 2,
      title: "Paketini Seç",
      description:
        "Kanalın veya profilin için en doğru servisi seçin eğer daha fazlasına ihtiyacınız var ise canlı destek ekibimiz ile iletişime geçin. Sizin için uygun paketi oluşturacaklardır.",
    },
    {
      number: 3,
      title: "Linkini Gir",
      description:
        "Satın alacağın servisin altında talep edilen linki gir ve ürünü sepete ekle. Ödeme sayfasına yönlendirileceksin.",
    },
    {
      number: 4,
      title: "Siparişi Tamamla",
      description:
        "Ödeme bilgilerini gir ve siparişini tamamla. Paketler anında ekleniyor ürünler ise genellikle birkaç dakika içinde teslim edilir.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nasıl Çalışır?</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Uygun fiyatlı paketlerle Twitter'da fenomen olmaya hazır mısınız?
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                {step.number < 4 && (
                  <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent -translate-y-1/2 hidden md:block" />
                )}
              </div>

              <Card className="w-full border-0 shadow-md bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
