"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Exercise } from "@/lib/mock-data"

interface ExerciseCardProps {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Avanzado":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      onClick={() => onClick(exercise)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick(exercise)
        }
      }}
      aria-label={`Ver detalles de ${exercise.name}`}
    >
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={exercise.image || "/placeholder.svg"}
            alt={`Demostración del ejercicio ${exercise.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={getLevelColor(exercise.level)}>{exercise.level}</Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">{exercise.name}</h3>
          {exercise.alias && <p className="text-sm text-muted-foreground mb-2">{exercise.alias}</p>}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {exercise.group}
            </Badge>
            <span className="text-xs text-muted-foreground">{exercise.equipment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
