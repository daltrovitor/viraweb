import { TrendingUp, TicketPercent, Award, Zap } from "lucide-react"
import ScrollAnimate from "./scroll-animate"

const stats = [
  {
    icon: TrendingUp,
    value: "300%",
    label: "Aumento médio em conversões",
    color: "text-primary",
  },
  {
    icon: TicketPercent,
    value: "20% OFF",
    label: "No primeiro serviço",
    color: "text-secondary",
  },
  {
    icon: Award,
    value: "5 anos",
    label: "De experiência no mercado",
    color: "text-primary",
  },
  {
    icon: Zap,
    value: "98%",
    label: "Taxa de satisfação",
    color: "text-secondary",
  },
]

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-card border-y bg-neutral-100 border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollAnimate key={index} delay={index * 0.05}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-muted">
                    <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
