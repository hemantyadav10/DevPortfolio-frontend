import { ArrowLeftIcon, EnvelopeClosedIcon, ExternalLinkIcon, GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon, Pencil2Icon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Avatar, Button, Skeleton, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useDeveloperProfile } from '../api/developers/queries'
import OverviewTab from '../components/OverviewTab'
import SkillsTab from '../components/SkillsTab'
import ErrorMessage from '../components/ErrorMessage'
import { useAuth } from '../context/authContext'

function DeveloperProfile() {
  const [isOverviewTab, setIsOverviewTab] = useState(true)
  const { userId } = useParams()
  const { data: developer, isLoading, isError, error, refetch } = useDeveloperProfile(userId);
  const { user, isAuthenticated } = useAuth()

  const {
    name = '',
    username = '',
    email = '',
    title = '',
    bio = '',
    profilePictureUrl = '',
    yearsOfExperience = 0,
    _id
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
      <div className='flex flex-wrap items-center justify-between gap-2 my-6'>
        <Text as='p' className='text-3xl font-semibold'>
          {isAuthenticated ? (
            user?._id === _id ? "My Profile" : "Profile"
          ) : (
            "Profile"
          )}
        </Text>
        {isAuthenticated && user?._id === _id && (
          <Button highContrast asChild variant='soft'>
            <Link to="/settings">
              <Pencil2Icon height={20} width={20} /> Edit Profile
            </Link>
          </Button>
        )}
      </div>
      <div className='flex flex-col gap-6 mx-auto lg:flex-row'>
        <section className='lg:flex-1 lg:max-w-96'>
          {isError && <ErrorMessage error={error} onRetry={refetch} className='max-w-full' />}
          {!isError && <div className='space-y-6'>
            <div className='overflow-hidden border rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
              <div className='h-28 bg-[--primary] relative'>
                <div className='absolute -translate-y-1/2 bg-[--gray-1] border-4 border-[--color-panel-solid] rounded-full size-24 top-full md:left-6 left-4' >
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
              <div className='p-4 mt-8 md:p-6'>
                <Skeleton className='max-w-72' loading={isLoading}>
                  <Text as='p' className='flex flex-wrap items-baseline text-xl font-semibold gap-x-2'>
                    <span className='capitalize'>{name}</span>
                    <Text as='span' color='gray' size={'3'} weight={'medium'}> @{username}</Text>
                  </Text>
                </Skeleton>
                <Skeleton className='mt-2 max-w-60' loading={isLoading}>
                  <Text as='p'>
                    {title || 'Aspiring Developer'} • {yearsOfExperience ?? 0} years
                  </Text>
                </Skeleton>
              </div>
            </div>
            <div className='md:p-6 p-4 space-y-4 border rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
              <Text as='p' className='text-xl font-semibold'>
                About
              </Text>
              {isLoading && <div className='space-y-2'>
                <Skeleton className='w-full h-5' />
                <Skeleton className='w-3/4 h-5' />
                <Skeleton className='w-5/6 h-5' />
              </div>}
              {!isLoading && (
                bio ? (
                  <Text as='p' className='text-sm whitespace-pre-wrap'>
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
            <div className='md:p-6 p-4 space-y-4 border rounded-lg border-[--gray-a6] bg-[--color-panel-solid]'>
              <Text as='p' className='text-xl font-semibold'>
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
                    <div className="flex items-center gap-2 text-sm">
                      <EnvelopeClosedIcon />
                      {email}
                    </div>

                    {/* GitHub */}
                    {developer?.socialLinks.github && (
                      <div className="flex items-center gap-2 text-sm">
                        <GitHubLogoIcon />
                        <a
                          href={developer.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.github}
                        </a>
                        <ExternalLinkIcon />
                      </div>
                    )}

                    {/* LinkedIn */}
                    {developer?.socialLinks.linkedin && (
                      <div className="flex items-center gap-2 text-sm">
                        <LinkedInLogoIcon />
                        <a
                          href={developer.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.linkedin}
                        </a>
                        <ExternalLinkIcon />
                      </div>
                    )}

                    {/* Twitter */}
                    {developer?.socialLinks.twitter && (
                      <div className="flex items-center gap-2 text-sm">
                        <TwitterLogoIcon />
                        <a
                          href={developer.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.twitter}
                        </a>
                        <ExternalLinkIcon />
                      </div>
                    )}

                    {/* Website */}
                    {developer?.socialLinks.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <GlobeIcon />
                        <a
                          href={developer.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline hover:text-[--accent-11]"
                        >
                          {developer.socialLinks.website}
                        </a>
                        <ExternalLinkIcon />
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
          }
        </section>
        <section className='lg:flex-1'>
          <div className='relative flex text-sm bg-[--gray-3] border-4 border-[--gray-3] rounded-md w-max font-medium '>
            <div className={`absolute w-1/2 bg-[--color-background] rounded top-0 h-full ${isOverviewTab ? "" : "translate-x-full"} transition-transform duration-300 shadow`} />
            <button
              className={` bg-transparent z-10 p-1 py-[6px] ${isOverviewTab ? "" : "opacity-70"} transition-opacity duration-300 w-24`}
              onClick={() => setIsOverviewTab(true)}
            >
              Overview
            </button>
            <button
              className={`bg-transparent z-10 p-1 py-[6px] ${isOverviewTab ? "opacity-70" : ""} transition-opacity duration-300 w-24`}
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
