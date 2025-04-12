import { Avatar, Badge, Button, Link, Skeleton, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import Rating from './Rating.jsx'
import { usePaginatedUserSkills } from '../api/skills/queries.js'
import { ClipLoader } from 'react-spinners'
import ErrorMessage from './ErrorMessage.jsx'
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { useSkillEndorsements } from '../api/endorsements/queries.js'
import { useAuth } from '../context/authContext.jsx'
import { useToggleEndorsement } from '../api/endorsements/mutations.js'

function SkillsTab({ userId }) {
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
  } = usePaginatedUserSkills({ userId, limit: 3, currentUser: user?._id })
  const hasData = !!data?.pages[0]?.totalDocs ?? false;

  return (
    <div className='space-y-6 '>
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
              userId={userId}
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
    </div >
  )
}

export default SkillsTab


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
  } = useSkillEndorsements({ skillId, limit: 3 })
  const hasData = !!data?.pages[0]?.totalDocs ?? false;
  const totalEndorsements = data?.pages[0]?.totalDocs
  const { isAuthenticated, user } = useAuth()
  const { mutate: toggle, isPending } = useToggleEndorsement({ userId });
  const [endorsed, setEndorsed] = useState(isEndorsedByMe);



  return (
    <div className='p-6 space-y-6 border border-t-8 border-t-[--accent-12] rounded-xl'>
      <div className='flex items-center justify-between'>
        <div>
          <Text as='p' className='flex items-center gap-4 text-2xl font-semibold capitalize'>
            {name} {verified && <Badge variant='surface' color="green">verified</Badge>}
          </Text>
          <Text as='p' color='gray'>
            <span className='capitalize' >
              {category}
            </span>
            {" "} • {yearsExperience || 0} years of experience
          </Text>
        </div>
        <span>
          <Rating rating={proficiencyLevel || 0} />
        </span>
      </div>
      <Text as='p'>
        {description || 'No description provided.'}
      </Text>
      {projectUrl && <Text as='p' className='flex items-center gap-2'>
        <GitHubLogoIcon /> <Link size={'2'} highContrast weight={'medium'} href={projectUrl} rel="noopener noreferrer" target='_blank' className='no-underline hover:underline'>View Project</Link> <ExternalLinkIcon />
      </Text>}
      <div className='flex items-center justify-between'>

        <Text as='p' className='font-medium'>
          <Skeleton loading={isLoading}>
            Endorsements ({totalEndorsements})
          </Skeleton>
        </Text>

        {isAuthenticated && (user?._id !== userId) && (
          <Skeleton loading={isLoading}>
            <Button
              onClick={() => toggle({ skillId, endorsedTo: userId }, {
                onSuccess: (res) => {
                  setEndorsed(prev => !prev);
                },
              })}
              highContrast={!endorsed}
              color={endorsed ? "gray" : "blue"}
              disabled={isPending}
            >
              {isPending ? "Processing..." : endorsed ? "Endorsed" : "Endorse"}
            </Button>
          </Skeleton>
        )}
      </div >
      <div className='space-y-3'>
        {isLoading ? (
          <div className='text-center'>
            <ClipLoader size={'22'} className='mx-auto' color='var(--accent-12)' />
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
    </div >
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

