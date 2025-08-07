# SMSV - Sociedad Militar Seguro de Vida

Esta es la migración de la aplicación .NET Core 8 MVC a una aplicación Vue.js con Next.js y Tailwind CSS para el sistema de gestión de seguros de vida militar.

## Características

- **Login**: Página de inicio de sesión con diseño moderno
- **Dashboard**: Panel principal con sidebar responsive
- **3 Vistas Principales**:
  - Evolución de la Cartera
  - Ranking de Compañías / Productores
  - Producción de Compañías Estratégicas

## Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS utilitario
- **Font Awesome**: Iconos
- **Highcharts**: Gráficos (pendiente de implementación)

## Acerca de SMSV

**SMSV** (Sociedad Militar Seguro de Vida) es una entidad especializada en la gestión de seguros de vida para personal militar, ofreciendo cobertura integral y servicios especializados para las fuerzas armadas.

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                    # Página de login
│   ├── layout.tsx                  # Layout principal
│   ├── globals.css                 # Estilos globales
│   └── dashboard/
│       ├── layout.tsx              # Layout del dashboard
│       ├── page.tsx                # Evolución de la Cartera
│       ├── ranking/
│       │   └── page.tsx            # Ranking de Compañías
│       └── produccion/
│           └── page.tsx            # Producción Estratégica
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # Componente sidebar
│   │   ├── Header.tsx              # Componente header
│   │   └── DashboardLayout.tsx     # Layout principal del dashboard
│   └── dashboard/
│       ├── StatCard.tsx            # Tarjetas de estadísticas
│       └── ChartPlaceholder.tsx    # Placeholders para gráficos
```

## Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## Funcionalidades

### Login
- Formulario de inicio de sesión
- Validación de campos
- Redirección automática al dashboard

### Dashboard
- **Sidebar responsive** con navegación
- **Header** con información del usuario
- **3 menús principales**:
  - Evolución de la Cartera
  - Ranking de Compañías / Productores
  - Producción de Compañías Estratégicas

### Vistas
Cada vista incluye:
- Cards de estadísticas (Asegurados Activos, Primas Emitidas, Cancelaciones)
- Placeholders para gráficos (pendientes de implementación con Highcharts)
- Diseño responsive y moderno

## Próximos Pasos

1. **Implementar Highcharts**: Agregar los gráficos reales con datos
2. **Conectar con API**: Integrar con el backend .NET Core
3. **Autenticación real**: Implementar JWT o similar
4. **Datos dinámicos**: Cargar datos desde la base de datos

## Comandos Disponibles

- `npm run dev`: Ejecutar en modo desarrollo
- `npm run build`: Construir para producción
- `npm run start`: Ejecutar en modo producción
- `npm run lint`: Ejecutar linter

## Notas

- Los gráficos actualmente son placeholders
- La autenticación es simulada
- Los datos son estáticos
- El diseño mantiene la estética de la aplicación original
