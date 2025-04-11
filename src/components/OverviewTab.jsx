import { Skeleton, Text } from '@radix-ui/themes'
import React from 'react'
import Rating from './Rating'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useUserSkillsByCategory } from '../api/skills/queries'
import ErrorMessage from './ErrorMessage'
import { ClipLoader } from 'react-spinners'

function OverviewTab({ userId, name, loadingProfile }) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserSkillsByCategory(userId)
  const hasSkills = data?.length > 0 ?? 0

  return (
    <div className='p-6 border rounded-xl'>
      <Text as='p' className='text-3xl font-semibold'>
        Skills Overview
      </Text>
      <Text as='p' color='gray' mb={'6'} className='capitalize'>
        <Skeleton loading={loadingProfile}>
          {`${name}'s`} technical skills and endorsements
        </Skeleton>
      </Text>
      <div className='space-y-10'>
        {isLoading ? (
          <div className='text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasSkills ? (
          data.map(({ category, skills, _id }) => (
            <div key={_id}>
              <Text as='p' className='p-2 text-xl font-medium bg-[--gray-a3] rounded-lg capitalize'>
                {category}
              </Text>
              <div className='grid grid-cols-1 gap-4 pt-6 md:grid-cols-2'>
                {skills.map(({ name, proficiencyLevel,
                  totalEndorsements
                  , verified, _id, yearsExperience }) => (
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

function SkillsCard({
  name,
  proficiencyLevel,
  totalEndorsements,
  verified,
  yearsExperience
}) {
  return (
    <div className='flex flex-wrap items-center justify-between col-span-1 p-4 border rounded-xl gap-x-4'>
      <div>
        <Text as='p' className='text-lg font-medium capitalize'>
          {name}
        </Text>
        <Text as='p' color='gray' size={'2'}>
          {yearsExperience} years of experience
        </Text>
      </div>
      <div className='flex items-center gap-2'>
        <Rating rating={proficiencyLevel} />
        <span className='flex items-center gap-1'>
          <IoMdCheckmarkCircleOutline className='text-green-500 size-5' />
          {totalEndorsements}
        </span>
      </div>
    </div>
  )
}
