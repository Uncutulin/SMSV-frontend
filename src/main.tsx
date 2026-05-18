import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App'
import './globals.css' // Import the global styles

// Manejador global para errores de carga de chunks (Vite ChunkLoadError)
// Esto sucede al subir nuevas versiones a producción: el cliente tiene hashes viejos en memoria
// y el servidor web (Nginx) devuelve index.html (MIME type 'text/html') para scripts borrados.
if (typeof window !== 'undefined') {
  const handleChunkError = () => {
    const lastReload = sessionStorage.getItem('last_chunk_reload');
    const now = Date.now();
    
    // Evitar bucles de recarga infinita si el recurso realmente no existe
    if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
      sessionStorage.setItem('last_chunk_reload', now.toString());
      console.warn('Falla de carga de recurso detectada. Recargando la aplicación...');
      window.location.reload();
    }
  };

  window.addEventListener('error', (event) => {
    const errorText = event.message || '';
    const isScript = event.target && (event.target as HTMLElement).tagName === 'SCRIPT';
    if (
      isScript ||
      errorText.includes('Failed to fetch dynamically imported module') ||
      errorText.includes('Expected a JavaScript or Wasm module script')
    ) {
      handleChunkError();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const errorText = event.reason?.message || '';
    if (
      errorText.includes('Failed to fetch dynamically imported module') ||
      errorText.includes('ChunkLoadError')
    ) {
      handleChunkError();
    }
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
