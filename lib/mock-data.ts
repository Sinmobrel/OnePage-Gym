// Mock exercise data - simulated API endpoints
export interface Exercise {
  id: string
  name: string
  alias?: string
  group: string
  type: string
  equipment: string
  level: "Principiante" | "Intermedio" | "Avanzado"
  objective: string
  image: string
  technique: string[]
  muscles: string[]
  commonErrors: string[]
  description: string
}

export const mockExercises: Exercise[] = [
  {
    id: "1",
    name: "Press de Banca",
    alias: "Bench Press",
    group: "Pecho",
    type: "Compuesto",
    equipment: "Barra",
    level: "Intermedio",
    objective: "Fuerza",
    image: "/bench-press-exercise-gym.png",
    technique: [
      "Acuéstate en el banco con los pies firmes en el suelo",
      "Agarra la barra con las manos separadas al ancho de los hombros",
      "Baja la barra controladamente hasta el pecho",
      "Empuja la barra hacia arriba hasta extender completamente los brazos",
    ],
    muscles: ["Pectoral mayor", "Deltoides anterior", "Tríceps"],
    commonErrors: [
      "Arquear excesivamente la espalda",
      "Bajar la barra demasiado rápido",
      "No tocar el pecho con la barra",
    ],
    description: "Ejercicio fundamental para desarrollar fuerza y masa muscular en el pecho",
  },
  {
    id: "2",
    name: "Sentadilla",
    alias: "Squat",
    group: "Piernas",
    type: "Compuesto",
    equipment: "Barra",
    level: "Principiante",
    objective: "Fuerza",
    image: "/squat-exercise-gym-barbell.png",
    technique: [
      "Coloca la barra sobre los trapecios",
      "Separa los pies al ancho de los hombros",
      "Desciende flexionando caderas y rodillas",
      "Mantén el pecho erguido y la espalda recta",
      "Sube empujando con los talones",
    ],
    muscles: ["Cuádriceps", "Glúteos", "Isquiotibiales", "Core"],
    commonErrors: ["Rodillas hacia adentro", "No bajar lo suficiente", "Inclinarse demasiado hacia adelante"],
    description: "El rey de los ejercicios para piernas y glúteos",
  },
  {
    id: "3",
    name: "Peso Muerto",
    alias: "Deadlift",
    group: "Espalda",
    type: "Compuesto",
    equipment: "Barra",
    level: "Avanzado",
    objective: "Fuerza",
    image: "/deadlift-exercise-gym-barbell.png",
    technique: [
      "Colócate frente a la barra con pies al ancho de caderas",
      "Agarra la barra con las manos fuera de las piernas",
      "Mantén la espalda recta y el pecho hacia arriba",
      "Levanta la barra extendiendo caderas y rodillas simultáneamente",
    ],
    muscles: ["Erectores espinales", "Glúteos", "Isquiotibiales", "Trapecios"],
    commonErrors: ["Redondear la espalda", "Alejar la barra del cuerpo", "No activar el core"],
    description: "Ejercicio completo que trabaja toda la cadena posterior",
  },
  {
    id: "4",
    name: "Dominadas",
    alias: "Pull-ups",
    group: "Espalda",
    type: "Compuesto",
    equipment: "Barra fija",
    level: "Intermedio",
    objective: "Fuerza",
    image: "/pull-up-exercise-gym-bar.png",
    technique: [
      "Cuelga de la barra con agarre pronado",
      "Separa las manos al ancho de los hombros",
      "Tira hacia arriba hasta que el mentón pase la barra",
      "Desciende controladamente hasta extensión completa",
    ],
    muscles: ["Dorsal ancho", "Romboides", "Bíceps", "Core"],
    commonErrors: ["Usar impulso con las piernas", "No completar el rango de movimiento", "Balancearse excesivamente"],
    description: "Ejercicio fundamental para desarrollar la fuerza de tracción",
  },
  {
    id: "5",
    name: "Press Militar",
    alias: "Military Press",
    group: "Hombros",
    type: "Compuesto",
    equipment: "Barra",
    level: "Intermedio",
    objective: "Fuerza",
    image: "/military-press-exercise-gym-barbell.png",
    technique: [
      "De pie con la barra a la altura de los hombros",
      "Agarra la barra con las manos al ancho de los hombros",
      "Empuja la barra hacia arriba en línea recta",
      "Extiende completamente los brazos por encima de la cabeza",
    ],
    muscles: ["Deltoides", "Tríceps", "Core", "Trapecios"],
    commonErrors: ["Arquear excesivamente la espalda", "Empujar la barra hacia adelante", "No estabilizar el core"],
    description: "Ejercicio principal para desarrollar fuerza en los hombros",
  },
  {
    id: "6",
    name: "Curl de Bíceps",
    alias: "Bicep Curl",
    group: "Brazos",
    type: "Aislamiento",
    equipment: "Mancuernas",
    level: "Principiante",
    objective: "Hipertrofia",
    image: "/bicep-curl-exercise-gym-dumbbells.png",
    technique: [
      "De pie con una mancuerna en cada mano",
      "Mantén los codos pegados al torso",
      "Flexiona los brazos llevando las mancuernas hacia los hombros",
      "Desciende controladamente a la posición inicial",
    ],
    muscles: ["Bíceps braquial", "Braquial anterior"],
    commonErrors: ["Balancear el cuerpo", "Mover los codos", "Usar demasiado peso"],
    description: "Ejercicio clásico para el desarrollo de los bíceps",
  },
  {
    id: "7",
    name: "Plancha",
    alias: "Plank",
    group: "Core",
    type: "Isométrico",
    equipment: "Peso corporal",
    level: "Principiante",
    objective: "Resistencia",
    image: "/plank-exercise-gym-core.png",
    technique: [
      "Colócate en posición de flexión sobre los antebrazos",
      "Mantén el cuerpo en línea recta desde cabeza hasta talones",
      "Contrae el core y mantén la posición",
      "Respira normalmente durante el ejercicio",
    ],
    muscles: ["Recto abdominal", "Transverso abdominal", "Oblicuos"],
    commonErrors: ["Elevar demasiado las caderas", "Hundir las caderas", "Tensar el cuello"],
    description: "Ejercicio fundamental para fortalecer el core",
  },
  {
    id: "8",
    name: "Remo con Barra",
    alias: "Barbell Row",
    group: "Espalda",
    type: "Compuesto",
    equipment: "Barra",
    level: "Intermedio",
    objective: "Fuerza",
    image: "/barbell-row-exercise-gym.png",
    technique: [
      "Inclínate hacia adelante con la barra en las manos",
      "Mantén la espalda recta y las rodillas ligeramente flexionadas",
      "Tira de la barra hacia el abdomen",
      "Aprieta los omóplatos al final del movimiento",
    ],
    muscles: ["Dorsal ancho", "Romboides", "Trapecios medio", "Bíceps"],
    commonErrors: ["Redondear la espalda", "Usar demasiado impulso", "No retraer los omóplatos"],
    description: "Ejercicio excelente para desarrollar el grosor de la espalda",
  },
]

export const filterOptions = {
  groups: ["Pecho", "Espalda", "Piernas", "Hombros", "Brazos", "Core"],
  types: ["Compuesto", "Aislamiento", "Isométrico"],
  equipment: ["Barra", "Mancuernas", "Barra fija", "Peso corporal", "Máquina"],
  levels: ["Principiante", "Intermedio", "Avanzado"],
  objectives: ["Fuerza", "Hipertrofia", "Resistencia", "Potencia"],
}

// Simulated API functions
export const searchExercises = async (query: string): Promise<Exercise[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query.trim()) return mockExercises

  const lowercaseQuery = query.toLowerCase()
  return mockExercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.alias?.toLowerCase().includes(lowercaseQuery) ||
      exercise.group.toLowerCase().includes(lowercaseQuery),
  )
}

export const filterExercises = async (filters: {
  groups?: string[]
  types?: string[]
  equipment?: string[]
  levels?: string[]
  objectives?: string[]
}): Promise<Exercise[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockExercises.filter((exercise) => {
    if (filters.groups?.length && !filters.groups.includes(exercise.group)) return false
    if (filters.types?.length && !filters.types.includes(exercise.type)) return false
    if (filters.equipment?.length && !filters.equipment.includes(exercise.equipment)) return false
    if (filters.levels?.length && !filters.levels.includes(exercise.level)) return false
    if (filters.objectives?.length && !filters.objectives.includes(exercise.objective)) return false
    return true
  })
}
