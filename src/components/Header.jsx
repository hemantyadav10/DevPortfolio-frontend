import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { DropdownMenu, IconButton, Text } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import LoginButton from './LoginButton'
import Logo from './Logo'

function Header() {
  const [hasShadow, setHasShadow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`h-20 flex items-center justify-between p-6 md:px-12 bg-[--accent-12] sticky top-0 z-50 ${hasShadow ? 'shadow-xl' : ''
        }`}
    >
      <Logo />
      <div className='items-center hidden gap-6 font-medium md:flex'>
        <NavLink
          to={'/'}
          className={({ isActive }) => `${isActive ? "text-[--gray-1]" : "text-[--gray-6]"}`}
        >
          Home
        </NavLink>
        <NavLink
          to={'/developers'}
          className={({ isActive }) => `${isActive ? "text-[--gray-1]" : "text-[--gray-6]"}`}
        >
          Developers
        </NavLink>
      </div>
      <div className='items-center hidden gap-2 md:flex'>
        <LoginButton
          xs='3'
        />
        <Dropdowm />
      </div>
      <div className='flex md:hidden'>
        <IconButton
          variant='ghost'
          highContrast
          size={'3'}
        >
          <HamburgerMenuIcon color='white' height={20} width={20} />
        </IconButton>
      </div>
    </div>
  )
}

export default Header


function Dropdowm() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className='overflow-hidden rounded-full cursor-pointer size-10 aspect-square'>
          <img src="https://hiteshchoudhary.b-cdn.net/coding-hero-v2/ch-bronze.png" alt="" className='object-cover object-center w-full h-full' />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end' variant='soft' size={'2'} className='w-56'>
        <Text as='p' className='px-3'>
          Alex Davidson
        </Text>
        <Text as='p' size={'2'} className='px-3' color='gray'>
          alex@gmail.com
        </Text>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <Link to={'/profile/1'}>
            Profile
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link to={'/dashboard'}>
            Dashboard
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}