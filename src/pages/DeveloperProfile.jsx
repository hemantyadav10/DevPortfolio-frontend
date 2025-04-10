import { ArrowLeftIcon, CopyIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { Badge, Button, Code, DataList, Flex, IconButton, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Link } from 'react-router'
import OverviewTab from '../components/OverviewTab'
import SkillsTab from '../components/SkillsTab'

function DeveloperProfile() {
  const [isOverviewTab, setIsOverviewTab] = useState(true)

  return (
    <div className='w-full max-w-screen-xl p-6 px-4 mx-auto md:px-8'>
      <div className=''>
        <Button
          variant='ghost'
          highContrast
          color='gray'
          className='w-max'
          asChild
        >
          <Link
            to={"/developers"}
          >
            <ArrowLeftIcon
            />  Back to developers
          </Link>
        </Button>
      </div>
      <div className='flex items-center justify-between my-6'>
        <Text as='p' className='text-3xl font-bold'>
          My Profile
        </Text>
        <Button
          highContrast
          asChild
        >
          <Link to={'/profile/edit'}>
            <Pencil2Icon height={20} width={20} /> Edit Profile
          </Link>
        </Button>
      </div>
      <div className='flex flex-col gap-6 mx-auto lg:flex-row'>
        <section className='lg:flex-1 lg:max-w-96'>

          <div className='space-y-6'>
            <div className='overflow-hidden border rounded-xl'>
              <div className='h-28 bg-[--accent-12] relative'>
                <div className='absolute -translate-y-1/2 bg-[--gray-3] border-4 border-[--color-background] rounded-full size-24 top-full left-6' />
              </div>
              <div className='p-6 mt-8'>
                <Text as='p' className='text-2xl font-semibold'>
                  Sarah Chen
                </Text>
                <Text as='p' color='gray' weight={'medium'}>
                  Full Stack Developer • 5 years
                </Text>
              </div>
            </div>
            <div className='p-6 space-y-4 border rounded-xl'>
              <Text as='p' className='text-2xl font-semibold'>
                About
              </Text>
              <Text as='p' className=''>
                Passionate full stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.
              </Text>
            </div>
            <div className='p-6 space-y-4 border rounded-xl'>
              <Text as='p' className='text-2xl font-semibold'>
                Contact
              </Text>
              <DataList.Root>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Status</DataList.Label>
                  <DataList.Value>
                    <Badge color="jade" variant="soft" radius="full">
                      Authorized
                    </Badge>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px">ID</DataList.Label>
                  <DataList.Value>
                    <Flex align="center" gap="2">
                      <Code variant="ghost">u_2J89JSA4GJ</Code>
                      <IconButton
                        size="1"
                        aria-label="Copy value"
                        color="gray"
                        variant="ghost"
                      >
                        <CopyIcon />
                      </IconButton>
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px">Name</DataList.Label>
                  <DataList.Value>Vlad Moroz</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px">Email</DataList.Label>
                  <DataList.Value>
                    <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px">Company</DataList.Label>
                  <DataList.Value>
                    <Link target="_blank" href="https://workos.com">
                      WorkOS
                    </Link>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </div>
          </div>
        </section>
        <section className='lg:flex-1'>
          <div className='relative flex font-medium bg-[--gray-3] border-4 border-[--gray-3] rounded-lg w-max '>
            <div className={`absolute w-1/2 bg-[--color-background] rounded-md top-0 h-full ${isOverviewTab ? "" : "translate-x-full"} transition-transform duration-300 shadow`} />
            <button
              className={` bg-transparent z-10 p-1 ${isOverviewTab ? "" : "opacity-70"} transition-opacity duration-300 w-28`}
              onClick={() => setIsOverviewTab(true)}
            >
              Overview
            </button>
            <button
              className={`bg-transparent z-10 p-1 ${isOverviewTab ? "opacity-70" : ""} transition-opacity duration-300 w-28`}
              onClick={() => setIsOverviewTab(false)}
            >
              Skills
            </button>
          </div>
          <div className='py-6'>
            {isOverviewTab ? <OverviewTab /> : <SkillsTab />}
          </div>
        </section>
      </div>

    </div>
  )
}

export default DeveloperProfile
