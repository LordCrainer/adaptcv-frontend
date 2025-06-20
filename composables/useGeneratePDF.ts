import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const useGeneratePDF = () => {
  async function generatePDF(elementId: string): Promise<jsPDF | null> {
    const templateElement = document.getElementById(elementId)

    if (!templateElement) {
      console.error('No se encontró el elemento del template')
      return null
    }

    try {
      const canvas = await html2canvas(templateElement, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: '#ffffff',
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId)
          if (clonedElement) {
            clonedElement.style.transform = 'none'
            clonedElement.style.width = '210mm' // Ancho A4
            clonedElement.style.maxWidth = '210mm'
            clonedElement.style.fontSize = '12px'
            clonedElement.style.padding = '10mm'
          }
        }
      })

      // Crear PDF con dimensiones A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      // Calcular dimensiones para ajustar a A4
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      // Calcular escala para ajustar al ancho de la página
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight)
      const imgWidth = canvasWidth * ratio
      const imgHeight = canvasHeight * ratio

      // Centrar la imagen en la página
      const marginX = (pdfWidth - imgWidth) / 2
      const marginY = 10 // Margen superior

      // Añadir imagen al PDF
      const imgData = canvas.toDataURL('image/png', 1.0)
      pdf.addImage(
        imgData,
        'PNG',
        marginX,
        marginY,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      )

      return pdf
    } catch (error) {
      console.error('Error generando PDF:', error)
      return null
    }
  }

  async function downloadPDF(pdf: jsPDF, filename: string): Promise<void> {
    const newFilename = filename.replace(/\.[^.]*$/, '') + '.pdf'
    if (!pdf) {
      console.error('No se pudo generar el PDF')
      return
    }
    try {
      pdf.save(newFilename)
    } catch (error) {
      console.error('Error al descargar el PDF:', error)
    }
  }

  return {
    generatePDF,
    downloadPDF
  }
}
