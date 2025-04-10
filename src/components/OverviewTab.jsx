import { Text } from '@radix-ui/themes'
import React from 'react'
import Rating from './Rating'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

function OverviewTab() {
  return (
    <div className='p-6 border rounded-xl'>
      <Text as='p' className='text-3xl font-semibold'>
        Skills Overview
      </Text>
      <Text as='p' color='gray'  mb={'6'}>
        Sarah Chen's technical skills and endorsements
      </Text>
      <div className='space-y-10'>
        <div>
          <Text as='p' className='p-2 text-xl font-medium bg-[--gray-a3] rounded-lg'>
            Frontend
          </Text>
          <div className='grid grid-cols-1 gap-4 pt-6 md:grid-cols-2'>
            <SkillsCard />
          </div>
        </div>
        <div>
        <Text as='p' className='p-2 text-xl font-medium bg-[--gray-a3] rounded-lg'>
        Backend
          </Text>
          <div className='grid grid-cols-1 gap-4 pt-6 md:grid-cols-2'>
            <SkillsCard />
            <SkillsCard />
          </div>
        </div>
        <div>
        <Text as='p' className='p-2 text-xl font-medium bg-[--gray-a3] rounded-lg'>
        Database
          </Text>
          <div className='grid grid-cols-1 gap-4 pt-6 md:grid-cols-2'>
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
          </div>
        </div>
        <div>
        <Text as='p' className='p-2 text-xl font-medium bg-[--gray-a3] rounded-lg'>
        DevOps
          </Text>
          <div className='grid grid-cols-1 gap-4 pt-6 md:grid-cols-2'>
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab

function SkillsCard() {
  return (
    <div className='flex flex-wrap items-center justify-between col-span-1 p-4 border rounded-xl gap-x-4'>
      <div>
        <Text as='p' className='text-lg font-medium'>
          React
        </Text>
        <Text as='p' color='gray' size={'2'}>
          3 years of experience
        </Text>
      </div>
      <div className='flex items-center gap-2'>
        <Rating rating={4} />
        <span className='flex items-center gap-1'>
          <IoMdCheckmarkCircleOutline className='text-green-500 size-5' />
          3
        </span>
      </div>
    </div>
  )
}
