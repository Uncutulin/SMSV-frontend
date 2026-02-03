'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Swal from 'sweetalert2';
import { updateUser } from '@/services/userService';
import { Usuario } from '@/types/user';

export default function ProfilePage() {
    const [user, setUser] = useState<Usuario | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        dni: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        // Load user from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setFormData({
                    name: parsedUser.name || '',
                    apellido: parsedUser.apellido || '',
                    dni: parsedUser.dni || '',
                    email: parsedUser.email || '',
                    password: '',
                    password_confirmation: ''
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        // Basic validation
        if (!formData.name || !formData.apellido || !formData.dni || !formData.email) {
            Swal.fire('Error', 'Por favor complete todos los campos obligatorios', 'error');
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

        setIsSaving(true);
        try {
            // Prepare data for update (exclude empty password if not changed)
            const updateData: any = {
                name: formData.name,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email,
                roles: (user.roles || []).map(r => r.name) // Keep existing roles
            };


            if (formData.password && formData.password.trim() !== '') {
                updateData.password = formData.password;
                updateData.password_confirmation = formData.password_confirmation;
                console.log('ProfilePage: Including password update in request');
            } else {
                console.log('ProfilePage: Password update NOT included (empty field)');
            }

            await updateUser(user.id, updateData);

            // Update local storage
            // IMPORTANT: Do not use updateData.roles (strings) for local storage, 
            // keep the original user.roles (objects) which the app expects.
            const updatedUser = {
                ...user,
                name: formData.name,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email
            };

            // Remove password fields if they were in user object (unlikely but safe)
            delete (updatedUser as any).password;
            delete (updatedUser as any).password_confirmation;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');

            // Optional: trigger a header refresh if we had a global context or event, 
            // but a page reload is simple enough or assume header reads from localStorage on mount/update?
            // Actually Header reads on mount. We might need to reload window to see changes in Header immediately or trust the user will navigate.
            // Let's reload to be safe and ensure Header picks up name changes.
            window.location.reload();

        } catch (error: any) {
            Swal.fire('Error', error.message || 'Error al actualizar perfil', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return (
            <DashboardLayout>
                <div className="p-6">
                    <p>Cargando perfil...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Mi Perfil
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Información personal y de cuenta.
                        </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                                        Apellido
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="apellido"
                                            id="apellido"
                                            value={formData.apellido}
                                            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                                        DNI
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="dni"
                                            id="dni"
                                            value={formData.dni}
                                            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6 border-t border-gray-200 pt-6 mt-2">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Cambiar Contraseña (Opcional)</h4>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Nueva Contraseña
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                        Confirmar Nueva Contraseña
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6 bg-gray-50 p-4 rounded-md">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Roles Asignados</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user.roles.map((role: any) => (
                                        <span key={role.id || role.name} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando...
                                        </>
                                    ) : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
