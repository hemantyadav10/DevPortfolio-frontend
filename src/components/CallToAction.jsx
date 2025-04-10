import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'

function CallToAction() {
  return (
    <Button
      size={{
        initial: "3",
        xs: "4"
      }}
      className='w-full group sm:w-auto'
    >
      Get Started <ArrowRightIcon height={20} width={20} className='transition-transform duration-300 group-hover:translate-x-1' />
    </Button>
  )
}

export default CallToAction
