# Ejemplos de Uso - Speedcubing Scorecard

## Ejemplo 1: Competencia típica

### Tiempos ingresados:
- Tiempo 1: 10:00.00 (10 minutos, 0 segundos, 0 centésimas)
- Tiempo 2: 9:50.00
- Tiempo 3: 9:45.00
- Tiempo 4: 9:55.00
- Tiempo 5: 9:40.00

### Proceso:
1. Convertir a milisegundos:
   - 10:00.00 = 600000ms
   - 9:50.00 = 590000ms
   - 9:45.00 = 585000ms
   - 9:55.00 = 595000ms
   - 9:40.00 = 580000ms

2. Ordenar: 580000 < 585000 < 590000 < 595000 < 600000
   - Mínimo (Eliminado): 9:40.00 (580000ms)
   - Máximo (Eliminado): 10:00.00 (600000ms)

3. Promediar los 3 del medio:
   - (590000 + 585000 + 595000) / 3 = 1770000 / 3 = 590000ms

4. Convertir a MM:SS.MS:
   - 590000ms = 9:50.00

**Resultado: 9:50.00**

---

## Ejemplo 2: Tiempos muy cercanos

### Tiempos ingresados:
- Tiempo 1: 0:12.34
- Tiempo 2: 0:11.99 (el mejor)
- Tiempo 3: 0:13.45
- Tiempo 4: 0:12.01
- Tiempo 5: 0:15.00 (el peor)

### Proceso:
1. En milisegundos:
   - 0:12.34 = 1234ms
   - 0:11.99 = 1199ms (min)
   - 0:13.45 = 1345ms
   - 0:12.01 = 1201ms
   - 0:15.00 = 1500ms (max)

2. Eliminar: 0:11.99 y 0:15.00

3. Promediar:
   - (1234 + 1345 + 1201) / 3 = 3780 / 3 = 1260ms

4. Convertir:
   - 1260ms = 0:12.60

**Resultado: 0:12.60**

---

## Ejemplo 3: Todos los tiempos iguales

### Tiempos ingresados:
- Tiempo 1: 0:10.00
- Tiempo 2: 0:10.00
- Tiempo 3: 0:10.00
- Tiempo 4: 0:10.00
- Tiempo 5: 0:10.00

### Proceso:
1. Todos = 1000ms

2. Min = 1000ms (cualquiera, ej: primer índice)
   Max = 1000ms (cualquiera, ej: último índice)

3. Promediar:
   - (1000 + 1000 + 1000) / 3 = 1000ms

4. Convertir:
   - 1000ms = 0:10.00

**Resultado: 0:10.00**

---

## Validación de Rangos

La app valida que los tiempos estén en rangos válidos:

| Campo | Mínimo | Máximo | Unidad |
|-------|--------|--------|--------|
| Minutos (MM) | 0 | 59 | minutos |
| Segundos (SS) | 0 | 59 | segundos |
| Centésimas (MS) | 0 | 99 | centésimas de segundo |

### Tiempos válidos:
- ✅ 00:00.00
- ✅ 05:30.50
- ✅ 59:59.99

### Tiempos inválidos (rechazados):
- ❌ 60:00.00 (minutos > 59)
- ❌ 05:70.00 (segundos > 59)
- ❌ 05:30.100 (centésimas > 99)

---

## Notas Importantes

1. **Centésimas vs Milisegundos**: 
   - La app usa centésimas (0-99)
   - 1 centésima = 10 milisegundos
   - Ejemplo: 0:00.50 = 500 milisegundos

2. **Precisión del Promedio**:
   - Se calcula en milisegundos internamente
   - El resultado se redondea al entero más cercano
   - Ejemplo: 1260ms = 0:12.60

3. **Casos Especiales**:
   - Si hay empates en min/max, se elimina la primera ocurrencia
   - El algoritmo siempre elimina exactamente 2 tiempos
   - El promedio siempre usa exactamente 3 tiempos
