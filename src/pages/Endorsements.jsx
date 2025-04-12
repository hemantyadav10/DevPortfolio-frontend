import { Avatar, Badge, Button, Skeleton, Text } from '@radix-ui/themes'
import React from 'react'
import { useAuth } from '../context/authContext'
import { usePaginatedUserSkills } from '../api/skills/queries'
import { ClipLoader } from 'react-spinners'
import { useSkillEndorsements } from '../api/endorsements/queries'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import ErrorMessage from '../components/ErrorMessage'

function Endorsements() {
  const { user } = useAuth()
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch
  } = usePaginatedUserSkills({ userId: user?._id, limit: 10, currentUser: user?._id })
  const hasData = !!data?.pages[0]?.totalDocs;


  return (
    <div className='p-6 border shadow-lg rounded-xl'>
      <Text as='p' className='text-2xl font-medium'>
        Skill Endorsements
      </Text>
      <Text as='p' size={'2'} color='gray' mb={'6'} className='capitalize'>
        See who has endorsed your skills
      </Text>
      <div className="space-y-8">
        {isLoading ? (
          <div className='text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasData ? (
          data?.pages.map((page, idx) => (
            page.docs.map(({
              name,
              category,
              proficiencyLevel,
              description,
              projectUrl,
              verified,
              yearsExperience,
              _id,
              isEndorsedByMe
            }) => (
              <SkillsCard
                key={_id}
                skillId={_id}
                name={name}
                category={category}
                proficiencyLevel={proficiencyLevel}
                description={description}
                projectUrl={projectUrl}
                verified={verified}
                yearsExperience={yearsExperience}
                userId={user?._id}
                isEndorsedByMe={isEndorsedByMe}
              />
            ))
          ))
        ) : (
          <Text as='p' className='text-sm' color='gray' weight={'medium'}>
            No skills added yet.
          </Text>
        )}
        {isFetchingNextPage && (
          <div className='text-center'>
            <ClipLoader size={'22'} className='mx-auto' color='var(--accent-12)' />
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div className='text-center'>
            <Button
              onClick={() => fetchNextPage()}
              variant='ghost'
              highContrast
              size={'3'}
              className='font-medium'
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Endorsements

function SkillsCard({
  name,
  category,
  proficiencyLevel,
  description,
  projectUrl,
  verified,
  yearsExperience,
  skillId,
  userId,
  isEndorsedByMe
}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch
  } = useSkillEndorsements({ skillId, limit: 5 })
  const hasData = !!data?.pages[0]?.totalDocs ?? false;
  const totalEndorsements = data?.pages[0]?.totalDocs
  const { isAuthenticated, user } = useAuth()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Text as='p' className='flex items-center gap-4 text-lg font-medium capitalize'>
          {name} {verified && <Badge variant='surface' color="green">verified</Badge>}
        </Text>
        <Skeleton loading={isLoading}>
          <div className='flex items-center gap-1 text-sm'>
            <IoMdCheckmarkCircleOutline className='text-green-500 size-5' /> {totalEndorsements} endorsements
          </div>
        </Skeleton>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        {isLoading ? (
          <div className='col-span-1 text-center md:col-span-3'>
            <ClipLoader className='mx-auto' size={'28'} color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : hasData ? (
          data?.pages.map((page, idx) => (
            page.docs.map(({
              createdAt,
              endorsedBy: {
                name,
                profilePictureUrl,
              },
              _id,
            }) => (
              <DevCard
                key={_id}
                createdAt={createdAt}
                name={name}
                profilePictureUrl={profilePictureUrl}
              />
            ))
          ))
        ) : (
          <Text as='p' className='text-sm' color='gray' weight={'medium'}>
            No endorsements yet.
          </Text>
        )}
      </div>
      <div>
        {isFetchingNextPage && (
          <ClipLoader className='mx-auto' size={22} color='var(--accent-12)' />
        )}
        {hasNextPage && !isFetchingNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            variant='ghost'
            highContrast
            className='font-medium'
          >
            Show more
          </Button>
        )}
      </div>
    </div>
  )
}


function DevCard({
  createdAt,
  name,
  profilePictureUrl,
}) {
  return (
    <div className='flex gap-2 p-2 border rounded-md'>
      <Avatar
        src={profilePictureUrl}
        fallback={name?.charAt(0)?.toUpperCase()}
        className='object-cover object-center rounded-full size-10 aspect-square'
        highContrast
      />
      <div>
        <Text as='p' className='font-medium capitalize'>
          {name}
        </Text>
        <Text as='p' className='text-sm' color='gray'>
          Endorsed on {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </div>
    </div>
  )
}