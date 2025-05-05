export const useFormatDate = () => {
  function addYearToDate(date: Date | string, years = 1): string {
    const res = new Date(date)
    res.setFullYear(res.getFullYear() + years)

    return res.toString()
  }
  function standardDate(date: Date | string): string {
    const fechaFormateada = new Date(date).toLocaleDateString('es-EC', {
      month: 'short',
      year: 'numeric'
    })

    const [month, year] = fechaFormateada.split(' ')
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1)

    return `${formattedMonth} ${year}`
  }

  function standardFormatDate(date: Date | string): string {
    const fechaFormateada = new Date(date).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const [day, month, year] = fechaFormateada.split('/')
    return `${year}-${month}-${day}`
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

  return { standardDate, formatDateRange, addYearToDate, standardFormatDate }
}
