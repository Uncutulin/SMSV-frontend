import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '@/utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.two_factor) {
          setStep(2);
        } else if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.access_token) {
              localStorage.setItem('token', data.access_token);
          }
          
          // Fuerza configurar 2FA si no lo tiene confirmado
          if (!data.user.two_factor_confirmed_at) {
              setStep(3);
              setup2FAForNewUser();
          } else {
              navigate('/cartera-vigente');
          }
        }
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error al intentar contactar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const setup2FAForNewUser = async () => {
      try {
          // Primero habilitamos la generación del hash secreto si no existe
          await fetch(`${API_BASE_URL}/user/two-factor-authentication`, { 
              method: 'POST',
              headers: getAuthHeaders()
          });
          // Luego obtenemos el QR
          const qrRes = await fetch(`${API_BASE_URL}/user/two-factor-qr-code`, {
              headers: getAuthHeaders()
          });
          if (qrRes.ok) {
              const data = await qrRes.json();
              if (data.svg) setQrCodeSvg(data.svg);
          }
      } catch (e) {
          console.error('Error generando QR', e);
      }
  };

  const handleConfirm2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Por favor, ingrese los 6 dígitos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/user/confirmed-two-factor-authentication`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify({ code: fullCode }),
      });

      if (response.ok) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            user.two_factor_confirmed_at = new Date().toISOString();
            localStorage.setItem('user', JSON.stringify(user));
        }
        navigate('/cartera-vigente');
      } else {
        setError('El código ingresado es incorrecto.');
      }
    } catch (error) {
      setError('Error al verificar el código. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    if (value.length > 1) {
      const pastedCode = value.replace(/\D/g, '').slice(0, 6).split('');
      const newCode = [...code];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) newCode[index + i] = char;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Por favor, ingrese los 6 dígitos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/two-factor-challenge`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // NOTA: Si Fortify usa cookies para el challenge, 
            // asegúrate que el backend tenga SANCTUM_STATEFUL_DOMAINS 
            // configurado e incluye credentials: 'include'.
        },
        body: JSON.stringify({ code: fullCode }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.access_token) {
            localStorage.setItem('token', data.access_token);
          }
        }
        navigate('/cartera-vigente');
      } else {
        setError(data.message || 'Código de autenticación inválido.');
      }
    } catch (error) {
      setError('No se pudo verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden relative bg-[#0f172a]">
      <div className="absolute inset-0 z-0 hidden md:flex" style={{ backgroundColor: '#111' }}>
        <img
          src="/SMSV.png"
          alt="Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="opacity-30 blur-sm absolute inset-0"
        />
      </div>

      {step === 1 ? (
        <>
          <div className="hidden md:flex md:w-8/12 h-full items-center justify-center bg-[#003366] z-10">
            <img
              src="/SMSV.png"
              alt="Logo SMSV"
              width="500"
              height="500"
              className="object-contain"
            />
          </div>
          <div className="md:w-4/12 w-full h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100 z-10">
            <div className="flex-1 flex flex-col justify-center items-center px-4">
              <div className="max-w-sm w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
                <div className="text-center">
                  <div className="flex justify-center mt-2 mb-2">
                    <img src="/logo.png" alt="Logo SMSV" width="160" height="160" className="mx-auto" />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Inicia sesión en tu cuenta
                  </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleNextStep}>
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">Contraseña</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003366] hover:bg-[#002244] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Iniciando...' : 'Siguiente'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <footer className="w-full text-center text-gray-500 text-xs py-2">
              © {new Date().getFullYear()} Sociedad Militar Seguro de Vida.
            </footer>
          </div>
        </>
      ) : step === 2 ? (
        <div className="flex-1 flex flex-col justify-center items-center px-4 z-10 w-full backdrop-blur-xs">
          <form className="w-full max-w-lg space-y-6 rounded-lg p-8" onSubmit={handleSubmit}>
            <div className="bg-[#e9ecef] text-center p-6 border border-gray-300">
              <p className="text-[#333] font-medium mb-3">
                Ingrese su segundo factor de autenticación.
              </p>
              <a href="#" className="text-[#0d6efd] hover:underline font-medium text-sm">
                Instructivo
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 my-8">
              <div className="flex gap-2">
                {code.slice(0, 3).map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-16 text-center text-3xl font-bold bg-white text-gray-800 rounded shadow-md border-none focus:ring-2 focus:ring-[#198754] outline-none"
                  />
                ))}
              </div>
              <span className="text-white text-3xl mx-1">-</span>
              <div className="flex gap-2">
                {code.slice(3, 6).map((digit, index) => (
                  <input
                    key={index + 3}
                    ref={(el) => { inputRefs.current[index + 3] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index + 3, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index + 3, e)}
                    className="w-14 h-16 text-center text-3xl font-bold bg-white text-gray-800 rounded shadow-md border-none focus:ring-2 focus:ring-[#198754] outline-none"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-center border-l-4 border-red-500 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border shadow-md text-lg font-bold rounded text-white bg-[#198754] hover:bg-[#157347] focus:outline-none transition-colors"
                style={{ borderRadius: '6px' }}
              >
                {loading ? 'Verificando...' : 'Ingresar'}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-white hover:text-gray-300 font-medium transition-colors border-b border-transparent hover:border-white"
              >
                Volver atrás
              </button>
            </div>
          </form>
          <div className="absolute bottom-6 w-full px-8 md:px-24 flex justify-between tracking-wide font-bold text-lg text-white drop-shadow-md">
            <a href="#" className="hover:text-gray-200 transition-colors">Nuevo usuario</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Olvidé mi contraseña</a>
          </div>
        </div>
      ) : (
        /* UI Paso 3: Configurar 2FA Obligatorio */
        <div className="flex-1 flex flex-col justify-center items-center px-4 z-10 w-full backdrop-blur-md">
          <form className="w-full max-w-lg space-y-6 bg-white rounded-xl shadow-2xl p-8" onSubmit={handleConfirm2FA}>
            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-bold text-[#003366]">Configuración de Seguridad</h2>
              <p className="text-sm text-gray-600 mt-2">
                Para proteger tu cuenta, es obligatorio configurar el segundo factor de autenticación.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center my-4 space-y-4">
              {qrCodeSvg ? (
                  <div className="p-4 bg-gray-50 border rounded-lg" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
              ) : (
                  <div className="w-48 h-48 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
                    Generando QR...
                  </div>
              )}
              <p className="text-xs text-gray-500 text-center max-w-xs">
                Escanea el código con tu aplicación de Google Authenticator e ingresa el código generado abajo.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
                {code.slice(0, 6).map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 text-center text-2xl font-bold bg-gray-50 text-gray-800 rounded border border-gray-300 focus:ring-2 focus:ring-[#003366] outline-none"
                  />
                ))}
            </div>

            {error && (
              <div className="mt-2 p-3 bg-red-100 text-center text-sm border-l-4 border-red-500 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || !qrCodeSvg}
                className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded text-white bg-[#003366] hover:bg-[#002244] focus:outline-none transition-colors disabled:opacity-50"
              >
                {loading ? 'Confirmando...' : 'Confirmar y Continuar'}
              </button>
            </div>
            
            <div className="text-center mt-4 text-xs">
               Si tienes problemas, contacta al administrador.
            </div>
          </form>
        </div>
      )}
    </div>
  );
}