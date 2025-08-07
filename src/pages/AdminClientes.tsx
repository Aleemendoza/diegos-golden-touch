import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, LogOut, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClienteForm from "@/components/ClienteForm";
import Sidebar from "@/components/SideBar";

// Tipo para cliente
interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  fecha_cumple: string;
  historial: Array<{
    servicio: string;
    fecha: string;
    precio: number;
  }>;
  creado_en: string;
}

// Mock data - se reemplazará con Supabase
const mockClientes: Cliente[] = [
  {
    id: "1",
    nombre: "María",
    apellido: "González",
    fecha_cumple: "15/03",
    historial: [
      { servicio: "Corte de Cabello", fecha: "2024-01-15", precio: 25000 },
      { servicio: "Coloración", fecha: "2023-12-10", precio: 45000 }
    ],
    creado_en: "2023-01-15T10:00:00Z"
  },
  {
    id: "2",
    nombre: "Ana",
    apellido: "Rodríguez",
    fecha_cumple: "22/06",
    historial: [
      { servicio: "Coloración", fecha: "2024-01-20", precio: 45000 }
    ],
    creado_en: "2023-02-20T14:30:00Z"
  },
  {
    id: "3",
    nombre: "Sofía",
    apellido: "López",
    fecha_cumple: "08/12",
    historial: [
      { servicio: "Peinado", fecha: "2024-01-25", precio: 35000 }
    ],
    creado_en: "2023-03-10T09:15:00Z"
  }
];

const AdminClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar si el admin está logueado
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/admin");
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCliente = (clienteData: Omit<Cliente, "id" | "creado_en">) => {
    // TODO: Conectar con Supabase
    const newCliente: Cliente = {
      ...clienteData,
      id: Date.now().toString(),
      creado_en: new Date().toISOString()
    };
    
    setClientes([...clientes, newCliente]);
    setIsDialogOpen(false);
    toast({
      title: "Cliente agregado",
      description: `${newCliente.nombre} ${newCliente.apellido} ha sido agregado exitosamente`,
    });
  };

  const handleEditCliente = (clienteData: Omit<Cliente, "id" | "creado_en">) => {
    if (!editingCliente) return;
    
    // TODO: Conectar con Supabase
    const updatedClientes = clientes.map(cliente =>
      cliente.id === editingCliente.id
        ? { ...cliente, ...clienteData }
        : cliente
    );
    
    setClientes(updatedClientes);
    setEditingCliente(null);
    setIsDialogOpen(false);
    toast({
      title: "Cliente actualizado",
      description: `${clienteData.nombre} ${clienteData.apellido} ha sido actualizado exitosamente`,
    });
  };

  const handleDeleteCliente = (id: string) => {
    // TODO: Conectar con Supabase
    const cliente = clientes.find(c => c.id === id);
    setClientes(clientes.filter(c => c.id !== id));
    toast({
      title: "Cliente eliminado",
      description: `${cliente?.nombre} ${cliente?.apellido} ha sido eliminado`,
    });
  };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    
    return clientes
      .map(cliente => {
        const [day, month] = cliente.fecha_cumple.split('/').map(Number);
        let daysUntil = 0;
        
        const thisYear = new Date(today.getFullYear(), month - 1, day);
        const nextYear = new Date(today.getFullYear() + 1, month - 1, day);
        
        if (thisYear >= today) {
          daysUntil = Math.ceil((thisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        } else {
          daysUntil = Math.ceil((nextYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        }
        
        return { ...cliente, daysUntil };
      })
      .filter(cliente => cliente.daysUntil <= 30)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingBirthdays = getUpcomingBirthdays();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1">
      <div className="min-h-screen bg-background">
      {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gradient-gold">Panel de Administración</h1>
                <p className="text-muted-foreground">Gestión de Clientes</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="btn-outline-gold">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Cumpleaños Próximos */}
          {upcomingBirthdays.length > 0 && (
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center text-gold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Cumpleaños Próximos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingBirthdays.map((cliente) => (
                    <div key={cliente.id} className="p-4 bg-black-soft rounded-lg border border-gold/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            {cliente.nombre} {cliente.apellido}
                          </p>
                          <p className="text-sm text-muted-foreground">{cliente.fecha_cumple}</p>
                        </div>
                        <Badge variant="secondary" className="bg-gold/20 text-gold">
                          {cliente.daysUntil === 0 ? "Hoy" : `${cliente.daysUntil} días`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Clientes */}
          <Card className="card-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-gold">
                  <User className="w-5 h-5 mr-2" />
                  Clientes ({filteredClientes.length})
                </CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-gold" onClick={() => setEditingCliente(null)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Cliente
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-gold">
                        {editingCliente ? "Editar Cliente" : "Agregar Nuevo Cliente"}
                      </DialogTitle>
                    </DialogHeader>
                    <ClienteForm
                      cliente={editingCliente}
                      onSubmit={editingCliente ? handleEditCliente : handleAddCliente}
                      onCancel={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Búsqueda */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                  <Input
                    placeholder="Buscar por nombre o apellido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-elegant pl-10"
                  />
                </div>
              </div>

              {/* Tabla */}
              <div className="overflow-x-auto w-full">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gold">Nombre</TableHead>
                      <TableHead className="text-gold">Apellido</TableHead>
                      <TableHead className="text-gold">Cumpleaños</TableHead>
                      <TableHead className="text-gold">Servicios</TableHead>
                      <TableHead className="text-gold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.map((cliente) => (
                      <TableRow key={cliente.id} className="hover:bg-black-soft/30">
                        <TableCell className="font-medium">{cliente.nombre}</TableCell>
                        <TableCell>{cliente.apellido}</TableCell>
                        <TableCell>{cliente.fecha_cumple}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {cliente.historial.length} servicio(s)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingCliente(cliente);
                                setIsDialogOpen(true);
                              }}
                              className="border-gold/30 text-gold hover:bg-gold/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCliente(cliente.id)}
                              className="border-destructive/30 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredClientes.length === 0 && (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "No se encontraron clientes" : "No hay clientes registrados"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>

  );
};

export default AdminClientes;