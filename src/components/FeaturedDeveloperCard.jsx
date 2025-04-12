import { Avatar, Skeleton, Text } from '@radix-ui/themes';
import React from 'react';
import { PiMedalLight } from "react-icons/pi";
import { Link } from 'react-router';

function FeaturedDeveloperCard({
  name,
  profilePictureUrl,
  title,
  skills,
  yearsOfExperience,
  totalEndorsementCount,
  loading,
  _id
}) {
  return (
    <div className='w-full p-4 border-t-8 shadow-md rounded-xl border-[--accent-12] flex flex-col gap-4 hover:shadow-lg transition-shadow h-full'>
      <div className='flex items-start gap-2'>
        <Skeleton loading={loading}>
          <Avatar
            src={profilePictureUrl}
            fallback={name?.charAt(0)?.toUpperCase()}
            className='object-cover object-center rounded-full size-10'
            highContrast
          />
        </Skeleton>
        <div className='w-full'>
          <Skeleton loading={loading} className='w-40 h-5'>
            <Text as='p' weight={'medium'} className='capitalize'>
              {name}
            </Text>
          </Skeleton>
          <Skeleton loading={loading} className='w-full h-4 mt-2'>
            <Text as='p' color='gray' className='text-sm font-medium'>
              {title || "Aspiring Developer"} • {yearsOfExperience || 0} years
            </Text>
          </Skeleton>
        </div>
      </div>
      <Text as='p' weight={'medium'} className='text-sm'>
        <Skeleton loading={loading}>
          Top Skills
        </Skeleton>
      </Text>
      <div className='flex flex-wrap gap-2'>
        {loading && (
          <>
            <Skeleton loading={loading} className='w-20 h-6 rounded-full' />
            <Skeleton loading={loading} className='w-20 h-6 rounded-full' />
            <Skeleton loading={loading} className='w-20 h-6 rounded-full' />
          </>
        )}
        {skills?.map(skill => (
          <div className='text-sm bg-[--accent-a3] py-[2px] px-3 rounded-full '>
            {skill.name}
          </div>
        ))}
      </div>
      <div>
        <Text as='p' color='gray' size={'2'} className='flex items-center gap-1'>
          <Skeleton loading={loading}>
            <PiMedalLight size={20} /> {totalEndorsementCount} skill endorsements
          </Skeleton>
        </Text>
      </div>
      <Skeleton loading={loading}>
        <Link to={`/profile/${_id}`} className='p-2 text-sm font-medium text-center border rounded-lg'>
          View Profile
        </Link>
      </Skeleton>

    </div>

  )
}

export default FeaturedDeveloperCard
