import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
    login, 
    twoFactorChallenge, 
    enableTwoFactor, 
    getTwoFactorQrCode, 
    getTwoFactorSecretKey,
    confirmTwoFactor,
    forgotPassword
} from '@/services/authService';

export default function Login() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [tempSetupToken, setTempSetupToken] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      // Generamos un hash básico del navegador para mayor estabilidad
      const nav = window.navigator;
      const screen = window.screen;
      const fingerprint = btoa(nav.userAgent + nav.language + screen.width + screen.height).substring(0, 32);
      deviceId = fingerprint;
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;

    setLoading(true);
    setError('');

    try {
      const deviceId = getDeviceId();
      const data = await login(credentials, deviceId);

      if (data.two_factor) {
        setTempSetupToken(data.access_token);
        setStep(2);
      } else if (data.requires_2fa_setup) {
        setTempSetupToken(data.access_token);
        setStep(3);
        setup2FAForNewUser(data.access_token);
      } else if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        navigate('/cartera-vigente');
      }
    } catch (error: any) {
      setError(error.message || 'Error al intentar contactar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Recuperar Contraseña',
      input: 'email',
      inputLabel: 'Ingresa tu correo electrónico',
      inputPlaceholder: 'tu@email.com',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#003366',
      inputValidator: (value) => {
        if (!value) {
          return '¡Por favor ingresa tu email!';
        }
      }
    });

    if (email) {
      setLoading(true);
      try {
        await forgotPassword(email);
        Swal.fire({
          icon: 'success',
          title: '¡Email enviado!',
          text: 'Se ha enviado una nueva contraseña a tu correo electrónico.',
          confirmButtonColor: '#003366',
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No se pudo procesar la solicitud.',
          confirmButtonColor: '#003366',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const setup2FAForNewUser = async (token: string) => {
      try {
          // Primero habilitamos la generación del hash secreto si no existe
          await enableTwoFactor(token);
          // Luego obtenemos el QR
          const data = await getTwoFactorQrCode(token);
          if (data.svg) setQrCodeSvg(data.svg);
          try {
              const secretData = await getTwoFactorSecretKey(token);
              if (secretData.secretKey) {
                  setSecretKey(secretData.secretKey);
              }
          } catch (secError) {
              console.error('Failed to fetch secret key', secError);
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
      const deviceId = getDeviceId();
      const data = await confirmTwoFactor(fullCode, tempSetupToken, deviceId);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
      }

      setTempSetupToken('');
      setCode(['', '', '', '', '', '']);
      
      Swal.fire({
        icon: 'success',
        title: '¡Configuración exitosa!',
        text: 'El segundo factor de autenticación ha sido configurado y has iniciado sesión correctamente.',
        confirmButtonColor: '#003366',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/cartera-vigente');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Error al verificar el código. Inténtalo de nuevo.');
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
      const deviceId = getDeviceId();
      const data = await twoFactorChallenge(fullCode, tempSetupToken, deviceId);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
      }
      navigate('/cartera-vigente');
    } catch (error: any) {
      setError(error.message || 'No se pudo verificar el código.');
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
                  
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-gray-500 hover:text-[#003366] transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-center text-sm border-l-4 border-red-500 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <footer className="w-full text-center text-gray-500 text-xs py-2">
              © {new Date().getFullYear()} Sociedad Militar Seguro de Vida.
            </footer>
          </div>
        </>
      ) : step === 2 ? (
        <div className="flex-1 flex flex-col justify-center items-center px-4 z-10 w-full backdrop-blur-md">
          <form className="w-full max-w-lg space-y-6 bg-white rounded-xl shadow-2xl p-8" onSubmit={handleSubmit}>
            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-bold text-[#003366]">Autenticación de Dos Factores</h2>
              <p className="text-sm text-gray-600 mt-2">
                Ingresa el código de 6 dígitos de tu aplicación de autenticación para continuar.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 my-8">
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
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded text-white bg-[#003366] hover:bg-[#002244] focus:outline-none transition-colors disabled:opacity-50"
              >
                {loading ? 'Verificando...' : 'Verificar e Ingresar'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-xs text-gray-500 hover:text-[#003366] transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </form>
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
                  <div className="flex flex-col items-center space-y-3">
                      <div className="p-4 bg-gray-50 border rounded-lg" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
                      {secretKey && (
                          <div className="w-full max-w-[230px]">
                              <p className="text-xs text-gray-500 mb-1 font-semibold text-center">¿No puedes escanear el código QR?</p>
                              <button
                                  type="button"
                                  onClick={() => {
                                      navigator.clipboard.writeText(secretKey);
                                      const Toast = Swal.mixin({
                                          toast: true,
                                          position: 'top-end',
                                          showConfirmButton: false,
                                          timer: 2000,
                                          timerProgressBar: true,
                                      });
                                      Toast.fire({
                                          icon: 'success',
                                          title: 'Clave copiada al portapapeles'
                                      });
                                  }}
                                  className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded px-3 py-2 text-xs font-mono text-gray-700 transition-colors shadow-sm select-all active:scale-[0.98] cursor-pointer"
                                  title="Hacer clic para copiar clave secreta"
                              >
                                  <span className="truncate mr-2 font-bold tracking-wider">{secretKey}</span>
                                  <i className="fa-regular fa-copy text-gray-400 hover:text-gray-600"></i>
                              </button>
                          </div>
                      )}
                  </div>
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