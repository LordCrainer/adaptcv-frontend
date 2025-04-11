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
  'Rust',
  'Node.js',
].sort())

const MAX_SKILLS = 10

export const useSkill = () => {
  const skills = ref<ISkill[]>([])

  const upsertSkill = (data: ISkill) => {
    if (skills.value.length >= MAX_SKILLS) {
      return
    }
    const index = skills.value.findIndex((item) => item.skill === data.skill)
    if (index !== -1) {
      skills.value.splice(index, 1, data)
    } else {
      skills.value.push(data)
    }
  }

  const removeSkill = (index: number) => {
    skills.value.splice(index, 1)
  }

  return {
    upsertSkill,
    skills,
    SKILLS_LIST,
    removeSkill
  }
}
