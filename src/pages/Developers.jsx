import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { MdOutlineGroups } from "react-icons/md";
import DeveloperCard from '../components/DeveloperCard';

function Developers() {
  return (
    <div className='flex flex-col'>
      <section className='bg-[--accent-a3]'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl gap-4 p-6 px-4 mx-auto md:px-8 md:py-8'>
          <div>
            <h1 className='text-2xl font-bold md:text-4xl'>
              Developer Directory
            </h1>
            <Text
              as='p'
              className='max-w-2xl mt-2 text-sm md:text-lg'
            >
              Discover talented developers with verified skills. Connect with professionals based on expertise and experience
            </Text>
          </div>
          <div className='flex items-center gap-2 p-2 px-4 text-sm font-medium bg-[--color-background] border rounded-lg shadow-md w-max md:text-base'>
            <MdOutlineGroups size={'24'} color='#113264' /> 5 developers
          </div>
        </div>
      </section>
      <section className='w-full max-w-screen-xl p-6 px-4 mx-auto md:px-8 md:py-8'>
        <div className='flex flex-col gap-4 p-4 border shadow-md md:p-8 sm:flex-row rounded-xl'>
          <TextField.Root className='sm:flex-1' size={'3'} placeholder="Search by name, title, or skill...">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Select.Root size={'3'}>
            <Select.Trigger placeholder="Filter by skill" />
            <Select.Content position="popper" variant='soft'>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="grape">
                Grape
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div className='col-span-1' key={idx}>
              <DeveloperCard />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Developers
