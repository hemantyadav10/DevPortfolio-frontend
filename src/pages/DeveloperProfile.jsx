import { ArrowLeftIcon, CopyIcon, EnvelopeClosedIcon, ExternalLinkIcon, GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon, Pencil2Icon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Button, Code, DataList, Flex, IconButton, Skeleton, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import OverviewTab from '../components/OverviewTab'
import SkillsTab from '../components/SkillsTab'
import { useDeveloperProfile } from '../api/developers/queries'

function DeveloperProfile() {
  const [isOverviewTab, setIsOverviewTab] = useState(true)
  const { userId } = useParams()
  const { data: developer, isLoading, isError, error, refetch } = useDeveloperProfile(userId);

  const {
    name = '',
    username = '',
    email = '',
    title = '',
    bio = '',
    profilePictureUrl = '',
    yearsOfExperience = 0,
  } = developer ?? {};


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
                <div className='absolute -translate-y-1/2 bg-[--gray-1] border-4 border-[--color-background] rounded-full size-24 top-full left-6' >
                  <Skeleton loading={isLoading}>
                    <Avatar
                      size={'8'}
                      src={profilePictureUrl}
                      fallback={name?.charAt(0)?.toUpperCase()}
                      className='object-cover object-center w-full h-full rounded-full'
                      highContrast
                    />
                  </Skeleton>
                </div>
              </div>
              <div className='p-6 mt-8'>
                <Skeleton className='max-w-72' loading={isLoading}>
                  <Text as='p' className='flex items-baseline gap-2 text-2xl font-semibold '>
                    <span className='capitalize'>{name}</span>
                    <Text as='span' color='gray' size={'3'} weight={'medium'}>• {username}</Text>
                  </Text>
                </Skeleton>
                <Skeleton className='mt-2 max-w-60' loading={isLoading}>
                  <Text as='p' color='gray' weight={'medium'}>
                    {title || 'Aspiring Developer'} • {yearsOfExperience ?? 0} years
                  </Text>
                </Skeleton>
              </div>
            </div>
            <div className='p-6 space-y-4 border rounded-xl'>
              <Text as='p' className='text-2xl font-semibold'>
                About
              </Text>
              {isLoading && <div className='space-y-2'>
                <Skeleton className='w-full h-5' />
                <Skeleton className='w-3/4 h-5' />
                <Skeleton className='w-5/6 h-5' />
              </div>}
              {!isLoading && (
                bio ? (
                  <Text as='p' className=''>
                    {bio}
                  </Text>
                ) : (
                  <Text as='p' className='text-sm' color='gray' weight={'medium'}>
                    No bio added yet.
                  </Text>
                )
              )
              }
            </div>
            <div className='p-6 space-y-4 border rounded-xl'>
              <Text as='p' className='text-2xl font-semibold'>
                Contact
              </Text>
              {isLoading ? (
                <div className='space-y-3'>
                  <Skeleton className='h-5 max-w-72' />
                  <Skeleton className='h-5 max-w-72' />
                  <Skeleton className='h-5 max-w-72' />
                  <Skeleton className='h-5 max-w-72' />
                  <Skeleton className='h-5 max-w-72' />
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <EnvelopeClosedIcon height={20} width={20} />
                      {email}
                    </div>

                    {/* GitHub */}
                    {developer?.socialLinks.github && (
                      <div className="flex items-center gap-2">
                        <GitHubLogoIcon height={20} width={20} />
                        <a
                          href={developer.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.github}
                        </a>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {developer?.socialLinks.linkedin && (
                      <div className="flex items-center gap-2">
                        <LinkedInLogoIcon height={20} width={20} />
                        <a
                          href={developer.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.linkedin}
                        </a>
                      </div>
                    )}

                    {/* Twitter */}
                    {developer?.socialLinks.twitter && (
                      <div className="flex items-center gap-2">
                        <TwitterLogoIcon height={20} width={20} />
                        <a
                          href={developer.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.twitter}
                        </a>
                      </div>
                    )}

                    {/* Website */}
                    {developer?.socialLinks.website && (
                      <div className="flex items-center gap-2">
                        <GlobeIcon height={20} width={20} />
                        <a
                          href={developer.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.website}
                        </a>
                      </div>
                    )}
                  </div>
                  {!developer?.socialLinks.github &&
                    !developer?.socialLinks.linkedin &&
                    !developer?.socialLinks.twitter &&
                    !developer?.socialLinks.website && (
                      <Text as='p' color='gray' size={'2'} weight={'medium'}>No social links provided</Text>
                    )}
                </>
              )}
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
            {isOverviewTab ? <OverviewTab userId={userId} name={name} loadingProfile={isLoading} /> : <SkillsTab userId={userId} />}
          </div>
        </section>
      </div>

    </div>
  )
}

export default DeveloperProfile
