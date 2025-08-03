-- Scripts de configuración para Diego Chapiero Estilista
-- Ejecutar estos scripts en Supabase SQL Editor

-- 1. Crear tabla de clientes
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_cumple TEXT NOT NULL, -- formato DD/MM
    historial JSONB DEFAULT '[]'::jsonb,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de usuarios (para futuro sistema de auth)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    rol TEXT DEFAULT 'admin',
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insertar usuario admin por defecto
INSERT INTO public.usuarios (email, nombre, rol) 
VALUES ('admin@diegochapiero.com', 'Diego Chapiero', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 4. Crear algunos clientes de ejemplo
INSERT INTO public.clientes (nombre, apellido, fecha_cumple, historial) VALUES
('María', 'González', '15/03', '[{"servicio": "Corte de Cabello", "fecha": "2024-01-15", "precio": 25000}]'::jsonb),
('Ana', 'Rodríguez', '22/06', '[{"servicio": "Coloración", "fecha": "2024-01-20", "precio": 45000}]'::jsonb),
('Sofía', 'López', '08/12', '[{"servicio": "Peinado", "fecha": "2024-01-25", "precio": 35000}]'::jsonb),
('Carmen', 'Martínez', '30/01', '[{"servicio": "Tratamiento", "fecha": "2024-01-30", "precio": 40000}]'::jsonb)
ON CONFLICT DO NOTHING;

-- 5. Habilitar RLS (Row Level Security)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- 6. Crear políticas RLS (por ahora permisivas, ajustar cuando se implemente auth real)
CREATE POLICY "Permitir todo en clientes" ON public.clientes FOR ALL USING (true);
CREATE POLICY "Permitir todo en usuarios" ON public.usuarios FOR ALL USING (true);

-- 7. Función para buscar cumpleaños próximos
CREATE OR REPLACE FUNCTION get_proximos_cumpleanos()
RETURNS TABLE(
    id UUID,
    nombre TEXT,
    apellido TEXT,
    fecha_cumple TEXT,
    dias_hasta_cumple INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.nombre,
        c.apellido,
        c.fecha_cumple,
        CASE 
            WHEN EXTRACT(DOY FROM (CURRENT_DATE + INTERVAL '1 year')) + 
                 EXTRACT(DOY FROM TO_DATE(c.fecha_cumple || '/' || EXTRACT(YEAR FROM CURRENT_DATE), 'DD/MM/YYYY')) - 
                 EXTRACT(DOY FROM CURRENT_DATE) < 0 
            THEN 365 + (EXTRACT(DOY FROM TO_DATE(c.fecha_cumple || '/' || EXTRACT(YEAR FROM CURRENT_DATE), 'DD/MM/YYYY')) - EXTRACT(DOY FROM CURRENT_DATE))::INTEGER
            ELSE (EXTRACT(DOY FROM TO_DATE(c.fecha_cumple || '/' || EXTRACT(YEAR FROM CURRENT_DATE), 'DD/MM/YYYY')) - EXTRACT(DOY FROM CURRENT_DATE))::INTEGER
        END as dias_hasta_cumple
    FROM public.clientes c
    ORDER BY dias_hasta_cumple ASC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;