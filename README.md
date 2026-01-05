# 🗄️ API Postal Navideña (NestJS)

API de práctica  con NestJS para almacenar postales e imágenes. tiene subidas de archivos, la documentación (Swagger) y  módulos tambien pipes, guards, DTOs, filtros de excepción, BD en postgresql.

## 🛠️ Tech Stack (backend)

- **NestJS** - Framework Node.js modular y escalable.
- **TypeScript 5**
- **Typeorm** - ORM para la base de datos (configurado en `config/sequelize.ts`).
- **AWS SDK / S3** - Para almacenar archivos en S3.
- **Multer** (`@nestjs/platform-express`) - Recepción multipart/form-data para uploads.

## 📁 Estructura del proyecto (backend)

```
src/
├── main.ts                   # Bootstrap, Swagger y pipes globales
├── app.module.ts
├── moduleS3/                 # Lógica y servicios para subir a S3
├── postal/                   # Módulo postal: controller, service, dto
│   ├── dto/                  # DTOs para validación
│   ├── postal.controller.ts
│   └── postal.service.ts
├── repository/               # Acceso a datos y repositorios
├── model/                    # Modelos/Entidades
├── exceptionFilters/         # Filtros de excepción personalizados
├── guards/                   # Guards (validacion cabecera)
├── pipes/                    # Pipes personalizados (validation)
├── utils/                    # Objetos de respuestas```
## Subida de archivos

- Los endpoints que reciben archivos usan `@UseInterceptors(FileInterceptor('file'))` con `multer`.
- El moduloS3 para el localstrack recibe el archivo y lo envía al servicio de `moduleS3`, que abstrae la subida a S3 en docker(local).
- Validación y transformación de datos se hacen con DTOs y `ValidationPipe` (registro global en `main.ts`).

## Documentación (Swagger)

- Swagger se configuro en `src/main.ts` y disponible en `/api` cuando la aplicación corre en modo desarrollo.

## Base de datos

- Se usa Postgresql

## Pipes, Guards, DTOs y ExceptionFilters

- **DTOs:** se usan  `class-validator` y `class-transformer`.
- **Pipes personalizados:** pipes custom para validaciones.
- **Guards:** en `src/guards` usando una variable del  env.
- **Exception Filters:** en `src/exceptionFilters` y registrados globalmente para formatear errores y respuestas.

## Scripts útiles (package.json)

- `npm run start` - Inicia en producción
- `npm run start:dev` - Modo desarrollo (watch)
- `npm run start:prod` - Build y ejecución en producción
- `npm run test` / `npm run test:e2e` - Tests

## Cómo ejecutar localmente

1. Copia y completa `.env.dev` → `.env`.
2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en modo desarrollo:

```bash
npm run start:dev
```

4. Abre `http://localhost:<PORT>/api` para la documentación Swagger.