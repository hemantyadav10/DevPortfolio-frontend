import { Text } from '@radix-ui/themes';
import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdStarOutline } from "react-icons/md";


function SampleDeveloperCard() {
  return (
    <div className='relative flex flex-col flex-1 gap-2 p-4 mr-6 bg-[--color-panel-solid] rounded-lg shadow-xl shadow-black/20'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-2'>
          <img
            src="https://hiteshchoudhary.b-cdn.net/coding-hero-v2/ch-bronze.png"
            alt=""
            className='object-cover object-center w-10 rounded-full aspect-square'
          />
          <div>
            <Text as='p' size={'4'} weight={'medium'}>
              John Doe
            </Text>
            <Text as='p' color='gray'>
              Full Stack Developer • 5 years
            </Text>
          </div>
        </div>
        <NavigationButtons />
      </div>
      <Text as='p' weight={'medium'} color='gray' size={'2'}>
        Top Skills
      </Text>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
        <Skills skill='React' endorsements={24} />
        <Skills skill='Node.js' endorsements={18} />
        <Skills skill='MongoDB' endorsements={15} />
        <Skills skill='Typescript' endorsements={35} />
      </div>

      <div className='absolute flex items-center gap-2 p-4 font-medium bg-[--color-panel-solid] border rounded-lg shadow-xl top-full -right-6 w-max -translate-y-2/3 shadow-black/20 border-[--gray-a6]'>
        <MdStarOutline size={24} color='gold' /> Skills verified by 42 peers
      </div>

    </div>
  )
}

export default SampleDeveloperCard


function NavigationButtons() {
  return (
    <div className='flex gap-1 w-max'>
      <div className='w-3 h-3 bg-red-500 rounded-full aspect-square' />
      <div className='w-3 h-3 bg-yellow-400 rounded-full aspect-square' />
      <div className='w-3 h-3 bg-green-500 rounded-full aspect-square' />
    </div>
  )
}

function Skills({
  skill = 'React',
  endorsements = 0
}) {
  return (
    <div className='flex items-center justify-between p-2 border rounded-md border-[--gray-a6]'>
      {skill}
      <span className='flex items-center gap-1'>
        {endorsements} <IoMdCheckmarkCircleOutline className='text-green-500' />
      </span>
    </div>
  )
}
