import { Text } from '@radix-ui/themes'
import React from 'react'

function FeaturesCard({
  title,
  description,
  Icon
}) {
  return (
    <div className='bg-[--color-panel-solid] backdrop-blur rounded-lg shadow-lg p-6 md:max-w-96 hover:shadow-xl transition-shadow flex-1 border border-[--gray-a6]'>
      <div className='flex items-center gap-3'>
        <span className='rounded-md bg-[--accent-3] size-10 flex items-center justify-center'>
          {Icon && < Icon color={"var(--accent-12)"} height={'24'} width={'24'}/>}
        </span>
        <Text as='p' size={'5'} className='font-semibold'>
          {title}
        </Text>
      </div>
      <Text as='p' mt={'2'} color='gray'>
        {description}
      </Text>
    </div>
  )
}

export default FeaturesCard
