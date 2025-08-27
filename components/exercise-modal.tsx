"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Plus, Dumbbell, Target, AlertTriangle, Zap, AlertCircle } from "lucide-react"
import type { Exercise } from "@/lib/mock-data"

interface ExerciseModalProps {
  exercise: Exercise | null
  isOpen: boolean
  onClose: () => void
  onAddToPlan: (exercise: Exercise) => void
  isInPlan?: boolean
  planCount?: number
}

export function ExerciseModal({
  exercise,
  isOpen,
  onClose,
  onAddToPlan,
  isInPlan = false,
  planCount = 0,
}: ExerciseModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!exercise) return null

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getObjectiveColor = (objective: string) => {
    switch (objective) {
      case "Fuerza":
        return "bg-blue-100 text-blue-800"
      case "Hipertrofia":
        return "bg-purple-100 text-purple-800"
      case "Resistencia":
        return "bg-orange-100 text-orange-800"
      case "Potencia":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isAtMaximum = planCount >= 20
  const canAddToPlan = !isInPlan && !isAtMaximum

  const handleAddToPlan = () => {
    if (canAddToPlan) {
      onAddToPlan(exercise)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">{exercise.name}</DialogTitle>
              {exercise.alias && <p className="text-lg text-muted-foreground mb-4">{exercise.alias}</p>}

              <div className="flex flex-wrap gap-2">
                <Badge className={getLevelColor(exercise.level)}>{exercise.level}</Badge>
                <Badge className={getObjectiveColor(exercise.objective)}>{exercise.objective}</Badge>
                <Badge variant="outline">{exercise.group}</Badge>
                <Badge variant="outline">{exercise.type}</Badge>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0" aria-label="Cerrar modal">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Plan Status Alert */}
          {isAtMaximum && !isInPlan && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Has alcanzado el límite máximo de 20 ejercicios en tu plan. Elimina algunos ejercicios para agregar
                este.
              </AlertDescription>
            </Alert>
          )}

          {/* Exercise Image and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                <img
                  src={exercise.image || "/placeholder.svg"}
                  alt={`Demostración del ejercicio ${exercise.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 p-4 bg-card rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Equipo necesario</span>
                </div>
                <p className="text-foreground font-semibold">{exercise.equipment}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Descripción</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{exercise.description}</p>

              <div className="flex justify-end">
                <Button
                  onClick={handleAddToPlan}
                  disabled={!canAddToPlan}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Plus className="h-4 w-4" />
                  {isInPlan ? "Ya está en tu plan" : isAtMaximum ? "Plan lleno (20/20)" : "Agregar al Plan"}
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Technical Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technique Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Técnica Paso a Paso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {exercise.technique.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="text-foreground leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Muscles Involved */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-secondary" />
                  Músculos Implicados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exercise.muscles.map((muscle, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-foreground">{muscle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Errors */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Errores Comunes a Evitar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercise.commonErrors.map((error, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{error}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>

            <Button onClick={handleAddToPlan} disabled={!canAddToPlan} className="flex items-center gap-2" size="lg">
              <Plus className="h-4 w-4" />
              {isInPlan ? "Ya está en tu plan" : isAtMaximum ? "Plan lleno (20/20)" : "Agregar al Plan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
