import React, { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { fetchRoles } from '@/services/roleService';
import { Role, Usuario } from '@/types/user';
import Swal from 'sweetalert2';

export interface UserFormData {
    name: string;
    apellido: string;
    dni: string;
    email: string;
    password: string;
    password_confirmation: string;
    roles: string[]; // We keep strings for the form selection logic
    activo: boolean;
}

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
    initialData?: Usuario | null;
}

export default function UserFormModal({ isOpen, onClose, onSubmit, initialData }: UserFormModalProps) {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        apellido: '',
        dni: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
        activo: true
    });

    useEffect(() => {
        if (isOpen) {
            loadRoles();
            if (initialData) {
                setFormData({
                    name: initialData.name,
                    apellido: initialData.apellido,
                    dni: initialData.dni,
                    email: initialData.email,
                    password: '',
                    password_confirmation: '',
                    roles: initialData.roles.map(r => r.name), // Map Role objects to names
                    activo: initialData.activo ?? true // Default to true if missing
                });
            } else {
                setFormData({
                    name: '',
                    apellido: '',
                    dni: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    roles: [],
                    activo: true
                });
            }
        }
    }, [isOpen, initialData]);

    const loadRoles = async () => {
        if (roles.length > 0) return; // Don't reload if already loaded
        setLoadingRoles(true);
        const data = await fetchRoles();
        setRoles(data);
        setLoadingRoles(false);
    };

    const handleRoleChange = (roleName: string) => {
        setFormData(prev => {
            const currentRoles = prev.roles;
            let newRoles: string[];

            if (roleName === 'admin') {
                // If selecting admin, it becomes the only role. If unselecting, just remove it.
                if (currentRoles.includes('admin')) {
                    newRoles = [];
                } else {
                    newRoles = ['admin'];
                }
            } else {
                // If selecting other role
                if (currentRoles.includes(roleName)) {
                    // Remove it
                    newRoles = currentRoles.filter(r => r !== roleName);
                } else {
                    // Add it, but remove 'admin' if it exists
                    newRoles = [...currentRoles.filter(r => r !== 'admin'), roleName];
                }
            }
            return { ...prev, roles: newRoles };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.apellido || !formData.dni || !formData.email) {
            Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
            return;
        }

        if (!initialData && !formData.password) {
            Swal.fire('Error', 'La contraseña es obligatoria para nuevos usuarios', 'error');
            return;
        }

        if (formData.password && formData.password.length < 8) {
            Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            Swal.fire('Error', 'La contraseña y la confirmación no coinciden', 'error');
            return;
        }

        if (formData.roles.length === 0) {
            Swal.fire('Error', 'Debe seleccionar al menos un rol', 'error');
            return;
        }

        onSubmit(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nombre"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                        <input
                            type="text"
                            value={formData.apellido}
                            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Apellido"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI *</label>
                    <input
                        type="text"
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Documento Nacional de Identidad"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@ejemplo.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña {initialData && <span className="text-xs text-gray-500 font-normal">(Opcional)</span>}
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={formData.password_confirmation}
                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roles *</label>
                    {loadingRoles ? (
                        <p className="text-sm text-gray-500">Cargando roles...</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-md border border-gray-200 max-h-40 overflow-y-auto">
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <label key={role.id} className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-gray-100 rounded">
                                        <input
                                            type="checkbox"
                                            checked={formData.roles.includes(role.name)}
                                            onChange={() => handleRoleChange(role.name)}
                                            className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{role.name}</span>
                                    </label>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 col-span-2">No se encontraron roles disponibles.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={formData.activo}
                        onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                        Usuario activo
                    </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        {initialData ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
