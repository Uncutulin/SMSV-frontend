"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (
        credentials.email === 'admin@smsv.com' &&
        credentials.password === 'demo1234'
      ) {
        setLoading(false);
        if (typeof document !== 'undefined') {
          document.cookie = 'smsv-auth=true; path=/;';
        }
        router.push('/cartera-vigente');
      } else {
        setLoading(false);
        setError('Usuario o contraseña incorrectos.');
      }
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sección Izquierda: Imagen PNG centrada y fondo color institucional */}
      <div className="hidden md:flex md:w-8/12 h-full items-center justify-center bg-[#003366]">
        <Image
          src="/SMSV.png"
          alt="Logo SMSV"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>
      {/* Sección Derecha: Formulario de Login y Footer */}
      <div className="md:w-4/12 w-full h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <div className="max-w-sm w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="flex justify-center mt-2 mb-2">
                <Image src="/logo.png" alt="Logo SMSV" width={160} height={160} className="mx-auto" />
              </div>
              <p className="mt-1 text-lg text-gray-600">
               
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Inicia sesión en tu cuenta
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003366] hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </div>
            </form>
            {/* Mensaje de error */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                {error}
              </div>
            )}
            {/* Cartel de credenciales de prueba */}
            <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded text-sm">
              <strong>Credenciales de prueba:</strong><br />
              Usuario: <span className="font-mono">admin@smsv.com</span><br />
              Contraseña: <span className="font-mono">demo1234</span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="w-full text-center text-gray-500 text-xs opacity-80 py-2">
          © {new Date().getFullYear()} Sociedad Militar Seguro de Vida. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
} 