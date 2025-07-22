import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const useGeneratePDF = () => {
  interface AdvancedPDFOptions {
    elementWidth?: string
    elementHeight?: string
    pdfFormat?: string | number[]
    pdfOrientation?: 'portrait' | 'landscape'
    pdfUnit?: 'pt' | 'mm' | 'cm' | 'in' | 'px'
    pdfCompress?: boolean
    margin?: number
  }

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

  // Función alternativa para generar PDF con mejor control de páginas
  async function generateAdvancedPDF(
    elementId: string,
    opts: AdvancedPDFOptions = {}
  ): Promise<jsPDF | null> {
    const templateElement = document.getElementById(elementId)
    if (!templateElement) {
      console.error('No se encontró el elemento del template')
      return null
    }

    try {
      // Desestructurar opciones con valores por defecto
      const {
        elementWidth = '190mm',
        elementHeight = 'auto',
        pdfFormat = 'a4',
        pdfOrientation = 'portrait',
        pdfUnit = 'mm',
        pdfCompress = true,
        margin = 15
      } = opts

      // Configurar elemento para impresión
      const originalStyles = {
        width: templateElement.style.width,
        height: templateElement.style.height,
        maxWidth: templateElement.style.maxWidth
      }

      const clonedElement = templateElement.cloneNode(true) as HTMLElement
      clonedElement.style.width = elementWidth
      clonedElement.style.maxWidth = elementWidth
      clonedElement.style.height = elementHeight
      document.body.appendChild(clonedElement)

      const canvas = await html2canvas(clonedElement, {
        useCORS: true,
        allowTaint: true,
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight
      })

      // Restaurar estilos originales
      Object.assign(clonedElement.style, originalStyles)

      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: pdfUnit,
        format: pdfFormat,
        compress: pdfCompress
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const contentWidth = pdfWidth - 2 * margin
      const contentHeight = pdfHeight - 2 * margin

      // Calcular dimensiones
      const imgWidth = contentWidth
      const imgHeight = (canvas.height * contentWidth) / canvas.width

      if (imgHeight <= contentHeight) {
        // Contenido cabe en una página
        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight)
      } else {
        // Dividir en múltiples páginas con mejor algoritmo
        const totalPages = Math.ceil(imgHeight / contentHeight)
        const pageHeight = canvas.height / totalPages

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage()

          const sourceY = i * pageHeight
          const sourceHeight = Math.min(pageHeight, canvas.height - sourceY)

          // Crear canvas para esta página
          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = sourceHeight

          const ctx = pageCanvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              sourceY,
              canvas.width,
              sourceHeight,
              0,
              0,
              canvas.width,
              sourceHeight
            )

            const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95)
            const pageImgHeight = (sourceHeight * contentWidth) / canvas.width

            pdf.addImage(
              pageImgData,
              'JPEG',
              margin,
              margin,
              contentWidth,
              pageImgHeight
            )
          }
        }
      }

      return pdf
    } catch (error) {
      console.error('Error generando PDF avanzado:', error)
      return null
    }
  }

  return {
    generatePDF,
    generateAdvancedPDF,
    downloadPDF
  }
}
