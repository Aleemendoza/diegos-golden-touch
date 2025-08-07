import { useState, useEffect } from "react";
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  Gift,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false); // Colapsar por defecto en móvil
      }
    };

    handleResize(); // Llamar al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Inicio" },
    { icon: <Users className="w-5 h-5" />, label: "Clientes" },
    { icon: <Calendar className="w-5 h-5" />, label: "Turnos" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Facturación" },
    { icon: <Gift className="w-5 h-5" />, label: "Cumpleaños" },
  ];

  return (
    <>
      {/* Botón flotante para abrir menú en mobile */}
      {isMobile && !open && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-black text-gold border border-gold/20"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      <aside
        className={`bg-black text-gold h-screen transition-all duration-300 ${
          open ? "w-64" : "w-16"
        } shadow-lg fixed top-0 left-0 z-40`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gold/20">
          <span
            className={`text-xl font-bold transition-opacity ${
              open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Panel
          </span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-gold/10 transition-colors"
              onClick={() =>
                alert(`"${item.label}" estará disponible próximamente 🚧`)
              }
            >
              {item.icon}
              <span
                className={`transition-all ${
                  open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
