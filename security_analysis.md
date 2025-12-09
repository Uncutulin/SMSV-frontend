# Análisis de Seguridad - SMSV Frontend

Este documento detalla las vulnerabilidades y problemas de seguridad encontrados durante el análisis del código fuente de la aplicación SMSV-frontend.

## Resumen de Hallazgos

| Nivel de Riesgo | Categoría | Descripción | Archivos Afectados |
| --- | --- | --- | --- |
| 🔴 **Crítico** | Acceso a Archivos | **Path Traversal**: Es posible listar archivos arbitrarios del servidor. | `src/app/api/ftp-list/route.ts`, `src/lib/files.ts` |
| 🔴 **Crítico** | Autenticación | **Bypass de Autenticación**: La lógica de middleware y login es inconsistente y extremadamente débil. | `middleware.ts`, `src/app/login/page.tsx`, `src/app/page.tsx` |
| 🟠 **Alto** | Sesiones | **Cookies Inseguras**: Las cookies de sesión no tienen el flag `HttpOnly` y son accesibles vía JS (XSS). | `src/app/login/page.tsx` |
| 🟡 **Medio** | Información | **Credenciales Hardcodeadas**: Credenciales de prueba expuestas en el HTML. | `src/app/login/page.tsx` |
| 🟡 **Medio** | Información | **Fuga de Rutas Locales**: Rutas del sistema de archivos local expuestas en el código. | `src/app/api/ftp-files/route.ts`, `src/app/api/ftp-list/route.ts` |

---

## Detalles Técnicos

### 1. Vulnerabilidad de Path Traversal (Crítico)
La funcionalidad de listado de archivos FTP no valida correctamente que la ruta solicitada esté dentro del directorio permitido base (`FTP_ROOT`).

- **Código Vulnerable**: `src/lib/files.ts`
  ```typescript
  export async function listFiles(baseDir: string, currentPath: string = ''): Promise<FileEntry[]> {
    const targetPath = path.join(baseDir, currentPath); // <--- Vulnerable
    // ...
  }
  ```
- **Exploit**: Un atacante puede enviar `?path=../../../../` al endpoint `/api/ftp-list` y listar archivos sensibles del sistema operativo o del código fuente.

### 2. Bypass de Autenticación y Lógica Rota (Crítico)
Existe una discrepancia crítica entre cómo se establece la sesión y cómo se verifica.

- **Login (`src/app/login/page.tsx`)**: Establece una cookie llamada `token`.
- **Middleware (`middleware.ts`)**: Verifica una cookie llamada `smsv-auth` con valor `true`.
  ```typescript
  const isAuthenticated = request.cookies.get('smsv-auth')?.value === 'true';
  ```
- **Impacto**:
    1. Un usuario legítimo que se loguea obtiene un `token` pero **será bloqueado** por el middleware porque le falta `smsv-auth`.
    2. Un atacante puede simplemente crear manualmente la cookie `smsv-auth=true` en su navegador y **acceder a todas las rutas protegidas** sin iniciar sesión.

### 3. Cookies Inseguras (Alto)
Las cookies de autenticación se establecen mediante `document.cookie` en el lado del cliente.
- **Problema**: Esto hace que la cookie sea accesible mediante JavaScript `document.cookie`.
- **Riesgo**: Si la aplicación tiene alguna vulnerabilidad Cross-Site Scripting (XSS), un atacante puede robar fácilmente el token de sesión del usuario.
- **Recomendación**: Las cookies de autenticación deben establecerse desde el servidor (Api Route o Server Action) con los flags `HttpOnly`, `Secure` y `SameSite`.

### 4. Credenciales Expuestas (Medio)
En el archivo de login, las credenciales de prueba están presentes en el renderizado del componente, aunque ocultas con CSS.
- **Archivo**: `src/app/login/page.tsx`
  ```tsx
  <div className="... hidden">
    Usuario: <span className="font-mono">admin@smsv.com</span>
    Contraseña: <span className="font-mono">demo1234</span>
  </div>
  ```
- **Riesgo**: Cualquiera que inspeccione el código fuente de la página ("Ver código fuente") puede ver estas credenciales.

### 5. Configuración y Fuga de Información
- Hay rutas locales hardcodeadas como `C:\Users\jorge\Downloads` que revelan el nombre de usuario del desarrollador y la estructura de carpetas.
- Estructura confusa: Hay "Páginas" de Next.js (UI) dentro de la carpeta `src/app/api/` (por ejemplo `src/app/api/qstom/page.tsx`), lo cual no es estándar.

## Recomendaciones Inmediatas

1. **Arreglar la validación de archivos**: Modificar `src/lib/files.ts` para asegurar que `targetPath` siempre comience con `baseDir` resuelto.
2. **Unificar Autenticación**:
    - Decidir si usar `token` o `smsv-auth`.
    - Si se usa JWT (`token`), el middleware debería validar la existencia (y idealmente la firma) del token, no buscar una cookie con valor "true".
3. **Mover lógica de Cookies al Servidor**: Usar `cookies().set(...)` de `next/headers` en las API Routes o Server Actions.
4. **Remover credenciales**: Eliminar el bloque de credenciales de prueba.
