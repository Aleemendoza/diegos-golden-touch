import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black-soft border-t border-border py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-gradient-gold mb-4">
              Diego Chapiero
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Más de 20 años creando estilos únicos y realzando la belleza natural de nuestros clientes en un ambiente elegante y profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#servicios" className="hover:text-gold transition-colors">Cortes de Cabello</a></li>
              <li><a href="#servicios" className="hover:text-gold transition-colors">Coloración</a></li>
              <li><a href="#servicios" className="hover:text-gold transition-colors">Peinados</a></li>
              <li><a href="#servicios" className="hover:text-gold transition-colors">Tratamientos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-gold" />
                <span className="text-sm">Av. Principal 123, Ciudad</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-gold" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-gold" />
                <span className="text-sm">info@diegochapiero.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Diego Chapiero Estilista. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Términos y Condiciones
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;