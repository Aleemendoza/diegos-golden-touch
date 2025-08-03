import { Award, Users, Clock, Heart } from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "20+",
    label: "Años de Experiencia"
  },
  {
    icon: Users,
    number: "500+",
    label: "Clientes Satisfechos"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Disponibilidad"
  },
  {
    icon: Heart,
    number: "100%",
    label: "Dedicación"
  }
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 px-4 bg-black-soft/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-gold">Sobre Nosotros</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Con más de 20 años de experiencia, <span className="text-gold font-semibold">Diego Chapiero Estilista</span> ofrece servicios de peluquería de alta calidad en un ambiente elegante y acogedor.
              </p>
              
              <p>
                Nuestro compromiso es realzar la belleza natural de cada cliente, utilizando las técnicas más avanzadas y productos de primera calidad para garantizar resultados excepcionales.
              </p>
              
              <p>
                Creemos que cada persona es única, por eso personalizamos cada servicio para adaptarnos perfectamente a tu estilo de vida y personalidad.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card border border-border hover:border-gold/50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;