import type { ISkill } from '~/features/profile'

const SKILLS_LIST = ref([
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'TypeScript',
  'HTML',
  'CSS',
  'SQL',
  'Rust'
])

export const useSkill = () => {
  const skillsList = computed(() => SKILLS_LIST.value.sort())

  function toSkill(selectedSkills: string[]): ISkill[] {
    const skills = Array.isArray(selectedSkills)
      ? selectedSkills
      : [selectedSkills]

    return skills.map((skill) => ({
      id: skill,
      skill,
      job: '',
      yearsOfExperience: undefined
    }))
  }

  

  return {
    toSkill,
    skillsList
  }
}
