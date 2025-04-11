import { BackpackIcon } from '@radix-ui/react-icons'
import { Avatar, Separator, Text } from '@radix-ui/themes'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Link } from 'react-router'

function DeveloperCard({
  developer
}) {
  const name = developer?.name ?? '';
  const title = developer?.title || 'Aspiring Developer';
  const skills = developer?.skills ?? [];
  const experience = developer?.experience ?? 0;
  const profilePictureUrl = developer?.profilePictureUrl

  return (
    <div className='w-full p-4 border-t-8 shadow-md rounded-xl border-[--accent-12] flex flex-col gap-4 hover:shadow-lg transition-shadow h-full'>
      <div className='flex items-start gap-2'>
        <Avatar
          src={profilePictureUrl}
          fallback={name?.charAt(0)?.toUpperCase()}
          className='object-cover object-center rounded-full size-10'
          highContrast
        />
        <div className=''>
          <Text as='p' weight={'medium'} className='capitalize'>
            {name}
          </Text>
          <Text as='p' color='gray' className='text-sm font-medium'>
            {title}
          </Text>
        </div>
      </div>
      <Text as='p' weight={'medium'} className='text-sm '>
        TOP SKILLS
      </Text>
      <div className='grid grid-cols-1 gap-2 '>
        {skills.length > 0 ? (
          skills.map(({ name, totalEndorsements, _id }) => (
            <Skills
              key={_id}
              skill={name}
              endorsements={totalEndorsements}
            />
          ))
        ) : (
          <Text as='p' color='gray' className='text-sm'>
            No skills added yet.
          </Text>
        )}
      </div>
      <Separator size={'4'} className='mt-auto' />
      <div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
        <Text as='div' color='gray' className='flex items-center gap-2 '>
          <BackpackIcon /> {experience} years experience
        </Text>
        <Link
          className='group'
          to={`/profile/${developer?._id}`}
        >
          <Text as='span' color='blue' weight={'medium'} className='group-hover:underline'>
            View Profile
          </Text>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(DeveloperCard);


function Skills({
  skill = 'React',
  endorsements = 0
}) {
  return (
    <div className='flex items-center justify-between gap-2 capitalize rounded-md'>
      <Text as='p' className='line-clamp-1' title={skill}>
        {skill}
      </Text>
      <span className='flex items-center gap-1 capi'>
        {endorsements} <IoMdCheckmarkCircleOutline className='text-green-500' />
      </span>
    </div>
  )
}