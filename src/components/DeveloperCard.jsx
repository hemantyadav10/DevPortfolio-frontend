import { BackpackIcon } from '@radix-ui/react-icons'
import { Separator, Text } from '@radix-ui/themes'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Link } from 'react-router'

function DeveloperCard() {
  return (
    <div className='w-full p-4 border-t-8 shadow-md rounded-xl border-[--accent-12] flex flex-col gap-4 hover:shadow-lg transition-shadow'>
      <div className='flex items-start gap-2'>
        <img
          src="https://hiteshchoudhary.b-cdn.net/coding-hero-v2/ch-bronze.png"
          alt=""
          className='object-cover object-center rounded-full size-10'
        />
        <div className=''>
          <Text as='p' weight={'medium'} className=''>
            Sarah Chen
          </Text>
          <Text as='p' color='gray' className='text-sm font-medium'>
            Full stack Developer
          </Text>
        </div>
      </div>
      <Text as='p' weight={'medium'} className='text-sm '>
        TOP SKILLS
      </Text>
      <div className='grid grid-cols-1 gap-2 '>
        <Skills skill='React' endorsements={24} />
        <Skills skill='Node.js' endorsements={18} />
        <Skills skill='MongoDB' endorsements={15} />
      </div>
      <Separator size={'4'} />
      <div className='flex items-center justify-between text-sm'>
        <Text as='div' color='gray' className='flex items-center gap-2 '>
          <BackpackIcon /> 5 years experience
        </Text>
        <Link className='group' to={'/profile/1'}>
          <Text as='span' color='blue' weight={'medium'} className='group-hover:underline'>
            View Profile
          </Text>
        </Link>
      </div>
    </div>
  )
}

export default DeveloperCard


function Skills({
  skill = 'React',
  endorsements = 0
}) {
  return (
    <div className='flex items-center justify-between rounded-md'>
      {skill}
      <span className='flex items-center gap-1'>
        {endorsements} <IoMdCheckmarkCircleOutline className='text-green-500' />
      </span>
    </div>
  )
}