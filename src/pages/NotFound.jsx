import { ArrowLeftIcon, ExclamationTriangleIcon, HomeIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import Logo from '../components/Logo'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center h-screen p-4 md:px-8'>
      <Logo color='var(--accent-11)' />
      <div className='flex flex-col max-w-sm gap-4 p-6 py-8 my-6 text-center border border-t-8 shadow-lg rounded-xl border-t-[--red-9] border-[--gray-a6] bg-[--color-panel-solid]'>
        <div className='p-5 mx-auto rounded-full w-max bg-[--red-a3]'>
          <ExclamationTriangleIcon color='var(--red-9)' height={'32'} width={'32'} />
        </div>
        <Text as='p' className='font-extrabold' size='6'>
          404 Page Not Found
        </Text>
        <Text as='p' color='gray'>
          The page you are looking for doesn't exist or has been moved to another location.
        </Text>
        <Flex justify={'center'} gap={'4'} wrap={'wrap'}>
          <Button
            asChild
          >
            <Link to={'/'}>
              <HomeIcon /> Return to Homepage
            </Link>
          </Button>
          <Button
            variant='surface'
            color='gray'
            highContrast
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />  Go Back
          </Button>
        </Flex>
        <Text
          as='div'
          color='gray'
          size={'2'}
          mt={'4'}
        >
          Looking for developer profiles? Try our {" "}
          <Text asChild as='span' color='blue' weight={'medium'} >
            <Link to={'/developers'}>
              developer directory
            </Link>
          </Text>
          .
        </Text>
      </div>
      <Text as='p' color='gray' size={'2'}>
        © 2025 DevPortfolio. All rights reserved.
      </Text>
    </div>
  )
}

export default NotFound
