import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Button, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Link } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { useSkillEndorsements } from '../api/endorsements/queries'
import { usePaginatedUserSkills } from '../api/skills/queries'
import ErrorMessage from '../components/ErrorMessage'
import { useAuth } from '../context/authContext'

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
    <div className='md:p-6 p-4 border border-[--gray-a6] shadow-lg rounded-lg bg-[--color-panel-solid]'>
      <Text as='p' className='text-xl font-semibold'>
        Skill Endorsements
      </Text>
      <Text as='p' size={'2'} color='gray' mb={'6'} className='capitalize'>
        See who has endorsed your skills
      </Text>
      <div className="space-y-6">
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
              isEndorsedByMe,
              totalEndorsements
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
                totalEndorsements={totalEndorsements}
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
  isEndorsedByMe,
  totalEndorsements
}) {
  const [showEndorsementList, setShowEndorsementList] = useState(false)
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch
  } = useSkillEndorsements({ skillId, limit: 5 }, showEndorsementList)
  const hasData = !!data?.pages[0]?.totalDocs ?? false;
  const { isAuthenticated, user } = useAuth()

  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Text as='p' className='flex items-center gap-4 font-medium capitalize'>
          {name} {verified && <Badge variant='surface' color="green">verified</Badge>}
        </Text>
        <Button
          variant='ghost'
          size={'1'}
          onClick={() => setShowEndorsementList(!showEndorsementList)}
          color='gray'
          highContrast
        >
          <IoMdCheckmarkCircleOutline className='text-green-500 size-4' /> {totalEndorsements} endorsements
          {showEndorsementList ? <ChevronUpIcon height={'18'} width={'18'} /> : <ChevronDownIcon height={'18'} width={'18'} />}
        </Button>
      </div>
      {showEndorsementList && (
        <>
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
                    _id: endorsedById
                  },
                  _id,
                }) => (
                  <DevCard
                    key={_id}
                    createdAt={createdAt}
                    name={name}
                    profilePictureUrl={profilePictureUrl}
                    endorsedById={endorsedById}
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
        </>
      )}
    </div>
  )
}


function DevCard({
  createdAt,
  name,
  profilePictureUrl,
  endorsedById
}) {
  return (
    <Link
      to={`/profile/${endorsedById}`}
      className='flex gap-2 p-2 border rounded-md items-center border-[--gray-a6]'>
      <Avatar
        src={profilePictureUrl}
        fallback={name?.charAt(0)?.toUpperCase()}
        className='object-cover object-center rounded-full size-8 aspect-square'
        highContrast
      />
      <div>
        <Text as='p' className='text-sm font-medium capitalize'>
          {name}
        </Text>
        <Text as='p' className='text-xs' color='gray'>
          Endorsed on {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </div>
    </Link>
  )
}