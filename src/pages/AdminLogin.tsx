import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Conectar con Supabase Auth cuando esté disponible
    // Por ahora, login mock para un solo admin como especificado
    if (credentials.email === "admin@diegochapiero.com" && credentials.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración",
      });
      navigate("/admin/clientes");
    } else {
      toast({
        title: "Error de autenticación",
        description: "Credenciales incorrectas",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="card-elegant max-w-md w-full relative z-10">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mx-auto mb-4">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <CardTitle className="text-2xl text-gradient-gold">Panel de Administración</CardTitle>
          <p className="text-muted-foreground">Diego Chapiero Estilista</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Correo Electrónico
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="input-elegant pl-10"
                  placeholder="admin@diegochapiero.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="input-elegant pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="btn-gold w-full">
              Iniciar Sesión
            </Button>
          </form>

          {/* Development note */}
          <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
            <p className="text-xs text-gold/80 text-center">
              <strong>Demo:</strong> admin@diegochapiero.com / admin123
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              (Login mock - se reemplazará con Supabase Auth)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;