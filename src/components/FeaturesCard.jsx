import { Text } from '@radix-ui/themes'
import React from 'react'

function FeaturesCard({
  title,
  description,
  Icon
}) {
  return (
    <div className='bg-[--color-background] rounded-lg shadow-lg p-6   md:max-w-96 hover:shadow-xl transition-shadow flex-1'>
      <div className='flex items-center gap-2 text-[--accent-12]'>
        {Icon && < Icon size={48} />}
        <Text as='p' size={'5'} weight={'bold'}>
          {title}
        </Text>
      </div>
      <Text as='p' mt={'2'}>
        {description}
      </Text>
    </div>
  )
}

export default FeaturesCard
