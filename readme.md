# Documentacion - Comercio Inmobiliario

Este documento contiene información sobre la API REST

### Requisitos

- Node JS
- TypeScript
- Express
- Prisma (Opcional)

## Variables de entorno necesarias para correr la aplicación
NODE_ENV=development
PORT=5000
JWT_SECRET=y1pHXt4bjIgLpGB5mAvdm4XGm
JWT_EXPIRES=90d
DATABASE_URL = "mysql://<USUARIO>:<PASSWORD>@localhost:3306/<DATABASE>"

## Iniciar Proyecto - Localmente

- 1. npm install
- 2. npx prisma migrate dev 
- 3. npx prisma generate
- 4. npm run start:dev 
- 5. Se adjunta Json para importar a postman o herramienta para realizar pruebas tipo REST

