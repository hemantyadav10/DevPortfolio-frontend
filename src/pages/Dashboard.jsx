import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'

function Dashboard() {
  const { pathname } = useLocation();

  return (
    <div className='max-w-screen-xl p-6 px-4 py-8 mx-auto md:px-8'>
      <div className='space-y-6'>
        <div className='flex flex-wrap justify-between'>
          <Text as='p' size={'6'} className='font-semibold'>
            Dashboard
          </Text>
          <Button
            highContrast
          >
            <PlusIcon height={'20'} width={'20'} /> Add Skill
          </Button>
        </div>
        <div>
          <div className='flex p-1 rounded-lg w-max bg-[--gray-3]'>
            <NavLink
              to={''}
              className={` py-2 px-3 rounded-md  ${pathname === "/dashboard" ? "bg-[--color-background] shadow-md" : "opacity-70"} font-medium text-sm`}
            >
              Overview
            </NavLink>
            <NavLink
              to={'skills'}
              className={({ isActive }) => ` py-2 px-3 rounded-md  ${isActive ? "bg-[--color-background] shadow-md" : "opacity-70"} font-medium text-sm`}
            >
              Skills
            </NavLink>
            <NavLink
              to={'endorsements'}
              className={({ isActive }) => ` py-2 px-3 rounded-md  ${isActive ? "bg-[--color-background] shadow-md" : "opacity-70"} font-medium text-sm`}
            >
              Endorsements
            </NavLink>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
