# Security Remediation Plan

This plan addresses the critical security vulnerabilities identified in the SMSV-frontend application.

## Goal
Fix Path Traversal, Authentication Bypass, Hardcoded Credentials, and Insecure Cookie handling.

## User Review Required
> [!IMPORTANT]
> **Authentication Flow Change**: I will create a new internal API route (`/api/auth/login`) to handle login requests. This allows us to set **HTTPOnly** cookies, which prevents XSS attacks from stealing tokens. The existing client-side `document.cookie` logic will be removed.

## Proposed Changes

### 1. Fix Path Traversal (Critical)
**Files**: `src/lib/files.ts`, `src/app/api/ftp-list/route.ts`
- **Change**: Normalize paths and verify they resolve inside `FTP_ROOT`.
- **Detail**: Use `path.resolve` and check `startsWith` to ensure the target file is strictly within the allowed directory.

### 2. Fix Authentication & Cookies (Critical)
**Files**: `src/app/login/page.tsx`, `middleware.ts`, `src/components/layout/Header.tsx`, `src/app/page.tsx`
**New File**: `src/app/api/auth/login/route.ts`, `src/app/api/auth/logout/route.ts`
- **Change**:
    - Create a Next.js Route Handler (`POST /api/auth/login`) to handle login requests.
        1. Proxies request to backend (`process.env.NEXT_PUBLIC_API_URL`).
        2. On success, sets the `token` into a **Secure, HTTPOnly, SameSite** cookie using `next/headers`.
    - Update `src/app/login/page.tsx` to call this internal route instead of the backend directly.
    - Update `middleware.ts` to check for the correct `token` cookie (instead of `smsv-auth`).
    - Update `src/components/layout/Header.tsx` to call `/api/auth/logout` to clear cookies securely.

### 3. Remove Hardcoded Secrets & Info Leakage (Medium)
**Files**: `src/app/login/page.tsx`, `src/app/api/ftp-files/route.ts`, `src/app/api/ftp-list/route.ts`
- **Change**:
    - Remove the hidden `<div>` with admin credentials in `login/page.tsx`.
    - Replace hardcoded paths (e.g., `C:/Users/jorge...`) with `process.env.FTP_ROOT` or a logical default (e.g., `./public/uploads`).

## Verification Plan
### Automated Tests
- Verification script to attempt directory traversal (should fail).
- Verification of login flow (should set HTTPOnly cookie).
- Verification of middleware protection (should deny access without cookie).

### Manual Verification
- Attempt to login via UI.
- Check browser devtools -> Application -> Cookies to ensure `HttpOnly` flag is set.
- Attempt to access sensitive files via the file explorer.
