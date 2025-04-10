import { Button, Text } from '@radix-ui/themes'
import React from 'react'
import { Link } from 'react-router'

function LoginButton({
  initial = "3",
  xs = "4"
}) {
  return (
    <Button
      variant='soft'
      size={{
        initial,
        xs
      }}
      highContrast
      asChild
      className='w-full sm:w-auto'
    >
      <Link
        to={'/auth'}
      >
        <Text as='span' className='text-[--gray-1]'>
          Log in
        </Text>
      </Link>
    </Button>
  )
}

export default LoginButton
