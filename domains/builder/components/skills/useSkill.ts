import type {
  yearsOfExperience,
  ISkill
} from '@lordcrainer/adaptcv-shared-types'
import { useCVStore } from '~/domains/builder/store/cv.store'

const SKILLS_LIST = ref(
  [
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
    'Node.js'
  ].sort()
)

const EXPERIENCE_OPTIONS: yearsOfExperience[] = [
  'less1year',
  '1to2years',
  '2to3years',
  '5to10years',
  '10plusyears'
]

const MAX_SKILLS = 10

export const useSkill = () => {
  const { updateSection, curriculumVitae } = useCVStore()
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
    updateSection('skills', skills.value)
  }

  const removeSkill = (index: number) => {
    skills.value.splice(index, 1)
    updateSection('skills', skills.value)
  }

  const setSkills = (data: ISkill[]) => {
    skills.value = data
  }

  onMounted(() => {
    if (curriculumVitae.skills) {
      setSkills(curriculumVitae.skills)
    }
  })

  return {
    upsertSkill,
    skills,
    SKILLS_LIST,
    EXPERIENCE_OPTIONS,
    removeSkill
  }
}
