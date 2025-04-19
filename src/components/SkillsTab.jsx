import { BarChartIcon, ExternalLinkIcon, GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Button, IconButton, Link, Popover, Skeleton, Text } from '@radix-ui/themes'
import React from 'react'
import { NavLink } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { useToggleEndorsement } from '../api/endorsements/mutations.js'
import { useSkillEndorsements } from '../api/endorsements/queries.js'
import { usePaginatedUserSkills } from '../api/skills/queries.js'
import { useAuth } from '../context/authContext.jsx'
import AddNewSkillButton from './AddNewSkillButton.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import Rating from './Rating.jsx'
import { toast } from 'sonner'

function SkillsTab({ userId }) {
  const { user } = useAuth()
  const skillLimit = 10;
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch
  } = usePaginatedUserSkills({ userId, limit: skillLimit, currentUser: user?._id })
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
              skillLimit={skillLimit}
            />
          ))
        ))
      ) : (
        <div className='flex items-center justify-center border rounded-lg h-72 border-[--gray-a6]'>
          <Text as='div' className='p-4 text-sm text-center '>
            <div className="p-3 mx-auto mb-2 bg-gray-100 rounded-full aspect-square w-max">
              <BarChartIcon className="text-blue-500" height={'18'} width={'18'} />
            </div>
            {user?._id === userId ? (
              <div className='flex flex-col items-center gap-6'>
                You haven't added any skills yet. Start by adding your first skill to showcase your expertise!
                <AddNewSkillButton />
              </div>
            ) : "No skills available at the moment. Visit again soon to see updates to their portfolio."}
          </Text>
        </div>
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
  isEndorsedByMe,
  skillLimit
}) {
  const limit = 5;
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch
  } = useSkillEndorsements({ skillId, limit })
  const hasData = !!data?.pages[0]?.totalDocs ?? false;
  const totalEndorsements = data?.pages[0]?.totalDocs
  const { isAuthenticated, user } = useAuth()

  const { mutate: toggle, isPending } = useToggleEndorsement({ skillId, limit, userId, isEndorsedByMe, currentUser: user, skillLimit });

  const handleToggle = async () => {
    toggle({ skillId, endorsedTo: userId }, {
      onSuccess: () => {
        const message = isEndorsedByMe ? "Endorsement removed" : "Endorsed successfully";
        toast.success(message);
      },
      onError: (error) => {
        const message = error?.response?.data?.message || "Action failed. Try again";
        toast.error(message);
      }
    })
  }

  return (
    <div className='md:p-6 p-4 space-y-4 border border-t-8 border-t-[--primary] rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div>
          <Text as='p' className='flex items-center text-xl font-semibold capitalize gap-x-4'>
            {name} {verified && <Badge variant='surface' color="green">verified</Badge>}
            {verified && <Popover.Root>
              <Popover.Trigger>
                <IconButton
                  variant='ghost'
                  color='gray'
                  radius={"full"}
                  size={'1'}
                >
                  <InfoCircledIcon />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content maxWidth={'300px'} className='py-0 pb-[2px] px-2 rounded border-0 ring-0 bg-[--gray-12] text-[--gray-1]' >
                <Text size={'1'} m={'0'}>
                  Verified means this skill has been endorsed by at least 3 other developers.
                </Text>
              </Popover.Content>
            </Popover.Root>}
          </Text>
          <Text as='p' color='gray' size={'2'}>
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
      <Text as='p' size={'2'}>
        {description || 'No description provided.'}
      </Text>
      {projectUrl && <Text as='p' className='flex items-center gap-2 '>
        <GitHubLogoIcon /> <Link size={'2'} highContrast weight={'medium'} href={projectUrl} rel="noopener noreferrer" target='_blank' className='no-underline hover:underline'>View Project</Link> <ExternalLinkIcon />
      </Text>}
      <div className='flex items-center justify-between'>

        <Text as='p' className='text-sm font-medium'>
          <Skeleton loading={isLoading}>
            Endorsements ({totalEndorsements})
          </Skeleton>
        </Text>

        {isAuthenticated && (user?._id !== userId) && (
          <Skeleton loading={isLoading}>
            <Button
              onClick={handleToggle}
              highContrast
              color={isEndorsedByMe ? "gray" : "blue"}
              disabled={isPending}
              variant='soft'
            >
              {isPending ? "Processing..." : isEndorsedByMe ? "Endorsed" : "Endorse"}
            </Button>
          </Skeleton>
        )}
      </div >
      <div className='space-y-2'>
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
                _id: userId
              },
              _id,
            }) => (
              <DevCard
                key={_id}
                createdAt={createdAt}
                name={name}
                profilePictureUrl={profilePictureUrl}
                _id={userId}
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
  _id
}) {
  return (
    <div className='flex gap-2 p-2 items-center border rounded-md border-[--gray-a6]'>
      <NavLink to={`/profile/${_id}`}>
        <Avatar
          src={profilePictureUrl}
          fallback={name?.charAt(0)?.toUpperCase()}
          className='object-cover object-center rounded-full size-8 aspect-square'
          highContrast
        />
      </NavLink>
      <div>
        <NavLink to={`/profile/${_id}`}>
          <Text as='p' className='text-sm font-medium capitalize hover:underline'>
            {name}
          </Text>
        </NavLink>
        <Text as='p' className='text-xs' color='gray'>
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

