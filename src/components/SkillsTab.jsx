import { Button, Text } from '@radix-ui/themes'
import React from 'react'
import Rating from './Rating.jsx'

function SkillsTab() {
  return (
    <div className='space-y-6 '>
      {Array.from({ length: 5 }).map(() => (
        <SkillsCard />
      ))}
    </div>
  )
}

export default SkillsTab


function SkillsCard() {
  return (
    <div className='p-6 space-y-6 border border-t-8 border-t-[--accent-12] rounded-xl'>
      <div className='flex items-center justify-between'>
        <div>
          <Text as='p' className='text-2xl font-semibold'>
            React
          </Text>
          <Text as='p' color='gray' className='' >
            Frontend • 3 years of experience
          </Text>
        </div>
        <span>
          <Rating rating={2}/>
        </span>
      </div>
      <Text as='p'>
        Built multiple production applications using React, Redux, and related ecosystem tools.
      </Text>
      <div className='flex items-center justify-between'>
        <Text as='p' className='font-medium'>
          Endorsements (3)
        </Text>
        <Button
          highContrast
        >
          Endorse
        </Button>
      </div>
      <div className='space-y-3'>
        <DevCard />
        <DevCard />
        <DevCard />
      </div>
    </div>
  )
}

function DevCard() {
  return (
    <div className='flex gap-2 p-2 border rounded-md'>
      <div className='bg-gray-100 rounded-full size-10' />
      <div>
        <Text as='p' className='font-medium'>
          David Kim
        </Text>
        <Text as='p' className='text-sm' color='gray'>
          Endorsed on 3/15/2023
        </Text>
      </div>
    </div>
  )
}

