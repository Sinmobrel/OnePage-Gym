"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowToUseSection } from "@/components/how-to-use-section"
import { ExerciseCatalog } from "@/components/exercise-catalog"
import { ExerciseModal } from "@/components/exercise-modal"
import { PlanManagement } from "@/components/plan-management"
import { generateWorkoutPlanPDF } from "@/lib/pdf-generator"
import type { Exercise } from "@/lib/mock-data"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "catalog">("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [planExercises, setPlanExercises] = useState<Exercise[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleNavigateToCatalog = () => {
    setCurrentView("catalog")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setSearchQuery("")
  }

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedExercise(null)
  }

  const handleAddToPlan = (exercise: Exercise) => {
    if (planExercises.length >= 20) {
      return // Don't add if at maximum
    }
    if (!planExercises.find((e) => e.id === exercise.id)) {
      setPlanExercises((prev) => [...prev, exercise])
    }
  }

  const handleRemoveFromPlan = (exerciseId: string) => {
    setPlanExercises((prev) => prev.filter((e) => e.id !== exerciseId))
  }

  const handleDownloadPDF = async () => {
    if (planExercises.length === 0) {
      return
    }

    setIsGeneratingPDF(true)
    try {
      await generateWorkoutPlanPDF(planExercises)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error al generar el PDF. Por favor, intenta de nuevo.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (currentView === "catalog") {
    return (
      <div className="min-h-screen bg-background">
        <Header onNavigateToCatalog={handleNavigateToCatalog} onSearch={handleSearch} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo de Ejercicios</h1>
                <p className="text-muted-foreground">
                  Explora nuestra colección completa de ejercicios con fichas técnicas detalladas
                </p>
              </div>
              <button onClick={handleBackToHome} className="text-primary hover:underline text-sm">
                ← Volver al inicio
              </button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1">
              <ExerciseCatalog initialSearchQuery={searchQuery} onExerciseClick={handleExerciseClick} />
            </div>

            <div className="xl:w-80">
              <PlanManagement
                exercises={planExercises}
                onRemoveExercise={handleRemoveFromPlan}
                onDownloadPDF={handleDownloadPDF}
                isGeneratingPDF={isGeneratingPDF}
              />
            </div>
          </div>

          <ExerciseModal
            exercise={selectedExercise}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToPlan={handleAddToPlan}
            isInPlan={selectedExercise ? planExercises.some((e) => e.id === selectedExercise.id) : false}
            planCount={planExercises.length}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigateToCatalog={handleNavigateToCatalog} onSearch={handleSearch} />
      <main>
        <HeroSection onNavigateToCatalog={handleNavigateToCatalog} />
        <HowToUseSection />
      </main>
    </div>
  )
}
