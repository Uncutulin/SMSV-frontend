'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
  permisos: string[];
  activo: boolean;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Rol[]>([
    {
      id: '1',
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema',
      permisos: ['lectura', 'escritura', 'eliminacion', 'administracion'],
      activo: true
    },
    {
      id: '2',
      nombre: 'Usuario',
      descripcion: 'Acceso básico al sistema',
      permisos: ['lectura', 'escritura'],
      activo: true
    },
    {
      id: '3',
      nombre: 'Visor',
      descripcion: 'Solo lectura de datos',
      permisos: ['lectura'],
      activo: true
    }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    permisos: [] as string[],
    activo: true
  });

  const permisosDisponibles = [
    { id: 'lectura', nombre: 'Lectura' },
    { id: 'escritura', nombre: 'Escritura' },
    { id: 'eliminacion', nombre: 'Eliminación' },
    { id: 'administracion', nombre: 'Administración' }
  ];

  const handleAdd = () => {
    if (!formData.nombre || !formData.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newRol: Rol = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      permisos: formData.permisos,
      activo: formData.activo
    };

    setRoles([...roles, newRol]);
    setFormData({ nombre: '', descripcion: '', permisos: [], activo: true });
  };

  const handleEdit = (id: string) => {
    const rol = roles.find(r => r.id === id);
    if (rol) {
      setFormData({
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        permisos: rol.permisos,
        activo: rol.activo
      });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!editingId) return;

    setRoles(roles.map(rol => 
      rol.id === editingId 
        ? {
            ...rol,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            permisos: formData.permisos,
            activo: formData.activo
          }
        : rol
    ));

    setFormData({ nombre: '', descripcion: '', permisos: [], activo: true });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este rol?')) {
      setRoles(roles.filter(rol => rol.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: '', descripcion: '', permisos: [], activo: true });
    setEditingId(null);
  };

  const togglePermiso = (permisoId: string) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permisoId)
        ? prev.permisos.filter(p => p !== permisoId)
        : [...prev.permisos, permisoId]
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Administración de Roles</h1>
          <p className="text-gray-600">Gestione los roles y permisos del sistema</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Editar Rol' : 'Agregar Nuevo Rol'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Rol *
              </label>
              <input
                type="text"
                placeholder="Nombre del rol"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <input
                type="text"
                placeholder="Descripción del rol"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permisos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {permisosDisponibles.map((permiso) => (
                <div key={permiso.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permiso.id}
                    checked={formData.permisos.includes(permiso.id)}
                    onChange={() => togglePermiso(permiso.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={permiso.id} className="ml-2 block text-sm text-gray-900">
                    {permiso.nombre}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="activo"
                checked={formData.activo}
                onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                Rol activo
              </label>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Actualizar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Agregar Rol
              </button>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Roles</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permisos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((rol) => (
                  <tr key={rol.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rol.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {rol.descripcion}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {rol.permisos.map((permiso) => (
                          <span
                            key={permiso}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {permiso}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rol.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rol.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(rol.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(rol.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
