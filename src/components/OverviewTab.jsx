import { Skeleton, Text } from '@radix-ui/themes'
import React from 'react'
import Rating from './Rating'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useUserSkillsByCategory } from '../api/skills/queries'
import ErrorMessage from './ErrorMessage'
import { ClipLoader } from 'react-spinners'
import SkillsCard from './SkillsCard'

function OverviewTab({ userId, name, loadingProfile }) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserSkillsByCategory(userId)
  const hasSkills = data?.length > 0;

  return (
    <div className='md:p-6 p-4 border rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
      <Text as='p' className='text-2xl font-semibold'>
        Skills Overview
      </Text>
      <Text as='p' color='gray' mb={'6'} className='capitalize' size={'2'}>
        <Skeleton loading={loadingProfile}>
          {`${name}'s`} technical skills and endorsements
        </Skeleton>
      </Text>
      <div className='space-y-6'>
        {isLoading ? (
          <div className='text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasSkills ? (
          data.map(({ category, skills, _id }) => (
            <div key={_id}>
              <Text as='p' className='p-2 text-lg font-medium bg-[--gray-a3] rounded-md capitalize'>
                {category}
              </Text>
              <div className='grid grid-cols-1 gap-3 pt-3 md:grid-cols-2'>
                {skills.map(({ name, proficiencyLevel,
                  totalEndorsements
                  , verified, _id, yearsExperience, category }) => (
                  <SkillsCard
                    key={_id}
                    name={name}
                    proficiencyLevel={proficiencyLevel}
                    totalEndorsements={totalEndorsements}
                    verified={verified}
                    yearsExperience={yearsExperience}
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
    </div >
  )
}

export default OverviewTab

