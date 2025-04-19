import { Button, Text } from '@radix-ui/themes'
import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/authContext'

function LoginButton({
  initial = "3",
  xs = "4",
  className = ''
}) {
  const { isAuthenticated } = useAuth()

  return (
    <Button
      variant='soft'
      size={{
        initial,
        xs
      }}
      highContrast
      asChild
      hidden={isAuthenticated}
      className={`w-full sm:w-auto ${className}`}
    >
      <Link
        to={'/auth'}
      >
        <Text as='span' className='text-[--text]'>
          Log in
        </Text>
      </Link>
    </Button>
  )
}

export default LoginButton
