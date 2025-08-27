import type { Exercise } from "./mock-data"

// PDF generation utility using browser APIs
export const generateWorkoutPlanPDF = async (exercises: Exercise[]): Promise<void> => {
  const today = new Date()
  const filename = `plan-entrenamiento-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}.pdf`

  // Create HTML content for the PDF
  const htmlContent = generatePDFContent(exercises, today)

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    throw new Error("No se pudo abrir la ventana de impresión")
  }

  // Write the HTML content
  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Wait for content to load
  await new Promise((resolve) => {
    printWindow.onload = resolve
    setTimeout(resolve, 1000) // Fallback timeout
  })

  // Set up print options and trigger print dialog
  printWindow.focus()
  printWindow.print()

  // Close the window after printing
  setTimeout(() => {
    printWindow.close()
  }, 1000)
}

const generatePDFContent = (exercises: Exercise[], date: Date): string => {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Plan de Entrenamiento</title>
      <style>
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #15803d;
          padding-bottom: 20px;
        }
        
        .header h1 {
          color: #15803d;
          font-size: 2.5em;
          margin: 0;
          font-weight: bold;
        }
        
        .header .subtitle {
          color: #666;
          font-size: 1.2em;
          margin: 10px 0;
        }
        
        .header .date {
          color: #888;
          font-size: 1em;
        }
        
        .summary {
          background: #f0fdf4;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #15803d;
        }
        
        .summary h2 {
          color: #15803d;
          margin-top: 0;
        }
        
        .muscle-group {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .muscle-group h2 {
          color: #15803d;
          font-size: 1.8em;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #15803d;
        }
        
        .exercise {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          page-break-inside: avoid;
        }
        
        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .exercise-title {
          flex: 1;
        }
        
        .exercise-title h3 {
          color: #374151;
          font-size: 1.4em;
          margin: 0 0 5px 0;
        }
        
        .exercise-alias {
          color: #666;
          font-style: italic;
          margin-bottom: 10px;
        }
        
        .exercise-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: 500;
        }
        
        .badge-level-principiante { background: #dcfce7; color: #166534; }
        .badge-level-intermedio { background: #fef3c7; color: #92400e; }
        .badge-level-avanzado { background: #fecaca; color: #991b1b; }
        .badge-equipment { background: #f3f4f6; color: #374151; }
        
        .exercise-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        
        .technique, .muscles {
          background: #f9fafb;
          padding: 15px;
          border-radius: 6px;
        }
        
        .technique h4, .muscles h4 {
          color: #15803d;
          margin: 0 0 10px 0;
          font-size: 1.1em;
        }
        
        .technique ol {
          margin: 0;
          padding-left: 20px;
        }
        
        .technique li {
          margin-bottom: 8px;
        }
        
        .muscles ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .muscles li {
          margin-bottom: 5px;
        }
        
        .description {
          grid-column: 1 / -1;
          background: #f0fdf4;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #84cc16;
        }
        
        .description h4 {
          color: #15803d;
          margin: 0 0 8px 0;
        }
        
        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 0.9em;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        
        @media print {
          .exercise {
            break-inside: avoid;
          }
          .muscle-group {
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Plan de Entrenamiento</h1>
        <div class="subtitle">Catálogo Técnico de Ejercicios</div>
        <div class="date">Generado el ${formatDate(date)}</div>
      </div>
      
      <div class="summary">
        <h2>Resumen del Plan</h2>
        <p><strong>Total de ejercicios:</strong> ${exercises.length}</p>
        <p><strong>Grupos musculares:</strong> ${Object.keys(groupedExercises).join(", ")}</p>
        <p><strong>Niveles incluidos:</strong> ${[...new Set(exercises.map((e) => e.level))].join(", ")}</p>
      </div>
      
      ${Object.entries(groupedExercises)
        .map(
          ([group, groupExercises]) => `
        <div class="muscle-group">
          <h2>${group} (${groupExercises.length} ejercicio${groupExercises.length !== 1 ? "s" : ""})</h2>
          
          ${groupExercises
            .map(
              (exercise) => `
            <div class="exercise">
              <div class="exercise-header">
                <div class="exercise-title">
                  <h3>${exercise.name}</h3>
                  ${exercise.alias ? `<div class="exercise-alias">${exercise.alias}</div>` : ""}
                </div>
                <div class="exercise-badges">
                  <span class="badge badge-level-${exercise.level.toLowerCase()}">${exercise.level}</span>
                  <span class="badge badge-equipment">${exercise.equipment}</span>
                </div>
              </div>
              
              <div class="exercise-content">
                <div class="technique">
                  <h4>Técnica</h4>
                  <ol>
                    ${exercise.technique.map((step) => `<li>${step}</li>`).join("")}
                  </ol>
                </div>
                
                <div class="muscles">
                  <h4>Músculos</h4>
                  <ul>
                    ${exercise.muscles.map((muscle) => `<li>${muscle}</li>`).join("")}
                  </ul>
                </div>
                
                <div class="description">
                  <h4>Descripción</h4>
                  <p>${exercise.description}</p>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `,
        )
        .join("")}
      
      <div class="footer">
        <p>Plan generado por Catálogo Técnico de Ejercicios</p>
        <p>Consulta siempre con un profesional antes de comenzar cualquier rutina de ejercicios</p>
      </div>
    </body>
    </html>
  `
}

// Alternative implementation using jsPDF (commented out as it requires external library)
/*
import jsPDF from 'jspdf'

export const generateWorkoutPlanPDFAdvanced = (exercises: Exercise[]): void => {
  const doc = new jsPDF()
  const today = new Date()
  const filename = `plan-entrenamiento-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}.pdf`
  
  // Add title
  doc.setFontSize(20)
  doc.text('Plan de Entrenamiento', 20, 30)
  
  // Add date
  doc.setFontSize(12)
  doc.text(`Generado el ${today.toLocaleDateString('es-ES')}`, 20, 45)
  
  let yPosition = 60
  
  // Group exercises by muscle group
  const groupedExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.group]) {
      acc[exercise.group] = []
    }
    acc[exercise.group].push(exercise)
    return acc
  }, {} as Record<string, Exercise[]>)
  
  // Add exercises by group
  Object.entries(groupedExercises).forEach(([group, groupExercises]) => {
    // Add group header
    doc.setFontSize(16)
    doc.text(group, 20, yPosition)
    yPosition += 15
    
    groupExercises.forEach((exercise) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
      
      // Add exercise name
      doc.setFontSize(14)
      doc.text(exercise.name, 25, yPosition)
      yPosition += 10
      
      // Add exercise details
      doc.setFontSize(10)
      doc.text(`Nivel: ${exercise.level} | Equipo: ${exercise.equipment}`, 25, yPosition)
      yPosition += 8
      
      // Add description
      const splitDescription = doc.splitTextToSize(exercise.description, 160)
      doc.text(splitDescription, 25, yPosition)
      yPosition += splitDescription.length * 5 + 10
    })
    
    yPosition += 10
  })
  
  // Save the PDF
  doc.save(filename)
}
*/
