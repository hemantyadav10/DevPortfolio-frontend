import { Cross1Icon, DashboardIcon, ExitIcon, GearIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, IconButton, Text } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import LoginButton from './LoginButton'
import Logo from './Logo'
import { useAuth } from '../context/authContext'

function Header() {
  const [hasShadow, setHasShadow] = useState(false)
  const { handleLogout, isAuthenticated, user, isLoading } = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <div
        className={`h-20 flex items-center justify-between p-6 md:px-12 bg-[--accent-12] sticky top-0 z-50 ${hasShadow ? 'shadow-xl' : ''
          } `}
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
          {isAuthenticated ? (
            <Dropdowm />
          ) : (
            <LoginButton
              xs='3'
            />
          )}
        </div>
        <div className='flex items-center gap-4 md:hidden'>
          {isAuthenticated && <Dropdowm />}
          <IconButton
            variant='ghost'
            highContrast
            size={'3'}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Cross1Icon color='white' height={20} width={20} />
            ) : (
              <HamburgerMenuIcon color='white' height={20} width={20} />
            )}
          </IconButton>
        </div>
      </div >
      {open && (
        <div className='bg-[--accent-12] pb-4 px-4 shadow-lg sticky top-20 z-50 md:hidden'>
          <div className='flex flex-col'>
            <NavLink
              to={'/'}
              className={({ isActive }) => `${isActive ? "text-[--gray-1] bg-[--accent-a4] " : "text-[--gray-6] hover:bg-[--accent-a3]"} px-6 py-2 rounded-md`}
            >
              Home
            </NavLink>
            <NavLink
              to={'/developers'}
              className={({ isActive }) => `${isActive ? "text-[--gray-1] bg-[--accent-a4] " : "text-[--gray-6] hover:bg-[--accent-a3]"} px-6 py-2 rounded-md`}
            >
              Developers
            </NavLink>
            {!isAuthenticated && (
              <div className='mt-8'>
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header


function Dropdowm() {
  const { user, handleLogout, isLoading } = useAuth();

  const logout = async (e) => {
    e.preventDefault();
    await handleLogout();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size={'3'} radius='full' variant='soft'>
          <Avatar
            src={user?.profilePictureUrl}
            fallback={user?.name?.charAt(0)?.toUpperCase()}
            className='object-cover object-center w-full h-full p-[2px] rounded-full'
            variant='solid'
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end' variant='soft' size={'2'} className='w-56'>
        <Text as='p' className='px-3 capitalize' >
          {user?.name}
        </Text>
        <Text as='p' size={'2'} className='px-3' color='gray'>
          {user?.email}
        </Text>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <Link to={`/profile/${user?._id}`}>
            <PersonIcon />  Profile
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link to={'/dashboard'}>
           <DashboardIcon /> Dashboard
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link to={'/settings'}>
           <GearIcon /> Settings
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled={isLoading} onClick={logout}>
         <ExitIcon /> {isLoading ? "Logging out..." : "Log out"}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}