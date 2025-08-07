import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5493884097446?text=Hola%20Diego!%20Quisiera%20hacer%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">¿Necesitás ayuda?</span>
    </a>
  );
};

export default WhatsAppButton;