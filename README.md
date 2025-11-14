# 📷 Zona Hobby - Plataforma Social de Fotografías

Zona Hobby es una plataforma web social diseñada para que las personas compartan fotografías familiares, de viajes y momentos especiales con su comunidad.

## 🌟 Características Principales

### **Funcionalidades Básicas**
- ✅ **Registro/Login de usuarios** (opcional - se puede navegar como visitante)
- ✅ **Subida de fotografías** con descripciones e historias
- ✅ **Feed principal** con todas las publicaciones
- ✅ **Perfiles de usuario** con sus publicaciones
- ✅ **Diseño responsive** (adaptable a móviles y tablets)

### **Funcionalidades Avanzadas**
- ✅ **Sistema de comentarios** en las fotografías
- ✅ **Likes/reacciones** a las publicaciones
- ✅ **Hashtags y categorías** (Familia, Viajes, Momentos)
- ✅ **Buscador de contenido** por categorías
- ✅ **Galería personal** por usuario
- ✅ **Vista detallada** de cada fotografía

### **Panel de Administración**
- ✅ **Gestión de usuarios** (vetar/bloquear usuarios)
- ✅ **Moderación de contenido** (eliminar publicaciones inapropiadas)
- ✅ **Estadísticas de la plataforma** (usuarios, posts, comentarios, likes)
- ✅ **Privilegios administrativos** completos

## 🎨 Diseño

### **Paleta de Colores**
- **Primario**: Terracota (#E57373) - para botones y acentos
- **Neutros**: Grises cálidos para texto y fondos
- **Semánticos**: Verde (éxito), Amarillo (advertencia), Rojo (error)

### **Tipografía**
- **Fuente**: Poppins (sans-serif moderna)
- **Jerarquía clara**: H1 (48px), H2 (32px), H3 (20px), Body (16px)

### **Layout**
- **Estilo**: Minimalista moderno con toque cálido
- **Responsive**: Mobile-first design
- **Animaciones**: Transiciones suaves y elegantes

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Iconos**: Lucide Icons
- **Tipografías**: Google Fonts (Poppins)
- **Almacenamiento**: LocalStorage (para demo)
- **Diseño**: CSS Grid, Flexbox, CSS Variables

## 📱 Estructura de la Aplicación

```
zona-hobby/
├── index.html          # Página principal
├── styles/
│   └── main.css        # Estilos principales
├── scripts/
│   └── app.js          # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🎯 Cómo Usar la Plataforma

### **Para Visitantes (Sin Registro)**
1. **Explorar**: Navega por el feed de fotografías
2. **Filtrar**: Usa los filtros de categoría (Familia, Viajes, Momentos)
3. **Ver detalles**: Haz clic en cualquier fotografía para ver más información
4. **Registrarse**: Crea una cuenta para participar activamente

### **Para Usuarios Registrados**
1. **Subir fotos**: Haz clic en "Subir Foto" y completa el formulario
2. **Dar likes**: Haz clic en el corazón para expresar que te gusta
3. **Comentar**: En la vista detallada, escribe comentarios
4. **Mi galería**: Accede a tus publicaciones desde el menú de usuario

### **Para Administradores**
1. **Panel Admin**: Accede desde el menú de navegación
2. **Gestión de usuarios**: Bloquea/desbloquea usuarios desde la pestaña "Usuarios"
3. **Moderación**: Elimina contenido inapropiado desde la pestaña "Publicaciones"
4. **Estadísticas**: Revisa métricas de la plataforma en la pestaña "Estadísticas"

## 📋 Funcionalidades Detalladas

### **Subida de Fotografías**
- **Campos obligatorios**: Título, descripción, categoría, imagen
- **Campos opcionales**: Tags/etiquetas
- **Categorías disponibles**: Familia, Viajes, Momentos
- **Formatos soportados**: Todas las imágenes web (JPG, PNG, WebP)

### **Sistema de Comentarios**
- **Límite**: 200 caracteres por comentario
- **Validación**: Requerido estar logueado
- **Vista**: Tiempo real en vista detallada de foto

### **Sistema de Likes**
- **Validación**: Requerido estar logueado
- **Estado visual**: Cambio de color del corazón
- **Contador**: Actualización en tiempo real

### **Moderación Administrativa**
- **Bloqueo de usuarios**: Impide acceso a la plataforma
- **Eliminación de posts**: Remueve contenido inapropiado
- **Vista previa**: Revisión de todo el contenido antes de publicar

## 🔧 Instalación y Configuración

### **Requisitos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, puede abrirse directamente)

### **Instalación Local**
1. **Descargar archivos**: Descarga todos los archivos del proyecto
2. **Abrir index.html**: Haz doble clic en el archivo o ábrelo en tu navegador
3. **Opcional - Servidor local**: 
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   ```

### **Datos de Demo**
La aplicación incluye datos de ejemplo para demostración:
- **Usuarios**: Ana García, María López, Carlos Ruiz, Pedro Martín, Laura Fernández (Admin)
- **Publicaciones**: 6 fotografías de ejemplo en diferentes categorías
- **Comentarios**: Comentarios de ejemplo en algunas publicaciones

## 🎮 Guía de Navegación

### **Navegación Principal**
- **Inicio**: Feed principal con todas las publicaciones
- **Explorar**: Vista alterna del feed
- **Mi Galería**: Tus publicaciones personales (solo usuarios logueados)
- **Admin**: Panel de administración (solo administradores)

### **Atajos de Teclado**
- **ESC**: Cerrar modales y menús desplegables
- **Enter**: Enviar formularios (excepto inputs de texto libre)

### **Responsive Design**
- **Móvil (< 768px)**: Layout de una columna, menú hamburguesa
- **Tablet (768px - 1024px)**: Layout de dos columnas
- **Desktop (> 1024px)**: Layout de 3-4 columnas en el feed

## 🔐 Sistema de Autenticación

### **Registro de Usuarios**
- **Campos**: Nombre, email, contraseña
- **Validación**: Email único, confirmación de contraseña
- **Proceso**: Verificación inmediata (simulada para demo)

### **Inicio de Sesión**
- **Campos**: Email y contraseña
- **Persistencia**: Sesión guardada en LocalStorage
- **Seguridad**: Verificación de usuarios bloqueados

### **Roles de Usuario**
- **Visitante**: Puede ver contenido pero no participar
- **Usuario**: Puede subir fotos, dar likes, comentar
- **Administrador**: Todos los permisos + gestión de usuarios y contenido

## 📊 Métricas y Estadísticas

El panel de administración muestra:
- **Total de Usuarios**: Cantidad de cuentas registradas
- **Total de Publicaciones**: Número de fotos subidas
- **Total de Comentarios**: Comentarios realizados en la plataforma
- **Likes Totales**: Reacciones recibidas en todas las publicaciones

## 🛠️ Personalización

### **Cambiar Colores**
Modifica las variables CSS en `:root` en el archivo `styles/main.css`:
```css
:root {
  --primary-500: #E57373;  /* Color principal */
  --neutral-900: #3C3A38;  /* Color de texto */
  /* ... más variables */
}
```

### **Añadir Categorías**
1. Actualiza el select en `index.html`
2. Añade el caso en `getCategoryLabel()` en `app.js`
3. Actualiza los filtros en el HTML

### **Modificar Datos de Demo**
Edita la función `loadData()` en `scripts/app.js` para cambiar usuarios y publicaciones de ejemplo.

## 🚨 Limitaciones Actuales

- **Almacenamiento**: Los datos se guardan solo en LocalStorage (se pierden al limpiar navegador)
- **Imágenes**: Las fotos subidas no se persisten entre sesiones
- **Backend**: No hay servidor real, toda la lógica es frontend
- **Seguridad**: Autenticación simulada (no apta para producción)

## 🎯 Casos de Uso Ideales

- **Familias**: Compartir fotos de eventos familiares
- **Viajeros**: Documentar y compartir experiencias de viaje
- **Comunidades**: Grupos de interés en fotografía y momentos especiales
- **Demo/Tutorial**: Como ejemplo de aplicación web social

## 📈 Posibles Mejoras Futuras

- [ ] **Backend real** con base de datos
- [ ] **Subida a la nube** para las imágenes
- [ ] **Mensajería privada** entre usuarios
- [ ] **Compartir en redes sociales** externas
- [ ] **Notificaciones push** para interacciones
- [ ] **Búsqueda avanzada** por tags y texto
- [ ] **Albumes y colecciones** de fotos
- [ ] **Edición básica** de imágenes en la plataforma

## 💡 Consejos de Uso

1. **Para mejor experiencia**: Usa un navegador actualizado
2. **Para testing**: Prueba tanto el rol de visitante como usuario registrado
3. **Para administración**: El usuario "Laura Fernández" es administrador por defecto
4. **Para compartir**: ¡Sube tus propias fotos para personalizar la experiencia!

---

**¡Disfruta compartiendo tus momentos especiales en Zona Hobby!** 📸✨