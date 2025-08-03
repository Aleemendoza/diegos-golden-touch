import { Scissors, Palette, Crown, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: 1,
    title: "Cortes de Cabello",
    icon: Scissors,
    description: "Cortes modernos y clásicos adaptados a tu estilo personal"
  },
  {
    id: 2,
    title: "Coloración",
    icon: Palette,
    description: "Técnicas avanzadas de coloración y mechas profesionales"
  },
  {
    id: 3,
    title: "Peinados",
    icon: Crown,
    description: "Peinados elegantes para eventos especiales y ocasiones únicas"
  },
  {
    id: 4,
    title: "Tratamientos",
    icon: Sparkles,
    description: "Tratamientos capilares nutritivos y reparadores"
  }
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">Nuestros Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios profesionales para realzar tu belleza natural
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="card-elegant group cursor-pointer">
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-gold" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;