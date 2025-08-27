"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { filterOptions } from "@/lib/mock-data"

export interface FilterState {
  groups: string[]
  types: string[]
  equipment: string[]
  levels: string[]
  objectives: string[]
}

interface ExerciseFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApplyFilters: () => void
  onClearFilters: () => void
  isLoading?: boolean
}

export function ExerciseFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
}: ExerciseFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    groups: true,
    types: false,
    equipment: false,
    levels: false,
    objectives: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = { ...filters }
    if (checked) {
      newFilters[category] = [...newFilters[category], value]
    } else {
      newFilters[category] = newFilters[category].filter((item) => item !== value)
    }
    onFiltersChange(newFilters)
  }

  const removeFilter = (category: keyof FilterState, value: string) => {
    const newFilters = { ...filters }
    newFilters[category] = newFilters[category].filter((item) => item !== value)
    onFiltersChange(newFilters)
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0)
  }

  const renderFilterSection = (title: string, category: keyof FilterState, options: string[]) => {
    const isExpanded = expandedSections[category]
    const activeCount = filters[category].length

    return (
      <div className="border-b border-border last:border-b-0">
        <button
          onClick={() => toggleSection(category)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          aria-expanded={isExpanded}
          aria-controls={`filter-${category}`}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{title}</span>
            {activeCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeCount}
              </Badge>
            )}
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isExpanded && (
          <div id={`filter-${category}`} className="px-4 pb-4">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option}`}
                    checked={filters[category].includes(option)}
                    onCheckedChange={(checked) => handleFilterChange(category, option, checked as boolean)}
                  />
                  <label
                    htmlFor={`${category}-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Filtros</CardTitle>
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(filters).map(([category, values]) =>
              values.map((value) => (
                <Badge key={`${category}-${value}`} variant="secondary" className="text-xs flex items-center gap-1">
                  {value}
                  <button
                    onClick={() => removeFilter(category as keyof FilterState, value)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    aria-label={`Quitar filtro ${value}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )),
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {renderFilterSection("Grupo Muscular", "groups", filterOptions.groups)}
        {renderFilterSection("Tipo", "types", filterOptions.types)}
        {renderFilterSection("Equipo", "equipment", filterOptions.equipment)}
        {renderFilterSection("Nivel", "levels", filterOptions.levels)}
        {renderFilterSection("Objetivo", "objectives", filterOptions.objectives)}

        <div className="p-4 flex gap-2">
          <Button onClick={onApplyFilters} className="flex-1" disabled={isLoading}>
            {isLoading ? "Aplicando..." : "Aplicar Filtros"}
          </Button>
          <Button variant="outline" onClick={onClearFilters} disabled={isLoading}>
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
