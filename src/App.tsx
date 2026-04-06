import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

// Lazy load pages to speed up initial bundle
const Login = React.lazy(() => import('./pages/login'));
const CarteraVigente = React.lazy(() => import('./pages/cartera-vigente'));
const EvolucionCartera = React.lazy(() => import('./pages/evolucion-de-la-cartera'));
const EvolucionTipoOperacion = React.lazy(() => import('./pages/evolucion-por-tipo-operacion'));
const PresupuestoComercial = React.lazy(() => import('./pages/dashboard/presupuesto-comercial'));
const CampanasMkt = React.lazy(() => import('./pages/campanas-mkt'));
const AdminSeguridad = React.lazy(() => import('./pages/admin/seguridad'));
const AdminIPC = React.lazy(() => import('./pages/admin/ipc'));
const AdminUsuarios = React.lazy(() => import('./pages/admin/usuarios'));
const QSTOMLogs = React.lazy(() => import('./pages/admin/logs/qstom'));
const JerarquiaLogs = React.lazy(() => import('./pages/admin/logs/jerarquia'));
const AseguradosLogs = React.lazy(() => import('./pages/admin/logs/asegurados'));
const FTPLogs = React.lazy(() => import('./pages/admin/logs/ftp'));

// Import dashboard layout wrapper if it exists (assuming it was in app/layout.tsx or components)
// Normally layouts in React Router simply render <Outlet /> for children, or wrap children
// Let's assume the pages themselves import DashboardLayout right now.

function App() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Cargando aplicación...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas principales del dashboard */}
        <Route path="/cartera-vigente" element={<CarteraVigente />} />
        <Route path="/evolucion-de-la-cartera" element={<EvolucionCartera />} />
        <Route path="/evolucion-por-tipo-operacion" element={<EvolucionTipoOperacion />} />
        <Route path="/dashboard/presupuesto-comercial" element={<PresupuestoComercial />} />
        <Route path="/campanas-mkt" element={<CampanasMkt />} />
        
        {/* Rutas de Administración */}
        <Route path="/admin/seguridad" element={<AdminSeguridad />} />
        <Route path="/admin/ipc" element={<AdminIPC />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />

        {/* Rutas de Logs */}
        <Route path="/admin/logs/qstom" element={<QSTOMLogs />} />
        <Route path="/admin/logs/jerarquia" element={<JerarquiaLogs />} />
        <Route path="/admin/logs/asegurados" element={<AseguradosLogs />} />
        <Route path="/admin/logs/ftp" element={<FTPLogs />} />

        {/* Fallback vacio */}
        <Route path="*" element={<div className="p-10 text-center">404 - Página no encontrada</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
