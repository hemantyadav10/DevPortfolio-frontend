import { Button, Text } from '@radix-ui/themes'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/authContext'
import { GearIcon, PersonIcon } from '@radix-ui/react-icons';

function Settings() {
  const { user } = useAuth();
  const { pathname } = useLocation()


  return (
    <div className='max-w-screen-xl px-4 py-6 mx-auto space-y-6 md:px-8'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <Text as='p' size={'6'} weight={'medium'}>
          Settings
        </Text>
        <Button
          highContrast
          asChild
        >
          <NavLink
            to={`/profile/${user?._id}`}
          >
            Go to your personal profile
          </NavLink>
        </Button>
      </div>
      <div className='flex flex-col gap-6 md:gap-12 md:flex-row'>
        <div className='flex flex-col flex-1 w-full md:max-w-72'>
          <NavLink
            to={'profile'}
            className={`${(pathname === "/settings" || pathname === "/settings/profile") ? "bg-[--gray-a3] border-[--focus-8] font-medium" : " hover:bg-[--gray-a2] border-transparent"} px-3 py-2 rounded-r-md border-l-4 text-sm flex items-center gap-2`}>
            <PersonIcon height={'18'} width={'18'}/> Public Profile
          </NavLink>
          <NavLink
            to={'account'}
            className={({ isActive }) => `${isActive ? "bg-[--gray-a3] border-[--focus-8] font-medium" : " hover:bg-[--gray-a2] border-transparent"} px-3 py-2 rounded-r-md border-l-4 text-sm flex items-center gap-2`}>
            <GearIcon height={'18'} width={'18'}/> Account
          </NavLink>
        </div>
        <div className='flex-1 w-full md:w-max'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Settings
