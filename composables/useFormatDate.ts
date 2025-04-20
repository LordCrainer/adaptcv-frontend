export const useFormatDate = () => {
  function standardDate(date: Date | string): string {
    const fechaFormateada = new Date(date).toLocaleDateString('es-EC', {
      month: 'short',
      year: 'numeric'
    })

    const [month, year] = fechaFormateada.split(' ')
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1)

    return `${formattedMonth} ${year}`
  }

  function formatDateRange(
    {
      startDate,
      endDate
    }: { startDate: Date | string; endDate: Date | string },
    fn?: (date: Date | string) => string
  ): string {
    if (fn === undefined) {
      fn = standardDate
    }
    return `${fn(startDate)} - ${fn(endDate)}`
  }

  return { standardDate, formatDateRange }
}
