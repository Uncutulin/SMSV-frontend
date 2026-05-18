'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Usuario } from '@/types/user';
import { fetchUsers, createUser, updateUser, deleteUser, toggleUserForce2FA } from '@/services/userService';
import { getAvatarUrl } from '@/utils/avatar';
import UserFormModal, { UserFormData } from './UserFormModal';
import Swal from 'sweetalert2';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsuarios(data);
    setLoading(false);
  };

  const handleOpenNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (data: UserFormData) => {
    try {
      if (editingUser) {
        // Update user
        await updateUser(editingUser.id, data);
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
        await loadUsers(); // Refresh list
      } else {
        // Create user
        await createUser(data);
        Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
        await loadUsers(); // Refresh list
      }
      closeModal();
    } catch (error: any) {
      if (error.errors) {
        const errorMessages = Object.entries(error.errors)
          .map(([field, messages]: [string, any]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            return `${fieldName}: ${messages.join(', ')}`;
          })
          .join('<br>');

        Swal.fire({
          title: 'Error de validación',
          html: errorMessages,
          icon: 'error'
        });
      } else {
        Swal.fire('Error', error.message || 'Error al guardar usuario', 'error');
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
        await loadUsers();
      } catch (error: any) {
        Swal.fire(
          'Error!',
          error.message || 'No se pudo eliminar el usuario.',
          'error'
        );
      }
    }
  };

  const handleToggleForce2FA = async (usuario: Usuario) => {
    try {
      const newValue = !usuario.force_2fa;
      await toggleUserForce2FA(usuario.id, newValue);
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'success',
        title: `2FA Obligatorio ${newValue ? 'activado' : 'desactivado'} para ${usuario.name}`
      });

      setUsuarios(usuarios.map(u => u.id === usuario.id ? { ...u, force_2fa: newValue } : u));
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo actualizar el estado de 2FA',
      });
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return usuarios;
    const lowerSearch = searchTerm.toLowerCase();
    return usuarios.filter(u => 
      (u.name?.toLowerCase().includes(lowerSearch)) || 
      (u.apellido?.toLowerCase().includes(lowerSearch)) ||
      (u.dni?.toLowerCase().includes(lowerSearch)) ||
      (u.email?.toLowerCase().includes(lowerSearch))
    );
  }, [usuarios, searchTerm]);

  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 mb-6 px-2 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administración de Usuarios</h1>
            <p className="text-gray-600 mt-1">Gestión de usuarios y sus roles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Usuario
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forzar 2FA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Cargando usuarios...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p>{searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios registrados.'}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((usuario: Usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {usuario.avatar_url ? (
                              <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={getAvatarUrl(usuario.avatar_url) || ''} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                {usuario.name?.charAt(0)}{usuario.apellido?.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{usuario.name} {usuario.apellido}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.dni}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {usuario.roles && usuario.roles.map((role: any) => (
                            <span key={role.id} className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${role.name === 'admin' ? 'bg-red-100 text-red-800' :
                              role.name === 'usuario' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                              {role.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${!usuario.deleted_at && usuario.activo !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {!usuario.deleted_at && usuario.activo !== false ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={!!usuario.force_2fa}
                            onChange={() => handleToggleForce2FA(usuario)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!usuario.deleted_at && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleOpenEdit(usuario)}
                              className="text-blue-600 hover:text-blue-900 transition-colors cursor-pointer"
                            >
                              <span className="sr-only">Editar</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(usuario.id)}
                              className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                            >
                              <span className="sr-only">Eliminar</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <UserFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSave}
          initialData={editingUser}
        />
      </div>
    </DashboardLayout>
  );
}
