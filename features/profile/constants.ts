export const areasProfession = {
  Technology: [
    'Software Development',
    'Data Analysis',
    'Product Management',
    'UI/UX Design',
    'Digital Marketing'
  ],
  Finance: [
    'Investment Banking',
    'Financial Analysis',
    'Accounting',
    'Risk Management',
    'Insurance'
  ],
  Healthcare: [
    'Nursing',
    'Medical Research',
    'Healthcare Administration',
    'Pharmacy',
    'Public Health'
  ],
  Education: [
    'Teaching',
    'Educational Administration',
    'Curriculum Development',
    'Special Education',
    'Counseling'
  ],
  Marketing: [
    'Content Marketing',
    'Social Media Management',
    'SEO Specialist',
    'Brand Management',
    'Market Research'
  ]
}

export type AreasProfession = keyof typeof areasProfession
