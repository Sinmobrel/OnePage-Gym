import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, FileText, Download } from "lucide-react"

export function HowToUseSection() {
  const steps = [
    {
      icon: Search,
      title: "1. Buscar",
      description: "Encuentra ejercicios por nombre, alias o navega por categorías",
    },
    {
      icon: Filter,
      title: "2. Filtrar",
      description: "Aplica filtros por grupo muscular, equipo, nivel y objetivo",
    },
    {
      icon: FileText,
      title: "3. Revisar Ficha",
      description: "Consulta la técnica, músculos implicados y errores comunes",
    },
    {
      icon: Download,
      title: "4. Descargar Plan",
      description: "Crea tu rutina personalizada y descárgala en PDF",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cómo Usar el Catálogo</h2>
            <p className="text-lg text-muted-foreground">
              Sigue estos simples pasos para crear tu plan de entrenamiento perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
