import type {
  yearsOfExperience,
  ISkill
} from '@lordcrainer/adaptcv-shared-types'
import { useBuilderStore } from '~/domains/builder/store/builder.store'

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

const DEFAULT_SKILL_ITEM: ISkill = {
  skill: undefined,
  yearsOfExperience: 'less1year'
}

const MAX_SKILLS = 10

export const useSkill = () => {
  const { updateSection, builderState } = useBuilderStore()
  const skills = computed(() => builderState.skills || [])

  const removeSkill = (index: number) => {
    const updated = skills.value.filter((_, i) => i !== index)
    updateSection('skills', updated)
  }

  const addSkill = (skill: ISkill) => {
    if (skills.value.length >= MAX_SKILLS) {
      return
    }
    const updated = [...skills.value, skill]
    updateSection('skills', updated)
  }

  const updateSkill = (index: number, skill: ISkill) => {
    const updated = skills.value.map((item, i) => (i === index ? skill : item))
    updateSection('skills', updated)
  }

  const upsertSkill = (data: ISkill) => {
    if (!data.skill) {
      return
    }
    const index = findIndexBySkill(data.skill)
    if (index !== -1) {
      updateSkill(index, data)
    } else {
      addSkill(data)
    }
  }

  const findIndexBySkill = (skill: string): number => {
    return skills.value.findIndex((item) => item.skill === skill)
  }

  const findSkill = (skill: string): ISkill | undefined => {
    return skills.value.find((item) => item.skill === skill)
  }

  return {
    upsertSkill,
    skills,
    SKILLS_LIST,
    EXPERIENCE_OPTIONS,
    removeSkill,
    findSkill,
    DEFAULT_SKILL_ITEM
  }
}
