export const useFormatDate = () => {
  function addYearToDate(date: Date | string, years = 1): string {
    const res = new Date(date)
    res.setFullYear(res.getFullYear() + years)

    return res.toString()
  }
  function standardDate(date: Date | string): string {
    if (!date) {
      return ''
    }
    const formattedDate = new Date(date).toLocaleDateString('es-EC', {
      month: 'short',
      year: 'numeric'
    })

    const [month, year] = formattedDate.split(' ')
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1)

    return `${formattedMonth} ${year}`
  }

  function standardFormatDate(date: Date | string): string {
    if (!date) {
      return ''
    }
    const formattedDate = new Date(date).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    const [day, month, year] = formattedDate.split('/')
    return `${year}-${month}-${day}`
  }

  const formatDate = (date: Date | string | number, format: string) => {
    if (!date) {
      return ''
    }
    const d = new Date(date)
    const pad = (p: number) => p.toString().padStart(2, '0')
    const capitalize = (p: string) => p.charAt(0).toUpperCase() + p.slice(1)

    const formatOptions: { [key: string]: string } = {
      YYYY: d.getFullYear().toString(),
      MM: pad(d.getMonth() + 1),
      MMMM: capitalize(d.toLocaleString('es-EC', { month: 'long' })),
      DD: pad(d.getDate()),
      hh: pad(d.getHours()),
      mm: pad(d.getMinutes()),
    }

    return format.replace(/YYYY|MMMM|YY|MM|DD|hh|mm/g, (m) => formatOptions[m] || m)
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

  const allowedDates = (currentDate: unknown, startDate: Date | string) =>
    currentDate instanceof Date && currentDate >= new Date(startDate)

  return {
    standardDate,
    formatDateRange,
    formatDate,
    addYearToDate,
    standardFormatDate,
    allowedDates
  }
}
