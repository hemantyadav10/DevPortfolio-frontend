import { Skeleton, Text } from '@radix-ui/themes'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import { useUserSkillsByCategory } from '../api/skills/queries'
import ErrorMessage from './ErrorMessage'
import SkillsCard from './SkillsCard'
import { useOutletContext } from 'react-router'

function OverviewTab() {
  const {userId, name, loadingProfile} = useOutletContext();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserSkillsByCategory(userId)
  const hasSkills = data?.length > 0;

  return (
    <div className=''>
      <Text as='p' className='text-2xl font-semibold'>
        Skills Overview
      </Text>
      <Text as='p' color='gray' mb={'6'} className='capitalize ' size={'2'}>
        <Skeleton loading={loadingProfile}>
          {`${name}'s`} technical skills and endorsements
        </Skeleton>
      </Text>
      <div className='space-y-6 md:p-6 p-4 border rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
        {isLoading ? (
          <div className='text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasSkills ? (
          data.map(({ category, skills, _id }, idx) => (
            <div key={idx}>
              <Text as='p' className='text-lg font-semibold capitalize rounded-md'>
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

