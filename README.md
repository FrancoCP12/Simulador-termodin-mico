# Simulador de Transferencia de Calor

**Aplicación de Ingeniería de Software aplicada a la Física** — Simulación interactiva de intercambio de calor entre objetos mediante radiación térmica y conducción, construida con React.

Los objetos en el tablero se representan como **componentes de React** independientes que interactúan físicamente entre sí: conducen calor al tocarse, intercambian radiación si tienen línea de visión, y cambian de color dinámicamente según su temperatura.

## Características

- **Radiación térmica** basada en la ley de Stefan-Boltzmann con emisividad configurable por objeto.
- **Conducción térmica** por contacto directo entre objetos con conductividad térmica parametrizable.
- **Factor de visión** que modela obstrucciones: un objeto puede bloquear la radiación entre otros dos.
- **Objetos arrastrables** con detección de colisiones y reposicionamiento automático.
- **Mapa de color temperatura-dependente**: azul (frío) → verde (templado) → naranja (caliente) → rojo (muy caliente).
- **Glow radial** proporcional a la emisividad de cada objeto.
- **Cálculo de temperatura de equilibrio** del sistema.
- Control de simulación con **Start / Stop** y paso de tiempo configurable.

## Tecnologías

- **React 19** — Componentes funcionales, hooks (`useState`, `useEffect`, `useRef`)
- **Vite 7** — Build tool y dev server con HMR
- **ESLint** — Linter con reglas para React y React Hooks

## Estructura del proyecto

```
src/
├── App.jsx                        # Componente raíz
├── App.css / index.css            # Estilos globales
├── main.jsx                       # Punto de entrada
├── formulas.jsx                   # Motor físico (radiación, conducción, factor de visión)
└── componentes/
    ├── Create.jsx                 # Panel de control y tablero de simulación
    ├── Objeto.jsx                 # Objeto arrastrable con visualización por temperatura
    └── Plantilla.jsx              # Formulario para configurar propiedades del objeto
```

### Descripción de componentes y módulos

| Archivo | Rol |
|---|---|
| `formulas.jsx` | Contiene `actualizarTemperaturas()` (loop de simulación), `contactless()` (detección de contacto), `factorVision()` (línea de vista con obstáculos) y `tmpEquilibrio()` (temperatura de equilibrio del sistema). |
| `Create.jsx` | Orquesta la simulación: renderiza el panel de inputs, el tablero, maneja la creación/borrado de objetos y el loop temporal con `setInterval`. |
| `Objeto.jsx` | Representa un objeto físico en el tablero. Es arrastrable con el mouse, colisiona con otros objetos, y calcula su color en función de la temperatura actual. |
| `Plantilla.jsx` | Formulario de entrada para definir temperatura inicial, emisividad, masa, calor específico y conductividad térmica. |

## Instalación y uso

```bash
npm install
npm run dev
```

Abrir en el navegador la URL que indique la terminal (por defecto `http://localhost:5173`).

### Scripts disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint |

## Cómo funciona

### Modelo físico

La simulación discretiza el tiempo en pasos (`dt`). En cada paso se calcula el calor neto intercambiado entre cada par de objetos:

1. **Radiación** — Se aplica la ley de Stefan-Boltzmann entre dos objetos:
   - `dQ = σ · ε_eq · F_ij · (T_j⁴ − T_i⁴)`
   - Donde `ε_eq` es la emisividad equivalente (combinación de ambas emisividades), `F_ij` es el factor de visión (1 si hay línea de visión, 0 si hay obstáculo), y `σ` es la constante de Stefan-Boltzmann.

2. **Conducción** — Cuando dos objetos están en contacto, el flujo de calor por conducción depende del área de contacto, la conductividad térmica de ambos y la diferencia de temperatura.

3. **Actualización de temperatura** — El ΔT se calcula a partir del calor neto intercambiado:
   - `ΔT = (dQ · dt) / (m · c_e)`

4. **Equilibrio** — La simulación se detiene cuando todos los objetos alcanzan la misma temperatura (redondeada).

### Interacción visual

- Cada objeto es un `<div>` con `position: absolute` dentro del tablero.
- El color de fondo se calcula interpolando entre 4 colores base según la temperatura en Kelvin.
- La propiedad `box-shadow` se escala con la emisividad para simular el resplandor térmico.
- Los objetos se arrastran con `mousedown`/`mousemove`/`mouseup` y colisionan entre sí con resolución de ejes (separación por el eje de menor solapamiento).

## Parámetros configurables

| Parámetro | Unidad | Descripción |
|---|---|---|
| Temperatura inicial | K | Temperatura absoluta del objeto |
| Emisividad | 0–1 | Capacidad de emitir radiación térmica |
| Masa | kg | Masa del objeto (influye en la inercia térmica) |
| Calor específico | J/(kg·K) | Capacidad calorífica por unidad de masa |
| Conductividad térmica | W/(m·K) | Capacidad de conducir calor por contacto |
| Paso de tiempo (dt) | s | Intervalo de tiempo por iteración |

## Licencia

MIT
