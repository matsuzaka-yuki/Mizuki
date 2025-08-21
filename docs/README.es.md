# 🌸 Mizuki  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.12.8-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Vista previa de Mizuki](../README.webp)

Una plantilla de blog estático moderna y rica en características con funcionalidades avanzadas y hermoso diseño, construida con [Astro](https://astro.build).

[**🖥️ Demo en vivo**](https://mizuki.mysqil.com/)
[**🔧 Documentación oficial de usuario de Mizuki**](https://docs.mizuki.mysqil.com/)

🌏 Idiomas README
[**中文**](../README.md) /
[**English**](../README.en.md) /
[**Español**](./README.es.md)

## 🆕 Novedades en v3.3
- **Soporte de sintaxis de Mermaid:** Se añadió soporte para la sintaxis de diagramas de Mermaid, permitiendo la incrustación directa de diagramas de flujo, diagramas de secuencia, diagramas de Gantt, etc., en Markdown.
- **Estadísticas de Umami:** Se añadió soporte para estadísticas de Umami, permitiendo la fácil integración del análisis de tráfico del sitio web.

![Configuration](configuration.svg)

### 🔧 Refactorización del Sistema de Configuración de Componentes
- **Arquitectura de Configuración Unificada:** Sistema completamente nuevo de configuración de componentes modular con soporte para gestión dinámica de componentes y configuración de orden
- **Carga de Componentes Dirigida por Configuración:** Refactorización del componente SideBar para implementar un mecanismo de carga de componentes completamente basado en configuración
- **Interruptores de Control Unificados:** Eliminación de los interruptores de habilitación independientes para el reproductor de música y componentes de anuncio, control unificado por sidebarLayoutConfig
- **Adaptación de Diseño Responsivo:** Los componentes soportan diseños responsivos y ajustan automáticamente la visualización según el tipo de dispositivo

### 📐 Optimización del Sistema de Diseño
- **Ajuste Dinámico de Posición de Barra Lateral:** Soporte para conmutación izquierda-derecha de la barra lateral con adaptación automática del diseño
- **Colocación Inteligente de Navegación de Artículo:** Cuando la barra lateral está a la derecha, la navegación del artículo se mueve automáticamente a la izquierda para una mejor experiencia de lectura
- **Mejoras de Diseño Grid:** Optimización del diseño CSS Grid para resolver anomalías de ancho de contenedor

### 🎛️ Estandarización del Formato de Archivo de Configuración
- **Formatos de Configuración Estandarizados:** Creación de especificaciones unificadas de formato de archivo de configuración de componentes
- **Seguridad de Tipos:** Definiciones completas de tipos TypeScript para asegurar la seguridad de tipos de configuración
- **Extensibilidad:** Soporte para tipos de componentes personalizados y opciones de configuración

### 🧹 Optimización de Código
- **Limpieza de Archivos de Prueba:** Eliminación de configuraciones de prueba no utilizadas y dependencias para reducir el tamaño del proyecto
- **Optimización de Estructura de Código:** Mejora de la arquitectura de componentes para aumentar la mantenibilidad del código
- **Mejoras de Rendimiento:** Optimización de la lógica de carga de componentes para mejorar el rendimiento de renderizado de página

---

## ✨ Características

### 🎨 Diseño e Interfaz
- [x] Construido con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com)
- [x] Animaciones suaves y transiciones de página con [Swup](https://swup.js.org/)
- [x] Modo claro/oscuro con detección de configuración del sistema
- [x] Colores de tema personalizables y carrusel de banners dinámico
- [x] Diseño completamente responsivo para todos los dispositivos
- [x] Hermosa tipografía con fuente JetBrains Mono

### 🔍 Contenido y Búsqueda
- [x] Funcionalidad de búsqueda avanzada con [Pagefind](https://pagefind.app/)
- [x] [Características extendidas de Markdown](#-sintaxis-markdown-extendida) con resaltado de sintaxis
- [x] Tabla de contenidos interactiva con desplazamiento automático
- [x] Generación de feed RSS
- [x] Estimación de tiempo de lectura
- [x] Categorización y etiquetado de publicaciones

### 🌐 Internacionalización
- [x] **Soporte multiidioma** y traducción en tiempo real
- [x] **Detección automática de idioma** basada en preferencias del usuario
- [x] **Traducción del lado del cliente** impulsada por Edge Translate
- [x] Soporte para más de 10 idiomas (EN, ZH-CN, ZH-TW, JA, KO, ES, TH, VI, ID, TR)

### 📱 Páginas Especiales
- [x] **Página de seguimiento de anime** - Rastrea tu progreso de visualización de anime con calificaciones
- [x] **Página de enlaces de amigos** - Muestra los sitios web de tus amigos con hermosas tarjetas
- [x] **Página de diario/momentos** - Comparte momentos de la vida como publicaciones en redes sociales
- [x] **Página de archivo** - Vista de línea de tiempo organizada de publicaciones
- [x] **Página acerca de** - Introducción personal personalizable

### 🛠 Características Técnicas
- [x] **Bloques de código mejorados** con [Expressive Code](https://expressive-code.com/)
- [x] **Soporte matemático** con renderizado KaTeX
- [x] **Optimización de imágenes** con galería PhotoSwipe
- [x] **Optimización SEO** con sitemap y meta-etiquetas
- [x] **Optimización de rendimiento** con carga perezosa y caché
- [x] **Sistema de comentarios** listo para integración (Twikoo)

## 🚀 Comenzar

### 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/matsuzaka-yuki/mizuki.git
   cd mizuki
   ```

2. **Instalar dependencias:**
   ```bash
   # Instalar pnpm (si no está ya instalado)
   npm install -g pnpm
   
   # Instalar dependencias del proyecto
   pnpm install
   ```

3. **Configurar tu blog:**
   - Edita `src/config.ts` para personalizar la configuración de tu blog
   - Actualiza información del sitio, colores del tema, imágenes de banner, enlaces sociales
   - Configura ajustes de traducción y características de páginas especiales

4. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   Tu blog estará disponible en `http://localhost:4321`

### 📝 Gestión de Contenido

- **Crear nueva publicación:** `pnpm new-post <nombre-archivo>`
- **Editar publicaciones:** Modifica archivos en `src/content/posts/`
- **Personalizar páginas:** Edita páginas especiales en `src/content/spec/`
- **Agregar imágenes:** Coloca imágenes en `src/assets/` o `public/`

### 🚀 Despliegue

Despliega tu blog en plataformas de hosting estático:

- **Vercel:** Conecta tu repositorio de GitHub a Vercel
- **Netlify:** Despliega directamente desde GitHub
- **GitHub Pages:** Usa el flujo de trabajo de GitHub Actions incluido
- **Cloudflare Pages:** Conecta tu repositorio

Recuerda actualizar la URL `site` en `astro.config.mjs` antes del despliegue.



## 📝 Frontmatter de Publicaciones

```yaml
---
title: Mi Primera Publicación de Blog
published: 2023-09-09
description: Esta es la primera publicación de mi nuevo blog Astro.
image: ./cover.jpg
tags: [Foo, Bar]
category: Frontend
draft: false
pinned: false
---
```

### Campos del Frontmatter

- **title**: Título de la publicación (requerido)
- **published**: Fecha de publicación (requerida)
- **description**: Descripción de la publicación para SEO y vistas previas
- **image**: Ruta de imagen de portada (relativa al archivo de publicación)
- **tags**: Array de etiquetas para categorización
- **category**: Categoría de la publicación
- **draft**: Establecer a `true` para ocultar la publicación en producción
- **pinned**: Establecer a `true` para fijar la publicación en la parte superior de las listas

### Publicaciones Fijadas

El campo `pinned` te permite fijar publicaciones importantes en la parte superior de tu blog. Las publicaciones fijadas siempre aparecerán antes que las publicaciones regulares, independientemente de su fecha de publicación.

**Uso:**
```yaml
pinned: true  # Fijar esta publicación en la parte superior
pinned: false # Publicación regular (por defecto)
```

**Comportamiento de ordenamiento:**
1. Las publicaciones fijadas aparecen primero, ordenadas por fecha de publicación (más recientes primero)
2. Las publicaciones regulares siguen, ordenadas por fecha de publicación (más recientes primero)

## 🧩 Sintaxis Markdown Extendida

Mizuki soporta características mejoradas de Markdown más allá del GitHub Flavored Markdown estándar:

### 📝 Escritura Mejorada
- **Callouts:** Crea hermosas cajas de callout con `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, etc.
- **Ecuaciones matemáticas:** Escribe matemáticas LaTeX con sintaxis `$inline$` y `$$block$$`
- **Resaltado de código:** Resaltado de sintaxis avanzado con números de línea y botones de copia
- **Tarjetas de GitHub:** Inserta tarjetas de repositorio con `::github{repo="user/repo"}`

### 🎨 Elementos Visuales
- **Galerías de imágenes:** Integración automática de PhotoSwipe para visualización de imágenes
- **Secciones colapsables:** Crea bloques de contenido expandibles
- **Componentes personalizados:** Usa directivas especiales para contenido enriquecido

### 📊 Organización de Contenido
- **Tabla de contenidos:** Generada automáticamente desde encabezados, con desplazamiento suave
- **Tiempo de lectura:** Calculado y mostrado automáticamente
- **Metadatos de publicación:** Soporte rico de frontmatter con categorías y etiquetas

## ⚡ Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                    | Acción                                                    |
|:---------------------------|:----------------------------------------------------------|
| `pnpm install`             | Instala dependencias                                      |
| `pnpm dev`                 | Inicia servidor de desarrollo local en `localhost:4321`   |
| `pnpm build`               | Construye tu sitio de producción a `./dist/`             |
| `pnpm preview`             | Previsualiza tu construcción localmente, antes del despliegue |
| `pnpm check`               | Ejecuta verificación de Astro para errores               |
| `pnpm format`              | Formatea código con Biome                                 |
| `pnpm lint`                | Lint y corrige problemas de código                       |
| `pnpm new-post <nombre-archivo>` | Crea nueva publicación de blog                      |
| `pnpm astro ...`           | Ejecuta comandos CLI de Astro                            |

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para detalles.

## 🙏 Agradecimientos

- Basado en la plantilla original [Fuwari](https://github.com/saicaca/fuwari)
- Construido con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com)
- Inspirado por [Yukina](https://github.com/WhitePaper233/yukina) - una plantilla de blog hermosa y elegante
- Traducción impulsada por [translate](https://gitee.com/mail_osc/translate) - solución AI i18n para traducción automática HTML
- Iconos por [Iconify](https://iconify.design/)

### Agradecimientos Especiales

- **[Yukina](https://github.com/WhitePaper233/yukina)** - Gracias por proporcionar inspiración de diseño e ideas que ayudaron a dar forma a este proyecto. Yukina es una plantilla de blog elegante que demuestra excelentes principios de diseño y experiencia de usuario.
- **[translate](https://gitee.com/mail_osc/translate)** - Gracias por proporcionar una solución i18n innovadora impulsada por IA que permite la traducción automática HTML con solo dos líneas de JavaScript. Esta herramienta de código abierto hace que el soporte multiidioma sea increíblemente simple y eficiente.

---

⭐ ¡Considera dar una estrella si encuentras útil este proyecto!