🏗️ Proyecto batch-mina (Antamina Batch)
URL: https://batch-mina-2.vercel.app/

Aplicación web desarrollada en React + TypeScript + Vite, que permite gestionar, visualizar y asignar sacos (bags) a celdas dentro de patios y zonas.
El objetivo principal del sistema es facilitar la asignación y distribución visual de lotes de sacos dentro de un modelo estructurado de patios y celdas, como parte de un flujo de operaciones mineras o logísticas.

🚀 Características principales

📦 Gestión de Lotes: Crea y administra lotes de sacos con estados dinámicos (no_asigned, asignado, ocupado).

🧭 Navegación con React Router: Flujo entre vista de tabla principal y vista de asignación individual.

🗺️ Visualización en cuadrícula (Grid): Muestra gráficamente las celdas de cada zona, diferenciando visualmente los estados de cada una.

🧠 Zustand Store: Gestión de estado centralizada, modular y reactiva (para Lotes, Patios, Celdas y Zonas).

🧩 Tipado robusto con TypeScript y validaciones de estructura con Zod.

🎨 TailwindCSS + Radix UI + Lucide Icons para un diseño moderno, responsive y funcional.

🧰 Vite como bundler ultrarrápido para desarrollo y build.

🏗️ Arquitectura del Proyecto
src/
│
├── components/
│   └── Grid.tsx                # Muestra visualmente las celdas de una zona
├   |
│   └── ui                      
│    ├── button.tsx             
│    ├── form.tsx               
│    ├── label.tsx              
│    └── table.tsx  
|
├── lib/
│   ├── cellUtils.ts            
│   └── utils.ts                          
│
├── page/
│   ├── DataTable.tsx           # Pantalla principal: listado de lotes
│   └── AsignBagPage.tsx        # Pantalla de asignación de sacos a celdas
│
├── store/
│   ├── CellStore.ts            # Estado de celdas (ocupadas, asignadas, libres)
│   ├── LoteStore.ts            # Estado de lotes y sacos
│   ├── PatioStore.ts           # Estado de patios y zonas
│   └── ZoneStore.ts            # (definiciones de zonas y celdas por patio)
│
├── types/
│   └── LotProps.ts             # Tipos para lotes, sacos y celdas
│
├── App.tsx                     # Configuración de rutas principales
└── main.tsx                    # Entrada de la aplicación

⚙️ Instalación y ejecución
🔧 Requisitos previos

Node.js >= 18

npm o pnpm o yarn

📦 Instalación
# Clonar el repositorio
git clone https://github.com/tuusuario/batch-mina.git

# Entrar en el proyecto
cd batch-mina

# Instalar dependencias
npm install

🚀 Comandos disponibles
Comando	Descripción
npm run dev	Inicia el servidor de desarrollo con Vite
npm run build	Genera la build de producción (compila TS y empaqueta)
npm run preview	Sirve la build generada localmente
npm run lint	Ejecuta ESLint para análisis de código
🧠 Estado global (Zustand)

El proyecto utiliza Zustand como gestor de estado, con stores modulares:

📍 useLoteStore

Maneja la lista de lotes (lotes) y sus sacos.

Funciones clave:

updateSacosByIdLote(loteId, nuevosSacos)

Lógica de creación de lotes demo (crearLote, generarSacos).

🧱 useCellStore

Controla las celdas visibles según la zona activa.

Funciones:

setZonaCeldas(zona)

actualizarEstado(celdaId, nuevoEstado)

actualizarCeldas(celdas)

🏠 usePatioStore

Define los patios y sus zonas (Patio A, B, C).

Cada zona contiene celdas generadas a partir de datos de ZoneStore.

💻 Flujo de uso

Desde la pantalla principal (/), se muestran los lotes disponibles en una tabla.

El usuario puede seleccionar “Asignar”, lo cual navega a /asignar/:id.

En la vista de asignación:

Se elige un Patio y una Zona.

Se define una cantidad de sacos a asignar.

Se visualiza el resultado en la cuadrícula (Grid).

Los botones Asignar, Limpiar, Guardar y Cancelar permiten gestionar los estados de las celdas y sacos.

Las celdas cambian de color según su estado:

🟩 Disponible

🟨 Asignado temporalmente

🟥 Ocupado (guardado)

🎨 UI y estilos

TailwindCSS v4 para estilos utilitarios.

tw-animate-css para animaciones.

Radix UI y Lucide React Icons para elementos visuales.

Diseño responsivo y minimalista.

🧩 Dependencias clave
Paquete	Descripción
react, react-dom	Librería principal de UI
react-router-dom	Navegación SPA
zustand	Estado global
zod	Validaciones tipadas
uuid	Generación de IDs únicos
tailwindcss, @tailwindcss/vite	Estilos
@tanstack/react-table	Tablas dinámicas
react-hook-form	Formularios
lucide-react, react-icons	Iconos
vite, typescript, eslint	Herramientas de build y desarrollo
🧪 Próximas mejoras

🗃️ Persistencia de estado (localStorage o backend API).

📊 Reporte visual del estado general de patios.

🔄 Importación/exportación de configuraciones de sacos.

🧱 Edición avanzada de celdas y zonas.

🧠 Integración con base de datos real (API REST o GraphQL).

📜 Licencia

Proyecto privado de desarrollo interno.
© 2025 — batch-mina / Antamina — Todos los derechos reservados.

¿Quieres que te genere también una versión en inglés o un README con badges e imágenes (por ejemplo, diagramas del flujo o capturas del grid)? Puedo hacerlo para documentar el proyecto de forma más visual.