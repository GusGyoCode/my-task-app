# 🚀 TaskPro - Senior Technical Assessment

Una solución robusta para la gestión de tareas, construida con un enfoque en escalabilidad, mantenibilidad y experiencia de usuario (UX). Este proyecto demuestra la implementación de patrones avanzados en el ecosistema moderno de React.

## 🚀 Demo

- **URL en vivo:** [https://my-task-app-zeta.vercel.app/](https://my-task-app-zeta.vercel.app/)
- **Credenciales de prueba:** `admin@seek.com` / `seek`

## 🧠 Decisiones de Arquitectura y Diseño

El proyecto no es solo una "To-Do List"; es una implementación de Clean Architecture adaptada a Frontend:

- **Domain-Driven Design (DDD) Lite**: Separación clara entre los tipos de dominio, servicios de infraestructura (Storage) y la capa de presentación.

- **S.O.L.I.D. Principles**: \* Responsabilidad Única: Cada componente y hook tiene una única razón para cambiar.
  - Inversión de Dependencias: Los componentes dependen de abstracciones (interfaces de servicios), no de implementaciones concretas.

- **Store Pattern con Zustand**: Se eligió Zustand por su bajo boilerplate y excelente rendimiento en comparación con Redux, manteniendo un estado global atómico y predecible.

- **Persistencia Asíncrona**: El servicio de tareas simula latencia de red real mediante Promises y async/await, permitiendo demostrar estados de loading y skeletons de carga profesionales.

## 🛠️ Stack Tecnológico

- **Next.js (App Router)**: Aprovechando `Suspense boundaries` para optimizar el renderizado y evitar bloqueos en el cliente.

- **TypeScript**: Tipado estricto en toda la aplicación para reducir errores en tiempo de ejecución.

- **Tailwind CSS + Lucide Icons**: Diseño UI minimalista, responsivo y de alto contraste.

- **Jest + React Testing Library**: Suite de pruebas con enfoque en **Testing Pyramid** (Pruebas unitarias de lógica y pruebas de integración de componentes).

## 🧪 Calidad de Software (Testing)

Se ha priorizado la cobertura de la lógica de negocio y los flujos críticos (Auth y CRUD).

- **Cobertura de Código**: >75% (Objetivo del reto superado).

- **Comandos**:

```bash
npm run test           # Ejecuta la suite completa
npm run test:coverage  # Genera reporte detallado de cobertura
```

## 🚀 Instalación y Configuración

- **Clonado**: git clone ...

- **Dependencias**: npm install

- **Entorno**: npm run dev

- **Producción**: npm run build (Optimizado con Suspense Boundaries para prerendering).

- **Nota de Acceso**: La aplicación implementa un flujo de autenticación mediante un Mock JWT. Al iniciar sesión, se genera un token simetrizado que se persiste en `cookies` y `localStorage` para permitir la persistencia de sesión a través del Middleware de Next.js.

## 📈 Características Senior Implementadas

- **Debouncing en Búsqueda**: Optimización de filtrado en tiempo real para evitar renders innecesarios.

- **Sincronización de URL (Search Params)**: Los filtros y búsquedas son persistentes; puedes recargar la página y mantener tu vista actual (Deep Linking).

- **Manejo de Estados de Hidratación**: Control de errores de desincronización entre Servidor y Cliente.

- **Middleware de Protección**: Rutas privadas protegidas mediante lógica de servidor.

## 📖 Documentación

- **Estándar de Código:** Se ha utilizado **JSDoc** para documentar la lógica de negocio, servicios y hooks globales.

- **Developer Experience (DX):** Gracias a JSDoc y TypeScript, el proyecto cuenta con un IntelliSense robusto. Basta con pasar el cursor sobre cualquier función o servicio en el editor para ver su documentación técnica y ejemplos de uso.

## 💡 ¿Qué sigue?

Si tuviera más tiempo para escalar este producto a nivel empresarial, implementaría:

- **React Query**: Para manejo de caché de servidor real.

- **Playwright**: Para pruebas End-to-End (E2E) del flujo de usuario completo.

- **Atomic Design**: Mayor granularidad en la carpeta de componentes.
