'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
    enableTwoFactor, 
    getTwoFactorQrCode, 
    confirmTwoFactor, 
    getRecoveryCodes, 
    disableTwoFactor 
} from '@/services/authService';

export default function SeguridadAdmin() {
    const [status, setStatus] = useState<'loading' | 'disabled' | 'pending' | 'enabled'>('loading');
    const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
    const [setupCode, setSetupCode] = useState('');
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            // First check if user object has 2FA enabled
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user.two_factor_confirmed_at) {
                    setStatus('enabled');
                    return;
                } else if (user.two_factor_secret) {
                    // Pending confirmation
                    setStatus('pending');
                    fetchQrCode();
                    return;
                }
            }
            setStatus('disabled');
        } catch (error) {
            console.error(error);
            setStatus('disabled');
        }
    };

    const enable2FA = async () => {
        setError('');
        try {
            await enableTwoFactor();
            
            // Update local user state
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.two_factor_secret = true; // placeholder to trigger pending state
                localStorage.setItem('user', JSON.stringify(user));
            }
            setStatus('pending');
            fetchQrCode();
        } catch (e: any) {
            setError(e.message || 'Error al habilitar 2FA.');
        }
    };

    const fetchQrCode = async () => {
        try {
            const data = await getTwoFactorQrCode();
            if (data.svg) {
                setQrCodeSvg(data.svg);
            }
        } catch (e) {
            console.error('Failed to fetch QR code', e);
        }
    };

    const confirm2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!setupCode) return;

        try {
            await confirmTwoFactor(setupCode);

            setSuccess('Autenticación de dos factores activada con éxito.');
            setStatus('enabled');
            
            // Update local user
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.two_factor_confirmed_at = new Date().toISOString();
                localStorage.setItem('user', JSON.stringify(user));
            }

            fetchRecoveryCodes();
        } catch (e: any) {
            setError(e.message || 'Error al confirmar 2FA.');
        }
    };

    const fetchRecoveryCodes = async () => {
        try {
            const data = await getRecoveryCodes();
            setRecoveryCodes(data);
        } catch (e) {
            console.error('Failed to fetch recovery codes', e);
        }
    };

    const disable2FA = async () => {
        if (!confirm('¿Estás seguro de que deseas desactivar la autenticación de dos factores?')) return;
        
        setError('');
        try {
            await disableTwoFactor();

            setSuccess('Autenticación de dos factores desactivada.');
            setStatus('disabled');
            setQrCodeSvg('');
            setRecoveryCodes([]);

            // Update local user
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.two_factor_secret = null;
                user.two_factor_confirmed_at = null;
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (e: any) {
            setError(e.message || 'Error al desactivar 2FA.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-[#003366] mb-6">Configuración de Seguridad (2FA)</h1>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm">
                        {success}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Autenticación de Dos Factores</h2>
                    <p className="text-gray-600 mb-6">
                        Agrega seguridad adicional a tu cuenta requiriendo un código de verificación al iniciar sesión.
                    </p>

                    {status === 'loading' && (
                        <div className="text-gray-500">Cargando estado...</div>
                    )}

                    {status === 'disabled' && (
                        <div>
                            <p className="font-medium text-red-600 mb-4">No has habilitado la autenticación de dos factores.</p>
                            <button
                                onClick={enable2FA}
                                className="bg-[#003366] text-white px-4 py-2 rounded shadow hover:bg-[#002244] transition-colors font-bold"
                            >
                                Habilitar 2FA
                            </button>
                        </div>
                    )}

                    {status === 'pending' && (
                        <div className="space-y-6">
                            <p className="font-medium text-orange-600">Autenticación pendiente de configuración.</p>
                            <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700 max-w-lg">
                                Para terminar de activar la autenticación de dos factores, escanea este código QR usando la aplicación de Google Authenticator en tu teléfono.
                            </div>
                            
                            {qrCodeSvg ? (
                                <div className="p-4 bg-white inline-block border rounded-lg shadow-sm" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
                            ) : (
                                <div className="p-8 bg-gray-100 animate-pulse inline-block rounded-lg">Cargando QR...</div>
                            )}

                            <form onSubmit={confirm2FA} className="max-w-xs space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código de verificación</label>
                                    <input
                                        type="text"
                                        value={setupCode}
                                        onChange={(e) => setSetupCode(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-[#003366] focus:border-[#003366]"
                                        placeholder="Ej. 123456"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#10b981] text-white px-4 py-2 rounded shadow hover:bg-[#059669] transition-colors font-bold"
                                >
                                    Confirmar y Activar
                                </button>
                                <button
                                    type="button"
                                    onClick={disable2FA}
                                    className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300 transition-colors font-bold"
                                >
                                    Cancelar Configuración
                                </button>
                            </form>
                        </div>
                    )}

                    {status === 'enabled' && (
                        <div className="space-y-6">
                            <p className="font-medium text-green-600 flex items-center">
                                <i className="fa-solid fa-check-circle mr-2"></i>
                                Has habilitado la autenticación de dos factores correctamente.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={fetchRecoveryCodes}
                                    className="bg-gray-100 border text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition-colors font-bold"
                                >
                                    Ver Códigos de Recuperación
                                </button>
                                <button
                                    onClick={disable2FA}
                                    className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors font-bold"
                                >
                                    Desactivar 2FA
                                </button>
                            </div>

                            {recoveryCodes.length > 0 && (
                                <div className="bg-gray-50 border p-6 rounded-md mt-4">
                                    <p className="text-sm text-gray-700 mb-4 font-bold">
                                        Guarda estos códigos de recuperación en un lugar seguro. Pueden ser usados para recuperar el acceso a tu cuenta si pierdes tu dispositivo.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-sm max-w-sm">
                                        {recoveryCodes.map((code, idx) => (
                                            <div key={idx} className="bg-white border p-2 text-center font-mono text-gray-800 tracking-wider">
                                                {code}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
