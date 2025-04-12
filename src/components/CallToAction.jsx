import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/authContext'

function CallToAction() {
  const { isAuthenticated, user } = useAuth()
  return (
    <Button
      size={{
        initial: "3",
        xs: "4"
      }}
      className='w-full group sm:w-auto'
      asChild
    >
      <Link to={`${isAuthenticated ? `/profile/${user?._id}` : "/auth"}`}>
        Get Started <ArrowRightIcon height={20} width={20} className='transition-transform duration-300 group-hover:translate-x-1' />
      </Link>
    </Button>
  )
}

export default CallToAction
