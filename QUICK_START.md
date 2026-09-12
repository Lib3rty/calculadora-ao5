# 🚀 Guía Rápida - Speedcubing Scorecard

## Instalación Rápida

### 1. Clonar o descargar el proyecto
```bash
cd C:\Users\Racquet Center\Documents\Enrymar\Dev\speedcubing-scorecard
```

### 2. Instalar dependencias (primera vez)
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

### 4. Build para producción
```bash
npm run build
```

Genera la carpeta `dist/` lista para hostear.

---

## Uso de la App

### Paso 1: Ingresa los 5 Tiempos
- Campo 1: Minutos (0-59)
- Campo 2: Segundos (0-59)
- Campo 3: Centésimas (0-99)

Repite para los 5 tiempos.

Ejemplo para `05:42.37`:
```
Minutos: 5 o 05
Segundos: 42
Centésimas: 37
```

### Paso 2: Presiona "Calcular Promedio"
- Solo se activa cuando los 5 tiempos están completos y válidos
- Si un campo es inválido, se pondrá rojo

### Paso 3: Ver Resultado
La Scorecard muestra:
- **5 tiempos**: 2 en gris (eliminados), 3 en verde (usados)
- **Promedio**: En grande y destacado en azul
- **Información**: Explicación del cálculo

### Paso 4: Nueva Scorecard
Presiona el botón para empezar con una nueva competencia.

---

## Instalación en Móvil

### iPhone (iOS)
1. Abre la app en Safari
2. Presiona el botón Compartir (↑)
3. Selecciona "Agregar a la pantalla de inicio"
4. Dale un nombre y presiona "Agregar"

### Android (Chrome)
1. Abre la app en Chrome
2. Presiona el menú (⋮) en la esquina
3. Selecciona "Instalar app"
4. Presiona "Instalar"

---

## Formato de Tiempos

### Rango Válido
| Campo | Mín | Máx | Ejemplo |
|-------|-----|-----|---------|
| Minutos | 0 | 59 | 5 o 05 |
| Segundos | 0 | 59 | 42 |
| Centésimas | 0 | 99 | 37 |

### Ejemplos Válidos
- ✅ 00:00.00 (mínimo)
- ✅ 05:30.50 
- ✅ 59:59.99 (máximo)

### Ejemplos Inválidos
- ❌ 60:00.00 (minutos > 59)
- ❌ 05:70.00 (segundos > 59)
- ❌ 05:30.100 (centésimas > 99)

---

## Cómo Funciona el Cálculo

### Ejemplo Real
```
Tiempos ingresados:
1. 12.34 segundos
2. 11.99 segundos (mejor)
3. 13.45 segundos
4. 12.01 segundos
5. 15.00 segundos (peor)

Paso 1: Ordena
11.99 < 12.01 < 12.34 < 13.45 < 15.00

Paso 2: Elimina
❌ 11.99 (el más bajo)
❌ 15.00 (el más alto)

Paso 3: Promedia los 3 del medio
✅ 12.01
✅ 12.34
✅ 13.45
Promedio = (12.01 + 12.34 + 13.45) / 3 = 12.60

Resultado: 00:12.60
```

---

## Funciona sin Internet

### Primera carga
- Necesita internet para descargar la app (≈50KB)

### Siguientes usos
- ✅ 100% offline
- ✅ Funciona sin conexión
- ✅ Datos se guardan localmente

---

## Almacenamiento de Datos

### Dónde se guardan
- **Navegador local**: No se suben a internet
- **Automático**: Se guarda cada vez que calculas

### Qué se guarda
- Los 5 tiempos ingresados
- El promedio calculado
- Tu último resultado

### Recuperar datos
- Al recargar: Recupera automáticamente
- Al cerrar app: Los datos se mantienen
- "Nueva Scorecard": Borra todo

---

## Troubleshooting

### "El botón Calcular está deshabilitado"
- Completa los 5 tiempos
- Verifica que estén en rango válido

### "Campos en rojo"
- Valor fuera de rango
- MM debe ser 0-59
- SS debe ser 0-59
- MS debe ser 0-99

### "App no funciona sin internet"
- Es la primera carga
- Descarga la app primero en línea
- Luego funcionará offline

### "Los datos desaparecieron"
- Presionaste "Nueva Scorecard"
- Vaciaste el storage del navegador
- Cambiaste a navegador diferente

---

## Consejos

1. **Marcadores**: Guarda en marcadores para acceso rápido
2. **Instalación**: Instala como app para acceso directo
3. **Sincronización**: Usa dispositivo para guardar siempre
4. **Copias**: No se sincroniza entre dispositivos (mantén el mismo)

---

## Soporte

Para reportar problemas o sugerencias:
https://github.com/Kilo-Org/kilocode

---

**¿Listo para competir?** 🎲 ¡Abre la app y comienza!
