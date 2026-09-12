# 🎲 Speedcubing Scorecard

Una Progressive Web App (PWA) offline para calcular el promedio de tiempos en competencias de Speedcubing.

## Características

- ✅ **Funciona Offline**: Acceso completo sin internet después de la primera carga
- ✅ **PWA Instalable**: Instala como app nativa en tu móvil o desktop
- ✅ **Cálculo Automático**: Elimina tiempo más alto y más bajo, promedia los 3 del medio
- ✅ **Interfaz Simple**: Diseño clean y responsive
- ✅ **Almacenamiento Local**: Los datos se guardan automáticamente
- ✅ **Sin Backend**: Funciona 100% en el navegador

## Uso

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Acceder a http://localhost:5173
```

### Producción

```bash
# Compilar
npm run build

# Previsualizar compilación
npm run preview
```

## Cómo Usar la App

1. Ingresa los **5 tiempos** de tu competencia (MM:SS.MS)
2. Presiona **"Calcular Promedio"**
3. La app automáticamente:
   - Elimina el tiempo más bajo
   - Elimina el tiempo más alto
   - Promedia los 3 tiempos restantes
4. Ve tu resultado en la **Scorecard**

## Formato de Tiempos

- **MM**: Minutos (0-59)
- **SS**: Segundos (0-59)
- **MS**: Centésimas de segundo (0-99)

Ejemplo: `05:42.37` = 5 minutos, 42 segundos, 37 centésimas

## Estructura del Proyecto

```
speedcubing-scorecard/
├── src/
│   ├── components/
│   │   ├── TimeInput.jsx      # Componente para ingresar un tiempo
│   │   ├── TimerForm.jsx      # Formulario de 5 tiempos
│   │   └── ScoreCard.jsx      # Visualización de resultados
│   ├── utils/
│   │   └── timeCalculator.js  # Lógica de cálculos
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── public/
│   ├── manifest.json          # Configuración PWA
│   └── sw.js                  # Service Worker
├── index.html                 # HTML principal
├── vite.config.js             # Configuración Vite
├── tailwind.config.js         # Configuración Tailwind
└── package.json               # Dependencias
```

## Stack Tecnológico

- **React 18**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Service Worker**: Capacidades offline
- **IndexedDB/LocalStorage**: Persistencia de datos

## Cálculos

### Fórmula del Promedio

```
1. Convertir todos los tiempos a milisegundos
2. Identificar el tiempo mínimo y máximo
3. Eliminar ambos
4. Promediar los 3 tiempos restantes
5. Convertir resultado de vuelta a MM:SS.MS
```

Ejemplo:
```
Tiempos: 10:00.00, 9:50.00, 9:45.00, 9:55.00, 9:40.00

Ordenados: 9:40.00, 9:45.00, 9:50.00, 9:55.00, 10:00.00
Elimina: 9:40.00 (más bajo), 10:00.00 (más alto)
Promedia: (9:45.00 + 9:50.00 + 9:55.00) / 3 = 9:50.00
```

## Almacenamiento

La app usa `localStorage` para guardar:
- Último conjunto de 5 tiempos
- Último resultado calculado

Esto permite recuperar datos si cierras la app por accidente.

## Instalación en Dispositivos

### iOS (Safari)
1. Abre la app en Safari
2. Presiona el botón Compartir (↑)
3. Selecciona "Agregar a la pantalla de inicio"

### Android (Chrome)
1. Abre la app en Chrome
2. Presiona el menú (⋮)
3. Selecciona "Instalar app"

## PWA Offline

El Service Worker automáticamente:
- Cachea todos los archivos necesarios en la primera carga
- Sirve archivos cacheados si no hay conexión
- Actualiza el cache cuando hay conexión disponible

## Notas

- La app persiste los datos entre sesiones
- Puedes crear una nueva scorecard cuando quieras
- No requiere servidor backend ni API
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## Licencia

MIT

## Autor

Desarrollado para competidores de Speedcubing
