'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Swal from 'sweetalert2';
import { updateUser, updateAvatar } from '@/services/userService';
import { Usuario } from '@/types/user';
import { getAvatarUrl } from '@/utils/avatar';

export default function ProfilePage() {
    const [user, setUser] = useState<Usuario | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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
                if (parsedUser.avatar_url) {
                    setAvatarPreview(getAvatarUrl(parsedUser.avatar_url));
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

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
            // 1. Update Avatar if changed
            let newAvatarPath = user.avatar;
            let newAvatarUrl = user.avatar_url;
            if (avatarFile) {
                const avatarFormData = new FormData();
                avatarFormData.append('avatar', avatarFile);
                const avatarResponse = await updateAvatar(user.id, avatarFormData);
                newAvatarPath = avatarResponse.avatar;
                newAvatarUrl = avatarResponse.avatar_url;
            }

            // 2. Update other data
            const updateData: any = {
                name: formData.name,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email,
                roles: (user.roles || []).map(r => r.name)
            };

            if (formData.password && formData.password.trim() !== '') {
                updateData.password = formData.password;
                updateData.password_confirmation = formData.password_confirmation;
            }

            await updateUser(user.id, updateData);

            // Update local storage
            const updatedUser = {
                ...user,
                name: formData.name,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email,
                avatar: newAvatarPath,
                avatar_url: newAvatarUrl
            };

            delete (updatedUser as any).password;
            delete (updatedUser as any).password_confirmation;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');
            
            // Reload to refresh potential headers or other components using the user info
            setTimeout(() => {
                window.location.reload();
            }, 1500);

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
                Swal.fire('Error', error.message || 'Error al actualizar perfil', 'error');
            }
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
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Mi Perfil
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Información personal y de cuenta.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">
                                            {user.name?.charAt(0)}{user.apellido?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">Cambiar foto</span>
                        </div>
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
