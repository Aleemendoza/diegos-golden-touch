import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

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

interface ClienteFormProps {
  cliente?: Cliente | null;
  onSubmit: (clienteData: Omit<Cliente, "id" | "creado_en">) => void;
  onCancel: () => void;
}

const ClienteForm = ({ cliente, onSubmit, onCancel }: ClienteFormProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_cumple: "",
    historial: [] as Array<{ servicio: string; fecha: string; precio: number }>
  });

  const [newService, setNewService] = useState({
    servicio: "",
    fecha: "",
    precio: ""
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        fecha_cumple: cliente.fecha_cumple,
        historial: cliente.historial
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  const addService = () => {
    if (newService.servicio && newService.fecha && newService.precio) {
      const service = {
        servicio: newService.servicio,
        fecha: newService.fecha,
        precio: parseFloat(newService.precio)
      };
      
      setFormData({
        ...formData,
        historial: [...formData.historial, service]
      });
      
      setNewService({ servicio: "", fecha: "", precio: "" });
    }
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      historial: formData.historial.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información Básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-2 text-foreground">
            Nombre
          </label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input-elegant"
            required
          />
        </div>
        
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium mb-2 text-foreground">
            Apellido
          </label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="input-elegant"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="fecha_cumple" className="block text-sm font-medium mb-2 text-foreground">
          Fecha de Cumpleaños (DD/MM)
        </label>
        <Input
          id="fecha_cumple"
          name="fecha_cumple"
          value={formData.fecha_cumple}
          onChange={handleChange}
          placeholder="15/03"
          pattern="^[0-3]?[0-9]/[0-1]?[0-9]$"
          className="input-elegant"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">Formato: DD/MM</p>
      </div>

      {/* Historial de Servicios */}
      <div>
        <label className="block text-sm font-medium mb-4 text-foreground">
          Historial de Servicios
        </label>
        
        {/* Servicios existentes */}
        {formData.historial.length > 0 && (
          <div className="space-y-2 mb-4">
            {formData.historial.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black-soft rounded-lg border border-border">
                <div className="flex-1">
                  <span className="font-medium text-foreground">{service.servicio}</span>
                  <span className="text-muted-foreground ml-2">{service.fecha}</span>
                  <Badge variant="secondary" className="ml-2">
                    ${service.precio.toLocaleString()}
                  </Badge>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removeService(index)}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Agregar nuevo servicio */}
        <Card className="border-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gold">Agregar Servicio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                name="servicio"
                value={newService.servicio}
                onChange={handleServiceChange}
                placeholder="Tipo de servicio"
                className="input-elegant"
              />
              <Input
                name="fecha"
                type="date"
                value={newService.fecha}
                onChange={handleServiceChange}
                className="input-elegant"
              />
              <Input
                name="precio"
                type="number"
                value={newService.precio}
                onChange={handleServiceChange}
                placeholder="Precio"
                className="input-elegant"
              />
            </div>
            <Button
              type="button"
              onClick={addService}
              size="sm"
              className="btn-outline-gold"
              disabled={!newService.servicio || !newService.fecha || !newService.precio}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Servicio
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button type="submit" className="btn-gold">
          {cliente ? "Actualizar Cliente" : "Crear Cliente"}
        </Button>
      </div>
    </form>
  );
};

export default ClienteForm;