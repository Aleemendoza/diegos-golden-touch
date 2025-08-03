import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.getElementById("servicios");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-black-soft to-black-lighter"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="inline-block p-8 rounded-full border-2 border-gold/30 mb-6">
            <div className="text-6xl md:text-8xl font-bold text-gradient-gold">
              DC
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">LOGO DE DIEGO</span>
          </h1>
        </div>

        {/* Slogan */}
        <p className="text-xl md:text-2xl text-gold/80 mb-12 font-light tracking-wider">
          Estilo Profesional
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToServices}
          size="lg"
          className="btn-gold text-lg px-8 py-4 shadow-gold"
        >
          Nuestros Servicios
        </Button>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;