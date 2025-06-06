import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Skeleton, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import React from 'react'
import { Link } from 'react-router'
import { useFeaturedDevelopers } from '../api/developers/queries'
import { usePlatformStats } from '../api/stats/queries'
import lines from '../assets/lines.webp'
import ray from '../assets/ray.webp'
import CallToAction from '../components/CallToAction'
import ErrorMessage from '../components/ErrorMessage'
import FeaturedDeveloperCard from '../components/FeaturedDeveloperCard'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import LoginButton from '../components/LoginButton'
import SampleDeveloperCard from '../components/SampleDeveloperCard '

function Home() {
  const { resolvedTheme } = useTheme()
  const {
    data,
    isLoading
  } = usePlatformStats()
  const totalDevelopers = data?.totalDevelopers ?? 0;
  const totalEndorsements = data?.totalEndorsements ?? 0;
  const verifiedSkills = data?.verifiedSkills ?? 0;
  const {
    data: featured,
    isPending,
    error,
    isError,
    refetch
  } = useFeaturedDevelopers()


  return (
    <div className='flex flex-col items-center'>
      <div className={` w-full bg-[--primary]`}

      >
        <div className={`bg-[--primary] max-w-screen-2xl mx-auto py-8 sm:py-12 px-4 md:px-6 lg:px-8 xl:px-12 w-full flex-col lg:flex-row flex items-center gap-6 pb-12 relative bg-cover bg-no-repeat bg-center`}
          style={{ backgroundImage: `url(${lines})` }}
        >
          <div className='z-10 flex flex-col flex-1 gap-4'>
            <Text as='div' className='text-[--text] text-xs sm:text-sm font-medium rounded-full px-4 py-1 bg-[--accent-a4] w-max flex items-center'>
              <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-b from-[--accent-8] to-[--accent-10] mr-2" />
              Developer-focused professional network
            </Text>
            <Text as='p' className='text-3xl text-[--text] sm:text-4xl md:text-5xl md:leading-[4rem]' weight={'bold'}>
              Showcase Your Skills. <br />
              Get Endorsed. Get Hired.
            </Text>
            <Text as='p' className='text-[--text] md:text-xl'>
              Build a professional developer profile with peer-verified skills and get discovered by employers looking for your expertise.
            </Text>
            <div className='flex flex-wrap gap-4 md:mt-4'>
              <CallToAction />
              <Button
                variant='outline'
                size={{
                  initial: "3",
                  xs: "4"
                }}
                className='w-full sm:w-auto'
                asChild
              >
                <Link
                  to={'/developers'}
                >
                  <Text as='span' className='text-[--text]'>
                    Explore Developers
                  </Text>
                </Link>
              </Button>
            </div>

          </div>
          <div className='relative flex-1 w-full'>
            <SampleDeveloperCard />
          </div>
        </div>
      </div>

      <FeaturesSection />

      <section className="w-full py-12 border-t border-b border-[--gray-a6] ">
        <div className="w-full px-4 mx-auto max-w-screen-2xl md:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 gap-8 mx-auto text-center md:grid-cols-3 max-w-7xl">
            <div className="space-y-2">
              <Skeleton loading={isLoading} className='w-20 mx-auto'>
                <h3 className="text-3xl font-bold">
                  {totalDevelopers.toLocaleString()}
                </h3>
              </Skeleton>
              <p className="text-sm text-muted-foreground">Developer Profiles</p>
            </div>
            <div className="space-y-2">
              <Skeleton loading={isLoading} className='w-20 mx-auto'>
                <h3 className="text-3xl font-bold">
                  {verifiedSkills.toLocaleString()}
                </h3>
              </Skeleton>
              <p className="text-sm text-muted-foreground">Verified Skills</p>
            </div>
            <div className="space-y-2">
              <Skeleton loading={isLoading} className='w-20 mx-auto'>
                <h3 className="text-3xl font-bold">
                  {totalEndorsements.toLocaleString()}
                </h3>
              </Skeleton>
              <p className="text-sm text-muted-foreground">Skill Endorsements</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className='bg-[--secondary] w-full'>
        <div className="w-full px-4 py-12 mx-auto md:py-24 max-w-screen-2xl md:px-6 lg:px-8 xl:px-12">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center mx-auto space-y-4 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                How It Works
              </h2>
              <p className="sm:text-xl">
                Three simple steps to build your verified developer profile
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 py-12 mx-auto max-w-7xl md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center ">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-[--gray-1] bg-[--accent-12] font-medium">
                  1
                </div>
                <h3 className="text-xl font-bold text-[--accent-12]">
                  Create Your Profile
                </h3>
                <p className="">
                  Sign up and build your developer profile with professional information and contact details.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center ">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-[--gray-1] bg-[--accent-12] font-medium">
                  2
                </div>
                <h3 className="text-xl font-bold text-[--accent-12]">
                  Add Your Skills
                </h3>
                <p className="">
                  Add technical skills with proficiency levels, experience, and links to projects showcasing your work.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center ">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-[--gray-1] bg-[--accent-12] font-medium">
                  3
                </div>
                <h3 className="text-xl font-bold text-[--accent-12]">
                  Get Endorsed
                </h3>
                <p className="">
                  Other developers in the community can verify your skills through endorsements, building your
                  credibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='w-full'>
        <div className="w-full px-4 py-12 mx-auto md:py-24 max-w-screen-2xl md:px-6 lg:px-8 xl:px-12">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center mx-auto space-y-4 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Featured Developers
              </h2>
              <p className="sm:text-xl">
                Discover top developers with verified skills on our platform
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 py-12 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
              {isPending ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <FeaturedDeveloperCard
                    key={idx}
                    loading={isPending}
                  />
                ))
              ) : isError ? (
                <ErrorMessage error={error} onRetry={refetch} />
              ) : featured?.length > 0 ? (
                featured?.map(({
                  name,
                  profilePictureUrl,
                  title,
                  skills,
                  yearsOfExperience,
                  totalEndorsementCount,
                  _id
                }) => (
                  <FeaturedDeveloperCard
                    key={_id}
                    name={name}
                    profilePictureUrl={profilePictureUrl}
                    title={title}
                    skills={skills}
                    yearsOfExperience={yearsOfExperience}
                    totalEndorsementCount={totalEndorsementCount}
                    loading={isPending}
                    _id={_id}
                  />
                ))
              ) : (
                <>No featured developers</>
              )}
            </div>
            <div className='text-center'>
              <Button
                size={{
                  initial: "3",
                  xs: "4"
                }}
                className='w-full group sm:w-auto'
                highContrast
                asChild
                variant={resolvedTheme === 'light' ? "solid" : "soft"}
              >
                <Link to={'/developers'}>
                  View all developers <ArrowRightIcon height={20} width={20} className='transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      <section className='w-full px-4 mx-auto max-w-screen-2xl md:px-6 lg:px-8 xl:px-12'>
        <div className="py-12 md:py-24 bg-[--primary] relative w-full text-[--gray-1] md:rounded-3xl bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${ray})` }}
        >
          <div className="px-4 md:px-6">
            <div className="mx-auto  flex max-w-[58rem] flex-col items-center space-y-4 text-center text-[--text]">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Showcase Your Skills?
              </h2>
              <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of developers and get your technical skills verified by peers.
              </p>
              <div className="flex flex-wrap gap-4 ">
                <CallToAction />
                <LoginButton size='4' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div >
  )
}

export default Home
