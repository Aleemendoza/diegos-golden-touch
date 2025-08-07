import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient-gold">
            Diego Chiappero
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="nav-link"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="nav-link"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="nav-link"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="nav-link"
            >
              Contacto
            </button>
            <button
              onClick={() => scrollToSection("giftcard")}
              className="nav-link"
            >
              GiftCard
            </button>
            <Button
              onClick={() => navigate("/admin")}
              className="btn-outline-gold"
            >
              Ingresar (Admin)
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <button
              onClick={() => scrollToSection("inicio")}
              className="block w-full text-left nav-link py-2"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="block w-full text-left nav-link py-2"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="block w-full text-left nav-link py-2"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="block w-full text-left nav-link py-2"
            >
              Contacto
            </button>
            <button
              onClick={() => scrollToSection("giftcard")}
              className="block w-full text-left nav-link py-2"
            >
              GiftCard
            </button>
            <Button
              onClick={() => navigate("/admin")}
              className="btn-outline-gold w-full mt-4"
            >
              Ingresar (Admin)
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;