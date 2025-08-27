"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, SlidersHorizontal } from "lucide-react"
import { ExerciseCard } from "./exercise-card"
import { ExerciseFilters, type FilterState } from "./exercise-filters"
import type { Exercise } from "@/lib/mock-data"
import { mockExercises, searchExercises, filterExercises } from "@/lib/mock-data"

interface ExerciseCatalogProps {
  initialSearchQuery?: string
  onExerciseClick: (exercise: Exercise) => void
}

export function ExerciseCatalog({ initialSearchQuery = "", onExerciseClick }: ExerciseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises)
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(mockExercises)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<"name" | "group">("name")

  const [filters, setFilters] = useState<FilterState>({
    groups: [],
    types: [],
    equipment: [],
    levels: [],
    objectives: [],
  })

  // Handle search
  const handleSearch = async (query: string) => {
    setIsLoading(true)
    try {
      const results = await searchExercises(query)
      setExercises(results)
    } catch (error) {
      console.error("Error searching exercises:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle filters
  const handleApplyFilters = async () => {
    setIsLoading(true)
    try {
      const results = await filterExercises(filters)
      setExercises(results)
    } catch (error) {
      console.error("Error filtering exercises:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilters = () => {
    setFilters({
      groups: [],
      types: [],
      equipment: [],
      levels: [],
      objectives: [],
    })
    setExercises(mockExercises)
  }

  // Search on query change
  useEffect(() => {
    if (searchQuery !== initialSearchQuery) {
      const timeoutId = setTimeout(() => {
        handleSearch(searchQuery)
      }, 300)
      return () => clearTimeout(timeoutId)
    }
  }, [searchQuery, initialSearchQuery])

  // Sort exercises
  const sortedExercises = useMemo(() => {
    const exercisesToSort = [...exercises]
    return exercisesToSort.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name, "es")
      } else {
        return a.group.localeCompare(b.group, "es")
      }
    })
  }, [exercises, sortBy])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Busca por nombre o alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Buscar ejercicios"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {Object.values(filters).some((arr) => arr.length > 0) && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {Object.values(filters).reduce((count, arr) => count + arr.length, 0)}
              </span>
            )}
          </Button>

          <Select value={sortBy} onValueChange={(value: "name" | "group") => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Ordenar por Nombre</SelectItem>
              <SelectItem value="group">Ordenar por Grupo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div id="filters-panel" className="lg:w-80">
            <ExerciseFilters
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {isLoading
                ? "Buscando ejercicios..."
                : `${sortedExercises.length} ejercicio${sortedExercises.length !== 1 ? "s" : ""} encontrado${sortedExercises.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Exercise Grid */}
          {sortedExercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onClick={onExerciseClick} />
              ))}
            </div>
          ) : (
            !isLoading && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mb-4">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron ejercicios</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || Object.values(filters).some((arr) => arr.length > 0)
                        ? "Intenta ajustar tu búsqueda o filtros"
                        : "No hay ejercicios disponibles en este momento"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Sugerencias:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Verifica la ortografía de tu búsqueda</li>
                      <li>• Usa términos más generales</li>
                      <li>• Prueba con nombres en inglés (ej: "bench press")</li>
                      <li>• Limpia los filtros activos</li>
                    </ul>
                  </div>

                  {(searchQuery || Object.values(filters).some((arr) => arr.length > 0)) && (
                    <div className="mt-6 flex gap-2 justify-center">
                      {searchQuery && (
                        <Button variant="outline" onClick={() => setSearchQuery("")}>
                          Limpiar búsqueda
                        </Button>
                      )}
                      {Object.values(filters).some((arr) => arr.length > 0) && (
                        <Button variant="outline" onClick={handleClearFilters}>
                          Limpiar filtros
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  )
}
