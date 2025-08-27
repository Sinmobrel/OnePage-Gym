"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Download, Trash2, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import type { Exercise } from "@/lib/mock-data"

interface PlanManagementProps {
  exercises: Exercise[]
  onRemoveExercise: (exerciseId: string) => void
  onDownloadPDF: () => void
  isGeneratingPDF?: boolean
}

export function PlanManagement({
  exercises,
  onRemoveExercise,
  onDownloadPDF,
  isGeneratingPDF = false,
}: PlanManagementProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const canDownload = exercises.length >= 1
  const isAtMaximum = exercises.length >= 20
  const today = new Date()
  const suggestedFilename = `plan-entrenamiento-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}.pdf`

  const groupedExercises = exercises.reduce(
    (acc, exercise) => {
      if (!acc[exercise.group]) {
        acc[exercise.group] = []
      }
      acc[exercise.group].push(exercise)
      return acc
    },
    {} as Record<string, Exercise[]>,
  )

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Mi Plan de Entrenamiento
            <Badge variant="secondary" className="ml-2">
              {exercises.length}/20
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? "Mostrar" : "Ocultar"}
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="space-y-2">
          {exercises.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Agrega al menos 1 ejercicio para crear tu plan</AlertDescription>
            </Alert>
          )}

          {canDownload && !isAtMaximum && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Plan listo para descargar ({exercises.length} ejercicio{exercises.length !== 1 ? "s" : ""})
              </AlertDescription>
            </Alert>
          )}

          {isAtMaximum && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Has alcanzado el límite máximo de 20 ejercicios. Elimina algunos para agregar más.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="pt-0">
          {exercises.length > 0 ? (
            <div className="space-y-4">
              {/* Exercise List by Group */}
              <div className="max-h-96 overflow-y-auto space-y-3">
                {Object.entries(groupedExercises).map(([group, groupExercises]) => (
                  <div key={group}>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                      {group} ({groupExercises.length})
                    </h4>
                    <div className="space-y-2">
                      {groupExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{exercise.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {exercise.level}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{exercise.equipment}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveExercise(exercise.id)}
                            className="text-muted-foreground hover:text-destructive shrink-0 ml-2"
                            aria-label={`Eliminar ${exercise.name} del plan`}
                            disabled={isGeneratingPDF}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {Object.keys(groupedExercises).indexOf(group) < Object.keys(groupedExercises).length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </div>

              {/* Download Section */}
              <div className="pt-4 border-t border-border">
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Archivo sugerido:</p>
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground">{suggestedFilename}</p>
                  </div>

                  <Button
                    onClick={onDownloadPDF}
                    disabled={!canDownload || isGeneratingPDF}
                    className="w-full flex items-center gap-2"
                    size="lg"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generando PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Descargar PDF
                      </>
                    )}
                  </Button>

                  {canDownload && (
                    <p className="text-xs text-muted-foreground text-center">
                      Se abrirá una ventana de impresión para guardar como PDF
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Tu plan está vacío</p>
              <p className="text-sm text-muted-foreground">
                Haz clic en los ejercicios del catálogo para agregarlos a tu plan
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
