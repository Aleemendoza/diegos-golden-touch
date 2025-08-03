import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Star, Heart } from "lucide-react";

const giftCardOptions = [
  {
    id: 1,
    name: "Básica",
    price: "$50",
    description: "Perfecta para un corte de cabello premium",
    icon: Gift
  },
  {
    id: 2,
    name: "Premium",
    price: "$100",
    description: "Incluye corte, coloración y tratamiento",
    icon: Star
  },
  {
    id: 3,
    name: "Luxury",
    price: "$200",
    description: "Experiencia completa de spa y belleza",
    icon: Heart
  }
];

const GiftCardSection = () => {
  const handlePurchase = (cardType: string) => {
    // TODO: Conectar con sistema de pagos cuando se integre Supabase
    console.log(`Comprando gift card: ${cardType}`);
    alert(`Gift Card ${cardType} - Próximamente disponible!`);
  };

  return (
    <section id="giftcard" className="py-20 px-4 bg-black-soft/50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">Gift Cards</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Regala una experiencia única de belleza y estilo. El regalo perfecto para esa persona especial.
          </p>
        </div>

        {/* Gift Card Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {giftCardOptions.map((card) => (
            <Card key={card.id} className="card-elegant text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full -translate-y-12 translate-x-12"></div>
              
              <CardHeader className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mx-auto mb-4">
                  <card.icon className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-2xl text-gold mb-2">{card.name}</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">{card.price}</div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-6 min-h-[50px] flex items-center justify-center">
                  {card.description}
                </p>
                <Button
                  onClick={() => handlePurchase(card.name)}
                  className="btn-outline-gold w-full"
                >
                  Comprar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gold mb-4">¿Cómo funcionan nuestras Gift Cards?</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• Válidas por 12 meses desde la fecha de compra</p>
                <p>• Se pueden usar para cualquier servicio del salón</p>
                <p>• Transferibles a otras personas</p>
                <p>• Entrega inmediata por email</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GiftCardSection;