import { Text } from '@radix-ui/themes'
import React from 'react'
import { useAuth } from '../context/authContext'
import { useUserSkillsByCategory } from '../api/skills/queries'
import ErrorMessage from '../components/ErrorMessage'
import { ClipLoader } from 'react-spinners'
import SkillsCard from '../components/SkillsCard'

function Skills() {
  const { user } = useAuth()
  const {
    data,
    isFetching,
    isError,
    error,
    refetch,
  } = useUserSkillsByCategory(user?._id)
  const hasSkills = data?.length > 0;

  return (
    <div>
      <Text as='p' className='text-xl font-semibold'>
        Your Skills
      </Text>
      <Text as='p' size={'2'} color='gray' mb={'6'} className='capitalize'>
        Manage and update your technical skills
      </Text>
      <div className='space-y-6 md:p-6 p-4 border shadow-lg rounded-lg bg-[--color-panel-solid] border-[--gray-a6]'>
        {isFetching ? (
          <div className='text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasSkills ? (
          data.map(({ category, skills, _id }) => (
            <div key={_id}>
              <Text as='p' className='text-xl font-semibold capitalize rounded-md'>
                {category}
              </Text>
              <div className='grid gap-4 pt-4 sm:grid-cols-2'>
                {skills.map(({
                  name,
                  proficiencyLevel,
                  totalEndorsements,
                  verified,
                  _id,
                  yearsExperience,
                  category,
                  description,
                  projectUrl
                }) => (
                  < SkillsCard
                    key={_id}
                    name={name}
                    proficiencyLevel={proficiencyLevel}
                    totalEndorsements={totalEndorsements}
                    verified={verified}
                    yearsExperience={yearsExperience}
                    showEditButton
                    category={category}
                    description={description}
                    projectUrl={projectUrl}
                    _id={_id}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <Text as='p' className='text-sm' color='gray' weight={'medium'}>
            No skills added yet.
          </Text>
        )}
      </div>

    </div>
  )
}

export default Skills
