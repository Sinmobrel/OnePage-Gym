"use client"

import { Button } from "@/components/ui/button"
import { Dumbbell, Target, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  onNavigateToCatalog: () => void
}

export function HeroSection({ onNavigateToCatalog }: HeroSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Dumbbell className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground">Catálogo Técnico de</span>
              <br />
              <span className="text-primary">Ejercicios de Gimnasio</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Descubre ejercicios profesionales con fichas técnicas detalladas, crea planes personalizados y lleva tu
              entrenamiento al siguiente nivel.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Button
              size="lg"
              onClick={onNavigateToCatalog}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Ver Catálogo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Técnica Perfecta</h3>
              <p className="text-sm text-muted-foreground text-center">Instrucciones paso a paso para cada ejercicio</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <Dumbbell className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Catálogo Completo</h3>
              <p className="text-sm text-muted-foreground text-center">Ejercicios para todos los grupos musculares</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-secondary/10 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Planes Personalizados</h3>
              <p className="text-sm text-muted-foreground text-center">Crea y descarga tus rutinas en PDF</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
