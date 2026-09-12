╔═════════════════════════════════════════════════════════════════════╗
║         INSTRUCCIONES: PUSH A GITHUB DESDE TU MÁQUINA                ║
╚═════════════════════════════════════════════════════════════════════╝

REQUISITOS PREVIOS:
✓ Git instalado en tu máquina
  Descarga desde: https://git-scm.com/download/win

DATOS NECESARIOS:
- Usuario GitHub: Lib3rty
- Token: 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
- Repositorio: speedcubing-scorecard

═══════════════════════════════════════════════════════════════════════

PASO 1: ABRE PowerShell

1. Presiona Win + X
2. Selecciona "Windows PowerShell" o "Terminal"

═══════════════════════════════════════════════════════════════════════

PASO 2: NAVEGA A LA CARPETA DEL PROYECTO

Copia y pega esto en PowerShell:

cd "C:\Users\Racquet Center\Documents\Enrymar\Dev\speedcubing-scorecard"

═══════════════════════════════════════════════════════════════════════

PASO 3: CONFIGURA GIT

Copia y pega CADA LÍNEA POR SEPARADO:

git config --global user.name "Lib3rty"
git config --global user.email "tu@email.com"

(Reemplaza tu@email.com con tu email real de GitHub)

═══════════════════════════════════════════════════════════════════════

PASO 4: INICIALIZA EL REPOSITORIO LOCAL

git init
git add .
git commit -m "Initial commit: Speedcubing Scorecard PWA"
git branch -M main

═══════════════════════════════════════════════════════════════════════

PASO 5: CREA EL REPOSITORIO EN GITHUB

1. Ve a https://github.com/new
2. Nombre: speedcubing-scorecard
3. Descripción: "Speedcubing Scorecard PWA - Calcula promedios offline"
4. Público (público)
5. Presiona "Create repository"

NO HAGAS NADA MÁS EN ESE SITIO

═══════════════════════════════════════════════════════════════════════

PASO 6: CONECTA Y HAZE PUSH

Vuelve a PowerShell y pega esto:

git remote add origin https://Lib3rty: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@github.com/Lib3rty/speedcubing-scorecard.git

git push -u origin main

═══════════════════════════════════════════════════════════════════════

PASO 7: VERIFICA EN GITHUB

1. Ve a https://github.com/Lib3rty/speedcubing-scorecard
2. Deberías ver todos los archivos del proyecto

═══════════════════════════════════════════════════════════════════════

PASO 8: CONFIGURAR GITHUB PAGES (Opcional - Para publicar online)

EN GITHUB:
1. Ve a Settings → Pages
2. "Source" = Deploy from a branch
3. Branch = main
4. Carpeta = /(root)
5. Presiona Save

⚠️ PERO PRIMERO necesitas compilar el proyecto localmente.

Para eso necesitas Node.js:
https://nodejs.org/ (descarga LTS)

Luego en PowerShell:
npm install
npm run build

Esto genera la carpeta dist/ que necesita GitHub Pages.

═══════════════════════════════════════════════════════════════════════

ALTERNATIVA SIN COMPILAR: USAR VERCEL

Si no quieres instalar Node.js, USA VERCEL (RECOMENDADO):

1. Ve a https://vercel.com
2. Presiona "New Project"
3. Conecta tu GitHub (Lib3rty)
4. Selecciona "speedcubing-scorecard"
5. Vercel auto-detecta que es Vite
6. Presiona "Deploy"

EN 30 SEGUNDOS tu app estará online en:
https://speedcubing-scorecard.vercel.app

✓ Vercel compila automáticamente
✓ No necesitas Node.js local
✓ Funciona 100% offline (PWA)
✓ Actualizaciones automáticas con cada push

═══════════════════════════════════════════════════════════════════════

RESUMEN RÁPIDO:

❌ SIN COMPILAR (solo código):
   1. Instala Git
   2. Sigue PASOS 1-6
   3. Listo en 5 minutos

✅ CON COMPILAR (app funcionando online):
   Opción A) GitHub Pages:
      1. Instala Git + Node.js
      2. Sigue PASOS 1-8
      3. Listo en 20 minutos

   Opción B) Vercel (MÁS FÁCIL):
      1. Instala Git
      2. Sigue PASOS 1-6
      3. Ve a Vercel.com
      4. Connect GitHub
      5. Select repo
      6. Deploy
      7. Listo en 10 minutos

═══════════════════════════════════════════════════════════════════════

⚠️ IMPORTANTE: TOKEN

El token que compartiste es sensible. DESPUÉS de hacer push:

1. Ve a https://github.com/settings/tokens
2. Encuentra el token "speedcubing-deploy"
3. Presiona "Delete" para invalidarlo

Esto previene que alguien más lo use.

═══════════════════════════════════════════════════════════════════════

¿PREGUNTAS?

Revisa los archivos del proyecto:
- README.md - Documentación completa
- QUICK_START.md - Guía rápida
- PROJECT_SUMMARY.md - Detalles técnicos

═══════════════════════════════════════════════════════════════════════
