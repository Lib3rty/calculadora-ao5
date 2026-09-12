# 📋 Descripción del Proyecto: Speedcubing Scorecard

## Resumen Ejecutivo

Se ha desarrollado una **Progressive Web App (PWA)** completa para competidores de Speedcubing que permite:

1. **Ingresar 5 tiempos** en formato MM:SS.MS (minutos, segundos, centésimas)
2. **Calcular automáticamente** el promedio eliminando el tiempo más alto y más bajo
3. **Visualizar resultados** en una tarjeta estilo "Scorecard"
4. **Funcionar completamente offline** después de la primera carga
5. **Persistir datos** localmente en el navegador

## Características Principales

### ✅ Funcionalidad Principal
- Ingreso manual de 5 tiempos competitivos
- Validación en tiempo real de rangos (MM: 0-59, SS: 0-59, MS: 0-99)
- Cálculo preciso: elimina min/max, promedia los 3 del medio
- Visualización clara con colores (tiempos eliminados en gris, usados en verde)
- Resultado destacado en tarjeta azul

### ✅ Experiencia de Usuario
- Interfaz limpia y minimalista
- Diseño **mobile-first responsive** (375px a 1920px)
- Indicadores de progreso (contador de tiempos faltantes)
- Botones inteligentes (deshabilitados hasta tener 5 tiempos válidos)
- Animación suave en cálculo (300ms delay)

### ✅ Offline & PWA
- **Service Worker** que cachea todo automáticamente
- Funciona 100% offline después de primera carga
- Instalable en iOS (botón Compartir > Agregar a pantalla inicio)
- Instalable en Android (menú > Instalar app)
- Manifest.json con metadata e iconos

### ✅ Almacenamiento
- **localStorage** para persistencia entre sesiones
- Guarda automáticamente último conjunto de tiempos y resultado
- Recupera datos al recargar o reiniciar app
- Opción "Nueva Scorecard" limpia todo

## Estructura del Proyecto

```
speedcubing-scorecard/
├── src/
│   ├── components/
│   │   ├── TimeInput.jsx       # Input numérico validado (MM, SS, MS)
│   │   ├── TimerForm.jsx       # Formulario con 5 TimeInputs
│   │   └── ScoreCard.jsx       # Visualización de resultados
│   ├── utils/
│   │   └── timeCalculator.js   # Lógica de cálculos (8 funciones)
│   ├── App.jsx                 # Componente principal (estado global)
│   ├── main.jsx                # Punto de entrada React
│   └── index.css               # Estilos Tailwind + globales
├── public/
│   ├── manifest.json           # Configuración PWA
│   └── sw.js                   # Service Worker
├── tests/
│   └── runTests.js             # Suite de tests (7+ casos)
├── index.html                  # HTML principal
├── vite.config.js              # Configuración build
├── tailwind.config.js          # Configuración Tailwind
├── postcss.config.js           # Configuración PostCSS
├── package.json                # Dependencias
├── README.md                   # Documentación
└── EXAMPLES.md                 # Ejemplos de uso
```

## Stack Tecnológico

| Categoría | Tecnología | Razón |
|-----------|-----------|-------|
| **Framework** | React 18+ | Componentes reutilizables, hooks de estado |
| **Build Tool** | Vite | Rápido, soporte ES6+ nativo, PWA-ready |
| **Styling** | Tailwind CSS | Utility-first, offline, responsive |
| **PWA** | Service Worker | Funciona offline, cachea automáticamente |
| **Estado** | React Hooks | localStorage para persistencia |

## Funciones Principales (timeCalculator.js)

### 1. `convertToMs(mm, ss, ms)`
Convierte formato MM:SS.MS a milisegundos
```
Input: (5, 42, 37) → Output: 342370ms
```

### 2. `convertFromMs(totalMs)`
Convierte milisegundos a formato MM:SS.MS
```
Input: 342370ms → Output: {minutes: "05", seconds: "42", milliseconds: "37"}
```

### 3. `calculateAverage(times[])`
**Función principal**: Elimina min/max, promedia 3 del medio
```
Input: 5 tiempos
Output: {
  average: {minutes, seconds, milliseconds},
  averageMs: número,
  removed: [idx_min, idx_max],
  used: [idx1, idx2, idx3]
}
```

### 4. `formatTime(mm, ss, ms)`
Formatea para visualización: `MM:SS.MS`

### 5. `isValidTime(mm, ss, ms)`
Valida rangos: MM 0-59, SS 0-59, MS 0-99

### 6. `areAllTimesComplete(times[])`
Verifica que 5 tiempos estén completos y válidos

## Flujo de Uso

```
1. Usuario abre app
   ↓
2. App carga desde caché (Service Worker)
   ↓
3. Recupera último scorecard de localStorage (si existe)
   ↓
4. Ve formulario con 5 campos vacíos
   ↓
5. Ingresa MM:SS.MS para cada tiempo
   ↓
6. Validación en tiempo real (campos rojo si inválido)
   ↓
7. Presiona "Calcular Promedio"
   ↓
8. App calcula eliminando min/max
   ↓
9. Muestra Scorecard con:
   - 5 tiempos (2 eliminados en gris, 3 usados en verde)
   - Promedio final destacado en azul
   ↓
10. Opción "Nueva Scorecard" limpia y vuelve al paso 4
   ↓
11. Datos guardados automáticamente en localStorage
```

## Testing

Se incluyen tests de validación:

```bash
# Ejecutar tests (sin necesidad de npm global)
node tests/runTests.js
```

**Casos cubiertos:**
- Conversión MM:SS.MS ↔ milisegundos
- Validación de rangos válidos e inválidos
- Cálculo correcto del promedio (elimina min/max)
- Tiempos completos e incompletos
- Casos reales de speedcubing
- Casos límite (0:00.00, 59:59.99)

## Validación

### ✅ Lógica de Cálculos
- Conversión a/desde milisegundos: correcto
- Identificación min/max: correcto
- Promedio de 3 tiempos: correcto
- Rangos de validación: MM 0-59, SS 0-59, MS 0-99

### ✅ Componentes React
- TimeInput: validación en tiempo real, inputs separados
- TimerForm: formulario con 5 inputs, botones inteligentes
- ScoreCard: visualización clara de resultados
- App: gestión de estado, localStorage, flujo completo

### ✅ PWA
- Service Worker: cachea archivos
- manifest.json: metadata para instalación
- offline-first: funciona sin internet
- responsive: 375px a 1920px

### ✅ UX
- Indicadores visuales (colores)
- Mensajes de validación
- Feedback de progreso
- Interfaz intuitiva

## Instalación & Ejecución

### Requisitos
- Node.js 14+ (para desarrollo)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Desarrollo

```bash
cd speedcubing-scorecard
npm install
npm run dev
```

Abre `http://localhost:5173`

### Build Producción

```bash
npm run build
```

Genera carpeta `dist/` lista para deploy en cualquier servidor estático.

### Deploy

```bash
# Opción 1: Vercel (recomendado para PWA)
vercel

# Opción 2: Netlify
netlify deploy --prod --dir=dist

# Opción 3: Servidor propio (nginx, Apache, etc)
# Servir archivos estáticos de dist/
```

## Notas Importantes

1. **Centésimas vs Milisegundos**:
   - La app usa centésimas (0-99) en UI
   - 1 centésima = 10 milisegundos internamente
   - Ejemplo: 0:00.50 = 500ms

2. **Primera Carga**:
   - Requiere internet para descargar (≈50-100KB)
   - Service Worker cachea todo automáticamente
   - Siguientes cargas funcionan 100% offline

3. **Almacenamiento**:
   - localStorage persiste entre sesiones
   - "Nueva Scorecard" borra datos
   - No hay sincronización con cloud

4. **Casos Especiales**:
   - Si hay empates en min/max: usa primera ocurrencia
   - Siempre elimina exactamente 2 tiempos
   - Promedia exactamente 3 tiempos

## Ejemplo de Uso

```
Tiempos: 12.34, 11.99 (mejor), 13.45, 12.01, 15.00 (peor)
         ↓
Elimina: 11.99, 15.00
         ↓
Promedia: (12.34 + 13.45 + 12.01) / 3 = 12.60
         ↓
Resultado: 00:12.60
```

## Futuras Mejoras (Opcionales)

1. Historial de múltiples scorecards
2. Estadísticas avanzadas (media, mediana, desviación)
3. Exportar resultados (PDF, JSON)
4. Dark/Light mode toggle
5. Sincronización entre dispositivos
6. Comparación de competencias

---

**Estado**: ✅ Completado y listo para usar
**Última actualización**: 2026-09-12
