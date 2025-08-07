# Usar una imagen oficial de Node.js como base
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# --- Fase de producción ---
FROM node:20-alpine AS runner
WORKDIR /app

# Copiar solo los archivos necesarios desde el builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"] 